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
var FilterPage = /** @class */ (function () {
    function FilterPage(navCtrl, navParams, userdetailsProv, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.link = this.userdetailsProv.link;
        this.notificationOnOff = false;
        this.isNotification = "0";
        this.fcmid = this.userdetailsProv.fcmid;
        if (localStorage.getItem("SesUserData") != null) {
            this.userdata = JSON.parse(localStorage.getItem("SesUserData"));
            this.userid = this.userdata.userId;
        }
        if (this.userdetailsProv.CheckConnection()) {
            this.getNotificationSettings();
        } //internet
    }
    FilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FilterPage');
    };
    FilterPage.prototype.setNotificationSettings = function () {
        if (this.userdetailsProv.CheckConnection()) {
            if (this.notificationOnOff == true) {
                this.isNotification = "1";
            }
            else {
                this.isNotification = "0";
            }
            var methodInstance_1 = this;
            var headers = new Headers({
                'Content-Type': 'application/json'
            });
            var options = new RequestOptions({
                headers: headers
            });
            var body = { "status": this.isNotification, "fcmid": this.fcmid };
            var data = JSON.stringify(body);
            console.log(data);
            console.log(this.link + 'changenotificationstatus/' + this.userid);
            return this.http.post(this.link + 'changenotificationstatus/' + this.userid, body, options)
                .subscribe(function (response) {
                var coderesponse = JSON.parse(response["_body"]);
                methodInstance_1.userdetailsProv.HideLoading();
            }, function (error) {
                methodInstance_1.userdetailsProv.HideLoading();
                console.log("Error happened: " + error);
                methodInstance_1.userdetailsProv.SomethingWentWrongAlert();
            });
        } //internet
    };
    FilterPage.prototype.getNotificationSettings = function () {
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = "";
        console.log(this.link + 'getnotificationstatus/' + this.userid);
        return this.http.post(this.link + 'getnotificationstatus/' + this.userid, body, options)
            .subscribe(function (response) {
            var coderesponse = JSON.parse(response["_body"]);
            methodInstance.userdetailsProv.HideLoading();
            if (coderesponse.isNotification == "1") {
                methodInstance.notificationOnOff = true;
            }
            else {
                methodInstance.notificationOnOff = false;
            }
        }, function (error) {
            methodInstance.userdetailsProv.HideLoading();
            console.log("Error happened: " + error);
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    FilterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-filter',
            templateUrl: 'filter.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserdetailsProvider, Http])
    ], FilterPage);
    return FilterPage;
}());
export { FilterPage };
//# sourceMappingURL=filter.js.map