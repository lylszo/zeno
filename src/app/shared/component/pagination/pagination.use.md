## Zeno pagination 分页使用说明与示例

    .html引入:
    <app-pagination (pageChanged)="pageChanged()" [(pageConf)]="pageConf"></app-pagination>
    
    .ts定义：
    1、引入Page数据模型：
      import {Page} from "../../component-common/pagination/page.model";
    
    2、数据初始化：
      pageConf: Page;
      cunstructor() {
      this.pageConf = {
            currentPage: 1,
            itemsPerPage: 10,
            maxSize: 5,
            numPages: 0
          };
      }
      
      3、自定义页码切换函数：
        pageChanged() {}
    
    
