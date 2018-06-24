export interface SearchParam {
  mobile?: string;
  name?: string;
  status?: number;
  working_city?: number;
  tags?: Array<number>;
  page: number;
  pageSize: number;
  Authorization: string;
}
