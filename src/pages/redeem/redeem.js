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
import { IonicPage, NavController, NavParams, AlertController, Events, MenuController } from 'ionic-angular';
import { redeemdetails } from '../redeemdetails/redeemdetails';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { Diagnostic } from '@ionic-native/diagnostic';
var redeem = /** @class */ (function () {
    function redeem(navCtrl, navParams, alertCtrl, events, menu, barcodeScanner, userdetailsProv, http, translate, diagnostic) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.menu = menu;
        this.barcodeScanner = barcodeScanner;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.translate = translate;
        this.diagnostic = diagnostic;
        this.scannedCode = "";
        this.submitted = false;
        this.card = false;
        this.options = null;
        this.link = this.userdetailsProv.link;
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        var successCallback = function (status) { console.log('camera available ' + status); };
        var errorCallback = function (e) { return console.error(e); };
        this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);
        this.submitted = false;
        this.card = false;
        this.menu.swipeEnable(true);
        /*
        if(localStorage.getItem("languagedata")!=null){
             this.checklanguage= localStorage.getItem("languagedata");
             
             if(this.checklanguage== "en"){
             this.translate.use('en');
             }else if(this.checklanguage== "mexican"){
             this.translate.use('mexican');
             }
             }
           */
        if (localStorage.getItem("merchantlanguage") != null) {
            this.checklanguage = localStorage.getItem("merchantlanguage");
            if (this.checklanguage == "en" || this.checklanguage == "english") {
                this.translate.use('en');
            }
            else if (this.checklanguage == "mexican" || this.checklanguage == "es") {
                this.translate.use('mexican');
            }
        }
        else if (localStorage.getItem("languagedata") != null) {
            this.checklanguage = localStorage.getItem("languagedata");
            if (this.checklanguage == "en" || this.checklanguage == "english") {
                this.translate.use('en');
            }
            else if (this.checklanguage == "mexican" || this.checklanguage == "es") {
                this.translate.use('mexican');
            }
        }
        // else{
        // this.translate.use('en');
        // }
        if (localStorage.getItem("SesmerchantData") != null) {
            this.menu.enable(false, 'menuuser');
            this.menu.enable(true, 'menumerchant');
        }
        if (localStorage.getItem("SesmerchantData") != null) {
            this.mid = JSON.parse(JSON.parse(localStorage.getItem("SesmerchantData")));
            this.merchantid = this.mid.merchantid;
            this.merchantuid = this.mid.merchantemployeeid;
        }
    }
    redeem.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad redeem');
    };
    redeem.prototype.scanQr = function () {
        if (this.userdetailsProv.CheckConnection()) {
            this.scannedCode = this.scannedCode.trim();
            if (this.scannedCode != "" && this.scannedCode.length == 10) {
                this.submitted = false;
                this.userdetailsProv.ShowLoading();
                this.cardtransactionqrcodeapi();
            }
            else {
                this.submitted = true;
            }
        } //internet
    };
    redeem.prototype.scanCode = function () {
        var _this = this;
        if (this.userdetailsProv.CheckConnection()) {
            this.options = {
                prompt: "Place a QR code inside the rectangle to scan it."
            };
            this.barcodeScanner.scan(this.options).then(function (barcodeData) {
                _this.scannedCode = barcodeData.text;
                console.log("scannedCode length" + _this.scannedCode.length);
                _this.scanQr();
            }, function (err) {
                console.log('Error: ', err);
            });
        } //internet
    };
    redeem.prototype.cardtransactionqrcodeapi = function () {
        this.scannedCode = this.scannedCode.trim();
        console.log("this.scannedCode" + this.scannedCode);
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = { "merchantid": this.merchantid, "timeZone": this.timeZone };
        console.log(JSON.stringify(body));
        console.log(this.link + 'cardtransactionqrcode/' + this.scannedCode);
        return this.http.post(this.link + 'cardtransactionqrcode/' + this.scannedCode, body, options)
            .subscribe(function (response) {
            debugger;
            methodInstance.userdetailsProv.HideLoading();
            var scancoderesponse = JSON.parse(response["_body"]);
            if (scancoderesponse.success != false) {
                try {
                    if (scancoderesponse.cardType == "coin") {
                        methodInstance.scannedtype = scancoderesponse.cardType;
                    }
                    else {
                        methodInstance.scannedtype = scancoderesponse.cardDetails.card_data.cardType;
                    }
                }
                catch (Exception) {
                }
                methodInstance.image = scancoderesponse.logo;
                if (methodInstance.scannedtype == "coin") {
                    methodInstance.cardtitle = "";
                    methodInstance.carddate = scancoderesponse.remainingCoins;
                }
                else {
                    methodInstance.cardtitle = scancoderesponse.cardDetails.card_data.cardTitle;
                    methodInstance.carddate = scancoderesponse.cardDetails.card_data.expiryDate;
                }
                methodInstance.navCtrl.push(redeemdetails, { scandata: methodInstance.scannedCode, scannedtype: methodInstance.scannedtype, image: methodInstance.image, merchantuid: methodInstance.merchantuid, merchantid: methodInstance.merchantid, cardtitle: methodInstance.cardtitle, carddate: methodInstance.carddate });
                methodInstance.scannedCode = "";
            }
            else {
                methodInstance.card = true;
                methodInstance.submitted = true;
                methodInstance.apimessage = scancoderesponse.message;
                //  methodInstance.alertmessage(scancoderesponse);
            }
        }, function (error) {
            methodInstance.userdetailsProv.HideLoading();
            console.log("Error happened: " + error);
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    redeem.prototype.alertmessage = function (scancoderesponse) {
        var message = scancoderesponse.message;
        var alert = this.alertCtrl.create({
            title: message,
            cssClass: 'redeemMsg',
            buttons: ['OK']
        });
        alert.present();
    };
    redeem = __decorate([
        IonicPage(),
        Component({
            selector: 'redeem',
            templateUrl: 'redeem.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AlertController, Events, MenuController, BarcodeScanner, UserdetailsProvider, Http, TranslateService, Diagnostic])
    ], redeem);
    return redeem;
}());
export { redeem };
//# sourceMappingURL=redeem.js.map