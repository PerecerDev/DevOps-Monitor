export type SearchResultType =
  | 'navigation'
  | 'project'
  | 'deployment'
  | 'build'
  | 'alert'
  | 'log';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  href: string;
  keywords?: string[];
}
