import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BirdsService } from '../services/birds.service';
var CreateBirdPage = /** @class */ (function () {
    function CreateBirdPage(navCtrl, birdService, toastCtrl, router) {
        this.navCtrl = navCtrl;
        this.birdService = birdService;
        this.toastCtrl = toastCtrl;
        this.router = router;
        this.isFemale = true;
        this.isMale = true;
        this.bird = {
            name: '',
            gender: '',
            couple: '',
            color: '',
            lineage: '',
            father: '',
            mother: '',
        };
    }
    CreateBirdPage.prototype.goBack = function (event) {
        this.navCtrl.pop();
    };
    CreateBirdPage.prototype.goBirdTab = function (event) {
        this.router.navigateByUrl('/');
        this.navCtrl.navigateForward('/tabs');
    };
    CreateBirdPage.prototype.ngOnInit = function () {
        // loading famale and male birds array.
        this.birdsMale = this.birdService.getMaleBirds();
        this.birdsFemale = this.birdService.getFemaleBirds();
    };
    CreateBirdPage.prototype.addBird = function () {
        var _this = this;
        this.birdService.addBird(this.bird).then(function () {
            _this.router.navigateByUrl('/');
            _this.showToast('Pássaro adicionado!');
        }, function (err) {
            _this.showToast('Ocorreu um erro ao adicionar, tente novamente.');
        });
    };
    CreateBirdPage.prototype.selectCouple = function () {
        if (this.bird.gender == 'Female') {
            console.log("algo de certo esta correto");
            this.isMale = false;
            this.isFemale = true;
        }
        else {
            console.log("algo de certo esta errado");
            this.isFemale = false;
            this.isMale = true;
        }
    };
    CreateBirdPage.prototype.showToast = function (msg) {
        this.toastCtrl.create({
            message: msg,
            duration: 2000
        }).then(function (toast) { return toast.present(); });
    };
    CreateBirdPage = tslib_1.__decorate([
        Component({
            selector: 'app-create-bird',
            templateUrl: './create-bird.page.html',
            styleUrls: ['./create-bird.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, BirdsService,
            ToastController, Router])
    ], CreateBirdPage);
    return CreateBirdPage;
}());
export { CreateBirdPage };
//# sourceMappingURL=create-bird.page.js.map