import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {TipPopService} from '../../../service/tipPop.service';
import {isUndefined} from 'util';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  teamType = [{
    code: 0,
    name: '-请选择-'
  }, {
    code: 1,
    name: '自营'
  }, {
    code: 2,
    name: '加盟店'
  }];
  name: String = '';
  addtype: Number = 0;
  city: Number = -1;
  address: String = '';
  point: Point;  // 中心点位置
  remark: String = '';
  tags = [];
  citys = [];
  roles: Array<any> = [];

  constructor(private http: HttpService, private tip: TipPopService) {
  }

  ngOnInit() {
  }

  getRole(event) {
    this.roles = [];
    if(event.roleId){
      this.roles.push(event.roleId);
    }
  }

  back() {
    history.back();
  }

  submit() {
    if (!this.name) {
      this.tip.setValue('请输入团队名称', true);
      return;
    }
    if (this.addtype == 0) {
      this.tip.setValue('请选择团队类型', true);
      return;
    }
    if (this.city == -1) {
      this.tip.setValue('请选择所在区域', true);
      return;
    }
    let params: any = {
      name: this.name,
      type: this.addtype,
      workingDistrict: 12
    };
    this.address ? params.address = this.address : isUndefined(params.address);
    if (this.point) {
      params.latitude = this.point.lat;
      params.longitude = this.point.lng;
    } else {
      isUndefined(params.latitude);
      isUndefined(params.longitude);
    }
    this.remark ? params.descriptoin = this.remark : isUndefined(params.descriptoin);
    this.tags.length > 0 ? params.tags = this.tags : isUndefined(params.tags);
    this.citys.length > 0 ? params.cityIds = this.citys : isUndefined(params.cityIds);
    this.roles.length > 0 ? params.roles = this.roles : isUndefined(params.roles);

    this.http.post('team', params, (data) => {
      this.tip.setValue('创建成功', false);
      this.back();
    });
  }

}

interface Point {
  lng: any;
  lat: any;
}
