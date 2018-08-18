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
import { IonicPage, NavController, NavParams, Events, MenuController, PopoverController, AlertController, Content } from 'ionic-angular';
import { viewcardsdetails } from '../viewcardsdetails/viewcardsdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { TranslateService } from '@ngx-translate/core';
import { notifications } from '../notifications/notifications';
import { loginconfirmation } from '../loginconfirmation/loginconfirmation';
import { Vibration } from '@ionic-native/vibration';
var viewcards = /** @class */ (function () {
    function viewcards(navCtrl, navParams, events, menu, userdetailsProv, http, translate, popoverCtrl, alertCtrl, vibration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.menu = menu;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.translate = translate;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.vibration = vibration;
        this.link = this.userdetailsProv.link;
        this.cards = [];
        this.pagenumber = 1;
        this.fcmid = this.userdetailsProv.fcmid;
        this.loaded = false;
        this.filter = [];
        this.empty = false;
        this.checkdata = false;
        this.cardidselected = [];
        this.showiconarchive = false;
        this.showiconshare = false;
        this.selectcount = 0;
        this.numberdisplay = false;
        this.checkdatamultiple = 0;
        this.arrayone = [];
        this.status = this.userdetailsProv.status;
        this.fromfcm = navParams.get('fromfcm');
        if (this.fromfcm != undefined) {
            if (this.fromfcm.cardId != "" && this.fromfcm.type == "") {
                this.navCtrl.push(viewcardsdetails, { card: this.fromfcm.cardId });
            }
            else if (this.fromfcm.cardId != "" && this.fromfcm.type != "logout") {
                this.navCtrl.push(viewcardsdetails, { card: this.fromfcm.cardId });
            }
            else if (this.fromfcm.type == "logout") {
                localStorage.removeItem("SesUserData");
                this.navCtrl.setRoot(loginconfirmation);
            }
            else {
                this.navCtrl.setRoot(notifications);
            }
        }
        else {
            this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            this.empty = false;
            this.loaded = false;
            this.menu.swipeEnable(true);
            if (localStorage.getItem("merchantlanguage") != null) {
                this.checklanguage = localStorage.getItem("merchantlanguage");
                if (this.checklanguage == "en" || this.checklanguage == "english") {
                    this.translate.use('en');
                }
                else if (this.checklanguage == "mexican" || this.checklanguage == "es") {
                    this.translate.use('mexican');
                }
            }
            else if (localStorage.getItem("languagedata") != null) {
                this.checklanguage = localStorage.getItem("languagedata");
                if (this.checklanguage == "en" || this.checklanguage == "english") {
                    this.translate.use('en');
                }
                else if (this.checklanguage == "mexican" || this.checklanguage == "es") {
                    this.translate.use('mexican');
                }
            }
            // else{
            // this.translate.use('en');
            // }
            if (localStorage.getItem("SesUserData") != null) {
                this.menu.enable(true, 'menuuser');
                this.menu.enable(false, 'menumerchant');
            }
            if (localStorage.getItem("SesUserData") != null) {
                this.userdata = JSON.parse(localStorage.getItem("SesUserData"));
                this.userid = this.userdata.userId;
            }
            if (this.userdetailsProv.CheckConnection()) {
                this.userdetailsProv.ShowLoading();
                this.viewcardsapi("");
            } //internet
        } //else
    }
    viewcards.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad viewcards');
    };
    /*
      viewcardsdetails(event, card){
      
       if(this.userdetailsProv.CheckConnection()){
        this.navCtrl.push(viewcardsdetails, {
          card: card.cardId, imageconcat: this.imageconcat
        });
          }//internet
      }
  */
    viewcards.prototype.viewcardsapi = function (infiniteScroll) {
        debugger;
        if (localStorage.getItem("filterdata") != null) {
            var filterdata = localStorage.getItem("filterdata");
            if (filterdata == "archive") {
                this.filter = ['punch', 'gift', 'store', 'coupon'];
                this.status = true;
            }
            else {
                this.filter = JSON.parse('[' + JSON.stringify(localStorage.getItem("filterdata")) + ']');
                this.status = false;
            }
        }
        else if (this.filter == undefined) {
            this.filter = ['punch', 'gift', 'store', 'coupon'];
            this.status = false;
        }
        else {
            this.filter = ['punch', 'gift', 'store', 'coupon'];
            this.status = false;
        }
        if (localStorage.getItem("sortdata") != null) {
            this.sort = parseInt(localStorage.getItem("sortdata"));
        }
        else if (this.sort == undefined) {
            this.sort = parseInt("1");
        }
        else {
            this.sort = parseInt("1");
        }
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = { "page": this.pagenumber, "itemsperpage": 3, "sortkey": this.sort, "filter": this.filter, "timeZone": this.timeZone, "fcmid": this.fcmid, "status": this.status };
        var data = JSON.stringify(body);
        console.log(data);
        console.log(this.link + 'usercarddetails/' + this.userid);
        return this.http.post(this.link + 'usercarddetails/' + this.userid, body, options)
            .subscribe(function (response) {
            debugger;
            methodInstance.userdetailsProv.HideLoading();
            if (infiniteScroll != "") {
                infiniteScroll.complete();
            }
            if (methodInstance.infscrollEvent != undefined) {
                methodInstance.infscrollEvent.enable(true);
            }
            try {
                var viewcardresponse = JSON.parse(response["_body"]);
                methodInstance.nodatamessage = methodInstance.userdata.name;
                /*
                   if(viewcardresponse.success== false && viewcardresponse.cards== undefined){
                           if(methodInstance.filter== "punch,gift,coupon"){
                           methodInstance.empty=true;
                   
                       if(viewcardresponse.success== false && viewcardresponse.message== "No Cards Found"){
                       methodInstance.empty=true;
                       methodInstance.loaded=false;
                       }
                
                   }else{
                   methodInstance.loaded=true;
                   }
                   }
                  */
                if (viewcardresponse.success == false && viewcardresponse.message == "No Cards Found" && viewcardresponse.cards == undefined) {
                    methodInstance.cards = [];
                    if (methodInstance.filter.length == "4" && methodInstance.status == false) {
                        methodInstance.empty = true;
                    }
                    else {
                        methodInstance.empty = false;
                    }
                }
                else {
                    methodInstance.imageconcat = viewcardresponse.sitepath;
                    if (viewcardresponse.cards.length == 0) {
                        methodInstance.loaded = true;
                        methodInstance.nodatamessage = methodInstance.userdata.name;
                        if (methodInstance.cards == undefined) {
                            methodInstance.cards = "";
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
                            for (var i = 0; i < viewcardresponse.cards.length; i++) {
                                if (viewcardresponse.cards[i].card_details.cardType == "gift") {
                                    viewcardresponse.cards[i].balancetext = "Balance";
                                    viewcardresponse.cards[i].remainingCreditPoints = Math.round((viewcardresponse.cards[i].remainingCreditPoints) * 100) / 100;
                                    viewcardresponse.cards[i].selected = "0";
                                }
                                else if (viewcardresponse.cards[i].card_details.cardType == "punch") {
                                    viewcardresponse.cards[i].balancetext = "Punches";
                                    viewcardresponse.cards[i].selected = "0";
                                }
                                else if (viewcardresponse.cards[i].card_details.cardType == "coupon") {
                                    viewcardresponse.cards[i].balancetext = "Discount";
                                    viewcardresponse.cards[i].selected = "0";
                                }
                                else if (viewcardresponse.cards[i].card_details.cardType == "store") {
                                    viewcardresponse.cards[i].balancetext = "Balance";
                                    viewcardresponse.cards[i].selected = "0";
                                }
                                methodInstance.cards = viewcardresponse.cards;
                            }
                        }
                        else {
                            for (var i = 0; i < viewcardresponse.cards.length; i++) {
                                if (viewcardresponse.cards[i].card_details.cardType == "gift") {
                                    viewcardresponse.cards[i].balancetext = "Balance";
                                    viewcardresponse.cards[i].remainingCreditPoints = Math.round((viewcardresponse.cards[i].remainingCreditPoints) * 100) / 100;
                                    viewcardresponse.cards[i].selected = "0";
                                }
                                else if (viewcardresponse.cards[i].card_details.cardType == "punch") {
                                    viewcardresponse.cards[i].balancetext = "Punches";
                                    viewcardresponse.cards[i].selected = "0";
                                }
                                else if (viewcardresponse.cards[i].card_details.cardType == "coupon") {
                                    viewcardresponse.cards[i].balancetext = "Discount";
                                    viewcardresponse.cards[i].selected = "0";
                                }
                                else if (viewcardresponse.cards[i].card_details.cardType == "store") {
                                    viewcardresponse.cards[i].balancetext = "Balance";
                                    viewcardresponse.cards[i].selected = "0";
                                }
                                methodInstance.cards.push(viewcardresponse.cards[i]);
                            }
                        }
                    }
                } //else
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
    viewcards.prototype.doInfinite = function (infiniteScroll) {
        debugger;
        if (this.userdetailsProv.CheckConnection()) {
            if (this.cards != "") {
                this.infscrollEvent = infiniteScroll;
                this.pagenumber = this.pagenumber + 1;
                this.viewcardsapi(infiniteScroll);
            }
            else {
                infiniteScroll.enable(false);
            }
        }
    };
    viewcards.prototype.filterShow = function () {
        var _this = this;
        debugger;
        var alert = this.alertCtrl.create({ title: 'Filter',
            cssClass: 'checkboxForAll', });
        if (this.filter == "gift") {
            alert.addInput({
                type: 'radio',
                label: 'Gift Cards',
                value: 'gift',
                checked: true
            });
        }
        else {
            alert.addInput({
                type: 'radio',
                label: 'Gift Cards',
                value: 'gift',
                checked: false
            });
        }
        if (this.filter == "punch") {
            alert.addInput({
                type: 'radio',
                label: 'Punch Cards',
                value: 'punch',
                checked: true
            });
        }
        else {
            alert.addInput({
                type: 'radio',
                label: 'Punch Cards',
                value: 'punch',
                checked: false
            });
        }
        if (this.filter == "store") {
            alert.addInput({
                type: 'radio',
                label: 'Store Credits',
                value: 'store',
                checked: true
            });
        }
        else {
            alert.addInput({
                type: 'radio',
                label: 'Store Credits',
                value: 'store',
                checked: false
            });
        }
        if (this.filter == "coupon") {
            alert.addInput({
                type: 'radio',
                label: 'Coupon Cards',
                value: 'coupon',
                checked: true
            });
        }
        else {
            alert.addInput({
                type: 'radio',
                label: 'Coupon Cards',
                value: 'coupon',
                checked: false
            });
        }
        if (this.filter == "archive" || this.status == true) {
            alert.addInput({
                type: 'radio',
                label: 'Archived Cards',
                value: 'archive',
                checked: true
            });
        }
        else {
            alert.addInput({
                type: 'radio',
                label: 'Archived Cards',
                value: 'archive',
                checked: false
            });
        }
        alert.addButton({
            text: 'Clear',
            handler: function (data) {
                if (_this.userdetailsProv.CheckConnection()) {
                    _this.userdetailsProv.ShowLoading();
                    localStorage.removeItem("filterdata");
                    _this.cards = "";
                    _this.pagenumber = 1;
                    _this.viewcardsapi("");
                    _this.content.scrollToTop();
                }
            }
        });
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                debugger;
                if (_this.userdetailsProv.CheckConnection()) {
                    _this.userdetailsProv.ShowLoading();
                    localStorage.removeItem("filterdata");
                    _this.filter = data;
                    if (_this.filter == undefined) {
                        localStorage.removeItem("filterdata");
                    }
                    else {
                        localStorage.setItem("filterdata", _this.filter);
                    }
                    _this.cards = "";
                    var filterdata = localStorage.getItem("filterdata");
                    _this.pagenumber = 1;
                    _this.viewcardsapi("");
                    _this.content.scrollToTop();
                }
            }
        });
        alert.present();
    };
    //Sorting
    viewcards.prototype.sortingShow = function () {
        var _this = this;
        var alert = this.alertCtrl.create({ title: 'Sorting',
            cssClass: 'sortingAlert checkboxForAll' });
        if (this.sort == "1") {
            alert.addInput({
                type: 'radio',
                label: 'Latest First',
                value: '1',
                checked: true
            });
        }
        else {
            alert.addInput({
                type: 'radio',
                label: 'Latest First',
                value: '1',
                checked: false
            });
        }
        if (this.sort == "2") {
            alert.addInput({
                type: 'radio',
                label: 'Oldest First',
                value: '2',
                checked: true
            });
        }
        else {
            alert.addInput({
                type: 'radio',
                label: 'Oldest First',
                value: '2',
                checked: false
            });
        }
        if (this.filter == "punch" || this.filter == "coupon") {
            if (this.sort == "3") {
                alert.addInput({
                    type: 'radio',
                    label: 'Closest to Expiry',
                    value: '3',
                    checked: true
                });
            }
            else {
                alert.addInput({
                    type: 'radio',
                    label: 'Closest to Expiry',
                    value: '3',
                    checked: false
                });
            }
            if (this.sort == "4") {
                alert.addInput({
                    type: 'radio',
                    label: 'Farthest to Expiry',
                    value: '4',
                    checked: true
                });
            }
            else {
                alert.addInput({
                    type: 'radio',
                    label: 'Farthest to Expiry',
                    value: '4',
                    checked: false
                });
            }
        } //only for punch and coupen expiry
        //sort by remainingcreditpoints in descending order
        if (this.sort == "6" || this.sort == "8" || this.sort == "10") {
            if (this.filter == "gift") {
                alert.addInput({
                    type: 'radio',
                    label: 'Maximum Credit/Discount',
                    value: '6',
                    checked: true
                });
            }
            else if (this.filter == "punch") {
                alert.addInput({
                    type: 'radio',
                    label: 'Maximum Credit/Discount',
                    value: '10',
                    checked: true
                });
            }
            else if (this.filter == "store") {
                alert.addInput({
                    type: 'radio',
                    label: 'Maximum Credit/Discount',
                    // value: '10',
                    value: '6',
                    checked: true
                });
            }
            else if (this.filter == "coupon") {
                alert.addInput({
                    type: 'radio',
                    label: 'Maximum Credit/Discount',
                    value: '8',
                    checked: true
                });
            }
        }
        else {
            if (this.filter == "gift") {
                alert.addInput({
                    type: 'radio',
                    label: 'Maximum Credit/Discount',
                    value: '6',
                    checked: false
                });
            }
            else if (this.filter == "punch") {
                alert.addInput({
                    type: 'radio',
                    label: 'Maximum Credit/Discount',
                    value: '10',
                    checked: false
                });
            }
            else if (this.filter == "store") {
                alert.addInput({
                    type: 'radio',
                    label: 'Maximum Credit/Discount',
                    // value: '10',
                    value: '6',
                    checked: false
                });
            }
            else if (this.filter == "coupon") {
                alert.addInput({
                    type: 'radio',
                    label: 'Maximum Credit/Discount',
                    value: '8',
                    checked: false
                });
            }
        }
        //sort by remainingcreditpoints in descending order
        if (this.sort == "5" || this.sort == "7" || this.sort == "9") {
            if (this.filter == "gift") {
                alert.addInput({
                    type: 'radio',
                    label: 'Minimum Credit/Discount',
                    value: '5',
                    checked: true
                });
            }
            else if (this.filter == "punch") {
                alert.addInput({
                    type: 'radio',
                    label: 'Minimum Credit/Discount',
                    value: '9',
                    checked: true
                });
            }
            else if (this.filter == "store") {
                alert.addInput({
                    type: 'radio',
                    label: 'Minimum Credit/Discount',
                    // value: '9',
                    value: '5',
                    checked: true
                });
            }
            else if (this.filter == "coupon") {
                alert.addInput({
                    type: 'radio',
                    label: 'Minimum Credit/Discount',
                    value: '7',
                    checked: true
                });
            }
        }
        else {
            if (this.filter == "gift") {
                alert.addInput({
                    type: 'radio',
                    label: 'Minimum Credit/Discount',
                    value: '5',
                    checked: false
                });
            }
            else if (this.filter == "punch") {
                alert.addInput({
                    type: 'radio',
                    label: 'Minimum Credit/Discount',
                    value: '9',
                    checked: false
                });
            }
            else if (this.filter == "store") {
                alert.addInput({
                    type: 'radio',
                    label: 'Minimum Credit/Discount',
                    // value: '9',
                    value: '5',
                    checked: false
                });
            }
            else if (this.filter == "coupon") {
                alert.addInput({
                    type: 'radio',
                    label: 'Minimum Credit/Discount',
                    value: '7',
                    checked: false
                });
            }
        }
        alert.addButton({
            text: 'Clear',
            handler: function (data) {
                if (_this.userdetailsProv.CheckConnection()) {
                    _this.userdetailsProv.ShowLoading();
                    localStorage.removeItem("sortdata");
                    _this.pagenumber = 1;
                    _this.viewcardsapi("");
                    _this.content.scrollToTop();
                }
            }
        });
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                if (_this.userdetailsProv.CheckConnection()) {
                    _this.userdetailsProv.ShowLoading();
                    localStorage.removeItem("sortdata");
                    _this.sort = data;
                    if (_this.sort == undefined) {
                        localStorage.removeItem("sortdata");
                    }
                    else {
                        localStorage.setItem("sortdata", _this.sort);
                    }
                    var sortdata = localStorage.getItem("sortdata");
                    _this.pagenumber = 1;
                    _this.viewcardsapi("");
                    _this.content.scrollToTop();
                }
            }
        });
        alert.present();
    };
    viewcards.prototype.doRefresh = function (refresher) {
        var _this = this;
        if (this.userdetailsProv.CheckConnection()) {
            this.checkdatamultiple = 0;
            this.arrayone = [];
            this.showiconarchive = false;
            this.showiconarchive = false;
            setTimeout(function () {
                _this.pagenumber = 1;
                _this.viewcardsapi("");
                _this.empty = false;
                refresher.complete();
            }, 100);
        } //internet
    };
    viewcards.prototype.ionViewWillEnter = function () {
        this.empty = false;
        debugger;
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
                this.viewcardsapi("");
            } //internet
            this.userdetailsProv.willenter = false;
        }
    };
    viewcards.prototype.archivecard = function () {
        var _this = this;
        if (this.userdetailsProv.CheckConnection()) {
            var alert_1 = this.alertCtrl.create({
                title: 'Do you want to Archive the selected card(s)?',
                cssClass: 'redeemMsg',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function (data) {
                            _this.showiconarchive = true;
                        }
                    },
                    {
                        text: 'ok',
                        handler: function () {
                            _this.userdetailsProv.ShowLoading();
                            _this.showiconarchive = false;
                            var data = _this.arrayone.length;
                            for (var j = 0; j < _this.arrayone.length; j++) {
                                _this.newmethod(j);
                            } //for
                            _this.arrayone.length = 0;
                            if (_this.arrayone.length == 0) {
                                _this.viewcardsapi("");
                            }
                        } //ok handel
                    }
                ]
            });
            alert_1.present();
        } // internet
    };
    viewcards.prototype.newmethod = function (j) {
        debugger;
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = { "block": this.arrayone[j].isBlocked };
        console.log(this.link + 'blockcard/' + this.arrayone[j]._id);
        return this.http.post(this.link + 'blockcard/' + this.arrayone[j]._id, body, options)
            .subscribe(function (response) {
            var coderesponse = JSON.parse(response["_body"]);
            debugger;
            methodInstance.pagenumber = 1;
            methodInstance.viewcardsapi("");
            //  methodInstance.content.scrollToTop();
        }, function (error) {
            methodInstance.userdetailsProv.HideLoading();
            console.log("Error happened: " + error);
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    viewcards.prototype.multiplecards = function (card, i) {
        if (this.checkdatamultiple == 0) {
            this.showiconarchive = true;
            var myHeader = document.getElementById('homeSlide' + i);
            myHeader.classList.add('hideSlide');
            myHeader.classList.add('hideSlide2');
            this.arrayone.push(card[i]);
            card[i].isBlocked = true;
            this.checkdatamultiple = 1;
            if (this.status == true && this.filter.length == "3") {
                this.showiconarchive = false;
            }
        }
    };
    viewcards.prototype.clickcheck = function (card, i) {
        var myHeader = document.getElementById('homeSlide' + i);
        if (this.checkdatamultiple == 1 && myHeader.classList.contains('hideSlide') && myHeader.classList.contains('hideSlide2')) {
            this.checkdatamultiple = 2;
        }
        else if (this.checkdatamultiple == 2 && myHeader.classList.contains('hideSlide') && myHeader.classList.contains('hideSlide2')) {
            myHeader.classList.remove('hideSlide');
            myHeader.classList.remove('hideSlide2');
            this.arrayone.pop(card[i]);
            card[i].isBlocked = false;
            if (this.arrayone.length == 0) {
                this.checkdatamultiple = 0;
                this.showiconarchive = false;
            }
        }
        else {
            if (myHeader.classList.contains('hideSlide')) {
                myHeader.classList.remove('hideSlide');
                this.arrayone.pop(card[i]);
                card[i].isBlocked = false;
                if (this.arrayone.length == 0) {
                    this.checkdatamultiple = 0;
                    this.showiconarchive = false;
                }
            }
            else if (this.checkdatamultiple == 1 || this.checkdatamultiple == 2) {
                if (this.checkdatamultiple == 1) {
                    this.checkdatamultiple = 2;
                }
                myHeader.classList.add('hideSlide');
                this.arrayone.push(card[i]);
                card[i].isBlocked = true;
            }
            else {
                if (this.userdetailsProv.CheckConnection()) {
                    this.navCtrl.push(viewcardsdetails, {
                        card: card[i].cardId, imageconcat: this.imageconcat
                    });
                } //internet
            }
        }
        if (this.arrayone.length == 0) {
            this.showiconarchive = false;
        }
        else {
            this.showiconarchive = true;
            if (this.status == true || this.filter == ['punch', 'gift', 'store', 'coupon']) {
                this.showiconarchive = false;
            }
        }
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], viewcards.prototype, "content", void 0);
    viewcards = __decorate([
        IonicPage(),
        Component({
            selector: 'viewcards',
            templateUrl: 'viewcards.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Events,
            MenuController,
            UserdetailsProvider,
            Http,
            TranslateService,
            PopoverController,
            AlertController,
            Vibration])
    ], viewcards);
    return viewcards;
}()); //viewcards class
export { viewcards };
//# sourceMappingURL=viewcards.js.map