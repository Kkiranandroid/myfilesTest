import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { viewcards } from '../viewcards/viewcards';
import { SharesuccessPage } from '../sharesuccess/sharesuccess';
import { CallNumber } from '@ionic-native/call-number';
@IonicPage()
@Component({
  selector: 'coindetails',
  templateUrl: 'coindetails.html',
})
export class coindetails {
	 @ViewChild(Navbar) navBar: Navbar;
	selectedCard:any;
	qrdigits: any;
	qrimage: any;
	imageconcat: any;
	userdata: any;
	userid: any;
	notificationcard: any;
	notification= false;
	link = this.userdetailsProv.link;
	cardTitle: any;
	selectedCardid: any;
	image: any;
	cardtype: any;
	remainingCreditPoints: any;
	balancetext: any;
	discountPercent: any;
	punchCount: any;
	remainingPunchCount:any;
	expiryDate: any;
  merchantName: any;
  businessNumber: any;
  merchantlogo: any;
  address1: any;
  address2: any;
  city: any;
  state: any;
  country: any;
  pincode: any;
  timeZone: any;
  timesPunched: any;
  insufficient: any;
  loading: any;
  nolimit: any;
  messageReachPunchLimit: any;
  merchantaddress: any;
  messageUser: any;
  num: any;
  facebook: any;
  linkedin: any;
  website: any;
  twitter: any;
  showiconshare= false;
  uid: any;
  carduserid: any;
  creditPoints: any;

  istransferred: any;
  couponUsed: any;
  sharedto: any;
  remainingCoins: any;
  urldisplay= false;

    	constructor(public navCtrl: NavController, public navParams: NavParams, public element: ElementRef, public http: Http, public userdetailsProv: UserdetailsProvider, public alertCtrl: AlertController, private callNumber: CallNumber) {
	
	
    
	
	
	}//constructor
	
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad viewcardsdetails');
       this.timeZone= Intl.DateTimeFormat().resolvedOptions().timeZone;
   
    
   if(localStorage.getItem("SesUserData")!=null){
      this.userdata=JSON.parse(localStorage.getItem("SesUserData"));
      this.userid= this.userdata.userId;
      
      }
  
    this.selectedCardid= this.navParams.get('card');
       
        if(this.navParams.get('noloading')!= undefined){
     
        if (this.userdetailsProv.CheckConnection()) {
          /* setTimeout(()=>{*/
              this.cardnotificationapi(this.selectedCardid);
          /*}, 500);*/
    }
        }else{
        
         if (this.userdetailsProv.CheckConnection()) {
        
    this.userdetailsProv.ShowLoading();
   /*  setTimeout(()=>{*/
    this.cardnotificationapi(this.selectedCardid);
/*      }, 1000);*/
    }
        }
	}
   
  



	/*Scroll Header Start*/
	scrollerHandle: any;
  scrollTop: any;
  ticking: any;
	toolbar:any;
	ttitle:any;

	ngOnInit(){
		this.scrollerHandle = this.element.nativeElement.getElementsByClassName('giftCardDetails')[0];
		this.toolbar = this.element.nativeElement.getElementsByClassName('toolbar-background')[0];
		this.ttitle = this.element.nativeElement.getElementsByClassName('toolbar-title')[0];
		this.ticking = false;

		this.scrollerHandle.addEventListener('scroll', () => {
			if(!this.ticking){
				window.requestAnimationFrame(() => {
					this.updateHeader();
				});
			}
			this.ticking = true;
		});

	}
	
	updateHeader(){
		this.scrollTop = this.scrollerHandle.scrollTop;
		if( this.scrollTop > 80 ){
			this.toolbar.style.background = '#00AA8D';
			this.ttitle.style.opacity = 1;
		} else {
			this.toolbar.style.background = 'transparent';
			this.ttitle.style.opacity = 0;
		}
		this.ticking = false;
	}
	/*Scroll Header End*/

createCode(qrdigits) {
    this.qrimage = this.qrdigits;
  }



