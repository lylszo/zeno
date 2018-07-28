import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ChooseCityComponent } from './choose-city/choose-city.component';
import { ChooseDistrictComponent } from './choose-district/choose-district.component';
import { ChooseIndustryComponent } from './choose-industry/choose-industry.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { DistrictComponent } from './district/disctrict/district.component';
import { DistrictMultComponent } from './district/district-mult/district-mult.component';
import { MapComponent } from './map/map.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PreviewimgComponent } from './previewimg/previewimg.component';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { SelectCityMultiComponent } from './select-city-multi/select-city-multi.component';
import { SelectTeamTypeComponent } from './select-team-type/select-team-type.component';
import { SetRelatedTagsComponent } from './set-related-tags/set-related-tags.component';

@NgModule({
    imports: [ SharedModule ],
    declarations: [
        ChooseCityComponent,
        ChooseDistrictComponent,
        ChooseIndustryComponent,
        DateTimeComponent,
        DistrictComponent,
        DistrictMultComponent,
        MapComponent,
        MapModalComponent,
        PaginationComponent,
        PreviewimgComponent,
        RoleModalComponent,
        SelectCityMultiComponent,
        SelectTeamTypeComponent,
        SetRelatedTagsComponent
    ],
    exports: [
        ChooseCityComponent,
        ChooseDistrictComponent,
        ChooseIndustryComponent,
        DateTimeComponent,
        DistrictComponent,
        DistrictMultComponent,
        MapComponent,
        MapModalComponent,
        PaginationComponent,
        PreviewimgComponent,
        RoleModalComponent,
        SelectCityMultiComponent,
        SelectTeamTypeComponent,
        SetRelatedTagsComponent
    ]
})
export class ComponentModule { }
