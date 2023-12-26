import Link from "next/link";
import { type FunctionComponent } from "react";

interface IssueCardProps {
  issue: Issue;
}

const IssueCard: FunctionComponent<IssueCardProps> = ({ issue }) => {
  const createdAtDate = new Date(issue.created_at);
  return (
    <Link
      className="flex justify-between rounded-md border p-4 transition-transform duration-300 hover:scale-[1.02]"
      target="_blank"
      href={issue.html_url}
    >
      <div className="flex w-4/5 flex-col gap-2">
        <div className=" flex flex-col gap-1">
          <div className="text-sm">{issue.repository_url.split("/")[4]}</div>
          <div>{issue.title}</div>
        </div>
        <span className="text-sm">{issue.body?.slice(0, 200)}...</span>
        <div className="flex gap-2 rounded-md text-xs">
          {issue.labels
            .filter((label) => label.name != "good first issue")
            .map((label) => {
              return (
                <div
                  style={{ backgroundColor: `#${label.color}` }}
                  className="rounded-md px-2 py-1 text-white"
                  key={label.name}
                >
                  {label.name}
                </div>
              );
            })}
        </div>
      </div>
      <div>{createdAtDate.toDateString()}</div>
    </Link>
  );
};

export default IssueCard;
