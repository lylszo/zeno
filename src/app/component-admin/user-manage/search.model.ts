export interface SearchParam {
  mobile?: string;
  name?: string;
  status?: number;
  workingCity?: number;
  tags?: Array<number>;
  page: number;
  pageSize: number;
}
