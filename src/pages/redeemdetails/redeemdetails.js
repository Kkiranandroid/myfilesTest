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
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { redeemsuccess } from '../redeemsuccess/redeemsuccess';
var redeemdetails = /** @class */ (function () {
    function redeemdetails(navCtrl, navParams, alertCtrl, userdetailsProv, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.scannedCode = "";
        this.price = "";
        this.totalcoins = "";
        this.submitted = false;
        this.link = this.userdetailsProv.link;
        this.validDecimal = false;
        this.submitted = false;
        this.scannedCode = navParams.get('scandata');
        this.scannedtype = navParams.get('scannedtype');
        this.image = navParams.get('image');
        this.merchantuid = navParams.get('merchantuid');
        this.merchantid = navParams.get('merchantid');
        this.carddate = navParams.get('carddate');
        this.cardtitle = navParams.get('cardtitle');
    }
    redeemdetails.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad redeemdetails');
    };
    redeemdetails.prototype.showAlert1 = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Redeem Successful',
            cssClass: 'redeemMsg',
            buttons: [
                {
                    text: 'Ok',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    };
    redeemdetails.prototype.showAlert2 = function () {
        var alert = this.alertCtrl.create({
            title: 'Card Not Found',
            message: 'Card Not Found',
            cssClass: 'redeemMsg',
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel'
                }
            ]
        });
        alert.present();
    };
    redeemdetails.prototype.showAlert3 = function (unsuccess) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: unsuccess,
            cssClass: 'redeemMsg',
            buttons: [
                {
                    text: 'Ok',
                    handler: function () {
                        if (_this.scannedtype == "gift" || _this.scannedtype == "store") {
                            _this.price = "";
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    redeemdetails.prototype.cardtransactionapigift = function (type) {
        debugger;
        if (this.userdetailsProv.CheckConnection()) {
            if (this.scannedtype != type) {
                this.price = '';
            }
            this.scannedCode = this.scannedCode.trim();
            if (type == "coins") {
            }
            if (this.price != "") {
                var decimalregex = /^\d*\.?\d+$/;
                if (!decimalregex.test(this.price)) {
                    this.validDecimal = true;
                }
                else {
                    this.validDecimal = false;
                    this.submitted = false;
                }
            }
            else {
                this.submitted = false;
            }
            if (this.scannedCode != "" && this.scannedCode.length == 10 && this.price != "" && !this.validDecimal) {
                if (this.navParams.get('scandata') == this.scannedCode) {
                    this.submitted = false;
                    this.price = Math.round((this.price) * 100) / 100;
                    this.userdetailsProv.ShowLoading();
                    var methodInstance_1 = this;
                    var headers = new Headers({
                        'Content-Type': 'application/json'
                    });
                    var options = new RequestOptions({
                        headers: headers
                    });
                    var body = { "merchantemployeeid": this.merchantuid, "merchantid": this.merchantid, "price": this.price };
                    var data = JSON.stringify(body);
                    console.log(body);
                    console.log(data);
                    return this.http.post(this.link + 'cardtransaction/' + this.scannedCode + '/' + this.scannedtype, data, options)
                        .subscribe(function (response) {
                        methodInstance_1.userdetailsProv.HideLoading();
                        var data = JSON.parse(response["_body"]);
                        if (data.success != false) {
                            var transactionid = data.TransactionId;
                            methodInstance_1.rewardMessage = data.rewardMessage;
                            // methodInstance.showAlert1();
                            methodInstance_1.navCtrl.push(redeemsuccess, { transactionid: transactionid, scannedtype: methodInstance_1.scannedtype, price: methodInstance_1.price, rewardMessage: methodInstance_1.rewardMessage });
                        }
                        else {
                            var unsuccess = data.message;
                            methodInstance_1.showAlert3(unsuccess);
                        }
                    }, function (error) {
                        methodInstance_1.userdetailsProv.HideLoading();
                        console.log("Error happened: " + error);
                        methodInstance_1.userdetailsProv.SomethingWentWrongAlert();
                    });
                } //if (scanned code check)
                else {
                    this.showAlert2();
                }
            }
            else {
                this.submitted = true;
            } //validation check
        } //internet
    };
    redeemdetails.prototype.cardtransactionapicoins = function (type) {
        debugger;
        if (this.userdetailsProv.CheckConnection()) {
            if (this.scannedtype != type) {
                this.totalcoins = '';
            }
            this.scannedCode = this.scannedCode.trim();
            if (this.price != "") {
                var decimalregex = /^\d*\.?\d+$/;
                if (!decimalregex.test(this.totalcoins)) {
                    this.validDecimal = true;
                }
                else {
                    this.validDecimal = false;
                    this.submitted = false;
                }
            }
            else {
                this.submitted = false;
            }
            if (this.scannedCode != "" && this.scannedCode.length == 10 && this.totalcoins != "" && !this.validDecimal) {
                if (this.navParams.get('scandata') == this.scannedCode) {
                    this.submitted = false;
                    this.price = Math.round((this.price) * 100) / 100;
                    this.userdetailsProv.ShowLoading();
                    var methodInstance_2 = this;
                    var headers = new Headers({
                        'Content-Type': 'application/json'
                    });
                    var options = new RequestOptions({
                        headers: headers
                    });
                    var body = { "merchantemployeeid": this.merchantuid, "merchantid": this.merchantid, "price": this.totalcoins };
                    var data = JSON.stringify(body);
                    console.log(body);
                    console.log(data);
                    return this.http.post(this.link + 'cardtransaction/' + this.scannedCode + '/' + this.scannedtype, data, options)
                        .subscribe(function (response) {
                        methodInstance_2.userdetailsProv.HideLoading();
                        var data = JSON.parse(response["_body"]);
                        if (data.success != false) {
                            var transactionid = data.TransactionId;
                            methodInstance_2.rewardMessage = data.rewardMessage;
                            // methodInstance.showAlert1();
                            methodInstance_2.navCtrl.push(redeemsuccess, { transactionid: transactionid, scannedtype: methodInstance_2.scannedtype, price: methodInstance_2.totalcoins, rewardMessage: methodInstance_2.rewardMessage });
                        }
                        else {
                            var unsuccess = data.message;
                            methodInstance_2.showAlert3(unsuccess);
                        }
                    }, function (error) {
                        methodInstance_2.userdetailsProv.HideLoading();
                        console.log("Error happened: " + error);
                        methodInstance_2.userdetailsProv.SomethingWentWrongAlert();
                    });
                } //if (scanned code check)
                else {
                    this.showAlert2();
                }
            }
            else {
                this.submitted = true;
            } //validation check
        } //internet
    };
    redeemdetails.prototype.cardtransactionapi = function () {
        if (this.userdetailsProv.CheckConnection()) {
            /*if(this.scannedtype!= "gift" || this.scannedtype!= "store"){
            this.price= '';
            }*/
            this.price = '';
            this.scannedCode = this.scannedCode.trim();
            if (this.scannedCode != "" && this.scannedCode.length == 10) {
                this.submitted = false;
                if (this.navParams.get('scandata') == this.scannedCode) {
                    this.userdetailsProv.ShowLoading();
                    var methodInstance_3 = this;
                    var headers = new Headers({
                        'Content-Type': 'application/json'
                    });
                    var options = new RequestOptions({
                        headers: headers
                    });
                    var body = { "merchantemployeeid": this.merchantuid, "merchantid": this.merchantid, "price": this.price };
                    var data = JSON.stringify(body);
                    console.log(data);
                    console.log(this.link + 'cardtransaction/' + this.scannedCode + '/' + this.scannedtype);
                    return this.http.post(this.link + 'cardtransaction/' + this.scannedCode + '/' + this.scannedtype, data, options)
                        .subscribe(function (response) {
                        methodInstance_3.userdetailsProv.HideLoading();
                        var data = JSON.parse(response["_body"]);
                        if (data.success != false) {
                            var transactionid = data.TransactionId;
                            methodInstance_3.rewardMessage = data.rewardMessage;
                            methodInstance_3.navCtrl.push(redeemsuccess, { transactionid: transactionid, scannedtype: methodInstance_3.scannedtype, price: methodInstance_3.price, rewardMessage: methodInstance_3.rewardMessage });
                        }
                        else {
                            var unsuccess = data.message;
                            methodInstance_3.showAlert3(unsuccess);
                        }
                    }, function (error) {
                        methodInstance_3.userdetailsProv.HideLoading();
                        console.log("Error happened: " + error);
                        methodInstance_3.userdetailsProv.SomethingWentWrongAlert();
                    });
                } //if (scanned code check)
                else {
                    this.showAlert2();
                }
            }
            else {
                this.submitted = true;
            } //validation check
        }
    }; //internet
    redeemdetails = __decorate([
        IonicPage(),
        Component({
            selector: 'redeemdetails',
            templateUrl: 'redeemdetails.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AlertController, UserdetailsProvider, Http])
    ], redeemdetails);
    return redeemdetails;
}());
export { redeemdetails };
//# sourceMappingURL=redeemdetails.js.map