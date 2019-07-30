import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
var Tab3Page = /** @class */ (function () {
    function Tab3Page(navCtrl) {
        this.navCtrl = navCtrl;
    }
    Tab3Page.prototype.ButtonClick = function () {
        this.navCtrl.navigateForward('/info-mating');
    };
    Tab3Page.prototype.addMating = function () {
        this.navCtrl.navigateForward('/add-mating');
    };
    Tab3Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab3',
            templateUrl: 'tab3.page.html',
            styleUrls: ['tab3.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NavController])
    ], Tab3Page);
    return Tab3Page;
}());
export { Tab3Page };
//# sourceMappingURL=tab3.page.js.map