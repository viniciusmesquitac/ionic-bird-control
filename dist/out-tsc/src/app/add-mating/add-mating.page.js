import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
var AddMatingPage = /** @class */ (function () {
    function AddMatingPage(pickerCtrl, navCtrl) {
        this.pickerCtrl = pickerCtrl;
        this.navCtrl = navCtrl;
        this.macho = '';
        this.femea = '';
        this.defaultColumnOptions = [
            [
                'dog',
                'cat',
                'fish',
                'bird',
                'lizard'
            ]
        ];
    }
    AddMatingPage.prototype.ngOnInit = function () {
    };
    AddMatingPage.prototype.openPicker = function (type, numColumns, numOptions, columnOptions) {
        if (type === void 0) { type = 'femea'; }
        if (numColumns === void 0) { numColumns = 1; }
        if (numOptions === void 0) { numOptions = 5; }
        if (columnOptions === void 0) { columnOptions = this.defaultColumnOptions; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var picker;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pickerCtrl.create({
                            columns: this.getColumns(numColumns, numOptions, columnOptions),
                            buttons: [
                                {
                                    text: 'cancel',
                                    role: 'cancel'
                                },
                                {
                                    text: 'Confirm',
                                    handler: function (value) {
                                        console.log('Got value $(value)');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        picker = _a.sent();
                        return [4 /*yield*/, picker.present()];
                    case 2:
                        _a.sent();
                        picker.onDidDismiss().then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var col;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, picker.getColumn('col-0')];
                                    case 1:
                                        col = _a.sent();
                                        if (type == 'macho') {
                                            this.macho = col.options[col.selectedIndex].text;
                                        }
                                        else {
                                            this.femea = col.options[col.selectedIndex].text;
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    AddMatingPage.prototype.getColumns = function (numColumns, numOptions, columnOptions) {
        var columns = [];
        for (var i = 0; i < numColumns; i++) {
            columns.push({
                name: 'col-0',
                options: this.getColumnOptions(i, numOptions, columnOptions)
            });
        }
        return columns;
    };
    AddMatingPage.prototype.getColumnOptions = function (columnIndex, numOptions, columnOptions) {
        var options = [];
        for (var i = 0; i < numOptions; i++) {
            options.push({
                text: columnOptions[columnIndex][i % numOptions],
                value: i
            });
        }
        return options;
    };
    AddMatingPage.prototype.recordMating = function () {
        this.navCtrl.navigateForward('/tabs');
    };
    AddMatingPage = tslib_1.__decorate([
        Component({
            selector: 'app-add-mating',
            templateUrl: './add-mating.page.html',
            styleUrls: ['./add-mating.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PickerController, NavController])
    ], AddMatingPage);
    return AddMatingPage;
}());
export { AddMatingPage };
//# sourceMappingURL=add-mating.page.js.map