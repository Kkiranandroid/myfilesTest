var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { redeem } from '../redeem/redeem';
var redeemsuccess = /** @class */ (function () {
    function redeemsuccess(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.transactionid = navParams.get('transactionid');
        this.scannedtype = navParams.get('scannedtype');
        this.price = navParams.get('price');
        this.rewardMessage = navParams.get('rewardMessage');
    }
    redeemsuccess.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad redeemsuccess');
    };
    redeemsuccess.prototype.backToRedeem = function () {
        if (this.scannedtype == "punch" && this.rewardMessage != "" && this.rewardMessage != undefined) {
            this.rewardAlert1();
        }
        else {
            this.navCtrl.setRoot(redeem);
        }
    };
    redeemsuccess.prototype.rewardAlert1 = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: this.rewardMessage,
            cssClass: 'redeemMsg',
            buttons: [
                {
                    text: 'Ok',
                    handler: function () {
                        _this.navCtrl.setRoot(redeem);
                    }
                }
            ]
        });
        alert.present();
    };
    redeemsuccess = __decorate([
        IonicPage(),
        Component({
            selector: 'redeemsuccess',
            templateUrl: 'redeemsuccess.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AlertController])
    ], redeemsuccess);
    return redeemsuccess;
}());
export { redeemsuccess };
//# sourceMappingURL=redeemsuccess.js.map