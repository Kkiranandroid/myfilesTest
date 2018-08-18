import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController, PopoverController, AlertController, Content } from 'ionic-angular';
import { viewcardsdetails } from '../viewcardsdetails/viewcardsdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { TranslateService } from '@ngx-translate/core';
import { notifications } from '../notifications/notifications';
import { loginconfirmation } from '../loginconfirmation/loginconfirmation';
import { Vibration } from '@ionic-native/vibration';
import { merchantDetails } from '../../pages/merchantDetails/merchantDetails';
@IonicPage()
@Component({
  selector: 'viewcards',
  templateUrl: 'viewcards.html'
})
export class viewcards {

 //this is used to scroll top content
    @ViewChild(Content) content: Content;
	
	selectedCard: any;
	userdata: any;
	userid: any;
	link = this.userdetailsProv.link;
	cards: any=[];
	pagenumber: any= 1;
	infscrollEvent:any;
	fcmid= this.userdetailsProv.fcmid;
	checklanguage: any;
	imageconcat: any;
	loaded= false;
	popover:any;
	nodatamessage: any;
	radio: any;
	filter: any=[];
	empty= false;
	checkdata= false;
	sort: any;
    timeZone: any;
   fromfcm: any;
   cardidselected: any=[];
   showiconarchive= false;
   showiconshare= false;
   selectcount= 0;
   idlength: any;
   numberdisplay= false;
   checkdatamultiple= 0;
   arrayone: any= [];
   block: any;
  status= this.userdetailsProv.status;  
	constructor(public navCtrl: NavController,
	 public navParams: NavParams, 
	 public events:Events,
	  public menu: MenuController, 
	  public userdetailsProv: UserdetailsProvider, 
	  public http: Http, 
	  public translate: TranslateService, 
	  private popoverCtrl: PopoverController, 
	  public alertCtrl: AlertController,
	   private vibration: Vibration) {
    
    
   debugger;
  
    this.fromfcm= navParams.get('fromfcm');
   if(this.fromfcm!= undefined){
   
   if(this.fromfcm.cardId!= "" && this.fromfcm.type== ""){
                
				this.navCtrl.push(viewcardsdetails, {card: this.fromfcm.cardId});
				}
				else if(this.fromfcm.cardId!= "" && this.fromfcm.type!= "logout"){
				this.navCtrl.push(viewcardsdetails, {card: this.fromfcm.cardId});
				}else if(this.fromfcm.type== "logout"){
                localStorage.removeItem("SesUserData");
                this.navCtrl.setRoot(loginconfirmation);
                }
				else{
			this.navCtrl.setRoot(notifications);
				//this.navCtrl.push(merchantDetails, {card: this.fromfcm.MerchantId});
				}
   
   
   
   }else{
   
  
     this.timeZone= Intl.DateTimeFormat().resolvedOptions().timeZone;
    


	this.empty= false;
	this.loaded= false;
	this.menu.swipeEnable(true);

	
	
	if(localStorage.getItem("merchantlanguage")!=null){
	 
	  this.checklanguage= localStorage.getItem("merchantlanguage");
	   
	  
	  if(this.checklanguage== "en" || this.checklanguage== "english"){
	  this.translate.use('en');
	  }else if(this.checklanguage== "mexican" || this.checklanguage== "es"){
	  this.translate.use('mexican');
	  }
	  }
	  
	  else if(localStorage.getItem("languagedata")!=null){
	  
	  this.checklanguage= localStorage.getItem("languagedata");
	  
	  if(this.checklanguage== "en" || this.checklanguage== "english"){
	  this.translate.use('en');
	  }else if(this.checklanguage== "mexican" || this.checklanguage== "es"){
	  this.translate.use('mexican');
	  }
	  }
	  
	 // else{
	 // this.translate.use('en');
	 // }
	
	  
	if(localStorage.getItem("SesUserData")!=null){
		this.menu.enable(true, 'menuuser');
      	this.menu.enable(false, 'menumerchant');
		}
		
		if(localStorage.getItem("SesUserData")!=null){
		
			this.userdata=JSON.parse(localStorage.getItem("SesUserData"));
			this.userid= this.userdata.userId;
			
			}
			
			 if(this.userdetailsProv.CheckConnection()){
			this.userdetailsProv.ShowLoading();
			this.viewcardsapi("");
			   }//internet
	
	 }//else
     
     
     
    
		
	}

