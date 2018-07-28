export interface SearchParam {
  mobile?: string;
  name?: string;
  status?: number;
  serviceCity?: number;
  working_district?:number;
  tags?: Array<number>;
  page: number;
  pageSize: number;
}
