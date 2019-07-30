import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddMatingPage } from './add-mating.page';
var routes = [
    {
        path: '',
        component: AddMatingPage
    }
];
var AddMatingPageModule = /** @class */ (function () {
    function AddMatingPageModule() {
    }
    AddMatingPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddMatingPage]
        })
    ], AddMatingPageModule);
    return AddMatingPageModule;
}());
export { AddMatingPageModule };
//# sourceMappingURL=add-mating.module.js.map