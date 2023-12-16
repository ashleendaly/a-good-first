interface Issue {
  html_url: string;
  id: string;
  repository_url: string;
  title: string;
  labels: Label[];
  created_at: string;
  updated_at: string;
  reactions: Reactions;
  body?: string;
}

interface Label {
  name: string;
  color: string;
}

interface Reactions {
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

interface IssueResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Issue[];
}
