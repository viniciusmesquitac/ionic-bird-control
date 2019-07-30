import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'bird', loadChildren: './create-bird/create-bird.module#CreateBirdPageModule' },
    { path: 'bird/:id', loadChildren: './info-bird/info-bird.module#InfoBirdPageModule' },
    { path: 'info-mating', loadChildren: './info-mating/info-mating.module#InfoMatingPageModule' },
    { path: 'add-mating', loadChildren: './add-mating/add-mating.module#AddMatingPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map