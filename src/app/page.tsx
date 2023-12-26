import IssueCard from "~/components/issue-card";
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
      <div className="w-3/5 transition-transform duration-200">
        <SearchForm />
      </div>
      <div className="flex h-full w-3/5 flex-col gap-6 pt-10 transition-transform duration-200">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </main>
  );
}
