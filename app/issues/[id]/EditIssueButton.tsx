import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button>
        <MdOutlineEdit size={16} />
        Edit Issue
      </Button>
    </Link>
  );
};

export default EditIssueButton;
