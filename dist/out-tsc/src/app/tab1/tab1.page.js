import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BirdsService } from '../services/birds.service';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(navCtrl, birdService) {
        this.navCtrl = navCtrl;
        this.birdService = birdService;
        this.isSearchOpened = false;
        this.text = '';
    }
    Tab1Page.prototype.ngOnInit = function () {
        this.birds = this.birdService.getBirds();
    };
    // click events //
    Tab1Page.prototype.thumbClicked = function (event) {
        this.navCtrl.navigateForward('/info-bird');
    };
    Tab1Page.prototype.fabClicked = function (event) {
        this.navCtrl.navigateForward('/create-bird');
    };
    Tab1Page.prototype.filterBirds = function (event) {
        this.text = event.target.value;
        this.birdService.searchBird(this.text);
        this.birds = this.birdService.getBirds();
    };
    Tab1Page.prototype.refreshBirds = function (event) {
        this.text = event.target.value;
        if (this.text.length !== 0) {
            this.birdService.searchBird(''); // passing filter.length == 0
            this.birds = this.birdService.getBirds();
        }
    };
    Tab1Page.prototype.searchBirds = function (event) {
        console.log(event.target.value);
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, BirdsService])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map