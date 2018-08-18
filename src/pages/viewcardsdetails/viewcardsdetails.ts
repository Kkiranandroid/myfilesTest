import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { viewcards } from '../viewcards/viewcards';
import { SharesuccessPage } from '../sharesuccess/sharesuccess';
import { CallNumber } from '@ionic-native/call-number';
@IonicPage()
@Component({
  selector: 'viewcardsdetails',
  templateUrl: 'viewcardsdetails.html',
})
export class viewcardsdetails {
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
    blockeddata: any;
    istransferred: any;
    couponUsed: any;
    sharedto: any;
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
         setTimeout(()=>{
        this.cardnotificationapi(this.selectedCardid);
        }, 500);
    }
        }else{
        
         if (this.userdetailsProv.CheckConnection()) {
        
    this.userdetailsProv.ShowLoading();
    this.cardnotificationapi(this.selectedCardid);
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
				console.log(this.link+'carddetails/'+cardid)
                return this.http.post(this.link+'carddetails/'+cardid, data, options)

            
            
				.subscribe(
            function(response) {
           debugger;
			methodInstance.userdetailsProv.HideLoading();

			let cardresponse = JSON.parse(response["_body"]);
			methodInstance.cardTitle= cardresponse["0"].cardTitle;
			methodInstance.expiryDate= cardresponse["0"].expiryDate;
			methodInstance.messageUser= cardresponse["0"].messageUser;
            
            //for share option
                methodInstance.uid= cardresponse["0"].UsersDetails._id;
                methodInstance.creditPoints= cardresponse["0"].creditPoints;
                methodInstance.blockeddata= cardresponse["0"].UsersDetails.isBlocked;
                methodInstance.istransferred= cardresponse["0"].UsersDetails.istransferred;
                methodInstance.couponUsed= cardresponse["0"].UsersDetails.couponUsed;
			if(cardresponse["0"].cardImageUrl== ""){
			methodInstance.image= cardresponse["0"].MerchantDetails.logo;
			}else{
			methodInstance.image= cardresponse["0"].cardImageUrl;
			}
			
			methodInstance.qrdigits= cardresponse["0"].UsersDetails.qrCodeData;
			methodInstance.remainingPunchCount= cardresponse["0"].UsersDetails.remainingPunchCount;
			methodInstance.discountPercent= cardresponse["0"].discountPercent
			methodInstance.cardtype= cardresponse["0"].cardType;
			methodInstance.punchCount= cardresponse["0"].punchCount;
			methodInstance.createCode(methodInstance.qrdigits);
            methodInstance.messageReachPunchLimit= cardresponse["0"].messageReachPunchLimit;
            
            if(cardresponse["0"].cardType== "gift"){
            if(cardresponse["0"].UsersDetails.remainingCreditPoints== "0"){
            methodInstance.insufficient= "you have exhausted credits in this card";
            }
            }
            
             methodInstance.num= cardresponse["0"].UsersDetails.remainingCreditPoints;
			//methodInstance.remainingCreditPoints= cardresponse["0"].UsersDetails.remainingCreditPoints;
         
           methodInstance.remainingCreditPoints= Math.round((methodInstance.num) * 100) / 100;
           
            
            methodInstance.timesPunched= cardresponse["0"].timesPunched;
            methodInstance.merchantName= cardresponse["0"].MerchantDetails.merchantName;
			methodInstance.merchantlogo= cardresponse["0"].MerchantDetails.logo;
          
            if(cardresponse["0"].cardType== "punch"){
            if(cardresponse["0"].timesPunched== cardresponse["0"].punchCount){
            methodInstance.insufficient= cardresponse["0"].messageReachPunchLimit;
            }
            }
            
            
            
            if(cardresponse["0"].cardType== "coupon"){
            if(methodInstance.couponUsed== true){
            methodInstance.insufficient= "This Coupon Card has been used";
            }
            }
            
                
          
            if(cardresponse["0"].MerchantDetails.businessNumber!= undefined){
            methodInstance.businessNumber= cardresponse["0"].MerchantDetails.businessNumber;
            }else{
            methodInstance.businessNumber="";
            }
            
            methodInstance.address1= cardresponse["0"].MerchantDetails.address1;
            methodInstance.address2= cardresponse["0"].MerchantDetails.address2;
            
    methodInstance.city= cardresponse["0"].MerchantDetails.city;
    methodInstance.state= cardresponse["0"].MerchantDetails.state;
    methodInstance.country= cardresponse["0"].MerchantDetails.country;
    methodInstance.pincode= cardresponse["0"].MerchantDetails.pincode;
    
   
 
  if(cardresponse["0"].MerchantDetails.facebook){
   if(cardresponse["0"].MerchantDetails.facebook.charAt(0)=="w"){
    methodInstance.facebook= "http://"+cardresponse["0"].MerchantDetails.facebook;
    }else{
    methodInstance.facebook= cardresponse["0"].MerchantDetails.facebook;
    }
  }else{
   methodInstance.facebook="";
  }
    
   if(cardresponse["0"].MerchantDetails.linkedin){
    if(cardresponse["0"].MerchantDetails.linkedin.charAt(0)=="w"){
    methodInstance.linkedin= "http://"+cardresponse["0"].MerchantDetails.linkedin;
    }else{
    methodInstance.linkedin= cardresponse["0"].MerchantDetails.linkedin;
    }
   }else{
    methodInstance.linkedin="";
   }
   
  
   
    if(cardresponse["0"].MerchantDetails.website){
    if(cardresponse["0"].MerchantDetails.website.charAt(0)=="w"){
    methodInstance.website= "http://"+cardresponse["0"].MerchantDetails.website;
    }else{
    methodInstance.website= cardresponse["0"].MerchantDetails.website;
    }
    }else{
    methodInstance.website="";
    }
    
    if(cardresponse["0"].MerchantDetails.twitter){
    if(cardresponse["0"].MerchantDetails.twitter.charAt(0)=="w"){
    methodInstance.twitter= "http://"+cardresponse["0"].MerchantDetails.twitter;
    }else{
    methodInstance.twitter= cardresponse["0"].MerchantDetails.twitter;
    }
   }else{
   methodInstance.twitter="";
   }
   
    
   
   if((methodInstance.facebook!= '' ) || (methodInstance.linkedin!= '') || (methodInstance.website!= '') || (methodInstance.twitter!= '')){
   methodInstance.urldisplay= true;
   }else{
   methodInstance.urldisplay= false;
   }
   
   
    
			if(methodInstance.cardtype== "gift"){
				methodInstance.balancetext= "Remaining Credits";
				}else if(methodInstance.cardtype== "punch"){
				methodInstance.balancetext= "Total Punches";
				}else if(methodInstance.cardtype== "coupon"){
        methodInstance.balancetext= "Discount";
        }else if(methodInstance.cardtype== "store"){
				methodInstance.balancetext= "Balence";
				}
                
                
                
          
                
           
         if(methodInstance.cardtype== "gift"){
if((methodInstance.remainingCreditPoints == methodInstance.creditPoints) && (methodInstance.blockeddata==false)){
methodInstance.showiconshare = true;
}else{
methodInstance.showiconshare = false;
}
}

},
    function(error) {
        console.log("Error happened: " + error);
        methodInstance.userdetailsProv.HideLoading();
        methodInstance.userdetailsProv.SomethingWentWrongAlert();
        },
    );      
}

 
 
 
 ionViewWillLeave() {
    
      this.userdetailsProv.willenter= true;
    }
    
    
    
    
    
     transfercard(mobile){
 

let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
    	let body= {
  "phoneNumber": mobile,
  "uid":this.uid,
  "message":this.messageUser,
  "userId":this.userid,
};
     let data= JSON.stringify(body);
		 console.log(data);
			
			console.log(this.link+'transfercard/' +this.selectedCardid);
            return this.http.post(this.link+'transfercard/' +this.selectedCardid, body, options)
			.subscribe(function (response) {
			
			
			   let coderesponse = JSON.parse(response["_body"]);
                methodInstance.userdetailsProv.HideLoading();
               if(coderesponse.success!= false){
               // methodInstance.userdetailsProv.ShowToast(coderesponse.message,3000);
               
                //methodInstance.showiconshare= false;
                methodInstance.navCtrl.setRoot(SharesuccessPage, {mobile: mobile});
                
               }else{
               methodInstance.userdetailsProv.ShowToast(coderesponse.message,3000);
               methodInstance.showiconshare= true;
               }
			  
            }, function (error) {
				 methodInstance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
  }
  
  
  
   sharepopup() {
  
  
  let alert = this.alertCtrl.create({
       title: 'Share Card with:',
       cssClass: 'sharepopUp',
      inputs: [
        {
        name: 'mobilenumber',
        placeholder: 'Phone number'
        },
		
      ],
      buttons: [
        {
          text: 'Ok',
          handler: data => {
          
              if (data.mobilenumber!= "" && data.mobilenumber.length== 10) {
             if(this.userdetailsProv.CheckConnection()){
 
 this.userdetailsProv.ShowLoading();
this.transfercard(data.mobilenumber);
         
       } //internet
        
          } else {
          if(data.mobilenumber== ""){

           this.userdetailsProv.ShowToast("Please enter phone number",3000);
          }else{
         
             this.userdetailsProv.ShowToast("Please enter valid phone number",3000);
             }
            return false;
          }
             
          }
        },
        
        {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
          this.showiconshare= true;
        }
      }
      
      ]
    });
    alert.present();


 
} //showpopup

sharecard(){
    if(this.userdetailsProv.CheckConnection()){
  this.showiconshare= false;
  this.sharepopup();
} //internet
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
 
  
}
