import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { viewcards } from '../viewcards/viewcards';
import { SharesuccessPage } from '../sharesuccess/sharesuccess';
import { CallNumber } from '@ionic-native/call-number';
@IonicPage()
@Component({
  selector: 'merchantDetails',
  templateUrl: 'merchantDetails.html',
})
export class merchantDetails {
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
	merchantid: any;
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
	
	
    this.timeZone= Intl.DateTimeFormat().resolvedOptions().timeZone;
   
    
	 if(localStorage.getItem("SesUserData")!=null){
			this.userdata=JSON.parse(localStorage.getItem("SesUserData"));
			this.userid= this.userdata.userId;
			
			}
	
		this.merchantid= navParams.get('card');
       
        if(navParams.get('noloading')!= undefined){
     
        if (this.userdetailsProv.CheckConnection()) {
           setTimeout(()=>{
              this.cardnotificationapi(this.merchantid);
          }, 500);
		}
        }else{
        
         if (this.userdetailsProv.CheckConnection()) {
        
		this.userdetailsProv.ShowLoading();
		this.cardnotificationapi(this.merchantid);
		}
        }
	
	
	}//constructor
	
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad viewcardsdetails');
       
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



cardnotificationapi(merchantid){
debugger;
var merchantid= merchantid;

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
				console.log(this.link+'fetchmerchantdetails/'+merchantid)
                return this.http.post(this.link+'fetchmerchantdetails/'+merchantid, "", options)

            
            
				.subscribe(
            function(response) {
           debugger;
try{

			let cardresponse = JSON.parse(response["_body"]);



              let coindetail=cardresponse[0];
              methodInstance.uid= coindetail._id;
              methodInstance.image= "https://www.cloopcard.com/cloopapiv1/uploads/default.png";  
              methodInstance.merchantlogo=coindetail.logo==""?"https://www.cloopcard.com/cloopapiv1/uploads/default.png":coindetail.sitepath+coindetail.logo; 

 
              methodInstance.merchantName= coindetail.merchantName;

            if(coindetail.businessNumber!= undefined){
                methodInstance.businessNumber= coindetail.businessNumber;
            }else{
                methodInstance.businessNumber="";
            }
              methodInstance.address1= coindetail.address1;
              methodInstance.address2= coindetail.address2;
              methodInstance.city= coindetail.city;
              methodInstance.state= coindetail.state;
              methodInstance.country= coindetail.country;
              methodInstance.pincode= coindetail.pincode;


              if(coindetail.facebook){
                     if(coindetail.facebook.charAt(0)=="w"){
                          methodInstance.facebook= "http://"+coindetail.facebook;
                      }else{
                          methodInstance.facebook= coindetail.facebook;
                      }
              }else{
                   methodInstance.facebook="";
              }
    
             if(coindetail.linkedin){
                    if(coindetail.linkedin.charAt(0)=="w"){
                        methodInstance.linkedin= "http://"+coindetail.linkedin;
                    }else{
                        methodInstance.linkedin= coindetail.linkedin;
                    }
             }else{
              methodInstance.linkedin="";
             }
             
  
   
              if(coindetail.website){
                      if(coindetail.website.charAt(0)=="w"){
                          methodInstance.website= "http://"+coindetail.website;
                      }else{
                          methodInstance.website= coindetail.website;
                      }
              }else{
              methodInstance.website="";
              }
    
                if(coindetail.twitter){
                        if(coindetail.twitter.charAt(0)=="w"){
                            methodInstance.twitter= "http://"+coindetail.twitter;
                        }else{
                            methodInstance.twitter= coindetail.twitter;
                        }
               }else{
               methodInstance.twitter="";
               }
   
    
   
             if((methodInstance.facebook!= '' ) || (methodInstance.linkedin!= '') || (methodInstance.website!= '') || (methodInstance.twitter!= '')){
                 methodInstance.urldisplay= true;
             }else{
                 methodInstance.urldisplay= false;
             }

      
    }catch(Exception){

      }      

             setTimeout(() => {
            methodInstance.userdetailsProv.HideLoading();
        }, 2000); 
  
           
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
    
  facebookclick(){
    debugger;
    if(this.userdetailsProv.CheckConnection()){
        window.open(this.facebook);
      }//internet
  }
  linkedinclick(){
    debugger;
      if(this.userdetailsProv.CheckConnection()){
        window.open(this.linkedin);
      }//internet
  }
  websiteclick(){
    debugger;
     if(this.userdetailsProv.CheckConnection()){
        window.open(this.website);
      }//internet
  }
  twitterclick(){
    debugger;
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
