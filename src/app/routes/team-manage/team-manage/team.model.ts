import {Tag} from "../../../component/set-related-tags/tags.model";
import {City} from "../../user-manage/user-manage/city.model";

export class Team {
  teamId: number;
  name: string;
  type: number;
  address: string;
  status: number;
  cityId: number;
  cityVo: City;
  createTime: string;
  creator: string;
  disbandTime: string;
  latitude: string;
  longitude: string;
  members: number;
  remark: string;
  roles: Object[];
  tags: Tag[];
  id:number;

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

