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
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { dashboard } from '../dashboard/dashboard';
var login = /** @class */ (function () {
    function login(navCtrl, navParams, userdetailsProv, http, menu) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.menu = menu;
        this.link = this.userdetailsProv.link;
        this.home = { email: '', password: '' };
        this.submitted = false;
        this.validEmail = false;
        this.menu.swipeEnable(false);
    }
    login.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad login');
    };
    login.prototype.redeem = function (form) {
        this.submitted = true; //to display message
        var email = this.home.email;
        var emailregex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailregex.test(email)) {
            this.validEmail = true;
        }
        else {
            this.validEmail = false;
            this.submitted = true;
        }
        if (form.valid && !this.validEmail) {
            if (this.userdetailsProv.CheckConnection()) {
                this.userdetailsProv.ShowLoading();
                this.authenticateapi();
            } //internet
        }
    };
    login.prototype.authenticateapi = function () {
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = "action=authenticate&username=" + this.home.email + "&password=" + this.home.password;
        console.log(JSON.stringify(body));
        console.log(this.link + 'api/authenticate/merchant');
        return this.http.post(this.link + 'api/authenticate/merchant', body, options)
            .subscribe(function (response) {
            var data = JSON.parse(response["_body"]);
            methodInstance.userdetailsProv.HideLoading();
            if (data.success != false) {
                if (data.merchantid) {
                    localStorage.setItem("SesmerchantData", JSON.stringify(response["_body"]));
                    if (localStorage.getItem("SesmerchantData") != null) {
                        methodInstance.logindata = JSON.parse(JSON.parse(localStorage.getItem("SesmerchantData")));
                        methodInstance.mid = methodInstance.logindata.merchantid;
                        methodInstance.language = methodInstance.logindata.language;
                        localStorage.setItem("merchantlanguage", methodInstance.language);
                        methodInstance.ml = localStorage.getItem("merchantlanguage");
                    }
                    methodInstance.navCtrl.setRoot(dashboard);
                }
            }
            else {
                methodInstance.userdetailsProv.ShowToast(data.message, 3000);
            }
        }, function (error) {
            methodInstance.userdetailsProv.HideLoading();
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    login.prototype.close = function () {
        this.navCtrl.pop();
    };
    login = __decorate([
        IonicPage(),
        Component({
            selector: 'login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserdetailsProvider, Http, MenuController])
    ], login);
    return login;
}());
export { login };
//# sourceMappingURL=login.js.map