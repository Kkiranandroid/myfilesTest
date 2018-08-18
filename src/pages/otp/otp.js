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
import { IonicPage, NavController, NavParams, Events, MenuController, Platform } from 'ionic-angular';
import { viewcards } from '../viewcards/viewcards';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AndroidPermissions } from '@ionic-native/android-permissions';
var otp = /** @class */ (function () {
    function otp(navCtrl, navParams, events, userdetailsProv, http, menu, platform, androidPermissions) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.menu = menu;
        this.platform = platform;
        this.androidPermissions = androidPermissions;
        this.otp = "";
        this.link = this.userdetailsProv.link;
        this.errorOTP = "";
        this.resendCount = 0;
        this.isSubmit = false;
        this.firstPageData = this.navParams.get("homeObj");
        this.Ses_OTP = this.firstPageData.OTP;
        this.fcmid = this.userdetailsProv.fcmid;
        this.deviceid = this.userdetailsProv.deviceid;
        var constructor_instance = this;
        //zone used to reflect changes in UI in text box
        this.zone = new NgZone({ enableLongStackTrace: false });
        console.log(JSON.stringify(this.navParams.get("homeObj")));
        this.mobilenumber = this.navParams.get("homeObj").mobilenumber;
        this.areaCode = this.navParams.get("homeObj").areaCode;
        // this.otp= this.navParams.get("homeObj").OTP;
        this.Ses_OTP = this.firstPageData.OTP;
        //To Start SMS Read on sms arives
        console.log("sesotp" + this.Ses_OTP);
        if (window.SMS)
            window.SMS.startWatch(function () {
                console.log('watching started');
            }, function () {
                console.log('failed to start watching');
            });
        constructor_instance.otp = "";
        //constructor_instance.otp= this.otp;
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
                //this.navCtrl.push(this.navCtrl.getActive().component);
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
    } //constructor
    otp.prototype.bindOTP = function (otp) {
        var _this = this;
        console.log("bind otp");
        this.zone.run(function () {
            _this.otp = otp;
        });
    };
    otp.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad otp');
    }; //ionviewdidiload
    otp.prototype.viewcards = function (userfulldata) {
        if (this.userdetailsProv.CheckConnection()) {
            this.isSubmit = true;
            this.errorOTP = "";
            if (this.otp != "") {
                if (this.otp == this.Ses_OTP) {
                    // localStorage.setItem("SesUserData", JSON.stringify(this.firstPageData));
                    localStorage.setItem("SesUserData", userfulldata);
                    var data = JSON.parse(localStorage.getItem("SesUserData"));
                    var sesuid = data.userId;
                    if (localStorage.getItem("languagedata") == null) {
                        localStorage.setItem("languagedata", data.language);
                        localStorage.removeItem("merchantlanguage");
                    }
                    // this.navCtrl.push(viewcards);
                    this.navCtrl.setRoot(viewcards);
                }
                else {
                    this.errorOTP = "Please enter valid otp";
                }
            }
            else {
                this.errorOTP = "Please enter otp";
            }
        } //internet
    };
    otp.prototype.lnkResendOTPClick = function () {
        if (this.userdetailsProv.CheckConnection()) {
            this.userdetailsProv.ShowLoading();
            //To Start SMS Read on sms arives
            console.log("sesotp" + this.Ses_OTP);
            if (window.SMS)
                window.SMS.startWatch(function () {
                    console.log('watching started');
                }, function () {
                    console.log('failed to start watching');
                });
            var btn_instance = this;
            this.resendCount = this.resendCount + 1;
            this.getOTP(this.mobilenumber);
        }
    };
    otp.prototype.getOTP = function (mobile) {
        console.log("fcmid" + this.fcmid);
        console.log("deviceid" + this.deviceid);
        var mobilenum = JSON.parse('[' + JSON.stringify(mobile.toString()) + ']');
        console.log(mobilenum);
        var btn_instance = this;
        if (this.userdetailsProv.CheckConnection()) {
            var methodInstance = this;
            var headers = new Headers({
                'Content-Type': 'application/json'
            });
            var options = new RequestOptions({
                headers: headers
            });
            var body = { "phone": mobilenum, "country": this.areaCode };
            var data = JSON.stringify(body);
            console.log(data);
            return this.http.post(this.link + 'sendotp', data, options)
                .subscribe(function (response) {
                var data = JSON.parse(response["_body"]);
                console.log(data.OTP);
                btn_instance.Ses_OTP = data.OTP;
                // btn_instance.otp= btn_instance.Ses_OTP;
                btn_instance.userdetailsProv.HideLoading();
            }, function (error) {
                btn_instance.userdetailsProv.HideLoading();
                console.log("Error happened: " + error);
                btn_instance.userdetailsProv.SomethingWentWrongAlert();
            });
        }
    }; //getotp
    otp.prototype.verifyotp = function (mobile) {
        var mobilenum = JSON.parse('[' + JSON.stringify(mobile.toString()) + ']');
        console.log(mobilenum);
        var btn_instance = this;
        if (this.userdetailsProv.CheckConnection()) {
            var methodInstance = this;
            var headers = new Headers({
                'Content-Type': 'application/json'
            });
            var options = new RequestOptions({
                headers: headers
            });
            // let body= {"phone":mobilenum, "email": this.firstPageData.email, "deviceid": this.deviceid, "fcmid": this.fcmid, "name": this.firstPageData.name, "country":this.areaCode, "ostype": this.ostype};
            var body = { "phone": mobilenum, "country": this.areaCode, "name": this.firstPageData.name, "email": this.firstPageData.email, "password": this.firstPageData.password, "fcmid": this.fcmid, "ostype": this.ostype, "deviceid": this.deviceid };
            var data = JSON.stringify(body);
            console.log(data);
            console.log(this.link + 'verifyotp');
            return this.http.post(this.link + 'verifyotp', data, options)
                .subscribe(function (response) {
                var data = JSON.parse(response["_body"]);
                if (data.success != false) {
                    btn_instance.verifymessage = data.message;
                    btn_instance.userid = data.userId;
                    btn_instance.language = data.language;
                    btn_instance.userdetailsProv.HideLoading();
                    btn_instance.viewcards(JSON.stringify(data));
                }
                else {
                    btn_instance.userdetailsProv.HideLoading();
                    btn_instance.userdetailsProv.ShowToast(data.message, 3000);
                }
            }, function (error) {
                btn_instance.userdetailsProv.HideLoading();
                console.log("Error happened: " + error);
                btn_instance.userdetailsProv.SomethingWentWrongAlert();
            });
        }
    }; //verifyotp
    otp.prototype.ionViewWillEnter = function () {
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
    otp = __decorate([
        IonicPage(),
        Component({
            selector: 'otp',
            templateUrl: 'otp.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Events, UserdetailsProvider, Http, MenuController, Platform, AndroidPermissions])
    ], otp);
    return otp;
}());
export { otp };
//# sourceMappingURL=otp.js.map