	ionViewDidLoad() {
	
	  console.log('ionViewDidLoad viewcards');
      
	}
  /*
	viewcardsdetails(event, card){
	
	 if(this.userdetailsProv.CheckConnection()){
	  this.navCtrl.push(viewcardsdetails, {
		card: card.cardId, imageconcat: this.imageconcat
	  });
	    }//internet
	}
*/

viewcardsapi(infiniteScroll){
debugger;


 if(localStorage.getItem("filterdata")!= null){
 var filterdata= localStorage.getItem("filterdata");
 if(filterdata== "archive"){
 this.filter= ['punch','gift','store','coupon'];
 this.status= true;
 }else{
 this.filter= JSON.parse('['+JSON.stringify(localStorage.getItem("filterdata"))+']');
 this.status= false;
 }
 
 }else if(this.filter== undefined){
 this.filter= ['punch','gift','store','coupon'];
 this.status= false;
 }else{
 this.filter= ['punch','gift','store','coupon'];
 this.status= false;
 }
 
 
 if(localStorage.getItem("sortdata")!= null){

 this.sort= parseInt(localStorage.getItem("sortdata"));
 }else if(this.sort== undefined){
 this.sort= parseInt("1");
 }
 else{
 this.sort= parseInt("1");

 }
 
 



	let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
		
   
     let body= {"page":this.pagenumber,"itemsperpage":3, "sortkey": this.sort, "filter": this.filter, "timeZone": this.timeZone, "fcmid": this.fcmid, "status": this.status };
        let data= JSON.stringify(body);
		 console.log(data);
		
			console.log(this.link+'usercarddetails/'+this.userid);
            return this.http.post(this.link+'usercarddetails/'+this.userid, body, options)
			.subscribe(function (response) {
			debugger;
			  methodInstance.userdetailsProv.HideLoading();
			  
			   if(infiniteScroll!= ""){
            infiniteScroll.complete();
             }
            
             if(methodInstance.infscrollEvent!=undefined){
                methodInstance.infscrollEvent.enable(true);
             }
			 
			  try{
			 
			 
			   let viewcardresponse = JSON.parse(response["_body"]);
			
			 methodInstance.nodatamessage= methodInstance.userdata.name;
             
             /*
				if(viewcardresponse.success== false && viewcardresponse.cards== undefined){
				        if(methodInstance.filter== "punch,gift,coupon"){
				        methodInstance.empty=true;
                
                    if(viewcardresponse.success== false && viewcardresponse.message== "No Cards Found"){
                    methodInstance.empty=true;
                    methodInstance.loaded=false;
                    }
             
				}else{
				methodInstance.loaded=true;
				}
				}
               */ 
                
    if(viewcardresponse.success== false && viewcardresponse.message== "No Cards Found" && viewcardresponse.cards== undefined){
    
    
    methodInstance.cards= [];
    
                if(methodInstance.filter.length== "4" && methodInstance.status== false){
                 methodInstance.empty= true;
                }
                else{
                 methodInstance.empty= false;
                }
                
                }
                
                
                else{
				
			   methodInstance.imageconcat= viewcardresponse.sitepath;
			
				if(viewcardresponse.cards.length==0){
				methodInstance.loaded= true;
               
				
			  methodInstance.nodatamessage= methodInstance.userdata.name;
                if( methodInstance.cards==undefined){
                    methodInstance.cards="";
                    if(infiniteScroll!= ""){
                     infiniteScroll.enable(false);
                    }
                }
                 if(infiniteScroll!= ""){
                 infiniteScroll.enable(false);
                 }
                
            }else {
              
                if(methodInstance.pagenumber== 1){
				
				 for(var i=0; i< viewcardresponse.cards.length; i++){
		
				if(viewcardresponse.cards[i].card_details.cardType== "gift"){
				viewcardresponse.cards[i].balancetext= "Balance";
                viewcardresponse.cards[i].remainingCreditPoints= Math.round((viewcardresponse.cards[i].remainingCreditPoints) * 100) / 100;
                viewcardresponse.cards[i].selected= "0";
				}else if(viewcardresponse.cards[i].card_details.cardType== "punch"){
				viewcardresponse.cards[i].balancetext= "Punches";
                viewcardresponse.cards[i].selected= "0";
				}else if(viewcardresponse.cards[i].card_details.cardType== "coupon"){
				viewcardresponse.cards[i].balancetext= "Discount";
                viewcardresponse.cards[i].selected= "0";
				}else if(viewcardresponse.cards[i].card_details.cardType== "store"){
				viewcardresponse.cards[i].balancetext= "Balance";
                viewcardresponse.cards[i].selected= "0";
				}
                        methodInstance.cards=viewcardresponse.cards;
                    }
				
                   
                }else{
                    for(var i=0; i< viewcardresponse.cards.length; i++){
		
				if(viewcardresponse.cards[i].card_details.cardType== "gift"){
				viewcardresponse.cards[i].balancetext= "Balance";
                viewcardresponse.cards[i].remainingCreditPoints= Math.round((viewcardresponse.cards[i].remainingCreditPoints) * 100) / 100;
                viewcardresponse.cards[i].selected= "0";
				}else if(viewcardresponse.cards[i].card_details.cardType== "punch"){
				viewcardresponse.cards[i].balancetext= "Punches";
                viewcardresponse.cards[i].selected= "0";
				}else if(viewcardresponse.cards[i].card_details.cardType== "coupon"){
				viewcardresponse.cards[i].balancetext= "Discount";
                viewcardresponse.cards[i].selected= "0";
				}else if(viewcardresponse.cards[i].card_details.cardType== "store"){
				viewcardresponse.cards[i].balancetext= "Balance";
                viewcardresponse.cards[i].selected= "0";
				}
                 
                       methodInstance.cards.push(viewcardresponse.cards[i]);
                    }
                 }
              }
			 }//else
             
            
                
			  }catch (e) {
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

doInfinite(infiniteScroll){
	debugger;
    if(this.userdetailsProv.CheckConnection()){
           if(this.cards!="" ){
           this.infscrollEvent=infiniteScroll;
           this.pagenumber= this.pagenumber + 1;
         
           this.viewcardsapi(infiniteScroll);
           }
           else{
           infiniteScroll.enable(false);
           }

          }
  }
 
  
  
  
  
  
    filterShow() {

    	debugger;
    let alert = this.alertCtrl.create({title: 'Filter',
		  cssClass: 'checkboxForAll',});
    
    
        if(this.filter=="gift"){
            alert.addInput({
                type: 'radio',
			  label: 'Gift Cards',
			  value: 'gift',
			  checked: true  
            });
        }else{
            alert.addInput({
                type: 'radio',
			  label: 'Gift Cards',
			  value: 'gift',
			  checked: false
            });
        }
         if(this.filter=="punch"){
            alert.addInput({
              type: 'radio',
			  label: 'Punch Cards',
			  value: 'punch',
			  checked: true
            });
         }else{
             alert.addInput({
              type: 'radio',
			  label: 'Punch Cards',
			  value: 'punch',
			  checked: false
            });
         }

         if(this.filter=="store"){
            alert.addInput({
              type: 'radio',
			  label: 'Store Credits',
			  value: 'store',
			  checked: true
            });
         }else{
             alert.addInput({
              type: 'radio',
			  label: 'Store Credits',
			  value: 'store',
			  checked: false
            });
         }
        
        if(this.filter=="coupon"){
            alert.addInput({
             type: 'radio',
			  label: 'Coupon Cards',
			  value: 'coupon',
			  checked: true
            });
        }
        else{
            alert.addInput({
              type: 'radio',
			  label: 'Coupon Cards',
			  value: 'coupon',
			  checked: false
            });
                
        }
        
         if(this.filter=="archive" || this.status== true){
            alert.addInput({
             type: 'radio',
			  label: 'Archived Cards',
			  value: 'archive',
			  checked: true
            });
        }
        else{
            alert.addInput({
              type: 'radio',
			  label: 'Archived Cards',
			  value: 'archive',
			  checked: false
            });
                
        }
        

    alert.addButton({
	
        text: 'Clear',
        handler: data => {
		if(this.userdetailsProv.CheckConnection()){
		this.userdetailsProv.ShowLoading();
      
			localStorage.removeItem("filterdata");
			this.cards="";
			this.pagenumber=1;
				this.viewcardsapi("");
                this.content.scrollToTop();
				}
        }
      });
    alert.addButton({
        text: 'Ok',
        handler: data => {
          debugger;
		if(this.userdetailsProv.CheckConnection()){
        this.userdetailsProv.ShowLoading();
         
            localStorage.removeItem("filterdata");
				
			
				this.filter= data;
                
				if(this.filter== undefined){
				 localStorage.removeItem("filterdata");
				}else{
				localStorage.setItem("filterdata", this.filter);
				}
				this.cards="";
				
				
				var filterdata= localStorage.getItem("filterdata");
				
				this.pagenumber=1;
				this.viewcardsapi("");
                this.content.scrollToTop();
				}
        }
      });
    alert.present();
  }
  
    //Sorting
    sortingShow() {
	
    let alert = this.alertCtrl.create({title: 'Sorting',
		  cssClass: 'sortingAlert checkboxForAll'});
    
    
        if(this.sort=="1"){
		
            alert.addInput({
                type: 'radio',
			  label: 'Latest First',
			  value: '1',
			  checked: true  
            });
        }else{
            alert.addInput({
                type: 'radio',
			  label: 'Latest First',
			  value: '1',
			  checked: false
            });
        }
         if(this.sort=="2"){
            alert.addInput({
              type: 'radio',
			  label: 'Oldest First',
			  value: '2',
			  checked: true
            });
         }else{
             alert.addInput({
              type: 'radio',
			  label: 'Oldest First',
			  value: '2',
			  checked: false
            });
         }
        
        if(this.filter== "punch" || this.filter== "coupon"){
        if(this.sort=="3"){
            alert.addInput({
              type: 'radio',
			  label: 'Closest to Expiry',
			  value: '3',
			  checked: true
            });
        }
        else{
            alert.addInput({
              type: 'radio',
			 label: 'Closest to Expiry',
			  value: '3',
			  checked: false
            });
                
        }
		
		if(this.sort=="4"){
            alert.addInput({
              type: 'radio',
			  label: 'Farthest to Expiry',
			  value: '4',
			  checked: true
            });
        }
        else{
            alert.addInput({
              type: 'radio',
			  label: 'Farthest to Expiry',
			  value: '4',
			  checked: false
            });
                
        }
        } //only for punch and coupen expiry
        
        //sort by remainingcreditpoints in descending order
        if(this.sort=="6" || this.sort=="8" || this.sort=="10"){
		if(this.filter== "gift"){
		alert.addInput({
              type: 'radio',
			  label: 'Maximum Credit/Discount',
			  value: '6',
			  checked: true
            });
		}else if(this.filter== "punch"){
		alert.addInput({
            type: 'radio',
			  label: 'Maximum Credit/Discount',
			  value: '10',
			  checked: true
			  });
        }else if(this.filter== "store"){
		alert.addInput({
            type: 'radio',
			  label: 'Maximum Credit/Discount',
			  // value: '10',
			   value: '6',
			  checked: true
			  });
        }else if(this.filter== "coupon"){
		alert.addInput({
            type: 'radio',
			  label: 'Maximum Credit/Discount',
			  value: '8',
			  checked: true
			  });
        }}
        else{
            if(this.filter== "gift"){
		alert.addInput({
              type: 'radio',
			  label: 'Maximum Credit/Discount',
			  value: '6',
			  checked: false
            });
		}else if(this.filter== "punch"){
		alert.addInput({
            type: 'radio',
			  label: 'Maximum Credit/Discount',
			  value: '10',
			  checked: false
			  });
        }else if(this.filter== "store"){
		alert.addInput({
            type: 'radio',
			  label: 'Maximum Credit/Discount',
			  // value: '10',
			  value: '6',
			  checked: false
			  });
        }else if(this.filter== "coupon"){
		alert.addInput({
            type: 'radio',
			  label: 'Maximum Credit/Discount',
			  value: '8',
			  checked: false
			  });
        }
        }


		//sort by remainingcreditpoints in descending order
        if(this.sort=="5" || this.sort=="7"|| this.sort=="9"){
		if(this.filter== "gift"){
		alert.addInput({
              type: 'radio',
			  label: 'Minimum Credit/Discount',
			  value: '5',
			  checked: true
            });
		}else if(this.filter== "punch"){
		alert.addInput({
            type: 'radio',
			  label: 'Minimum Credit/Discount',
			  value: '9',
			  checked: true
			  });
        }else if(this.filter== "store"){
		alert.addInput({
            type: 'radio',
			  label: 'Minimum Credit/Discount',
			  // value: '9',
			  value: '5',
			  checked: true
			  });
        }else if(this.filter== "coupon"){
		alert.addInput({
            type: 'radio',
			  label: 'Minimum Credit/Discount',
			  value: '7',
			  checked: true
			  });
        }}
        else{
            if(this.filter== "gift"){
		alert.addInput({
              type: 'radio',
			  label: 'Minimum Credit/Discount',
			  value: '5',
			  checked: false
            });
		}else if(this.filter== "punch"){
		alert.addInput({
            type: 'radio',
			  label: 'Minimum Credit/Discount',
			  value: '9',
			  checked: false
			  });
        }else if(this.filter== "store"){
		alert.addInput({
            type: 'radio',
			  label: 'Minimum Credit/Discount',
			  // value: '9',
			  value: '5',
			  checked: false
			  });
        }else if(this.filter== "coupon"){
		alert.addInput({
            type: 'radio',
			  label: 'Minimum Credit/Discount',
			  value: '7',
			  checked: false
			  });
        }
        }
    alert.addButton({
        text: 'Clear',
        handler: data => {
		if(this.userdetailsProv.CheckConnection()){
        this.userdetailsProv.ShowLoading();
          
			localStorage.removeItem("sortdata");
			
			this.pagenumber=1;
				this.viewcardsapi("");
                this.content.scrollToTop();
            
            }
        }
      });
    alert.addButton({
        text: 'Ok',
        handler: data => {
		if(this.userdetailsProv.CheckConnection()){
		this.userdetailsProv.ShowLoading();
          
            localStorage.removeItem("sortdata");
				
				this.sort= data;
				if(this.sort== undefined){
				 localStorage.removeItem("sortdata");
				}else{
				localStorage.setItem("sortdata", this.sort);
				}
				
				var sortdata= localStorage.getItem("sortdata");
			
				this.pagenumber=1;
				this.viewcardsapi("");
                this.content.scrollToTop();
				}
        }
      });
    alert.present();
  }
 
	doRefresh(refresher) {
    
   if(this.userdetailsProv.CheckConnection()){ 
	this.checkdatamultiple = 0;
    this.arrayone = [];
    this.showiconarchive= false;
    this.showiconarchive= false;
    
    
    setTimeout(() => {
  
    
    
    this.pagenumber=1;
	this.viewcardsapi("");
         this.empty= false; 
        refresher.complete();
    }, 100);
    
    }//internet
  }


 

ionViewWillEnter(){
this.empty= false;
debugger;
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
this.viewcardsapi("");
} //internet
 this.userdetailsProv.willenter= false;
}
}



archivecard(){

 if(this.userdetailsProv.CheckConnection()){

  let alert = this.alertCtrl.create({
    title: 'Do you want to Archive the selected card(s)?',
     cssClass: 'redeemMsg',
    
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
      
         this.showiconarchive= true;
        }
      },
      {
        text: 'ok',
       handler: () => {

this.userdetailsProv.ShowLoading();
this.showiconarchive= false;
var data= this.arrayone.length;


for(var j=0; j<this.arrayone.length; j++ ){

this.newmethod(j);
                }//for

this.arrayone.length= 0;

if(this.arrayone.length== 0){
this.viewcardsapi("");
}

    
        } //ok handel
      }
    ]
  });
  alert.present();
  
}// internet
}



