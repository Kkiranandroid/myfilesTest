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
import { viewcards } from '../viewcards/viewcards';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
var myprofile = /** @class */ (function () {
    function myprofile(navCtrl, navParams, userdetailsProv, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userdetailsProv = userdetailsProv;
        this.http = http;
        this.home = { mobilenumber: '', name: '', email: '', language: '', areaCode: '', mobpref: '' }; //initialising
        this.submitted = false;
        this.validEmail = false;
        this.coderesult = [];
        this.nocode = false;
        this.link = this.userdetailsProv.link;
        if (localStorage.getItem("SesUserData") != null) {
            this.userdata = JSON.parse(localStorage.getItem("SesUserData"));
            this.userid = this.userdata.userId;
        }
        if (this.userdetailsProv.CheckConnection()) {
            this.userdetailsProv.ShowLoading();
            this.fetchuserdata();
        }
    }
    myprofile.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad myprofile');
    };
    myprofile.prototype.viewcards = function (form) {
        if (this.userdetailsProv.CheckConnection()) {
            this.submitted = true; //to display message
            var email = this.home.email;
            if (email != "") {
                var emailregex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (!emailregex.test(email)) {
                    this.validEmail = true;
                }
                else {
                    this.validEmail = false;
                    this.submitted = true;
                }
            }
            else {
                this.validEmail = false;
            }
            if (form.valid && !this.validEmail) {
                // this.userdetailsProv.ShowLoading();
                this.updateuserdata();
            }
        } //if internet
    };
    myprofile.prototype.fetchuserdata = function () {
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = "";
        console.log(JSON.stringify(body));
        console.log(this.link + 'fetchuserdetails/' + this.userid);
        return this.http.post(this.link + 'fetchuserdetails/' + this.userid, body, options)
            .subscribe(function (response) {
            methodInstance.userdetailsProv.HideLoading();
            var fetchresponse = JSON.parse(response["_body"]);
            methodInstance.home.name = fetchresponse["0"].firstName;
            methodInstance.home.email = fetchresponse["0"].email;
            methodInstance.home.mobilenumber = fetchresponse["0"].phoneNumber;
            methodInstance.home.language = fetchresponse["0"].language;
            methodInstance.home.areaCode = fetchresponse["0"].areaCode;
            methodInstance.countrylistapi(methodInstance.home.areaCode);
        }, function (error) {
            console.log("Error happened: " + error);
            methodInstance.userdetailsProv.HideLoading();
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    myprofile.prototype.updateuserdata = function () {
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = { "name": this.home.name, "email": this.home.email, "phone": this.home.mobilenumber, "language": this.home.language, "country": this.home.mobpref };
        var data = JSON.stringify(body);
        console.log(JSON.stringify(body));
        console.log(this.link + 'updateuserdetails/' + this.userid);
        return this.http.post(this.link + 'updateuserdetails/' + this.userid, data, options)
            .subscribe(function (response) {
            var updateresponse = JSON.parse(response["_body"]);
            localStorage.setItem("languagedata", methodInstance.home.language);
            if (localStorage.getItem("languagedata") != null) {
                methodInstance.checklanguage = localStorage.getItem("languagedata");
            }
            if (updateresponse.success != false) {
                methodInstance.userdetailsProv.ShowToast("Profile updated successfully", 3000);
                localStorage.removeItem("merchantlanguage");
                methodInstance.navCtrl.setRoot(viewcards);
            }
            else {
                methodInstance.userdetailsProv.ShowToast(updateresponse.message, 3000);
            }
        }, function (error) {
            console.log("Error happened: " + error);
            methodInstance.userdetailsProv.HideLoading();
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    myprofile.prototype.countrylistapi = function (prefix) {
        var methodInstance = this;
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        var options = new RequestOptions({
            headers: headers
        });
        var body = "";
        console.log(this.link + 'countrylist');
        return this.http.post(this.link + 'countrylist', body, options)
            .subscribe(function (response) {
            var coderesponse = JSON.parse(response["_body"]);
            for (var i = 0; i < coderesponse.length; i++) {
                if (coderesponse[i].countryName == "India" || coderesponse[i].countryName == "United States") {
                    if (coderesponse[i].areaCode != "") {
                        methodInstance.coderesult.push(coderesponse[i]);
                    }
                    if (prefix == coderesponse[i].areaCode) {
                        // methodInstance.home.mobpref= coderesponse[i].areaCode;
                        methodInstance.home.mobpref = coderesponse[i].countryCode;
                        if (methodInstance.home.mobpref == "") {
                            methodInstance.nocode = true;
                        }
                    }
                }
            } //for
        }, function (error) {
            console.log("Error happened: " + error);
            methodInstance.userdetailsProv.SomethingWentWrongAlert();
        });
    };
    myprofile = __decorate([
        IonicPage(),
        Component({
            selector: 'myprofile',
            templateUrl: 'myprofile.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserdetailsProvider, Http])
    ], myprofile);
    return myprofile;
}());
export { myprofile };
//# sourceMappingURL=myprofile.js.map