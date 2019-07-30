import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InfoMatingPage } from './info-mating.page';
var routes = [
    {
        path: '',
        component: InfoMatingPage
    }
];
var InfoMatingPageModule = /** @class */ (function () {
    function InfoMatingPageModule() {
    }
    InfoMatingPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [InfoMatingPage]
        })
    ], InfoMatingPageModule);
    return InfoMatingPageModule;
}());
export { InfoMatingPageModule };
//# sourceMappingURL=info-mating.module.js.map