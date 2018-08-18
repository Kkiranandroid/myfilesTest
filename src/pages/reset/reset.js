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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfirmPage } from '../confirm/confirm';
import { AndroidPermissions } from '@ionic-native/android-permissions';
var ResetPage = /** @class */ (function () {
    function ResetPage(navCtrl, navParams, userdetailsProv, http, androidPermissions) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.androidPermissions = androidPermissions;
        this.home = { mobilenumber: '', mobpref: '', OTP: '', areaCode: '' }; //initialising
        this.link = this.userdetailsProv.link;
        this.coderesult = [];
        this.nocode = false;
        this.submitted = false;
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS])
            .then(function (success) { return console.log('read sms Permission granted'); }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.READ_SMS); });
        this.country = this.navParams.get('country');
        if (this.userdetailsProv.CheckConnection()) {
            this.userdetailsProv.ShowLoading();
            this.countrylistapi();
        }
    }
    ResetPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ResetPage');
    };
    ResetPage.prototype.countrylistapi = function () {
        this.country = this.country.toLowerCase();
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = "";
        console.log(this.link + 'countrylist');
        return this.http.post(this.link + 'countrylist', body, options)
            .subscribe(function (response) {
            var coderesponse = JSON.parse(response["_body"]);
            methodInstance.userdetailsProv.HideLoading();
            for (var i = 0; i < coderesponse.length; i++) {
                if (coderesponse[i].countryName == "India" || coderesponse[i].countryName == "United States") {
                    if (coderesponse[i].areaCode != "") {
                        methodInstance.coderesult.push(coderesponse[i]);
                    }
                    if (methodInstance.country == coderesponse[i].countryName.toLowerCase()) {
                        // methodInstance.home.mobpref= coderesponse[i].areaCode;
                        methodInstance.home.mobpref = coderesponse[i].countryCode;
                        if (methodInstance.home.mobpref == "") {
                            methodInstance.nocode = true;
                        }
                    }
                }
            } //for
        }, function (error) {
            methodInstance.userdetailsProv.HideLoading();
            console.log("Error happened: " + error);
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    ResetPage.prototype.reset = function (form) {
        this.submitted = true; //to display message
        if (form.valid) {
            if (this.userdetailsProv.CheckConnection()) {
                this.userdetailsProv.ShowLoading();
                this.sendotpreset(this.home.mobilenumber);
            } //internet
        }
    };
    ResetPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    ResetPage.prototype.sendotpreset = function (mobile) {
        var mobilenum = JSON.parse('[' + JSON.stringify(mobile.toString()) + ']');
        if (this.userdetailsProv.CheckConnection()) {
            var methodInstance = this;
            var headers = new Headers({
                'Content-Type': 'application/json'
            });
            var options = new RequestOptions({
                headers: headers
            });
            var body = { "phone": mobilenum, "country": this.home.mobpref };
            var data = JSON.stringify(body);
            console.log(data);
            console.log(this.link + 'sendotpreset');
            return this.http.post(this.link + 'sendotpreset', data, options)
                .subscribe(function (response) {
                var data = JSON.parse(response["_body"]);
                if (data.success != false) {
                    console.log(data.OTP);
                    methodInstance.home.OTP = data.OTP;
                    methodInstance.home.areaCode = methodInstance.home.mobpref;
                    methodInstance.userdetailsProv.HideLoading();
                    methodInstance.navCtrl.push(ConfirmPage, { homeObj: methodInstance.home });
                }
                else {
                    methodInstance.userdetailsProv.HideLoading();
                    methodInstance.userdetailsProv.ShowToast(data.message, 3000);
                }
            }, function (error) {
                methodInstance.userdetailsProv.HideLoading();
                console.log("Error happened: " + error);
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
            });
        }
    }; //getotp
    ResetPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-reset',
            templateUrl: 'reset.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserdetailsProvider, Http, AndroidPermissions])
    ], ResetPage);
    return ResetPage;
}());
export { ResetPage };
//# sourceMappingURL=reset.js.map