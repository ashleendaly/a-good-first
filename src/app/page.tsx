import Link from "next/link";
import SearchForm from "~/components/search-form";
import { api } from "~/trpc/server";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Home({ searchParams }: PageProps) {
  let issues: Issue[] = [];
  if (
    searchParams.q &&
    searchParams.language &&
    typeof searchParams.q === "string" &&
    typeof searchParams.language === "string"
  ) {
    const q = searchParams.q;
    const language = searchParams.language;
    const { items } = await api.search.searchIssues.query({
      q,
      language,
    });
    issues = items.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    });
  }

  return (
    <main className="flex h-screen flex-col items-center">
      <div className=" mt-2 grid h-2/6 min-h-fit place-items-center text-5xl font-bold transition-transform duration-200">
        <div className="grid h-[10vh] place-items-center">
          find a good first...
        </div>
      </div>
      <div className="w-3/4 transition-transform duration-200">
        <SearchForm />
      </div>
      <div className="flex h-full w-3/4 flex-col gap-6 pt-10 transition-transform duration-200">
        {issues.map((issue) => {
          const createdAtDate = new Date(issue.created_at);
          return (
            <Link
              className="flex justify-between rounded-md border p-4 transition-transform duration-300 hover:scale-[1.02]"
              target="_blank"
              href={issue.html_url}
              key={issue.id}
            >
              <div className="flex w-4/5 flex-col gap-2">
                <div className="flex items-center gap-4">
                  <div>{issue.title}</div>
                  <div className="text-sm">
                    {issue.repository_url.split("/")[4]}
                  </div>
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
        })}
      </div>
    </main>
  );
}
