export class SearchModel {

  mobile: string;
  name: string;
  status: number;
  city: number;
  tags: Array<string>;
  page: number;
  pageSize: number;
  Authorization: string;

  constructor(mobile: string,
              name: string,
              status: number,
              city: number,
              tags: Array<string>,
              page: number,
              pageSize: number,
              Authorization: string) {
    this.mobile = mobile;
    this.name = name;
    this.status = status;
    this.city = city;
    this.tags = tags;
    this.page = page;
    this.pageSize = pageSize;
    this.Authorization = Authorization;
  }
}
