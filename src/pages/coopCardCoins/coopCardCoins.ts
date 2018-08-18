import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { viewcardsdetails } from '../viewcardsdetails/viewcardsdetails';
import { coindetails } from '../coindetails/coindetails';
import { NgForm } from '@angular/forms';
import { notifications } from '../notifications/notifications';
import { loginconfirmation } from '../loginconfirmation/loginconfirmation';

@IonicPage()
@Component({
  selector: 'coopCardCoins',
  templateUrl: 'coopCardCoins.html',
})
export class coopCardCoins {
	@ViewChild(Content) content: Content;

	link = this.userdetailsProv.link;
	userid: any;
	transdate: any;
	phonenumeber:any='';
	amount:any='';
	cloopcoins:any='';
	submitted=false;
	noData=false;
	mid:any;
  	merchantid:any="";
  	merchantuid:any="";
  	timeZone: any;
  	percentage:any=0;
  	cards:any[]=[];
  	checkdatamultiple= 0;
  	pagenumber= 1;
    userdata: any;
  	fromfcm: any;
	constructor(public navCtrl: NavController, public navParams: NavParams, public userdetailsProv: UserdetailsProvider, public http: Http) {
	  
   		 /*this.cards.push({balancetext:"Balance",card_details:{cardTitle:"My Card",cardImageUrl:"http://www.adlucent.com/blog/assets//google-merchant-center-logo-516x350.png"},logo:"https://botw-pd.s3.amazonaws.com/15-orginal-2.png",remainingCreditPoints:"20"
   		})*/
debugger
         this.fromfcm= navParams.get('fromfcm');
   
debugger;
			if(localStorage.getItem("SesUserData")!=null){
		
			this.userdata=JSON.parse(localStorage.getItem("SesUserData"));
			this.userid= this.userdata.userId;
		
			}
			this.timeZone= Intl.DateTimeFormat().resolvedOptions().timeZone;
			this.pagenumber=1;

			if(this.userdetailsProv.CheckConnection()){
        if(this.fromfcm== undefined){
              this.userdetailsProv.ShowLoading();
            }
				this.getCloopCoinPercentage();
			}

      if(this.fromfcm!= undefined){
   
   if(this.fromfcm.cardId!= "" && this.fromfcm.type== ""){
                
        this.navCtrl.push(coindetails, {card: this.fromfcm.cardId});
        }
        else if(this.fromfcm.cardId!= "" && this.fromfcm.type!= "logout"){

          console.log("i am here");
        this.navCtrl.push(coindetails, {card: this.fromfcm.cardId});
        }else if(this.fromfcm.type== "logout"){
                localStorage.removeItem("SesUserData");
                this.navCtrl.setRoot(loginconfirmation);
                }
        else{
        this.navCtrl.setRoot(notifications);
        }
   
   
   
   } 
	}

	ionViewDidLoad() {
	  console.log('ionViewDidLoad usage');
	}

  ionViewWillEnter(){

if(localStorage.getItem("SesUserData")!=null){
    
      this.userdata=JSON.parse(localStorage.getItem("SesUserData"));
      this.userid= this.userdata.userId;
    
      }
    this.timeZone= Intl.DateTimeFormat().resolvedOptions().timeZone;         
if(this.userdetailsProv.willenter== true){
console.log("ionViewWillEnter");
this.pagenumber=1;
this.content.scrollToTop();
  if(this.userdetailsProv.CheckConnection()){
       //  this.userdetailsProv.ShowLoading();
this.getCloopCoinPercentage();
} //internet
 this.userdetailsProv.willenter= false;
}
}
  

