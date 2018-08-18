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
import { IonicPage, NavController, NavParams, MenuController, AlertController, Platform } from 'ionic-angular';
import { login } from '../login/login';
import { signup } from '../signup/signup';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Http } from '@angular/http';
import { LoginpagePage } from '../loginpage/loginpage';
var loginconfirmation = /** @class */ (function () {
    function loginconfirmation(navCtrl, navParams, menu, userdetailsProv, diagnostic, alertCtrl, platform, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.userdetailsProv = userdetailsProv;
        this.diagnostic = diagnostic;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.http = http;
        this.menu.swipeEnable(false);
    }
    loginconfirmation.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Login Confirmation');
    };
    loginconfirmation.prototype.login = function () {
        this.navCtrl.push(login);
    };
    loginconfirmation.prototype.signup = function () {
        this.country = "United States";
        this.navCtrl.push(signup, { country: this.country });
    };
    loginconfirmation.prototype.signin = function () {
        this.country = "United States";
        this.navCtrl.push(LoginpagePage, { country: this.country });
    };
    loginconfirmation = __decorate([
        IonicPage(),
        Component({
            selector: 'loginconfirmation',
            templateUrl: 'loginconfirmation.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, MenuController, UserdetailsProvider, Diagnostic, AlertController, Platform, Http])
    ], loginconfirmation);
    return loginconfirmation;
}());
export { loginconfirmation };
//# sourceMappingURL=loginconfirmation.js.map