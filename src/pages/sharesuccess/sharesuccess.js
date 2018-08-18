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
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Platform } from 'ionic-angular';
import { viewcards } from '../viewcards/viewcards';
import { SocialSharing } from '@ionic-native/social-sharing';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
var SharesuccessPage = /** @class */ (function () {
    function SharesuccessPage(navCtrl, navParams, socialSharing, alertCtrl, actionSheetCtrl, userdetailsProv, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socialSharing = socialSharing;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.userdetailsProv = userdetailsProv;
        this.platform = platform;
        this.mobile = navParams.get('mobile');
    }
    SharesuccessPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SharesuccessPage');
    };
    SharesuccessPage.prototype.backToList = function () {
        this.navCtrl.setRoot(viewcards);
    };
    //Share click event
    SharesuccessPage.prototype.btnShareClick = function () {
        var _this = this;
        //share(message, subject, file, url)
        //this.socialSharing.share(this.result.body, this.result.title, "", "");this.result.body+
        this.shareSubjectTitle = "";
        var AppStoreURL = 'http://apple.co/2ngbRPc';
        var PlayStoreURL = 'http://bit.ly/2ymhiNV';
        this.shareBody = 'Get app from\nIOS: http://apple.co/2ngbRPc\nAndroid: http://apple.co/2ngbRPc';
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Share with',
            cssClass: 'sharevia',
            buttons: [
                {
                    //text: 'Camera',
                    icon: 'md-mail',
                    handler: function () {
                        _this.shareViaEmail();
                    }
                }, {
                    icon: "logo-facebook",
                    handler: function () {
                        _this.shareViaFacebook();
                    }
                }, {
                    icon: "logo-twitter",
                    handler: function () {
                        _this.shareViaTwitter();
                    }
                },
                {
                    icon: "logo-whatsapp",
                    handler: function () {
                        _this.shareViaWhatsapp();
                        console.log('shareViaTwitter clicked');
                    }
                },
                {
                    icon: "md-chatboxes",
                    handler: function () {
                        _this.shareViaMessage();
                        console.log('shareViaMessage clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    SharesuccessPage.prototype.shareViaEmail = function () {
        var _this = this;
        this.shareSubjectTitle = "";
        var AppStoreURL = 'http://apple.co/2ngbRPc';
        var PlayStoreURL = 'http://bit.ly/2ymhiNV';
        this.shareBody = 'Get app from\nIOS: http://apple.co/2ngbRPc\nAndroid: http://bit.ly/2ymhiNV';
        this.socialSharing.canShareViaEmail().then(function () {
            // Sharing via email is possible
            _this.socialSharing.shareViaEmail(_this.shareBody, _this.shareSubjectTitle, []).then(function () {
                // Success!
            }).catch(function (e) {
                // Error!
                console.log(e);
            });
        }).catch(function (e) {
            // Sharing via email is not possible
            _this.userdetailsProv.ShowToast("Verify that the application is installed in the device", 3000);
        });
    };
    SharesuccessPage.prototype.shareViaFacebook = function () {
        var _this = this;
        this.shareSubjectTitle = "";
        var AppStoreURL = 'http://apple.co/2ngbRPc';
        var PlayStoreURL = 'http://bit.ly/2ymhiNV';
        this.shareBody = 'Get app from\nIOS: http://apple.co/2ngbRPc\nAndroid: http://bit.ly/2ymhiNV';
        //canShareVia(appName, message, subject, image, url)
        //android-'facebook' ios- 'com.apple.social.facebook'
        var appname = '';
        if (this.platform.is('ios')) {
            appname = "com.facebook.orca";
        }
        else {
            appname = "com.facebook.orca";
        }
        this.socialSharing.shareVia(appname, this.shareBody, this.shareSubjectTitle, '', '').then(function () {
            // Sharing via email is possible
        }).catch(function (e) {
            // Sharing via email is not possible
            _this.userdetailsProv.ShowToast("Verify that the Messenger application is installed in the device", 3000);
        });
    };
    SharesuccessPage.prototype.shareViaTwitter = function () {
        var _this = this;
        this.shareSubjectTitle = "";
        var AppStoreURL = 'http://apple.co/2ngbRPc';
        var PlayStoreURL = 'http://bit.ly/2ymhiNV';
        this.shareBody = 'Get app from\nIOS: http://apple.co/2ngbRPc\nAndroid: http://bit.ly/2ymhiNV';
        //canShareVia(appName, message, subject, image, url)
        //android-'facebook' ios- 'com.apple.social.facebook'
        var appname = '';
        if (this.platform.is('ios')) {
            appname = "com.apple.social.twitter";
        }
        else {
            appname = "twitter";
        }
        this.socialSharing.canShareVia(appname, this.shareBody, this.shareSubjectTitle, '', '').then(function () {
            //shareViaFacebook(message, image, url)
            _this.socialSharing.share(_this.shareBody, '', '', '')
                .then(function () {
                // Success!
            }).catch(function () {
                //error
            });
        }).catch(function (e) {
            // Sharing via email is not possible
            _this.userdetailsProv.ShowToast("Verify that Twitter application is installed in the device", 3000);
        });
    };
    SharesuccessPage.prototype.shareViaWhatsapp = function () {
        var _this = this;
        this.shareSubjectTitle = "";
        var AppStoreURL = 'http://apple.co/2ngbRPc';
        var PlayStoreURL = 'http://bit.ly/2ymhiNV';
        this.shareBody = 'Get app from\nIOS: http://apple.co/2ngbRPc\nAndroid: http://bit.ly/2ymhiNV';
        //whatsapp
        //android-'whatsapp', ios-'com.apple.social.whatsapp'
        //canShareVia(appName, message, subject, image, url)
        var appname = '';
        if (this.platform.is('ios')) {
            appname = "com.apple.social.whatsapp";
        }
        else {
            appname = "whatsapp";
        }
        this.socialSharing.canShareVia(appname, this.shareBody, this.shareSubjectTitle, '', '').then(function () {
            //shareViaFacebook(message, image, url)
            _this.socialSharing.shareViaWhatsApp(_this.shareBody, '', "").then(function () {
                // Success!
            }).catch(function (e) {
                // Error!
                console.log(e);
            });
        }).catch(function (e) {
            // Sharing via email is not possible
            _this.userdetailsProv.ShowToast("Verify that the application is installed in the device", 3000);
        });
    };
    SharesuccessPage.prototype.shareViaMessage = function () {
        this.shareSubjectTitle = "";
        var AppStoreURL = 'http://apple.co/2ngbRPc';
        var PlayStoreURL = 'http://bit.ly/2ymhiNV';
        this.shareBody = 'Get app from\nIOS: http://apple.co/2ngbRPc\nAndroid: http://bit.ly/2ymhiNV';
        //canShareVia
        //shareViaSMS(messge, phoneNumber)
        this.socialSharing.shareViaSMS(this.shareSubjectTitle + "\n" + this.shareBody, this.mobile).then(function () {
            // Success!
        }).catch(function (e) {
            // Error!
            console.log(e);
        });
    };
    SharesuccessPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-sharesuccess',
            templateUrl: 'sharesuccess.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, SocialSharing, AlertController, ActionSheetController, UserdetailsProvider, Platform])
    ], SharesuccessPage);
    return SharesuccessPage;
}());
export { SharesuccessPage };
//# sourceMappingURL=sharesuccess.js.map