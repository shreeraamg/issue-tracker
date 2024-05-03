import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <MdOutlineEdit size={16} />
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
