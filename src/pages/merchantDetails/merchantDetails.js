var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { CallNumber } from '@ionic-native/call-number';
var merchantDetails = /** @class */ (function () {
    function merchantDetails(navCtrl, navParams, element, http, userdetailsProv, alertCtrl, callNumber) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.element = element;
        this.http = http;
        this.userdetailsProv = userdetailsProv;
        this.alertCtrl = alertCtrl;
        this.callNumber = callNumber;
        this.notification = false;
        this.link = this.userdetailsProv.link;
        this.showiconshare = false;
        this.urldisplay = false;
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (localStorage.getItem("SesUserData") != null) {
            this.userdata = JSON.parse(localStorage.getItem("SesUserData"));
            this.userid = this.userdata.userId;
        }
        this.merchantid = navParams.get('card');
        if (navParams.get('noloading') != undefined) {
            if (this.userdetailsProv.CheckConnection()) {
                setTimeout(function () {
                    _this.cardnotificationapi(_this.merchantid);
                }, 500);
            }
        }
        else {
            if (this.userdetailsProv.CheckConnection()) {
                this.userdetailsProv.ShowLoading();
                this.cardnotificationapi(this.merchantid);
            }
        }
    } //constructor
    merchantDetails.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad viewcardsdetails');
    };
    merchantDetails.prototype.ngOnInit = function () {
        var _this = this;
        this.scrollerHandle = this.element.nativeElement.getElementsByClassName('giftCardDetails')[0];
        this.toolbar = this.element.nativeElement.getElementsByClassName('toolbar-background')[0];
        this.ttitle = this.element.nativeElement.getElementsByClassName('toolbar-title')[0];
        this.ticking = false;
        this.scrollerHandle.addEventListener('scroll', function () {
            if (!_this.ticking) {
                window.requestAnimationFrame(function () {
                    _this.updateHeader();
                });
            }
            _this.ticking = true;
        });
    };
    merchantDetails.prototype.updateHeader = function () {
        this.scrollTop = this.scrollerHandle.scrollTop;
        if (this.scrollTop > 80) {
            this.toolbar.style.background = '#00AA8D';
            this.ttitle.style.opacity = 1;
        }
        else {
            this.toolbar.style.background = 'transparent';
            this.ttitle.style.opacity = 0;
        }
        this.ticking = false;
    };
    /*Scroll Header End*/
    merchantDetails.prototype.createCode = function (qrdigits) {
        this.qrimage = this.qrdigits;
    };
    merchantDetails.prototype.cardnotificationapi = function (merchantid) {
        var merchantid = merchantid;
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = { "userid": this.userid, "timeZone": this.timeZone };
        var data = JSON.stringify(body);
        console.log(data);
        console.log(this.link + 'fetchmerchantdetails/' + merchantid);
        return this.http.post(this.link + 'fetchmerchantdetails/' + merchantid, data, options)
            .subscribe(function (response) {
            debugger;
            try {
                var cardresponse = JSON.parse(response["_body"]);
                if (cardresponse.success) {
                    var coindetail = cardresponse.docs[0];
                    methodInstance.creditPoints = coindetail.creditCoins;
                    methodInstance.remainingCoins = coindetail.remainingCoins;
                    methodInstance.uid = coindetail._id;
                    methodInstance.image = coindetail.merchant[0].logo;
                    // methodInstance.image= "https://www.cloopcard.com/cloopapi/uploads/default.png";  
                    methodInstance.merchantlogo = coindetail.merchant[0].logo;
                    // methodInstance.merchantlogo= "https://www.cloopcard.com/cloopapi/uploads/default.png";  
                    methodInstance.qrdigits = coindetail.qrCodeData + "";
                    methodInstance.createCode(methodInstance.qrdigits);
                    methodInstance.merchantName = coindetail.merchant[0].merchantName;
                    if (coindetail.merchant[0].businessNumber != undefined) {
                        methodInstance.businessNumber = coindetail.merchant[0].businessNumber;
                    }
                    else {
                        methodInstance.businessNumber = "";
                    }
                    methodInstance.address1 = coindetail.merchant[0].address1;
                    methodInstance.address2 = coindetail.merchant[0].address2;
                    methodInstance.city = coindetail.merchant[0].city;
                    methodInstance.state = coindetail.merchant[0].state;
                    methodInstance.country = coindetail.merchant[0].country;
                    methodInstance.pincode = coindetail.merchant[0].pincode;
                    if (coindetail.merchant[0].facebook) {
                        if (coindetail.merchant[0].facebook.charAt(0) == "w") {
                            methodInstance.facebook = "http://" + coindetail.merchant[0].facebook;
                        }
                        else {
                            methodInstance.facebook = coindetail.merchant[0].facebook;
                        }
                    }
                    else {
                        methodInstance.facebook = "";
                    }
                    if (coindetail.merchant[0].linkedin) {
                        if (coindetail.merchant[0].linkedin.charAt(0) == "w") {
                            methodInstance.linkedin = "http://" + coindetail.merchant[0].linkedin;
                        }
                        else {
                            methodInstance.linkedin = coindetail.merchant[0].linkedin;
                        }
                    }
                    else {
                        methodInstance.linkedin = "";
                    }
                    if (coindetail.merchant[0].website) {
                        if (coindetail.merchant[0].website.charAt(0) == "w") {
                            methodInstance.website = "http://" + coindetail.merchant[0].website;
                        }
                        else {
                            methodInstance.website = coindetail.merchant[0].website;
                        }
                    }
                    else {
                        methodInstance.website = "";
                    }
                    if (coindetail.merchant[0].twitter) {
                        if (coindetail.merchant[0].twitter.charAt(0) == "w") {
                            methodInstance.twitter = "http://" + coindetail.merchant[0].twitter;
                        }
                        else {
                            methodInstance.twitter = coindetail.merchant[0].twitter;
                        }
                    }
                    else {
                        methodInstance.twitter = "";
                    }
                    if ((methodInstance.facebook != '') || (methodInstance.linkedin != '') || (methodInstance.website != '') || (methodInstance.twitter != '')) {
                        methodInstance.urldisplay = true;
                    }
                    else {
                        methodInstance.urldisplay = false;
                    }
                }
            }
            catch (Exception) {
            }
            setTimeout(function () {
                methodInstance.userdetailsProv.HideLoading();
            }, 2000);
        }, function (error) {
            console.log("Error happened: " + error);
            methodInstance.userdetailsProv.HideLoading();
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    merchantDetails.prototype.ionViewWillLeave = function () {
        this.userdetailsProv.willenter = true;
    };
    merchantDetails.prototype.facebookclick = function () {
        if (this.userdetailsProv.CheckConnection()) {
            window.open(this.facebook);
        } //internet
    };
    merchantDetails.prototype.linkedinclick = function () {
        if (this.userdetailsProv.CheckConnection()) {
            window.open(this.linkedin);
        } //internet
    };
    merchantDetails.prototype.websiteclick = function () {
        if (this.userdetailsProv.CheckConnection()) {
            window.open(this.website);
        } //internet
    };
    merchantDetails.prototype.twitterclick = function () {
        if (this.userdetailsProv.CheckConnection()) {
            window.open(this.twitter);
        } //internet
    };
    merchantDetails.prototype.dialclick = function (businessNumber) {
        this.callNumber.callNumber(businessNumber, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    merchantDetails.prototype.getroundedcoins = function (coins) {
        var coin = coins.toFixed(2);
        return parseFloat(coin);
    };
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], merchantDetails.prototype, "navBar", void 0);
    merchantDetails = __decorate([
        IonicPage(),
        Component({
            selector: 'merchantDetails',
            templateUrl: 'merchantDetails.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ElementRef, Http, UserdetailsProvider, AlertController, CallNumber])
    ], merchantDetails);
    return merchantDetails;
}());
export { merchantDetails };
//# sourceMappingURL=merchantDetails.js.map