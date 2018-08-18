import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { viewcards } from '../viewcards/viewcards'
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { NgForm } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
@IonicPage()
@Component({
  selector: 'myprofile',
  templateUrl: 'myprofile.html',
})
export class myprofile {
home = { mobilenumber: '', name: '',email:'', language: '' , areaCode:'', mobpref:''}; //initialising
submitted = false;
 validEmail=false;
 userid: any;
userdata: any;
checklanguage: any;
selectlanguage: any;
areaCode: any;
coderesult: any=[];
nocode= false;
link = this.userdetailsProv.link;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userdetailsProv: UserdetailsProvider, public http: Http) {
 
  if(localStorage.getItem("SesUserData")!=null){
			this.userdata=JSON.parse(localStorage.getItem("SesUserData"));
			this.userid= this.userdata.userId;
			
			}
		if (this.userdetailsProv.CheckConnection()) {
		this.userdetailsProv.ShowLoading();
		
		this.fetchuserdata();
		}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad myprofile');
  }
	
viewcards(form: NgForm){

if (this.userdetailsProv.CheckConnection()) {
  this.submitted = true; //to display message
  var email=this.home.email;
  if(email!= ""){
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
    }else{
    this.validEmail= false;
    }
    if (form.valid && !this.validEmail) {
  // this.userdetailsProv.ShowLoading();
  this.updateuserdata();
            }
	  }//if internet
}


fetchuserdata(){

        let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
        
        let body ="";
        
        console.log(JSON.stringify(body));
		console.log(this.link+'fetchuserdetails/'+this.userid);
        return this.http.post(this.link+'fetchuserdetails/'+this.userid, body, options)
            .subscribe(
            function(response) {
		
			methodInstance.userdetailsProv.HideLoading();
			 let fetchresponse = JSON.parse(response["_body"]);
			 methodInstance.home.name= fetchresponse["0"].firstName;
			 methodInstance.home.email= fetchresponse["0"].email;
			 methodInstance.home.mobilenumber= fetchresponse["0"].phoneNumber;
			 methodInstance.home.language= fetchresponse["0"].language;
			 methodInstance.home.areaCode= fetchresponse["0"].areaCode;
			 methodInstance.countrylistapi(methodInstance.home.areaCode);
            },
            function(error) {
                console.log("Error happened: " + error);
                methodInstance.userdetailsProv.HideLoading();
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
            },
        );         
    }


updateuserdata(){

let methodInstance = this;
let headers = new Headers({
                    'Content-Type': 'application/json'
                });
                let options = new RequestOptions({
                    headers: headers
                });
					
					
			let body={"name":this.home.name,"email":this.home.email,"phone":this.home.mobilenumber,"language":this.home.language, "country": this.home.mobpref}
              let data= JSON.stringify(body);  

                console.log(JSON.stringify(body));
				console.log(this.link+'updateuserdetails/'+this.userid)
                return this.http.post(this.link+'updateuserdetails/'+this.userid, data, options)
				.subscribe(
            function(response) {
			
			 let updateresponse = JSON.parse(response["_body"]);
			
			 localStorage.setItem("languagedata", methodInstance.home.language);
	  if(localStorage.getItem("languagedata")!=null){
	  methodInstance.checklanguage= localStorage.getItem("languagedata");
	  }
			 if(updateresponse.success!= false){
			 methodInstance.userdetailsProv.ShowToast("Profile updated successfully",3000)
			  localStorage.removeItem("merchantlanguage");
			  methodInstance.navCtrl.setRoot(viewcards);
			 }else{
			
			 methodInstance.userdetailsProv.ShowToast(updateresponse.message,3000)
			 }
			
            },
            function(error) {
                console.log("Error happened: " + error);
                methodInstance.userdetailsProv.HideLoading();
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
            },
        );      
}

countrylistapi(prefix){


let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
    	let body= "";
        
		
			console.log(this.link+'countrylist');
            return this.http.post(this.link+'countrylist', body, options)
			.subscribe(function (response) {
			
			 
			   let coderesponse = JSON.parse(response["_body"]);
		
		
			  
					 for(var i=0; i< coderesponse.length; i++){
					if(coderesponse[i].countryName== "India" || coderesponse[i].countryName== "United States"){
					  if(coderesponse[i].areaCode!= ""){
					 	methodInstance.coderesult.push(coderesponse[i]);
					 }
					 	
						
						if(prefix== coderesponse[i].areaCode){
						// methodInstance.home.mobpref= coderesponse[i].areaCode;
					methodInstance.home.mobpref= coderesponse[i].countryCode;
					 if(methodInstance.home.mobpref== ""){
					 methodInstance.nocode= true;
					 }
					 }
                     }
                    }//for
					 
			   
            }, function (error) {
				
                    console.log("Error happened: " + error)
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
  }
  
}
