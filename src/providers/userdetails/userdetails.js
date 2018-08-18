var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController, ToastController, Platform } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Network } from '@ionic-native/network';
var UserdetailsProvider = /** @class */ (function () {
    //local url
    //link= "http://192.168.1.26:3001/";
    function UserdetailsProvider(http, loadingCtrl, toastCtrl, fcm, platform, uniqueDeviceID, network) {
        var _this = this;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.fcm = fcm;
        this.platform = platform;
        this.uniqueDeviceID = uniqueDeviceID;
        this.network = network;
        this.fcmid = "";
        this.deviceid = "";
        this.transaction = false;
        this.willenter = false;
        this.signuproot = false;
        this.status = false;
        //live url
        //link="https://www.cloopcard.com:8080/";
        this.link = "https://www.cloopcard.com:8000/";
        console.log('Hello UserdetailsProvider Provider');
        this.platform.ready().then(function () {
            _this.Setfcmid();
            _this.setdeviceid();
        });
    }
    UserdetailsProvider.prototype.Setfcmid = function () {
        var _this = this;
        //uncoment below
        if (this.platform.is('cordova')) {
            this.fcm.getToken().then(function (token) {
                console.log("token");
                console.log(token);
                if (token == null || token == "") {
                    _this.Setfcmid();
                }
                else {
                    _this.fcmid = token;
                }
            });
        }
    };
    UserdetailsProvider.prototype.setdeviceid = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.uniqueDeviceID.get().then(function (uuid) {
                console.log("device id= " + uuid);
                if (uuid == null || uuid == "") {
                    _this.setdeviceid();
                }
                else {
                    _this.deviceid = uuid;
                }
            });
        }
    };
    UserdetailsProvider.prototype.ShowLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        }); //Create loading
        this.loading.present(); //Start loading symbol
    };
    UserdetailsProvider.prototype.HideLoading = function () {
        this.loading.dismiss();
    };
    UserdetailsProvider.prototype.CheckConnection = function () {
        if (navigator.connection != undefined) {
            if (navigator.connection.type == "none") {
                this.ShowToast("Internet is disabled, please enable internet", 3000);
                return false;
            }
            else {
                return true;
            }
        }
        else {
            //if opened in browser
            return true;
        }
    };
    UserdetailsProvider.prototype.ShowToast = function (mes, duration) {
        if (duration == null || duration == undefined || duration == "") {
            duration = 3000;
        }
        this.toast = this.toastCtrl.create({
            message: mes,
            duration: duration,
            position: 'bottom',
        });
        this.toast.onDidDismiss(function () {
        });
        this.toast.present();
    };
    UserdetailsProvider.prototype.SomethingWentWrongAlert = function () {
        this.ShowToast("Something went wrong, please try again", 5000);
        return false;
    };
    UserdetailsProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, LoadingController, ToastController, FCM, Platform, UniqueDeviceID, Network])
    ], UserdetailsProvider);
    return UserdetailsProvider;
}());
export { UserdetailsProvider };
//# sourceMappingURL=userdetails.js.map