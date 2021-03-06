import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges} from '@angular/core';
import {PreviewimgService} from "./previewimg.service";
import {HttpService} from "../../shared/service/http.service";
import {TipPopService} from '../../shared/service/tipPop.service';
import {Photo} from "./photo.model";

@Component({
  selector: 'app-previewimg',
  templateUrl: './previewimg.component.html',
  styleUrls: ['./previewimg.component.scss']
})
export class PreviewimgComponent implements OnInit {

  @Input()
  previewImgFile: Photo[];
  @Input()
  headPhoto: Boolean;
  @Output()
  previewImgFileChange: EventEmitter<any> = new EventEmitter();

  @Input() max = 1; // 最多传几张照片，已上传最多图片的时候添加图片的图标自动消失

  previewImgSrcs = [];

  constructor(public previewimgService: PreviewimgService, public http: HttpService,
              private tip: TipPopService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.previewImgFile) {
      if (this.previewImgFile && this.previewImgFile.length > 0) {
        this.previewImgSrcs = this.previewImgFile.map(v => v.url);
      } else {
        this.previewImgSrcs = [];
      }
    }
  }

  ngOnInit() {
    this.previewImgFile = [];
    this.headPhoto = this.headPhoto ? this.headPhoto : false;
  }

  previewPic(event) {
    if (!event.target.files[0]) {
      return;
    }
    let that = this;
    this.previewimgService.readAsDataUrl(event.target.files[0]).then(function (result) {
      let file = event.target.files[0];
      if (file.size / (1024 * 1024) > 5) {
        that.tip.setValue('请上传小于5M的图片！', true);
        return;
      }
      let data = new FormData();
      data.append('file', file);
      if (that.headPhoto) {
        that.previewImgSrcs[0] = result;
        that.http.picPost('file/upload', data, (v) => {
          that.previewImgFile[0] = v;
          that.previewImgFileChange.emit(that.previewImgFile);
        }, () => {
          that.previewImgSrcs.pop();
          that.tip.setValue('上传图片失败', true);
        })
      } else {
        let isAlready = false;
        that.previewImgSrcs.forEach((v) => {
          if (v == result) {
            isAlready = true;
            that.tip.setValue('该图片已上传，不可重复', true);
            return false;
          }
        });
        if (!isAlready) {
          that.previewImgSrcs.push(result);
          that.http.picPost('file/upload', data, (v) => {
            that.previewImgFile.push(v);
            that.previewImgFileChange.emit(that.previewImgFile);
          }, () => {
            that.previewImgSrcs.pop();
            that.tip.setValue('上传图片失败', true);
          })
        }
      }
    });
  }

  remove(i) {
    this.previewImgSrcs.splice(i, 1);
    this.previewImgFile.splice(i, 1);
  }
}