newmethod(j){

debugger;

let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
    	
        let body= {"block": this.arrayone[j].isBlocked};
			console.log(this.link+'blockcard/'+this.arrayone[j]._id);
            return this.http.post(this.link+'blockcard/'+ this.arrayone[j]._id, body, options)
			.subscribe(function (response) {
			   let coderesponse = JSON.parse(response["_body"]);
               debugger;
                methodInstance.pagenumber=1;
				methodInstance.viewcardsapi("");
              //  methodInstance.content.scrollToTop();
        
               
            }, function (error) {
				 methodInstance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
                
}

  
  
  
  multiplecards(card, i){


		if(this.checkdatamultiple== 0){
		   
		   this.showiconarchive= true;
           
	
	
		let myHeader = document.getElementById('homeSlide'+i); 
		myHeader.classList.add('hideSlide'); 	
		myHeader.classList.add('hideSlide2'); 	
        this.arrayone.push(card[i]);
        card[i].isBlocked= true;
		this.checkdatamultiple=1;
        
         if(this.status== true && this.filter.length== "3"){
this.showiconarchive= false;
}
			}
 
	}
      
    
    clickcheck(card, i){
    

		
		
		
		let myHeader = document.getElementById('homeSlide'+i); 
        
        
         
		
		if(this.checkdatamultiple==1 && myHeader.classList.contains('hideSlide') && myHeader.classList.contains('hideSlide2')){
		   this.checkdatamultiple=2;
			
		}
		else if(this.checkdatamultiple==2 && myHeader.classList.contains('hideSlide') && myHeader.classList.contains('hideSlide2')){
			myHeader.classList.remove('hideSlide');
			myHeader.classList.remove('hideSlide2');
          
            this.arrayone.pop(card[i]);
            card[i].isBlocked= false;
            
			if(this.arrayone.length== 0){
					this.checkdatamultiple=0;
				
                    this.showiconarchive= false;
				   
				   }
			
			
			
			
		}
		else{
			if(myHeader.classList.contains('hideSlide')){
				myHeader.classList.remove('hideSlide'); 
				
				this.arrayone.pop(card[i]);
                card[i].isBlocked= false
                ;
				if(this.arrayone.length== 0){
					this.checkdatamultiple=0;
				
				    this.showiconarchive= false;
				   }
				
			}
			else if(this.checkdatamultiple==1 || this.checkdatamultiple==2){
            
            if(this.checkdatamultiple==1){
            this.checkdatamultiple=2;
            }
            
            
            
            
				myHeader.classList.add('hideSlide'); 
			
                this.arrayone.push(card[i]);
                card[i].isBlocked= true;
                
                
                
			}
			else{
        
				
                
                 if(this.userdetailsProv.CheckConnection()){
               
	  this.navCtrl.push(viewcardsdetails, {
     
		card: card[i].cardId, imageconcat: this.imageconcat
	  });
	    }//internet
        
			}
		}
		
		
         if(this.arrayone.length== 0){
    this.showiconarchive= false;
    }else{
    this.showiconarchive= true;
    
  if(this.status== true || this.filter== ['punch','gift','store','coupon']){
this.showiconarchive= false;
}

    }
    
      
		
		
	}

  
  
}//viewcards class


