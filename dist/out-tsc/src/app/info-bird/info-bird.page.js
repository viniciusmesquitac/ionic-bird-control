import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BirdsService } from '../services/birds.service';
var InfoBirdPage = /** @class */ (function () {
    function InfoBirdPage(navCtrl, activatedRoute, birdService, toastCtrl, router) {
        this.navCtrl = navCtrl;
        this.activatedRoute = activatedRoute;
        this.birdService = birdService;
        this.toastCtrl = toastCtrl;
        this.router = router;
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
    InfoBirdPage.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.birdService.getBird(id).subscribe(function (bird) {
                _this.bird = bird;
            });
        }
    };
    InfoBirdPage.prototype.goBack = function (event) {
        this.navCtrl.pop();
    };
    InfoBirdPage.prototype.updateBird = function () {
        var _this = this;
        this.birdService.updateBird(this.bird).then(function () {
            _this.showToast('Pássaro Atualizado!');
        }, function (err) {
            _this.showToast('Ocorreu um erro ao adicionar, tente novamente.');
        });
    };
    InfoBirdPage.prototype.deleteBird = function () {
        var _this = this;
        this.birdService.deleteBird(this.bird.id).then(function () {
            _this.router.navigateByUrl('/');
            _this.showToast('Pássaro Deletado!');
        }, function (err) {
            _this.showToast('Ocorreu um erro ao deletar, tente novamente.');
        });
    };
    InfoBirdPage.prototype.showToast = function (msg) {
        this.toastCtrl.create({
            message: msg,
            duration: 2000
        }).then(function (toast) { return toast.present(); });
    };
    InfoBirdPage = tslib_1.__decorate([
        Component({
            selector: 'app-info-bird',
            templateUrl: './info-bird.page.html',
            styleUrls: ['./info-bird.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, ActivatedRoute, BirdsService,
            ToastController, Router])
    ], InfoBirdPage);
    return InfoBirdPage;
}());
export { InfoBirdPage };
//# sourceMappingURL=info-bird.page.js.map