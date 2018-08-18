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
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { otp } from '../otp/otp';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FCM } from '@ionic-native/fcm';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { AndroidPermissions } from '@ionic-native/android-permissions';
var signup = /** @class */ (function () {
    function signup(navCtrl, navParams, userdetailsProv, http, fcm, uniqueDeviceID, platform, androidPermissions) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.fcm = fcm;
        this.uniqueDeviceID = uniqueDeviceID;
        this.platform = platform;
        this.androidPermissions = androidPermissions;
        this.link = this.userdetailsProv.link;
        this.home = { mobilenumber: '', name: '', email: '', OTP: '', verifymessage: '', userid: '', language: '', country: '', mobpref: '', areaCode: '', password: '' }; //initialising
        this.fcmid = this.userdetailsProv.fcmid;
        this.deviceid = this.userdetailsProv.deviceid;
        this.submitted = false;
        this.validEmail = false;
        this.coderesult = [];
        this.nocode = false;
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS])
            .then(function (success) { return console.log('read sms Permission granted'); }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.READ_SMS); });
        this.country = this.navParams.get('country');
        if (this.userdetailsProv.CheckConnection()) {
            this.userdetailsProv.ShowLoading();
            this.countrylistapi();
        } //if internet
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
        this.userdetailsProv.setdeviceid();
        if (this.deviceid == null || this.deviceid == "") {
            this.uniqueDeviceID.get().then(function (uuid) {
                if (uuid == null || uuid == "") {
                    _this.userdetailsProv.setdeviceid();
                    _this.deviceid = uuid;
                }
                else {
                    _this.deviceid = uuid;
                }
            });
        }
        else {
            setTimeout(function () {
                _this.userdetailsProv.setdeviceid();
            }, 5000);
        }
        this.platform.ready().then(function (readySource) {
            if (_this.platform.is('android')) {
                console.log("running on Android device!");
                _this.ostype = "Android";
            }
            if (_this.platform.is('ios')) {
                console.log("running on iOS device!");
                _this.ostype = "IOS";
            }
        });
    }
    signup.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad signup');
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
        this.userdetailsProv.setdeviceid();
        if (this.deviceid == null || this.deviceid == "") {
            this.uniqueDeviceID.get().then(function (uuid) {
                if (uuid == null || uuid == "") {
                    _this.userdetailsProv.setdeviceid();
                    _this.deviceid = uuid;
                }
                else {
                    _this.deviceid = uuid;
                }
            });
        }
        else {
            setTimeout(function () {
                _this.userdetailsProv.setdeviceid();
            }, 5000);
        }
        console.log("deviceid=" + this.deviceid);
    };
    signup.prototype.otp = function (form) {
        console.log("fcmid=" + this.fcmid);
        if (this.userdetailsProv.CheckConnection()) {
            this.submitted = true; //to display message
            var email = this.home.email;
            if (email != "") {
                var emailregex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (!emailregex.test(email)) {
                    this.validEmail = true;
                }
                else {
                    this.validEmail = false;
                    this.submitted = true;
                }
            }
            else {
                this.validEmail = false;
            }
            if (form.valid && !this.validEmail) {
                // this.userdetailsProv.ShowLoading();
                //  this.register(this.home.mobilenumber);
                this.getOTP(this.home.mobilenumber);
            }
        } //if internet
    };
    signup.prototype.countrylistapi = function () {
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
    signup.prototype.close = function () {
        this.navCtrl.pop();
    };
    signup.prototype.getOTP = function (mobile) {
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
            console.log(this.link + 'sendotp');
            return this.http.post(this.link + 'sendotp', data, options)
                .subscribe(function (response) {
                var data = JSON.parse(response["_body"]);
                if (data.success != false) {
                    console.log(data.OTP);
                    methodInstance.home.OTP = data.OTP;
                    methodInstance.home.areaCode = methodInstance.home.mobpref;
                    methodInstance.userdetailsProv.HideLoading();
                    methodInstance.navCtrl.push(otp, { homeObj: methodInstance.home });
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
    signup = __decorate([
        IonicPage(),
        Component({
            selector: 'signup',
            templateUrl: 'signup.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserdetailsProvider, Http, FCM, UniqueDeviceID, Platform, AndroidPermissions])
    ], signup);
    return signup;
}());
export { signup };
//# sourceMappingURL=signup.js.map