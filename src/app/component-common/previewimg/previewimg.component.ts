import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PreviewimgService} from "./previewimg.service";

@Component({
  selector: 'app-previewimg',
  templateUrl: './previewimg.component.html',
  styleUrls: ['./previewimg.component.scss']
})
export class PreviewimgComponent implements OnInit {

  @Input()
  previewImgFile;
  @Output()
  previewImgFileChange: EventEmitter<string> = new EventEmitter();

  previewImgSrcs = [];

  constructor(public previewimgService: PreviewimgService) {
  }

  ngOnInit() {
  }

  previewPic(event) {
    if (!event.target.files[0]) {
      return;
    }
    let that = this;
    this.previewimgService.readAsDataUrl(event.target.files[0]).then(function (result) {
      that.previewImgSrcs.push(result);
      let file = event.target.files[0];
      that.previewImgFile.push(file);
      that.previewImgFileChange.emit(that.previewImgFile);
    })

  }

  remove(i) {
    this.previewImgSrcs.splice(i, 1);
    this.previewImgFile.splice(i, 1);
  }
}
