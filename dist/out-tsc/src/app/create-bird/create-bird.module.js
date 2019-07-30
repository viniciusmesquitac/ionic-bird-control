import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateBirdPage } from './create-bird.page';
var routes = [
    {
        path: '',
        component: CreateBirdPage
    }
];
var CreateBirdPageModule = /** @class */ (function () {
    function CreateBirdPageModule() {
    }
    CreateBirdPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CreateBirdPage]
        })
    ], CreateBirdPageModule);
    return CreateBirdPageModule;
}());
export { CreateBirdPageModule };
//# sourceMappingURL=create-bird.module.js.map