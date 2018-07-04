import {Tag} from "../set-related-tags/tags.model";

export class Team {
  teamId: number;
  name: string;
  type: number;
  address: string;
  status: number;
  cityId: number;
  createTime: string;
  creator: string;
  disbandTime: string;
  latitude: string;
  longitude: string;
  members: number;
  remark: string;
  roles: Object[];
  tags: Tag[];

  getStatus() {
    return this.status === 0 ? '正常' : '解散'
  }

  getType() {
    switch (this.type) {
      case 1:
        return '自营团队';
      case 2:
        return '加盟商团队';
    }
  }
}

