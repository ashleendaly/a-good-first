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
    issues = items;
  }
  return (
    <main className="flex h-screen flex-col items-center">
      <div className=" mt-2 grid h-2/6 min-h-fit place-items-center text-5xl font-bold transition-transform duration-200">
        <div className="">A good first</div>
      </div>
      <div className="h-1/6 w-3/4 transition-transform duration-200">
        <SearchForm />
      </div>
      <div className="flex h-full w-3/4 flex-col gap-6 pt-10 transition-transform duration-200">
        {issues.map((issue) => {
          return (
            <div
              className="flex flex-col gap-1 rounded-md border p-2"
              key={issue.id}
            >
              <a
                className="hover:text-blue-300"
                target="_"
                href={issue.html_url}
              >
                {issue.title}
              </a>
              <div className="flex gap-2 rounded-md text-xs">
                {issue.labels.map((label) => {
                  return (
                    <div
                      className="rounded-md bg-blue-900 px-1 text-white"
                      key={label.name}
                    >
                      {label.name}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
