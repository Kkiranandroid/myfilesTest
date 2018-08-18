var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { viewcards } from '../viewcards/viewcards';
import { AndroidPermissions } from '@ionic-native/android-permissions';
var ConfirmPage = /** @class */ (function () {
    function ConfirmPage(navCtrl, navParams, userdetailsProv, http, androidPermissions, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.androidPermissions = androidPermissions;
        this.platform = platform;
        this.home = { confirm: '', password: '', otp: '' }; //initialising
        this.fcmid = this.userdetailsProv.fcmid;
        this.link = this.userdetailsProv.link;
        this.deviceid = this.userdetailsProv.deviceid;
        this.submitted = false;
        this.confpassword = false;
        this.confOtp = false;
        this.otp = "";
        this.resetPageData = this.navParams.get("homeObj");
        this.Ses_OTP = this.resetPageData.OTP;
        var constructor_instance = this;
        //zone used to reflect changes in UI in text box
        this.zone = new NgZone({ enableLongStackTrace: false });
        console.log(JSON.stringify(this.navParams.get("homeObj")));
        //To Start SMS Read on sms arives
        console.log("sesotp" + this.Ses_OTP);
        if (window.SMS)
            window.SMS.startWatch(function () {
                console.log('watching started');
            }, function () {
                console.log('failed to start watching');
            });
        constructor_instance.otp = "";
        document.addEventListener('onSMSArrive', function (e) {
            var sms = e.data;
            console.log(sms);
            console.log(sms.body);
            console.log(constructor_instance.Ses_OTP + " is your verification OTP.");
            var comparemsg = constructor_instance.Ses_OTP + " is your verification OTP.";
            if (sms.body == comparemsg) {
                setTimeout(function () {
                    //set txt box value
                    constructor_instance.bindOTP(constructor_instance.Ses_OTP.toString());
                }, 50);
                if (window.SMS)
                    window.SMS.stopWatch(function () {
                        console.log('watching stopped');
                    }, function () {
                        console.log('failed to stop watching');
                    });
            }
        });
        //To kill auto read sms after few seconds
        setTimeout(function () {
            if (window.cordova) {
                if (window.SMS)
                    window.SMS.stopWatch(function () {
                        console.log('watching stopped');
                    }, function () {
                        console.log('failed to stop watching');
                    });
            }
        }, 10000000);
        this.readSmsOtp();
    }
    ConfirmPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConfirmPage');
    };
    ConfirmPage.prototype.confirmed = function (form) {
        if (this.userdetailsProv.CheckConnection()) {
            this.submitted = true; //to display message
            var password = this.home.password;
            var confpassword = this.home.confirm;
            if (password != confpassword) {
                this.confpassword = true;
            }
            else {
                this.confpassword = false;
            }
            if (this.home.otp != this.Ses_OTP) {
                this.confOtp = true;
            }
            else {
                this.confOtp = false;
            }
            if (form.valid && !this.confpassword && !this.confOtp) {
                if (this.userdetailsProv.CheckConnection()) {
                    this.userdetailsProv.ShowLoading();
                    this.resetpassword(this.resetPageData.mobilenumber);
                } //internet
            }
        } //internet
    };
    ConfirmPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    ConfirmPage.prototype.readSmsOtp = function () {
        var _this = this;
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS)
            .then(function (success) {
            console.log('Permission granted');
            _this.platform.ready().then(function (readySource) {
                if (SMS)
                    SMS.startWatch(function () {
                        console.log('watching started');
                    }, function (Error) {
                        console.log('failed to start watching');
                    });
                document.addEventListener('onSMSArrive', function (e) {
                    var sms = e.data;
                    console.log(sms);
                    var comparemsg = _this.Ses_OTP + " is your verification OTP.";
                    if (sms.body == comparemsg) {
                        setTimeout(function () {
                            //set txt box value
                            _this.bindOTP(_this.Ses_OTP.toString());
                        }, 50);
                        if (window.SMS)
                            window.SMS.stopWatch(function () {
                                console.log('watching stopped');
                            }, function () {
                                console.log('failed to stop watching');
                            });
                    }
                });
            });
        }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.READ_SMS); });
    };
    ConfirmPage.prototype.bindOTP = function (otp) {
        var _this = this;
        console.log("bind otp");
        this.zone.run(function () {
            _this.home.otp = otp;
        });
    };
    ConfirmPage.prototype.resetpassword = function (mobile) {
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
            var body = { "password": this.home.password, "fcmid": this.fcmid, "deviceid": this.deviceid, "phone": mobilenum };
            var data = JSON.stringify(body);
            console.log(data);
            console.log(this.link + 'resetpassword');
            return this.http.post(this.link + 'resetpassword', data, options)
                .subscribe(function (response) {
                var data = JSON.parse(response["_body"]);
                btn_instance.userdetailsProv.HideLoading();
                if (data.success != false) {
                    btn_instance.userdetailsProv.ShowToast("Password reset successfully", 3000);
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
    };
    ConfirmPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-confirm',
            templateUrl: 'confirm.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserdetailsProvider, Http, AndroidPermissions, Platform])
    ], ConfirmPage);
    return ConfirmPage;
}());
export { ConfirmPage };
//# sourceMappingURL=confirm.js.map