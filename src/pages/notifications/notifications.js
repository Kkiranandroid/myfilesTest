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
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
var notifications = /** @class */ (function () {
    function notifications(navCtrl, navParams, http, userdetailsProv) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.userdetailsProv = userdetailsProv;
        this.link = this.userdetailsProv.link;
        this.fetchresult = [];
        this.pagenumber = 1;
        this.loaded = false;
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.loaded = false;
        if (localStorage.getItem("SesUserData") != null) {
            this.userdata = JSON.parse(localStorage.getItem("SesUserData"));
            this.userid = this.userdata.userId;
        }
        if (navParams.get('noloading') != undefined) {
            if (this.userdetailsProv.CheckConnection()) {
                setTimeout(function () {
                    _this.userdetailsProv.ShowLoading();
                    _this.fetchnotification("");
                }, 500);
            }
        }
        else {
            if (this.userdetailsProv.CheckConnection()) {
                this.userdetailsProv.ShowLoading();
                this.fetchnotification("");
            }
        }
    }
    notifications.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad notifications');
    };
    notifications.prototype.fetchnotification = function (infiniteScroll) {
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = { "page": this.pagenumber, "itemsperpage": 3, "timeZone": this.timeZone };
        var data = JSON.stringify(body);
        console.log(JSON.stringify(body));
        console.log(this.link + 'fetchnotifications/' + this.userid);
        return this.http.post(this.link + 'fetchnotifications/' + this.userid, data, options)
            .subscribe(function (response) {
            methodInstance.userdetailsProv.HideLoading();
            if (infiniteScroll != "") {
                infiniteScroll.complete();
            }
            if (methodInstance.infscrollEvent != undefined) {
                methodInstance.infscrollEvent.enable(true);
            }
            try {
                var fetchresponse = JSON.parse(response["_body"]);
                methodInstance.loaded = true;
                if (fetchresponse.length == 0) {
                    if (methodInstance.fetchresult == undefined) {
                        methodInstance.fetchresult = "";
                        if (infiniteScroll != "") {
                            infiniteScroll.enable(false);
                        }
                    }
                    if (infiniteScroll != "") {
                        infiniteScroll.enable(false);
                    }
                }
                else {
                    if (methodInstance.pagenumber == 1) {
                        methodInstance.fetchresult = fetchresponse;
                        for (var i = 0; i < fetchresponse.length; i++) {
                            if (fetchresponse[i].notification_details.isRead == false) {
                                methodInstance.readnotification(fetchresponse[i]._id);
                            }
                        } //for
                    }
                    else {
                        for (var i = 0; i < fetchresponse.length; i++) {
                            methodInstance.fetchresult.push(fetchresponse[i]);
                            if (fetchresponse[i].notification_details.isRead == false) {
                                methodInstance.readnotification(fetchresponse[i]._id);
                            }
                        }
                    }
                }
            }
            catch (e) {
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                methodInstance.userdetailsProv.HideLoading();
                return false;
            } //catch
        }, function (error) {
            console.log("Error happened: " + error);
            methodInstance.userdetailsProv.HideLoading();
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    notifications.prototype.doInfinite = function (infiniteScroll) {
        if (this.userdetailsProv.CheckConnection()) {
            if (this.fetchresult != "") {
                this.infscrollEvent = infiniteScroll;
                this.pagenumber = this.pagenumber + 1;
                this.fetchnotification(infiniteScroll);
            }
            else {
                infiniteScroll.enable(false);
            }
        }
    };
    notifications.prototype.readnotification = function (notificationId) {
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = { "notificationid": notificationId };
        var data = JSON.stringify(body);
        console.log(JSON.stringify(body));
        console.log(this.link + 'readusernotification/' + this.userid);
        return this.http.post(this.link + 'readusernotification/' + this.userid, data, options)
            .subscribe(function (response) {
            var data = JSON.parse(response["_body"]);
        }, function (error) {
            console.log("Error happened: " + error);
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    notifications.prototype.moveTomerchantdetailpage = function (list) {
    };
    notifications = __decorate([
        IonicPage(),
        Component({
            selector: 'notifications',
            templateUrl: 'notifications.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Http, UserdetailsProvider])
    ], notifications);
    return notifications;
}());
export { notifications };
//# sourceMappingURL=notifications.js.map