export interface ProblemExample {
  example_num: number;
  example_text: string;
  images: string[];
}

export interface Problem {
  problem_id: string;
  frontend_id: number;
  slug: string;
  difficulty: string;
  title: string;
  acceptance: number;
  is_premium: boolean;
  tags: string[];
  likes: number;
  dislikes: number;
  companies: string[];
  submission_count: string;
  upvotes: string;
  downvotes: string;
  is_verified: boolean;
  problem_slug: string;
  topics: string[];
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  follow_ups: string[];
  hints: string[];
  code_snippets: Record<string, string>;
  solution: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  difficulty_order?: number;
  frequency?: number;
}

export interface ProblemListResponse {
  page: number;
  limit: number;
  count: number;
  results: Problem[];
}