	  getCloopCoinPercentage(refresher?){
	  	


  		let methodInstance = this;
	    let headers = new Headers({
	                'Content-Type': 'application/json'
	            });
         
        let options = new RequestOptions({
                headers: headers
            });

        let body= {userid: this.userid, page:"1", itemsperpage:3 };
        let data= JSON.stringify(body);
        console.log(data);
        console.log(this.link+'totalcoins');
            return this.http.post(this.link+'totalcoins/', body, options)
              .subscribe(function (response) {
                debugger;
                try{
                  methodInstance.userdetailsProv.HideLoading();
                }catch(Exception){

                }
                  let reponsetemp = JSON.parse(response["_body"]);

                  if(reponsetemp.success){
                  	  	if(reponsetemp.doc.length==0){
					  methodInstance.noData=true;
					}else{
					  methodInstance.noData=false;
					}methodInstance.cards=[];
                  	for(var i=0;i<reponsetemp.doc.length;i++){
                      let balencecoin=parseFloat(reponsetemp.doc[i].creditCoins);
                  		let remainingCoins=parseFloat(reponsetemp.doc[i].remainingCoins);
                  		methodInstance.cards.push({
                  		id:reponsetemp.doc[i]._id,
                  		/*merchantId:reponsetemp.doc[i].merchantId,
                  		merchantEmployeeId:reponsetemp.doc[i].merchantEmployeeId,
                  		userId:reponsetemp.doc[i].userId,*/
                      creditCoins:balencecoin,
                  		remainingCoins:remainingCoins,
                  		qrCodeData:reponsetemp.doc[i].qrCodeData,
                  		merchantName:reponsetemp.doc[i].merchant.merchantName,
                  		merchantUrl:reponsetemp.doc[i].merchant.logo,
                  	//	merchantUrl:"https://www.cloopcard.com/cloopapi/uploads/default.png",
                  		/*merchantUrl:reponsetemp.clooplogo,*/
                  		cardId:reponsetemp.doc[i]._id,
                  		merchantlogo:reponsetemp.clooplogo,
                  		/*merchantlogo:"https://www.cloopcard.com/cloopapi/uploads/default.png",*/
                  		sitepath:reponsetemp.sitepath,
                  		
                  	})	
                  	}

                  }else{
                     methodInstance.noData=true;
                  }
			try{       
      if(refresher!="undefined") {
               refresher.complete();
      }
        
           }catch(Exception){

           }
               
           		}, function (error) {
               	  methodInstance.userdetailsProv.HideLoading();
                  methodInstance.userdetailsProv.SomethingWentWrongAlert();
               		 }
             );       
	}


	 clickcheck(card, i){
                 if(this.userdetailsProv.CheckConnection()){
               
					  this.navCtrl.push(coindetails, {
				     						card: card[i].cardId,
				     						imageconcat: card[i].merchantUrl
				     				/*		imageconcat: this.imageconcat*/
					  });
	    			}//internet
			}


doRefresh(refresher) {
    debugger;
   if(this.userdetailsProv.CheckConnection()){ 
   	this.cards=[];
   	this.noData=false;
    this.pagenumber=1;
          this.userdetailsProv.ShowLoading();
   	this.getCloopCoinPercentage(refresher);

    }
  }

  doInfinite(infiniteScroll){
    debugger;
    if(this.userdetailsProv.CheckConnection()){ 
           this.pagenumber= this.pagenumber + 1;
           let methodInstance = this;
          let headers = new Headers({
                  'Content-Type': 'application/json'
              });
         
        let options = new RequestOptions({
                headers: headers
            });

        let body= {userid: this.userid,page:this.pagenumber, itemsperpage:3};
        let data= JSON.stringify(body);
        console.log(data);
        console.log(this.link+'totalcoins');
            return this.http.post(this.link+'totalcoins/', body, options)
              .subscribe(function (response) {
                debugger;
                  let reponsetemp = JSON.parse(response["_body"]);

                  if(reponsetemp.success){
                     for(var i=0;i<reponsetemp.doc.length;i++){
                      let balencecoin=parseFloat(reponsetemp.doc[i].creditCoins);
                      let remainingCoins=parseFloat(reponsetemp.doc[i].remainingCoins);
                      methodInstance.cards.push({
                      id:reponsetemp.doc[i]._id,
                      /*merchantId:reponsetemp.doc[i].merchantId,
                      merchantEmployeeId:reponsetemp.doc[i].merchantEmployeeId,
                      userId:reponsetemp.doc[i].userId,*/
                      creditCoins:balencecoin,
                      remainingCoins:remainingCoins,
                      qrCodeData:reponsetemp.doc[i].qrCodeData,
                      merchantName:reponsetemp.doc[i].merchant.merchantName,
                      //merchantUrl:reponsetemp.sitepath+reponsetemp.doc[i].merchant.logo,
                      merchantUrl:"https://www.cloopcard.com/cloopapi/uploads/default.png",
                      /*merchantUrl:reponsetemp.clooplogo,*/
                      cardId:reponsetemp.doc[i]._id,
                      //merchantlogo:reponsetemp.clooplogo,
                      merchantlogo:"https://www.cloopcard.com/cloopapi/uploads/default.png",
                      sitepath:reponsetemp.sitepath,
                      
                    })  
                    }

                  }
              try{        
                   if(infiniteScroll!= ""){
                          infiniteScroll.complete();
                     }
                   }catch(Exception){

                   }
               
               }, function (error) {
                   methodInstance.userdetailsProv.HideLoading();
                  methodInstance.userdetailsProv.SomethingWentWrongAlert();
                    }
             );       

          

          }
  }


  getroundedcoins(coins){

let coin=coins.toFixed(2);

  return parseFloat(coin);

  }
		
}
