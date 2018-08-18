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
import { Nav, Platform, Events, MenuController, IonicApp, AlertController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { loginconfirmation } from '../pages/loginconfirmation/loginconfirmation';
import { redeem } from '../pages/redeem/redeem';
import { viewcards } from '../pages/viewcards/viewcards';
import { usage } from '../pages/usage/usage';
import { dashboard } from '../pages/dashboard/dashboard';
import { notifications } from '../pages/notifications/notifications';
import { myprofile } from '../pages/myprofile/myprofile';
import { TranslateService } from '@ngx-translate/core';
import { FCM } from '@ionic-native/fcm';
import { UserdetailsProvider } from '../providers/userdetails/userdetails';
import { viewcardsdetails } from '../pages/viewcardsdetails/viewcardsdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Diagnostic } from '@ionic-native/diagnostic';
import { FilterPage } from '../pages/filter/filter';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { sendcloopcoins } from '../pages/sendcloopcoins/sendcloopcoins';
import { coopCardCoins } from '../pages/coopCardCoins/coopCardCoins';
import { coindetails } from '../pages/coindetails/coindetails';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, events, menu, translate, fcm, ionicApp, userdetailsProv, alertCtrl, http, diagnostic, app) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.events = events;
        this.menu = menu;
        this.translate = translate;
        this.fcm = fcm;
        this.ionicApp = ionicApp;
        this.userdetailsProv = userdetailsProv;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.diagnostic = diagnostic;
        this.app = app;
        this.backPressed = false;
        this.link = this.userdetailsProv.link;
        this.initializeApp();
        this.menu.enable(false, 'menuuser');
        this.menu.enable(false, 'menumerchant');
        if (localStorage.getItem("SesUserData") != null) {
            this.menu.enable(true, 'menuuser');
            this.menu.enable(false, 'menumerchant');
        }
        else if (localStorage.getItem("SesmerchantData") != null) {
            this.menu.enable(false, 'menuuser');
            this.menu.enable(true, 'menumerchant');
        }
        //Press again to exit
        this.platform.registerBackButtonAction(function () {
            if (_this.nav.canGoBack()) {
                // This will get instance of all models, popups, loders          
                //            let activePortal = ionicApp._loadingPortal.getActive() ||
                //               ionicApp._modalPortal.getActive() ||
                //               ionicApp._toastPortal.getActive() ||
                //               ionicApp._overlayPortal.getActive();
                var activePortal = ionicApp._modalPortal.getActive() ||
                    ionicApp._toastPortal.getActive() ||
                    ionicApp._overlayPortal.getActive();
                if (activePortal) {
                    activePortal.dismiss();
                    console.log("handled with portal");
                    return;
                }
                _this.nav.pop();
                return;
            }
            else {
                if (!_this.backPressed) {
                    _this.backPressed = true;
                    _this.userdetailsProv.ShowToast("Press again to exit", 1000);
                    setTimeout(function () { return _this.backPressed = false; }, 2000);
                    return;
                }
                localStorage.removeItem("guestuserdidlogin");
                _this.platform.exitApp();
            }
        });
        //Press again to exit end
    } //constructor
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            if (localStorage.getItem("merchantlanguage") != null) {
                _this.checklanguage = localStorage.getItem("merchantlanguage");
                localStorage.removeItem("languagedata");
                if (_this.checklanguage == "en" || _this.checklanguage == "english") {
                    _this.translate.use('en');
                }
                else if (_this.checklanguage == "mexican" || _this.checklanguage == "es") {
                    _this.translate.use('mexican');
                }
            }
            else if (localStorage.getItem("languagedata") != null) {
                _this.checklanguage = localStorage.getItem("languagedata");
                localStorage.removeItem("merchantlanguage");
                if (_this.checklanguage == "en" || _this.checklanguage == "english") {
                    _this.translate.use('en');
                }
                else if (_this.checklanguage == "mexican" || _this.checklanguage == "es") {
                    _this.translate.use('mexican');
                }
            }
            if (localStorage.getItem("SesUserData") != null) {
                if (JSON.parse(localStorage.getItem("SesUserData")).userId) {
                    _this.rootPage = viewcards;
                }
            }
            else if (localStorage.getItem("SesmerchantData") != null) {
                if (JSON.parse(JSON.parse(localStorage.getItem("SesmerchantData"))).merchantid) {
                    _this.rootPage = dashboard;
                }
            }
            else {
                _this.rootPage = TutorialPage;
            }
            //uncoment below
            if (_this.platform.is('cordova')) {
                _this.fcm.onNotification().subscribe(function (data) {
                    debugger;
                    console.log("data.wasTapped=" + data.wasTapped);
                    if (data.wasTapped) {
                        _this.userdetailsProv.HideLoading();
                        console.log("Received in background");
                        if (data.type == "coins") {
                            _this.nav.setRoot(coopCardCoins, { fromfcm: data });
                        }
                        else {
                            _this.nav.setRoot(viewcards, { fromfcm: data });
                        }
                    }
                    else {
                        console.log("Received in foreground");
                        var alt = _this.alertCtrl.create({
                            title: data.title,
                            subTitle: data.body,
                            buttons: [
                                {
                                    text: 'Ok',
                                    handler: function () {
                                        if (data.cardId != "" && data.type == "") {
                                            _this.nav.push(viewcardsdetails, { card: data.cardId });
                                        }
                                        else if (data.type == "coins") {
                                            _this.nav.push(coindetails, { card: data.cardId }).then(function () {
                                                var startIndex = _this.nav.getActive().index - 1;
                                                if (_this.nav.getActive().index != 1) {
                                                    _this.nav.remove(startIndex, 1);
                                                }
                                            });
                                        }
                                        else if (data.cardId != "" && data.type != "logout") {
                                            _this.nav.push(viewcardsdetails, { card: data.cardId })
                                                .then(function () {
                                                var startIndex = _this.nav.getActive().index - 1;
                                                if (_this.nav.getActive().index != 1) {
                                                    _this.nav.remove(startIndex, 1);
                                                }
                                            });
                                        }
                                        else if (data.type == "logout") {
                                            localStorage.removeItem("SesUserData");
                                            _this.nav.setRoot(loginconfirmation);
                                        }
                                        else {
                                            _this.nav.setRoot(notifications);
                                        }
                                    }
                                }
                            ]
                        });
                        alt.present();
                    }
                    ; //else
                });
            }
            //uncoment above
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.viewcards = function () {
        this.nav.setRoot(viewcards);
    };
    MyApp.prototype.seeusage = function () {
        this.nav.setRoot(usage);
    };
    MyApp.prototype.openMobileDashboard = function () {
        this.nav.setRoot(dashboard);
    };
    MyApp.prototype.myprofile = function () {
        this.nav.setRoot(myprofile);
    };
    MyApp.prototype.notification = function () {
        this.nav.setRoot(notifications);
    };
    MyApp.prototype.redeem = function () {
        this.nav.setRoot(redeem);
    };
    MyApp.prototype.sendcloopcoins = function () {
        this.nav.setRoot(sendcloopcoins);
    };
    MyApp.prototype.coopCardCoins = function () {
        this.nav.setRoot(coopCardCoins);
    };
    MyApp.prototype.dashboard = function () {
        window.open('https://cloopcard.com/cloop_v1/', '_system', 'location=yes');
    };
    MyApp.prototype.logout = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Do you want to logout',
            cssClass: 'redeemMsg',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'ok',
                    handler: function () {
                        if (_this.userdetailsProv.CheckConnection()) {
                            localStorage.removeItem("SesmerchantData");
                            localStorage.removeItem("filterdata");
                            _this.nav.setRoot(loginconfirmation);
                        }
                    } //ok handel
                }
            ]
        });
        alert.present();
    };
    MyApp.prototype.logoutUser = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Do you want to logout',
            cssClass: 'redeemMsg',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'ok',
                    handler: function () {
                        _this.userlogoutapi();
                    } //ok handel
                }
            ]
        });
        alert.present();
    };
    MyApp.prototype.settings = function () {
        this.nav.setRoot(FilterPage);
    };
    MyApp.prototype.tutorial = function () {
        this.nav.setRoot(TutorialPage);
    };
    MyApp.prototype.userlogoutapi = function () {
        var userid = JSON.parse(localStorage.getItem("SesUserData")).userId;
        if (this.userdetailsProv.CheckConnection()) {
            this.userdetailsProv.ShowLoading();
            var methodInstance_1 = this;
            var headers = new Headers({
                'Content-Type': 'application/json'
            });
            var options = new RequestOptions({
                headers: headers
            });
            var body = "";
            console.log(this.link + 'userlogout/' + userid);
            return this.http.post(this.link + 'userlogout/' + userid, body, options)
                .subscribe(function (response) {
                methodInstance_1.userdetailsProv.HideLoading();
                localStorage.removeItem("SesUserData");
                localStorage.removeItem("filterdata");
                methodInstance_1.nav.setRoot(loginconfirmation);
            }, function (error) {
                methodInstance_1.userdetailsProv.HideLoading();
                console.log("Error happened: " + error);
                methodInstance_1.userdetailsProv.SomethingWentWrongAlert();
            });
        } //internet
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, Events, MenuController, TranslateService, FCM, IonicApp, UserdetailsProvider, AlertController, Http, Diagnostic, App])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map