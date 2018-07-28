export class City {
  code?: number;
  name?: string;
  alphabet?: string;
  hot?: number;
  status?: number;
  active?: boolean;

  constructor(code?: number,
              name?: string,
              hot?: number,
              status?: number,
              active?: boolean) {
    this.code =  code;
    this.name =  name;
    this.hot = hot;
    this.status = status;
    this.active =  active;
  }
}
