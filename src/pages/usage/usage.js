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
import { viewcardsdetails } from '../viewcardsdetails/viewcardsdetails';
var usage = /** @class */ (function () {
    function usage(navCtrl, navParams, userdetailsProv, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.link = this.userdetailsProv.link;
        this.usage = [];
        this.pagenumber = 1;
        this.loaded = false;
        this.fcmid = this.userdetailsProv.fcmid;
        this.loaded = false;
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (localStorage.getItem("SesUserData") != null) {
            this.userdata = JSON.parse(localStorage.getItem("SesUserData"));
            this.userid = this.userdata.userId;
        }
        if (this.userdetailsProv.CheckConnection()) {
            this.userdetailsProv.ShowLoading();
            this.cardusagedetailapi("");
        }
    }
    usage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad usage');
    };
    usage.prototype.doInfinite = function (infiniteScroll) {
        if (this.userdetailsProv.CheckConnection()) {
            if (this.usage != "") {
                this.infscrollEvent = infiniteScroll;
                this.pagenumber = this.pagenumber + 1;
                this.cardusagedetailapi(infiniteScroll);
            }
            else {
                infiniteScroll.enable(false);
            }
        }
    };
    usage.prototype.cardusagedetailapi = function (infiniteScroll) {
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = { "page": this.pagenumber, "itemsperpage": 10, "timeZone": this.timeZone, "fcmid": this.fcmid };
        var data = JSON.stringify(body);
        console.log(data);
        console.log(this.link + 'usercardsusage/' + this.userid);
        return this.http.post(this.link + 'usercardsusage/' + this.userid, data, options)
            .subscribe(function (response) {
            methodInstance.userdetailsProv.HideLoading();
            if (infiniteScroll != "") {
                infiniteScroll.complete();
            }
            if (methodInstance.infscrollEvent != undefined) {
                methodInstance.infscrollEvent.enable(true);
            }
            try {
                var usageresponse = JSON.parse(response["_body"]);
                methodInstance.loaded = true;
                if (usageresponse.length == 0) {
                    methodInstance.nodatamessage = methodInstance.userdata.name;
                    if (methodInstance.usage == undefined) {
                        methodInstance.usage = "";
                        if (infiniteScroll != "") {
                            infiniteScroll.enable(false);
                        }
                    }
                    // if(infiniteScroll!= ""){
                    // infiniteScroll.enable(false);
                    //  }
                }
                else {
                    if (methodInstance.pagenumber == 1) {
                        methodInstance.usage = usageresponse;
                    }
                    else {
                        for (var i = 0; i < usageresponse.length; i++) {
                            methodInstance.usage.push(usageresponse[i]);
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
            methodInstance.userdetailsProv.HideLoading();
            console.log("Error happened: " + error);
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    usage.prototype.cardsdetails = function (event, list) {
        this.navCtrl.push(viewcardsdetails, {
            card: list._id.cardId
        });
    };
    usage = __decorate([
        IonicPage(),
        Component({
            selector: 'usage',
            templateUrl: 'usage.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserdetailsProvider, Http])
    ], usage);
    return usage;
}());
export { usage };
//# sourceMappingURL=usage.js.map