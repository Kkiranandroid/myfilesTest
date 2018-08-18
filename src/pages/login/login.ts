import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { redeem } from '../redeem/redeem';
import { NgForm } from '@angular/forms';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { dashboard } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'login',
  templateUrl: 'login.html',
})
export class login {
link = this.userdetailsProv.link;
home={ email: '', password:''};
submitted= false; 
validEmail=false;
mid: any;
language: any;
logindata: any;
ml: any;
time: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userdetailsProv: UserdetailsProvider, public http: Http, public menu: MenuController) {
  
  this.menu.swipeEnable(false);
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad login');
  }
  
redeem(form: NgForm){

  this.submitted = true; //to display message
  var email=this.home.email;
         var emailregex=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                    if(!emailregex.test(email))
                    {
                    this.validEmail=true;
                    }
                    else
                    {
                    this.validEmail=false;
                    this.submitted = true;
                    }
	
	 if(form.valid && !this.validEmail){
      if (this.userdetailsProv.CheckConnection()) {
	 this.userdetailsProv.ShowLoading();
	 this.authenticateapi();
	  } //internet
	  }
	
  }
  
  authenticateapi(){
   let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
        
        let body = "action=authenticate&username=" + this.home.email + "&password=" + this.home.password
        console.log(JSON.stringify(body));
			console.log(this.link+'api/authenticate/merchant');
            return this.http.post(this.link+'api/authenticate/merchant', body, options)
			 .subscribe(function (response) {
			 
			
                let data = JSON.parse(response["_body"]);
              
				methodInstance.userdetailsProv.HideLoading();
				if(data.success!= false){
				if(data.merchantid){
			
				localStorage.setItem("SesmerchantData", JSON.stringify(response["_body"]));
				
				 if(localStorage.getItem("SesmerchantData")!=null){
		methodInstance.logindata=JSON.parse(JSON.parse(localStorage.getItem("SesmerchantData")));
		methodInstance.mid= methodInstance.logindata.merchantid;
		methodInstance.language= methodInstance.logindata.language;
		
		localStorage.setItem("merchantlanguage", methodInstance.language);
		methodInstance.ml=localStorage.getItem("merchantlanguage");
		}
				 methodInstance.navCtrl.setRoot(dashboard);
				}
				}else{
				methodInstance.userdetailsProv.ShowToast(data.message,3000)
				}
                }, function (error) {
				methodInstance.userdetailsProv.HideLoading();
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
  }
  
  close(){
  this.navCtrl.pop();
  }
  
}