cardnotificationapi(cardid){

var cardid= cardid;

let methodInstance = this;
let headers = new Headers({
                    'Content-Type': 'application/json'
                });
                let options = new RequestOptions({
                    headers: headers
                });
					
					
			let body= {"userid":this.userid, "timeZone": this.timeZone};
              let data= JSON.stringify(body);  

                console.log(data);
				console.log(this.link+'coinsdetail/'+cardid)
                return this.http.post(this.link+'coinsdetail/'+cardid, data, options)

            
            
				.subscribe(
            function(response) {
           debugger;
try{

			let cardresponse = JSON.parse(response["_body"]);

      if(cardresponse.success){

              let coindetail=cardresponse.docs[0];
              methodInstance.creditPoints= coindetail.creditCoins;
              methodInstance.remainingCoins= coindetail.remainingCoins;
              methodInstance.uid= coindetail._id;
              methodInstance.image= coindetail.merchant[0].logo;  
             // methodInstance.image= "https://www.cloopcard.com/cloopapi/uploads/default.png";  
              methodInstance.merchantlogo= coindetail.merchant[0].logo;  
             // methodInstance.merchantlogo= "https://www.cloopcard.com/cloopapi/uploads/default.png";  
              methodInstance.qrdigits= coindetail.qrCodeData+"";
              methodInstance.createCode(methodInstance.qrdigits);
              methodInstance.merchantName= coindetail.merchant[0].merchantName;

            if(coindetail.merchant[0].businessNumber!= undefined){
                methodInstance.businessNumber= coindetail.merchant[0].businessNumber;
            }else{
                methodInstance.businessNumber="";
            }
              methodInstance.address1= coindetail.merchant[0].address1;
              methodInstance.address2= coindetail.merchant[0].address2;
              methodInstance.city= coindetail.merchant[0].city;
              methodInstance.state= coindetail.merchant[0].state;
              methodInstance.country= coindetail.merchant[0].country;
              methodInstance.pincode= coindetail.merchant[0].pincode;


              if(coindetail.merchant[0].facebook){
                     if(coindetail.merchant[0].facebook.charAt(0)=="w"){
                          methodInstance.facebook= "http://"+coindetail.merchant[0].facebook;
                      }else{
                          methodInstance.facebook= coindetail.merchant[0].facebook;
                      }
              }else{
                   methodInstance.facebook="";
              }
    
             if(coindetail.merchant[0].linkedin){
                    if(coindetail.merchant[0].linkedin.charAt(0)=="w"){
                        methodInstance.linkedin= "http://"+coindetail.merchant[0].linkedin;
                    }else{
                        methodInstance.linkedin= coindetail.merchant[0].linkedin;
                    }
             }else{
              methodInstance.linkedin="";
             }
             
  
   
              if(coindetail.merchant[0].website){
                      if(coindetail.merchant[0].website.charAt(0)=="w"){
                          methodInstance.website= "http://"+coindetail.merchant[0].website;
                      }else{
                          methodInstance.website= coindetail.merchant[0].website;
                      }
              }else{
              methodInstance.website="";
              }
    
                if(coindetail.merchant[0].twitter){
                        if(coindetail.merchant[0].twitter.charAt(0)=="w"){
                            methodInstance.twitter= "http://"+coindetail.merchant[0].twitter;
                        }else{
                            methodInstance.twitter= coindetail.merchant[0].twitter;
                        }
               }else{
               methodInstance.twitter="";
               }
   
    
   
             if((methodInstance.facebook!= '' ) || (methodInstance.linkedin!= '') || (methodInstance.website!= '') || (methodInstance.twitter!= '')){
                 methodInstance.urldisplay= true;
             }else{
                 methodInstance.urldisplay= false;
             }

      }
    }catch(Exception){

      }      

             setTimeout(() => {
            methodInstance.userdetailsProv.HideLoading();
        }, 2000); 
  
           
},
    function(error) {
        console.log("Error happened: " + error);
        //methodInstance.userdetailsProv.HideLoading();
        methodInstance.userdetailsProv.SomethingWentWrongAlert();
        },
    );      
}

 ionViewWillLeave() {
    
      this.userdetailsProv.willenter= true;
    }
    
  facebookclick(){
    if(this.userdetailsProv.CheckConnection()){
        window.open(this.facebook);
      }//internet
  }
  linkedinclick(){
      if(this.userdetailsProv.CheckConnection()){
        window.open(this.linkedin);
      }//internet
  }
  websiteclick(){
     if(this.userdetailsProv.CheckConnection()){
        window.open(this.website);
      }//internet
  }
  twitterclick(){
      if(this.userdetailsProv.CheckConnection()){
        window.open(this.twitter);
      }//internet
  }
  
  dialclick(businessNumber){
  
   this.callNumber.callNumber(businessNumber, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
  }
 getroundedcoins(coins){

   if(coins){
     let coin=coins.toFixed(2);

  return parseFloat(coin);
}else{

  return "";
}


  }
  
}
