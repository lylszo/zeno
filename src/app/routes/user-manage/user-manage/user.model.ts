import {City} from "./city.model";
import {Tag} from "../../../component/set-related-tags/tags.model";
import {Team} from "../../team-manage/team-manage/team.model";

export class User {
  createTime: number;
  email: string;
  mobile: string;
  name: string;
  status: number;
  userId: string;
  workingCity: City;
  districts: City[];
  tags: Tag[];
  teams: Team[];
}
