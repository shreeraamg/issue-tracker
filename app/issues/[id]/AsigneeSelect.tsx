"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/components";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AsigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60seconds
    refetchOnWindowFocus: false,
    retry: 3,
  });

  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "null"}
        onValueChange={(userId) => {
          axios
            .patch("/api/issues/" + issue.id, {
              assignedToUserId: userId === "null" ? null : userId,
            })
            .catch((err) => {
              toast.error("Changes could not be saved.");
            });
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content variant="soft">
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AsigneeSelect;
