import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { viewcardsdetails } from '../viewcardsdetails/viewcardsdetails';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'sendcloopcoins',
  templateUrl: 'sendcloopcoins.html',
})
export class sendcloopcoins {
	link = this.userdetailsProv.link;
	userid: any;
	transdate: any;
	phonenumeber:any='';
	amount:any='';
	cloopcoins:any='';
	submitted=false;
	mid:any;
  	merchantid:any="";
  	merchantuid:any="";
  	timeZone: any;
  	percentage:any=0;
  	merchantname:any="";



	constructor(public navCtrl: NavController, public navParams: NavParams, public userdetailsProv: UserdetailsProvider, public http: Http) {
	  	 


	  	 if(localStorage.getItem("SesmerchantData")!=null)
	  	 {debugger;
			    this.mid=JSON.parse(JSON.parse(localStorage.getItem("SesmerchantData")));
			    this.merchantid= this.mid.merchantid;
			    this.merchantuid= this.mid.merchantemployeeid;
			    this.merchantname= this.mid.merchantname;
   		 }

   		 this.getCloopCoinPercentage();
	}

	ionViewDidLoad() {
	  console.log('ionViewDidLoad usage');
	}
  

	  sendCloopCoins(form:NgForm){
		this.submitted=true;


		if(form.valid){
			  	this.userdetailsProv.ShowLoading();

		  		let methodInstance = this;
			    let headers = new Headers({
			                'Content-Type': 'application/json'
			            });
		         
		        let options = new RequestOptions({
		                headers: headers
		            });

		        let body= {emp_id: this.merchantuid,
		        	phone:this.phonenumeber,
		        	merchantname:this.merchantname,
		        	percentage:this.percentage,
		        	amount:this.amount,
		        	coins: parseFloat(this.cloopcoins)};

		        let data= JSON.stringify(body);
		        console.log(data);
		        console.log(this.link+'addcoins');
		            return this.http.post(this.link+'addcoins/'+this.merchantid, body, options)
		              .subscribe(function (response) {
		                debugger;
		                  methodInstance.userdetailsProv.HideLoading();
		                  let reponsetemp = JSON.parse(response["_body"]);
		                  methodInstance.submitted=false;
		                  methodInstance.phonenumeber="";
		                  methodInstance.amount="";
		                  methodInstance.cloopcoins="";
						  methodInstance.userdetailsProv.ShowToast(reponsetemp.message,4000);
	
		           		}, function (error) {
		               	  methodInstance.userdetailsProv.HideLoading();
		                  methodInstance.userdetailsProv.SomethingWentWrongAlert();
		               		 }
		             );  
          }
	  }


	  getCloopCoinPercentage(){
	  	
	  	this.userdetailsProv.ShowLoading();

  		let methodInstance = this;
	    let headers = new Headers({
	                'Content-Type': 'application/json'
	            });
         
        let options = new RequestOptions({
                headers: headers
            });

        let body= {id: this.merchantid};
        let data= JSON.stringify(body);
        console.log(data);
        console.log(this.link+'mercoinssettingsdata');
            return this.http.post(this.link+'mercoinssettingsdata/', body, options)
              .subscribe(function (response) {
                debugger;
                  methodInstance.userdetailsProv.HideLoading();
                  let reponsetemp = JSON.parse(response["_body"]);

                  if(reponsetemp.success){
                  	methodInstance.percentage= reponsetemp.doc[0].percentage;
                  }
               
           		}, function (error) {
               	  methodInstance.userdetailsProv.HideLoading();
                  methodInstance.userdetailsProv.SomethingWentWrongAlert();
               		 }
             );       
	}

	calculatePerecentage($event){
debugger;
    
    setTimeout(() => {
		let coins=(((Number(this.amount)/100)*Number(this.percentage)).toFixed(2));
		if(coins=="0.00" || coins=="0"){
			this.cloopcoins=parseFloat("0.00");
		}else{
			this.cloopcoins=parseFloat(coins);
		}
    }, 200);
		

	}
}

