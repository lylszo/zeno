import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgProgressModule } from "@ngx-progressbar/core";
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgProgressHttpModule } from "@ngx-progressbar/http";
import { NgProgressRouterModule } from "@ngx-progressbar/router";
import { BsDatepickerModule  } from 'ngx-bootstrap/datepicker';


import { CookieService } from 'ngx-cookie-service';
import { TipPopService } from './service/tipPop.service';
import { Guard } from "./service/guard.service";

import { DatePipe } from "@angular/common";
import { DecimalPipe } from './pipe/decimal.pipe';
import { CityNamePipe } from './pipe/city-name.pipe';
import { ParentPropertyPipe } from './pipe/parent-property.pipe';
import { PositionDescPipe } from './pipe/position-desc.pipe';
import { IndustryNamePipe } from './pipe/industry-name.pipe';
import { RentUnitPipe } from './pipe/rent-unit.pipe';
import { OperateStatusPipe } from './pipe/operate-status.pipe';
import { NearStreetPipe } from './pipe/near-street.pipe';
import { TransferCanEmptyPipe } from './pipe/transfer-can-empty.pipe';
import { BuildingShapePipe } from './pipe/building-shape.pipe';
import { PropertyRightPipe } from './pipe/property-right.pipe';
import { RemoveRiskPipe } from './pipe/remove-risk.pipe';
import { OperateModePipe } from './pipe/operate-mode.pipe';
import { DecorateGradePipe } from './pipe/decorate-grade.pipe';
import { OperateVipModePipe } from './pipe/operate-vip-mode.pipe';
import { TransferStatusPipe } from './pipe/transfer-status.pipe';
import { CertificateTypePipe } from './pipe/certificate-type.pipe';

import { demoDirective } from './directives/demo/flot.directive';

@NgModule({
    imports: [
        BrowserModule,
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        BrowserAnimationsModule,
        NgProgressModule.forRoot(),
        NgProgressHttpModule,
        NgProgressRouterModule,
        BsDatepickerModule.forRoot()
    ],
    providers: [
        Guard, 
        DatePipe,
        CookieService,
        TipPopService
    ],
    declarations: [
        DecimalPipe,
        CityNamePipe,
        ParentPropertyPipe,
        PositionDescPipe,
        IndustryNamePipe,
        RentUnitPipe,
        OperateStatusPipe,
        NearStreetPipe,
        TransferCanEmptyPipe,
        BuildingShapePipe,
        PropertyRightPipe,
        RemoveRiskPipe,
        OperateModePipe,
        DecorateGradePipe,
        OperateVipModePipe,
        TransferStatusPipe,
        CertificateTypePipe,

        demoDirective
    ],
    exports: [
        BrowserModule,
        PaginationModule,
        ModalModule,
        FormsModule,
        BrowserAnimationsModule,
        NgProgressModule,
        ModalModule,
        PaginationModule,
        NgProgressHttpModule,
        NgProgressRouterModule,
        BsDatepickerModule,
        Guard,
        DatePipe,
        CookieService,
        TipPopService,
        DecimalPipe,
        CityNamePipe,
        ParentPropertyPipe,
        PositionDescPipe,
        IndustryNamePipe,
        RentUnitPipe,
        OperateStatusPipe,
        NearStreetPipe,
        TransferCanEmptyPipe,
        BuildingShapePipe,
        PropertyRightPipe,
        RemoveRiskPipe,
        OperateModePipe,
        DecorateGradePipe,
        OperateVipModePipe,
        TransferStatusPipe,
        CertificateTypePipe,
        demoDirective
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
