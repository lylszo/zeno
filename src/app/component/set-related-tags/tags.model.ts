export class Tag {

  id: number;
  name: string;
  type: number;
  creator: string;
  active?: boolean;

  constructor(id: number, name: string, type: number, creator: string, active?: boolean) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.creator = creator;
    this.active = active;
  }

}


