export type Issue = Partial<{
  id: string;
  number: number;
  title: string;
  creator: string;
  created_at: string;
  comments: number;
}>;
