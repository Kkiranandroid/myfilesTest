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
import { loginconfirmation } from '../loginconfirmation/loginconfirmation';
import { viewcards } from '../viewcards/viewcards';
var TutorialPage = /** @class */ (function () {
    function TutorialPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    TutorialPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TutorialPage');
    };
    TutorialPage.prototype.skip = function () {
        if (localStorage.getItem("SesUserData") != null) {
            this.navCtrl.setRoot(viewcards);
        }
        else {
            this.navCtrl.push(loginconfirmation);
        }
    };
    TutorialPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-tutorial',
            templateUrl: 'tutorial.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], TutorialPage);
    return TutorialPage;
}());
export { TutorialPage };
//# sourceMappingURL=tutorial.js.map