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
var sendcloopcoins = /** @class */ (function () {
    function sendcloopcoins(navCtrl, navParams, userdetailsProv, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.link = this.userdetailsProv.link;
        this.phonenumeber = '';
        this.amount = '';
        this.cloopcoins = '';
        this.submitted = false;
        this.merchantid = "";
        this.merchantuid = "";
        this.percentage = 0;
        this.merchantname = "";
        if (localStorage.getItem("SesmerchantData") != null) {
            debugger;
            this.mid = JSON.parse(JSON.parse(localStorage.getItem("SesmerchantData")));
            this.merchantid = this.mid.merchantid;
            this.merchantuid = this.mid.merchantemployeeid;
            this.merchantname = this.mid.merchantname;
        }
        this.getCloopCoinPercentage();
    }
    sendcloopcoins.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad usage');
    };
    sendcloopcoins.prototype.sendCloopCoins = function (form) {
        this.submitted = true;
        if (form.valid) {
            this.userdetailsProv.ShowLoading();
            var methodInstance_1 = this;
            var headers = new Headers({
                'Content-Type': 'application/json'
            });
            var options = new RequestOptions({
                headers: headers
            });
            var body = { emp_id: this.merchantuid,
                phone: this.phonenumeber,
                merchantname: this.merchantname,
                percentage: this.percentage,
                amount: this.amount,
                coins: parseFloat(this.cloopcoins) };
            var data = JSON.stringify(body);
            console.log(data);
            console.log(this.link + 'addcoins');
            return this.http.post(this.link + 'addcoins/' + this.merchantid, body, options)
                .subscribe(function (response) {
                debugger;
                methodInstance_1.userdetailsProv.HideLoading();
                var reponsetemp = JSON.parse(response["_body"]);
                methodInstance_1.submitted = false;
                methodInstance_1.phonenumeber = "";
                methodInstance_1.amount = "";
                methodInstance_1.cloopcoins = "";
                methodInstance_1.userdetailsProv.ShowToast(reponsetemp.message, 4000);
            }, function (error) {
                methodInstance_1.userdetailsProv.HideLoading();
                methodInstance_1.userdetailsProv.SomethingWentWrongAlert();
            });
        }
    };
    sendcloopcoins.prototype.getCloopCoinPercentage = function () {
        this.userdetailsProv.ShowLoading();
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = { id: this.merchantid };
        var data = JSON.stringify(body);
        console.log(data);
        console.log(this.link + 'mercoinssettingsdata');
        return this.http.post(this.link + 'mercoinssettingsdata/', body, options)
            .subscribe(function (response) {
            debugger;
            methodInstance.userdetailsProv.HideLoading();
            var reponsetemp = JSON.parse(response["_body"]);
            if (reponsetemp.success) {
                methodInstance.percentage = reponsetemp.doc[0].percentage;
            }
        }, function (error) {
            methodInstance.userdetailsProv.HideLoading();
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    sendcloopcoins.prototype.calculatePerecentage = function ($event) {
        var _this = this;
        debugger;
        setTimeout(function () {
            var coins = (((Number(_this.amount) / 100) * Number(_this.percentage)).toFixed(2));
            if (coins == "0.00" || coins == "0") {
                _this.cloopcoins = parseFloat("0.00");
            }
            else {
                _this.cloopcoins = parseFloat(coins);
            }
        }, 200);
    };
    sendcloopcoins = __decorate([
        IonicPage(),
        Component({
            selector: 'sendcloopcoins',
            templateUrl: 'sendcloopcoins.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserdetailsProvider, Http])
    ], sendcloopcoins);
    return sendcloopcoins;
}());
export { sendcloopcoins };
//# sourceMappingURL=sendcloopcoins.js.map