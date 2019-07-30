import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InfoBirdPage } from './info-bird.page';
var routes = [
    {
        path: '',
        component: InfoBirdPage
    }
];
var InfoBirdPageModule = /** @class */ (function () {
    function InfoBirdPageModule() {
    }
    InfoBirdPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [InfoBirdPage]
        })
    ], InfoBirdPageModule);
    return InfoBirdPageModule;
}());
export { InfoBirdPageModule };
//# sourceMappingURL=info-bird.module.js.map