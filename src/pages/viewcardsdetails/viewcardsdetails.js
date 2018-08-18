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
import { SharesuccessPage } from '../sharesuccess/sharesuccess';
import { CallNumber } from '@ionic-native/call-number';
var viewcardsdetails = /** @class */ (function () {
    function viewcardsdetails(navCtrl, navParams, element, http, userdetailsProv, alertCtrl, callNumber) {
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
        this.selectedCardid = navParams.get('card');
        if (navParams.get('noloading') != undefined) {
            if (this.userdetailsProv.CheckConnection()) {
                setTimeout(function () {
                    _this.cardnotificationapi(_this.selectedCardid);
                }, 500);
            }
        }
        else {
            if (this.userdetailsProv.CheckConnection()) {
                this.userdetailsProv.ShowLoading();
                this.cardnotificationapi(this.selectedCardid);
            }
        }
    } //constructor
    viewcardsdetails.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad viewcardsdetails');
    };
    viewcardsdetails.prototype.ngOnInit = function () {
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
    viewcardsdetails.prototype.updateHeader = function () {
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
    viewcardsdetails.prototype.createCode = function (qrdigits) {
        this.qrimage = this.qrdigits;
    };
    viewcardsdetails.prototype.cardnotificationapi = function (cardid) {
        var cardid = cardid;
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
        console.log(this.link + 'carddetails/' + cardid);
        return this.http.post(this.link + 'carddetails/' + cardid, data, options)
            .subscribe(function (response) {
            debugger;
            methodInstance.userdetailsProv.HideLoading();
            var cardresponse = JSON.parse(response["_body"]);
            methodInstance.cardTitle = cardresponse["0"].cardTitle;
            methodInstance.expiryDate = cardresponse["0"].expiryDate;
            methodInstance.messageUser = cardresponse["0"].messageUser;
            //for share option
            methodInstance.uid = cardresponse["0"].UsersDetails._id;
            methodInstance.creditPoints = cardresponse["0"].creditPoints;
            methodInstance.blockeddata = cardresponse["0"].UsersDetails.isBlocked;
            methodInstance.istransferred = cardresponse["0"].UsersDetails.istransferred;
            methodInstance.couponUsed = cardresponse["0"].UsersDetails.couponUsed;
            if (cardresponse["0"].cardImageUrl == "") {
                methodInstance.image = cardresponse["0"].MerchantDetails.logo;
            }
            else {
                methodInstance.image = cardresponse["0"].cardImageUrl;
            }
            methodInstance.qrdigits = cardresponse["0"].UsersDetails.qrCodeData;
            methodInstance.remainingPunchCount = cardresponse["0"].UsersDetails.remainingPunchCount;
            methodInstance.discountPercent = cardresponse["0"].discountPercent;
            methodInstance.cardtype = cardresponse["0"].cardType;
            methodInstance.punchCount = cardresponse["0"].punchCount;
            methodInstance.createCode(methodInstance.qrdigits);
            methodInstance.messageReachPunchLimit = cardresponse["0"].messageReachPunchLimit;
            if (cardresponse["0"].cardType == "gift") {
                if (cardresponse["0"].UsersDetails.remainingCreditPoints == "0") {
                    methodInstance.insufficient = "you have exhausted credits in this card";
                }
            }
            methodInstance.num = cardresponse["0"].UsersDetails.remainingCreditPoints;
            //methodInstance.remainingCreditPoints= cardresponse["0"].UsersDetails.remainingCreditPoints;
            methodInstance.remainingCreditPoints = Math.round((methodInstance.num) * 100) / 100;
            methodInstance.timesPunched = cardresponse["0"].timesPunched;
            methodInstance.merchantName = cardresponse["0"].MerchantDetails.merchantName;
            methodInstance.merchantlogo = cardresponse["0"].MerchantDetails.logo;
            if (cardresponse["0"].cardType == "punch") {
                if (cardresponse["0"].timesPunched == cardresponse["0"].punchCount) {
                    methodInstance.insufficient = cardresponse["0"].messageReachPunchLimit;
                }
            }
            if (cardresponse["0"].cardType == "coupon") {
                if (methodInstance.couponUsed == true) {
                    methodInstance.insufficient = "This Coupon Card has been used";
                }
            }
            if (cardresponse["0"].MerchantDetails.businessNumber != undefined) {
                methodInstance.businessNumber = cardresponse["0"].MerchantDetails.businessNumber;
            }
            else {
                methodInstance.businessNumber = "";
            }
            methodInstance.address1 = cardresponse["0"].MerchantDetails.address1;
            methodInstance.address2 = cardresponse["0"].MerchantDetails.address2;
            methodInstance.city = cardresponse["0"].MerchantDetails.city;
            methodInstance.state = cardresponse["0"].MerchantDetails.state;
            methodInstance.country = cardresponse["0"].MerchantDetails.country;
            methodInstance.pincode = cardresponse["0"].MerchantDetails.pincode;
            if (cardresponse["0"].MerchantDetails.facebook) {
                if (cardresponse["0"].MerchantDetails.facebook.charAt(0) == "w") {
                    methodInstance.facebook = "http://" + cardresponse["0"].MerchantDetails.facebook;
                }
                else {
                    methodInstance.facebook = cardresponse["0"].MerchantDetails.facebook;
                }
            }
            else {
                methodInstance.facebook = "";
            }
            if (cardresponse["0"].MerchantDetails.linkedin) {
                if (cardresponse["0"].MerchantDetails.linkedin.charAt(0) == "w") {
                    methodInstance.linkedin = "http://" + cardresponse["0"].MerchantDetails.linkedin;
                }
                else {
                    methodInstance.linkedin = cardresponse["0"].MerchantDetails.linkedin;
                }
            }
            else {
                methodInstance.linkedin = "";
            }
            if (cardresponse["0"].MerchantDetails.website) {
                if (cardresponse["0"].MerchantDetails.website.charAt(0) == "w") {
                    methodInstance.website = "http://" + cardresponse["0"].MerchantDetails.website;
                }
                else {
                    methodInstance.website = cardresponse["0"].MerchantDetails.website;
                }
            }
            else {
                methodInstance.website = "";
            }
            if (cardresponse["0"].MerchantDetails.twitter) {
                if (cardresponse["0"].MerchantDetails.twitter.charAt(0) == "w") {
                    methodInstance.twitter = "http://" + cardresponse["0"].MerchantDetails.twitter;
                }
                else {
                    methodInstance.twitter = cardresponse["0"].MerchantDetails.twitter;
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
            if (methodInstance.cardtype == "gift") {
                methodInstance.balancetext = "Remaining Credits";
            }
            else if (methodInstance.cardtype == "punch") {
                methodInstance.balancetext = "Total Punches";
            }
            else if (methodInstance.cardtype == "coupon") {
                methodInstance.balancetext = "Discount";
            }
            else if (methodInstance.cardtype == "store") {
                methodInstance.balancetext = "Balence";
            }
            if (methodInstance.cardtype == "gift") {
                if ((methodInstance.remainingCreditPoints == methodInstance.creditPoints) && (methodInstance.blockeddata == false)) {
                    methodInstance.showiconshare = true;
                }
                else {
                    methodInstance.showiconshare = false;
                }
            }
        }, function (error) {
            console.log("Error happened: " + error);
            methodInstance.userdetailsProv.HideLoading();
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    viewcardsdetails.prototype.ionViewWillLeave = function () {
        this.userdetailsProv.willenter = true;
    };
    viewcardsdetails.prototype.transfercard = function (mobile) {
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = {
            "phoneNumber": mobile,
            "uid": this.uid,
            "message": this.messageUser,
            "userId": this.userid,
        };
        var data = JSON.stringify(body);
        console.log(data);
        console.log(this.link + 'transfercard/' + this.selectedCardid);
        return this.http.post(this.link + 'transfercard/' + this.selectedCardid, body, options)
            .subscribe(function (response) {
            var coderesponse = JSON.parse(response["_body"]);
            methodInstance.userdetailsProv.HideLoading();
            if (coderesponse.success != false) {
                // methodInstance.userdetailsProv.ShowToast(coderesponse.message,3000);
                //methodInstance.showiconshare= false;
                methodInstance.navCtrl.setRoot(SharesuccessPage, { mobile: mobile });
            }
            else {
                methodInstance.userdetailsProv.ShowToast(coderesponse.message, 3000);
                methodInstance.showiconshare = true;
            }
        }, function (error) {
            methodInstance.userdetailsProv.HideLoading();
            console.log("Error happened: " + error);
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    viewcardsdetails.prototype.sharepopup = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Share Card with:',
            cssClass: 'sharepopUp',
            inputs: [
                {
                    name: 'mobilenumber',
                    placeholder: 'Phone number'
                },
            ],
            buttons: [
                {
                    text: 'Ok',
                    handler: function (data) {
                        if (data.mobilenumber != "" && data.mobilenumber.length == 10) {
                            if (_this.userdetailsProv.CheckConnection()) {
                                _this.userdetailsProv.ShowLoading();
                                _this.transfercard(data.mobilenumber);
                            } //internet
                        }
                        else {
                            if (data.mobilenumber == "") {
                                _this.userdetailsProv.ShowToast("Please enter phone number", 3000);
                            }
                            else {
                                _this.userdetailsProv.ShowToast("Please enter valid phone number", 3000);
                            }
                            return false;
                        }
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                        _this.showiconshare = true;
                    }
                }
            ]
        });
        alert.present();
    }; //showpopup
    viewcardsdetails.prototype.sharecard = function () {
        if (this.userdetailsProv.CheckConnection()) {
            this.showiconshare = false;
            this.sharepopup();
        } //internet
    };
    viewcardsdetails.prototype.facebookclick = function () {
        if (this.userdetailsProv.CheckConnection()) {
            window.open(this.facebook);
        } //internet
    };
    viewcardsdetails.prototype.linkedinclick = function () {
        if (this.userdetailsProv.CheckConnection()) {
            window.open(this.linkedin);
        } //internet
    };
    viewcardsdetails.prototype.websiteclick = function () {
        if (this.userdetailsProv.CheckConnection()) {
            window.open(this.website);
        } //internet
    };
    viewcardsdetails.prototype.twitterclick = function () {
        if (this.userdetailsProv.CheckConnection()) {
            window.open(this.twitter);
        } //internet
    };
    viewcardsdetails.prototype.dialclick = function (businessNumber) {
        this.callNumber.callNumber(businessNumber, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], viewcardsdetails.prototype, "navBar", void 0);
    viewcardsdetails = __decorate([
        IonicPage(),
        Component({
            selector: 'viewcardsdetails',
            templateUrl: 'viewcardsdetails.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ElementRef, Http, UserdetailsProvider, AlertController, CallNumber])
    ], viewcardsdetails);
    return viewcardsdetails;
}());
export { viewcardsdetails };
//# sourceMappingURL=viewcardsdetails.js.map