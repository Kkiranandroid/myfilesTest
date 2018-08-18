var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { coindetails } from '../coindetails/coindetails';
import { notifications } from '../notifications/notifications';
import { loginconfirmation } from '../loginconfirmation/loginconfirmation';
var coopCardCoins = /** @class */ (function () {
    function coopCardCoins(navCtrl, navParams, userdetailsProv, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.link = this.userdetailsProv.link;
        this.phonenumeber = '';
        this.amount = '';
        this.cloopcoins = '';
        this.submitted = false;
        this.noData = false;
        this.merchantid = "";
        this.merchantuid = "";
        this.percentage = 0;
        this.cards = [];
        this.checkdatamultiple = 0;
        this.pagenumber = 1;
        /*this.cards.push({balancetext:"Balance",card_details:{cardTitle:"My Card",cardImageUrl:"http://www.adlucent.com/blog/assets//google-merchant-center-logo-516x350.png"},logo:"https://botw-pd.s3.amazonaws.com/15-orginal-2.png",remainingCreditPoints:"20"
       })*/
        debugger;
        this.fromfcm = navParams.get('fromfcm');
        if (this.fromfcm != undefined) {
            if (this.fromfcm.cardId != "" && this.fromfcm.type == "") {
                this.navCtrl.push(coindetails, { card: this.fromfcm.cardId });
            }
            else if (this.fromfcm.cardId != "" && this.fromfcm.type != "logout") {
                this.navCtrl.push(coindetails, { card: this.fromfcm.cardId });
            }
            else if (this.fromfcm.type == "logout") {
                localStorage.removeItem("SesUserData");
                this.navCtrl.setRoot(loginconfirmation);
            }
            else {
                this.navCtrl.setRoot(notifications);
            }
        }
        debugger;
        if (localStorage.getItem("SesUserData") != null) {
            this.userdata = JSON.parse(localStorage.getItem("SesUserData"));
            this.userid = this.userdata.userId;
        }
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.pagenumber = 1;
        if (this.userdetailsProv.CheckConnection()) {
            if (this.fromfcm == undefined) {
                this.userdetailsProv.ShowLoading();
            }
            this.getCloopCoinPercentage();
        }
    }
    coopCardCoins.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad usage');
    };
    coopCardCoins.prototype.ionViewWillEnter = function () {
        if (localStorage.getItem("SesUserData") != null) {
            this.userdata = JSON.parse(localStorage.getItem("SesUserData"));
            this.userid = this.userdata.userId;
        }
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (this.userdetailsProv.willenter == true) {
            console.log("ionViewWillEnter");
            this.pagenumber = 1;
            this.content.scrollToTop();
            if (this.userdetailsProv.CheckConnection()) {
                //  this.userdetailsProv.ShowLoading();
                this.getCloopCoinPercentage();
            } //internet
            this.userdetailsProv.willenter = false;
        }
    };
    coopCardCoins.prototype.getCloopCoinPercentage = function (refresher) {
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = { userid: this.userid, page: "1", itemsperpage: 3 };
        var data = JSON.stringify(body);
        console.log(data);
        console.log(this.link + 'totalcoins');
        return this.http.post(this.link + 'totalcoins/', body, options)
            .subscribe(function (response) {
            debugger;
            try {
                methodInstance.userdetailsProv.HideLoading();
            }
            catch (Exception) {
            }
            var reponsetemp = JSON.parse(response["_body"]);
            if (reponsetemp.success) {
                if (reponsetemp.doc.length == 0) {
                    methodInstance.noData = true;
                }
                else {
                    methodInstance.noData = false;
                }
                methodInstance.cards = [];
                for (var i = 0; i < reponsetemp.doc.length; i++) {
                    var balencecoin = parseFloat(reponsetemp.doc[i].creditCoins);
                    var remainingCoins = parseFloat(reponsetemp.doc[i].remainingCoins);
                    methodInstance.cards.push({
                        id: reponsetemp.doc[i]._id,
                        /*merchantId:reponsetemp.doc[i].merchantId,
                        merchantEmployeeId:reponsetemp.doc[i].merchantEmployeeId,
                        userId:reponsetemp.doc[i].userId,*/
                        creditCoins: balencecoin,
                        remainingCoins: remainingCoins,
                        qrCodeData: reponsetemp.doc[i].qrCodeData,
                        merchantName: reponsetemp.doc[i].merchant.merchantName,
                        merchantUrl: reponsetemp.doc[i].merchant.logo,
                        //	merchantUrl:"https://www.cloopcard.com/cloopapi/uploads/default.png",
                        /*merchantUrl:reponsetemp.clooplogo,*/
                        cardId: reponsetemp.doc[i]._id,
                        merchantlogo: reponsetemp.clooplogo,
                        /*merchantlogo:"https://www.cloopcard.com/cloopapi/uploads/default.png",*/
                        sitepath: reponsetemp.sitepath,
                    });
                }
            }
            else {
                methodInstance.noData = true;
            }
            try {
                if (refresher != "undefined") {
                    refresher.complete();
                }
            }
            catch (Exception) {
            }
        }, function (error) {
            methodInstance.userdetailsProv.HideLoading();
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    coopCardCoins.prototype.clickcheck = function (card, i) {
        if (this.userdetailsProv.CheckConnection()) {
            this.navCtrl.push(coindetails, {
                card: card[i].cardId,
                imageconcat: card[i].merchantUrl
                /*		imageconcat: this.imageconcat*/
            });
        } //internet
    };
    coopCardCoins.prototype.doRefresh = function (refresher) {
        debugger;
        if (this.userdetailsProv.CheckConnection()) {
            this.cards = [];
            this.noData = false;
            this.pagenumber = 1;
            this.userdetailsProv.ShowLoading();
            this.getCloopCoinPercentage(refresher);
        }
    };
    coopCardCoins.prototype.doInfinite = function (infiniteScroll) {
        debugger;
        if (this.userdetailsProv.CheckConnection()) {
            this.pagenumber = this.pagenumber + 1;
            var methodInstance_1 = this;
            var headers = new Headers({
                'Content-Type': 'application/json'
            });
            var options = new RequestOptions({
                headers: headers
            });
            var body = { userid: this.userid, page: this.pagenumber, itemsperpage: 3 };
            var data = JSON.stringify(body);
            console.log(data);
            console.log(this.link + 'totalcoins');
            return this.http.post(this.link + 'totalcoins/', body, options)
                .subscribe(function (response) {
                debugger;
                var reponsetemp = JSON.parse(response["_body"]);
                if (reponsetemp.success) {
                    for (var i = 0; i < reponsetemp.doc.length; i++) {
                        var balencecoin = parseFloat(reponsetemp.doc[i].creditCoins);
                        var remainingCoins = parseFloat(reponsetemp.doc[i].remainingCoins);
                        methodInstance_1.cards.push({
                            id: reponsetemp.doc[i]._id,
                            /*merchantId:reponsetemp.doc[i].merchantId,
                            merchantEmployeeId:reponsetemp.doc[i].merchantEmployeeId,
                            userId:reponsetemp.doc[i].userId,*/
                            creditCoins: balencecoin,
                            remainingCoins: remainingCoins,
                            qrCodeData: reponsetemp.doc[i].qrCodeData,
                            merchantName: reponsetemp.doc[i].merchant.merchantName,
                            //merchantUrl:reponsetemp.sitepath+reponsetemp.doc[i].merchant.logo,
                            merchantUrl: "https://www.cloopcard.com/cloopapi/uploads/default.png",
                            /*merchantUrl:reponsetemp.clooplogo,*/
                            cardId: reponsetemp.doc[i]._id,
                            //merchantlogo:reponsetemp.clooplogo,
                            merchantlogo: "https://www.cloopcard.com/cloopapi/uploads/default.png",
                            sitepath: reponsetemp.sitepath,
                        });
                    }
                }
                try {
                    if (infiniteScroll != "") {
                        infiniteScroll.complete();
                    }
                }
                catch (Exception) {
                }
            }, function (error) {
                methodInstance_1.userdetailsProv.HideLoading();
                methodInstance_1.userdetailsProv.SomethingWentWrongAlert();
            });
        }
    };
    coopCardCoins.prototype.getroundedcoins = function (coins) {
        debugger;
        var coin = coins.toFixed(2);
        return parseFloat(coin);
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], coopCardCoins.prototype, "content", void 0);
    coopCardCoins = __decorate([
        IonicPage(),
        Component({
            selector: 'coopCardCoins',
            templateUrl: 'coopCardCoins.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserdetailsProvider, Http])
    ], coopCardCoins);
    return coopCardCoins;
}());
export { coopCardCoins };
//# sourceMappingURL=coopCardCoins.js.map