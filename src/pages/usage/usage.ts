import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { viewcardsdetails } from '../viewcardsdetails/viewcardsdetails';
@IonicPage()
@Component({
  selector: 'usage',
  templateUrl: 'usage.html',
})
export class usage {
	link = this.userdetailsProv.link;
	userid: any;
	userdata: any;
	name: any;
	transdate: any;
	debited: any;
	img: any;
	usage: any=[];
	pagenumber: any= 1;
	 infscrollEvent:any;
loaded= false;
	nodatamessage: any;
	timeZone: any;
    fcmid= this.userdetailsProv.fcmid;
	constructor(public navCtrl: NavController, public navParams: NavParams, public userdetailsProv: UserdetailsProvider, public http: Http) {
	  	this.loaded= false;
        
         this.timeZone= Intl.DateTimeFormat().resolvedOptions().timeZone;
    
	
		if(localStorage.getItem("SesUserData")!=null){
			this.userdata=JSON.parse(localStorage.getItem("SesUserData"));
			this.userid= this.userdata.userId;
			
			}
		if(this.userdetailsProv.CheckConnection()){
		this.userdetailsProv.ShowLoading();
		this.cardusagedetailapi("");
		 }
		
	}

	ionViewDidLoad() {
	  console.log('ionViewDidLoad usage');
	}
	
	 doInfinite(infiniteScroll){
	
   
    if(this.userdetailsProv.CheckConnection()){
           if(this.usage!=""){
           this.infscrollEvent=infiniteScroll;
           this.pagenumber= this.pagenumber + 1;
           
           this.cardusagedetailapi(infiniteScroll);
           }
           else{
           infiniteScroll.enable(false);
           }

          }
  }
  
  cardusagedetailapi(infiniteScroll){


	
	let methodInstance = this;
    let headers = new Headers({
                'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });

       let body= {"page":this.pagenumber,"itemsperpage":10,"timeZone": this.timeZone, "fcmid": this.fcmid};
	   let data= JSON.stringify(body);
		 console.log(data);
     
			console.log(this.link+'usercardsusage/'+this.userid);
            return this.http.post(this.link+'usercardsusage/'+this.userid, data, options)
			
			.subscribe(function (response) {
		
			  methodInstance.userdetailsProv.HideLoading();
			  
			   if(infiniteScroll!= ""){
            infiniteScroll.complete();
             }
			 if(methodInstance.infscrollEvent!=undefined){
                methodInstance.infscrollEvent.enable(true);
             }
			  try{
		
			 let usageresponse = JSON.parse(response["_body"]);
			  methodInstance.loaded= true;
			  if(usageresponse.length== 0){
			 
			  
			  methodInstance.nodatamessage= methodInstance.userdata.name;
			     if(methodInstance.usage== undefined){
                    methodInstance.usage="";
                    if(infiniteScroll!= ""){
                    infiniteScroll.enable(false);
					}
                 }
                  // if(infiniteScroll!= ""){
                  // infiniteScroll.enable(false);
              //  }
				
			  }else{
		                 
                 if(methodInstance.pagenumber== 1){
                       methodInstance.usage=usageresponse;
                    }else{  
                        for(var i=0; i< usageresponse.length; i++){
                             methodInstance.usage.push(usageresponse[i]);
                        }
                     }
                }
			   }  catch (e) {
                        methodInstance.userdetailsProv.SomethingWentWrongAlert();
                        methodInstance.userdetailsProv.HideLoading();
                        return false;
                           } //catch
             }, function (error) {
				 methodInstance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );	
	}
	
	cardsdetails(event, list){
	
	this.navCtrl.push(viewcardsdetails, {
		card: list._id.cardId
	  });
	}
}
