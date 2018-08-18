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
import { FCM } from '@ionic-native/fcm';
import { viewcards } from '../viewcards/viewcards';
import { ResetPage } from '../reset/reset';
var LoginpagePage = /** @class */ (function () {
    function LoginpagePage(navCtrl, navParams, userdetailsProv, http, fcm) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.fcm = fcm;
        this.link = this.userdetailsProv.link;
        this.home = { mobilenumber: '', name: '', email: '', OTP: '', verifymessage: '', userid: '', language: '', country: '', mobpref: '', areaCode: '', password: '' }; //initialising
        this.fcmid = this.userdetailsProv.fcmid;
        this.deviceid = this.userdetailsProv.deviceid;
        this.submitted = false;
        this.validEmail = false;
        this.coderesult = [];
        this.nocode = false;
        this.country = this.navParams.get('country');
        this.userdetailsProv.Setfcmid();
        if (this.fcmid == null || this.fcmid == "") {
            this.fcm.getToken().then(function (token) {
                if (token == null || token == "") {
                    _this.userdetailsProv.Setfcmid();
                    _this.fcmid = token;
                }
                else {
                    _this.fcmid = token;
                }
            });
        }
        else {
            setTimeout(function () {
                _this.userdetailsProv.Setfcmid();
            }, 5000);
        }
        if (this.userdetailsProv.CheckConnection()) {
            this.userdetailsProv.ShowLoading();
            this.countrylistapi();
        }
    }
    LoginpagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginpagePage');
    };
    LoginpagePage.prototype.close = function () {
        this.navCtrl.pop();
    };
    LoginpagePage.prototype.userlogin = function (form) {
        if (this.userdetailsProv.CheckConnection()) {
            this.submitted = true; //to display message
            if (form.valid) {
                this.userdetailsProv.ShowLoading();
                this.userloginclick(this.home.mobilenumber);
            }
        } //internet
    };
    LoginpagePage.prototype.countrylistapi = function () {
        debugger;
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
        this.http.post(this.link + 'countrylist', body, options)
            .subscribe(function (response) {
            var coderesponse = JSON.parse(response["_body"]);
            debugger;
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
    LoginpagePage.prototype.userloginclick = function (mobile) {
        var mobilenum = JSON.parse('[' + JSON.stringify(mobile.toString()) + ']');
        var btn_instance = this;
        if (this.userdetailsProv.CheckConnection()) {
            var methodInstance = this;
            var headers = new Headers({
                'Content-Type': 'application/json'
            });
            var options = new RequestOptions({
                headers: headers
            });
            var body = { "phone": mobilenum, "country": this.home.mobpref, "password": this.home.password, "fcmid": this.fcmid };
            var data = JSON.stringify(body);
            console.log(data);
            console.log(this.link + 'userlogin');
            return this.http.post(this.link + 'userlogin', data, options)
                .subscribe(function (response) {
                var data = JSON.parse(response["_body"]);
                btn_instance.userdetailsProv.HideLoading();
                if (data.success != false) {
                    localStorage.setItem("SesUserData", JSON.stringify(data));
                    var userdata = JSON.parse(localStorage.getItem("SesUserData"));
                    var sesuid = userdata.userId;
                    if (localStorage.getItem("languagedata") == null) {
                        localStorage.setItem("languagedata", data.language);
                        localStorage.removeItem("merchantlanguage");
                    }
                    btn_instance.navCtrl.setRoot(viewcards);
                }
                else {
                    btn_instance.userdetailsProv.ShowToast(data.message, 3000);
                }
            }, function (error) {
                btn_instance.userdetailsProv.HideLoading();
                console.log("Error happened: " + error);
                btn_instance.userdetailsProv.SomethingWentWrongAlert();
            });
        }
    }; //getotp
    LoginpagePage.prototype.forgot = function () {
        if (this.userdetailsProv.CheckConnection()) {
            this.navCtrl.push(ResetPage, { country: this.country });
        } //internet
    };
    LoginpagePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-loginpage',
            templateUrl: 'loginpage.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserdetailsProvider, Http, FCM])
    ], LoginpagePage);
    return LoginpagePage;
}());
export { LoginpagePage };
//# sourceMappingURL=loginpage.js.map