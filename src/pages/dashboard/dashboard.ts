import { Component, NgZone,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,  MenuController, PopoverController, AlertController, Content } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { viewcards } from '../viewcards/viewcards';
import { TranslateService } from '@ngx-translate/core';
import {DatePipe} from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class dashboard {
  @ViewChild(Content) content: Content;
  mid:any;
  merchantid:any="";
  merchantuid:any="";
  timeZone: any;
  link = this.userdetailsProv.link;
  dashboadDataArray:any[]=[];
  dashboadDataArray2:any[]=[];
  giftCardCount:any=""
  giftCardRedeemCount:any=""
  punchCardCount:any=""
  punchCardReedemCount:any=""
  couponCount:any=""
  couponReedemCount:any=""
  storeCount:any=""
  storeCardRedeemCount:any=""
  coinCount:any=""
  coinCountCoin:any=""
  coinReedemCount:any=""
  coinReedemCountCoin:any=""
  creditPoints:any=""
  punchCount:any=""
  creditPointsgift:any=""
  giftCardRedeemCountgift:any=""
  punchCardCountpunch:any=""
  punchCardReedemCountpunch:any=""
  couponCountcoupon:any=""
  couponReedemCountcoupon:any=""
  storeCardRedeemCountstore:any=""
  storecreditstore:any=""
  storecredit:any=""
  giftRedeemdiff:any="";
  giftdiff:any="";
  storeRedeemdiff:any="";
  storediff:any="";

  isShowGiftVariationgiftdiff=false;
  giftisIncreasedgiftdiff=true;
  isShowGiftVariationgiftdiffRedeem=false;
  giftisIncreasedgiftdiffRedeem=true;

  isShowstorediff=false;
  storeisIncreasedstorediff=true;
  isShowstoreRedeemdiff=false;
  storeisIncreasedstoreRedeemdiff=true;
  noData= false;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public http: Http,
    public menu: MenuController, 
   public platform:Platform,
   public userdetailsProv: UserdetailsProvider, 
   public translate: TranslateService, 
   private popoverCtrl: PopoverController, 
   public alertCtrl: AlertController,
   public datePipe:DatePipe) {
   if(localStorage.getItem("SesmerchantData")!=null){
    this.menu.enable(false, 'menuuser');
    this.menu.enable(true, 'menumerchant');
    this.mid=JSON.parse(JSON.parse(localStorage.getItem("SesmerchantData")));
    this.merchantid= this.mid.merchantid;
    this.merchantuid= this.mid.merchantemployeeid;
    }
     this.getDashBoardsDetails("FirstTime");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad dashboard');
  }
doRefresh(refresher){
   this.getDashBoardsDetails("FirstTime", refresher);

}



/**********************OPenning Filter Alert**********************/
 filterShow() {
    let alert = this.alertCtrl.create({title: 'Filter',
      cssClass: 'checkboxForAll',});
    
    

            alert.addInput({
                type: 'radio',
                label: 'Today',
                value: 'today',
                checked: localStorage.getItem("filterdata")=="today"?true:false  
                          });
     
            alert.addInput({
                type: 'radio',
                label: 'This Month',
                value: 'month',
                checked: localStorage.getItem("filterdata")=="month"?true:false 
                          });
       
            alert.addInput({
                type: 'radio',
                label: 'This Year',
                value: 'year',
                checked: localStorage.getItem("filterdata")=="year"?true:false 
                          });

            alert.addButton({
          
                text: 'Clear',
                handler: data => {
                    if(this.userdetailsProv.CheckConnection()){

                            localStorage.removeItem("filterdata");
                            localStorage.setItem("filterdata","");
                           //  this.getDashBoardsDetailsFilter("today","filter",this);
                             this.getDashBoardsDetails("FirstTime");
                    }
                }
              });
            alert.addButton({
                text: 'Ok',
                handler: data => {
            
                          if(this.userdetailsProv.CheckConnection()){
                               
                              if(data){
                                localStorage.removeItem("filterdata");
                                localStorage.setItem("filterdata",data);
                                //this.getDashBoardsDetailsFilter(data,"filter",this);
                                this.getDashBoardsDetails("FirstTime");
                              }else{
                                this.userdetailsProv.ShowToast("Please select filter",4000);
                              }

                           
                            
                              }
                    }
              });
          alert.present();
  }


/**********************Fetaching DashBoard details**********************/
  getDashBoardsDetails(from, refresher?){
     this.userdetailsProv.ShowLoading();

  let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
         
    let options = new RequestOptions({
                headers: headers
            });
    
   
     let body= "";
        let data= JSON.stringify(body);
     console.log(data);
    
      console.log(this.link+'merchantusercarddetails/'+this.merchantid);
            return this.http.post(this.link+'merchantusercarddetails/'+this.merchantid, body, options)
      .subscribe(function (response) {
                debugger;
                  /*methodInstance.userdetailsProv.HideLoading();*/
                  let reponsetemp = JSON.parse(response["_body"]);
                  methodInstance.dashboadDataArray=reponsetemp;

                   methodInstance.giftCardCount=reponsetemp[1].giftCardCount;
                   methodInstance.creditPoints=reponsetemp[1].creditPoints;
                   methodInstance.punchCount=reponsetemp[1].punchCount;
                   methodInstance.giftCardRedeemCount=reponsetemp[2].giftCardRedeemCount;
                   methodInstance.punchCardCount=reponsetemp[1].punchCardCount;
                   methodInstance.punchCardReedemCount=reponsetemp[2].punchCardReedemCount;
                   methodInstance.couponCount=reponsetemp[1].couponCount;
                   methodInstance.couponReedemCount=reponsetemp[2].couponReedemCount;
                   methodInstance.storeCount=reponsetemp[1].storeCount;
                   methodInstance.storecredit=reponsetemp[1].storecredit;
                   methodInstance.coinCountCoin=reponsetemp[1].coinCount;
                   methodInstance.storeCardRedeemCount=reponsetemp[2].storeCardRedeemCount;
                   methodInstance.coinReedemCountCoin=reponsetemp[2].coinReedemCount;

                if(localStorage.getItem("filterdata")){
                   methodInstance.getDashBoardsDetailsFilter(localStorage.getItem("filterdata"),from, methodInstance,refresher);
                  }else{
                   methodInstance.getDashBoardsDetailsFilter("today",from, methodInstance,refresher);
                  }
            }, function (error) {
                methodInstance.userdetailsProv.HideLoading();
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
                
                
            
  }


/************************get Card data for dashboard***********************/
  getDashBoardsDetailsFilter(FilterData,from,methodinstance,refresher?){
    if(from=="filter"){
     this.userdetailsProv.ShowLoading();
    }
    debugger;
let startdate="";
let enddate="";
let enddatePre="";
let startdatePre="";
methodinstance.timeZone= Intl.DateTimeFormat().resolvedOptions().timeZone;

if(FilterData=="today" || FilterData==""){
          let yesturday=new Date();
          yesturday.setDate(yesturday.getDate() - 1);
          startdate=methodinstance.datePipe.transform(new Date(), "yyyy/MM/dd");
          enddate=methodinstance.datePipe.transform(new Date(), "yyyy/MM/dd");
          enddatePre=methodinstance.datePipe.transform(yesturday, "yyyy/MM/dd");
          startdatePre=methodinstance.datePipe.transform(yesturday, "yyyy/MM/dd");

}
else if(FilterData=="month"){
       var nowdate = new Date();
       var monthStartDay = new Date(nowdate.getFullYear(), nowdate.getMonth(), 1);
       var monthEndDay = new Date(nowdate.getFullYear(), nowdate.getMonth() + 1, 0);
       var lastmonth = new Date();
           lastmonth.setMonth(lastmonth.getMonth()-1);
       var Startdate = new Date(lastmonth.getFullYear(), lastmonth.getMonth(), 1);
       var endDate = new Date(lastmonth.getFullYear(), lastmonth.getMonth() + 1, 0);

           startdate=methodinstance.datePipe.transform(monthStartDay, "yyyy/MM/dd");
           enddate=methodinstance.datePipe.transform(monthEndDay, "yyyy/MM/dd");
           enddatePre=methodinstance.datePipe.transform(endDate, "yyyy/MM/dd");
           startdatePre=methodinstance.datePipe.transform(Startdate, "yyyy/MM/dd");
}
else if(FilterData=="year"){
      let startdate1 = new Date(new Date().getFullYear(), 0, 1);
      let lastDay = new Date(new Date().getFullYear(), 11, 31);


           var lastYear = new Date();
               lastYear.setFullYear(lastYear.getFullYear()-1);
           var Startdate =new Date(lastYear.getFullYear(), 0, 1);
           var endDate = new Date(lastYear.getFullYear(), 11, 31);

           startdate=methodinstance.datePipe.transform(startdate1, "yyyy/MM/dd");
           enddate=methodinstance.datePipe.transform(lastDay, "yyyy/MM/dd");
           enddatePre=methodinstance.datePipe.transform(endDate, "yyyy/MM/dd");
           startdatePre=methodinstance.datePipe.transform(Startdate, "yyyy/MM/dd");

}

    let methodInstance = methodinstance;
    let headers = new Headers({
                  'Content-Type': 'application/json'
              });
         
    let options = new RequestOptions({
                headers: headers
            });

 let body;
 let url="";
    if(FilterData=="today" || FilterData==""){
   body= {
            "enddate": startdate,
            "today": startdate,
            "startdate": startdatePre,
            "timeZone": methodinstance.timeZone
        };
        url=methodinstance.link+'todayper/'
    }else{
         body= {
            "startdate": startdate,
            "enddate": enddate,
            "startdatePre": startdatePre,
            "enddatePre": enddatePre,
            "timeZone": methodinstance.timeZone
        };
                url=methodinstance.link+'perdatefilter/'
    }
   
  

      let data= JSON.stringify(body);
      console.log(data);
      console.log(url+methodinstance.merchantid);
            return methodinstance.http.post(url+methodinstance.merchantid, body, options)
      .subscribe(function (response) {
      debugger;
                        methodInstance.userdetailsProv.HideLoading();
                        let reponsetemp = JSON.parse(response["_body"]);
                        methodInstance.dashboadDataArray2=reponsetemp;
                        methodInstance.creditPointsgift=reponsetemp[0].creditPoints;
                        methodInstance.giftCardRedeemCountgift=reponsetemp[1].giftCardRedeemCount; 

                        methodInstance.punchCardCountpunch=reponsetemp[0].punchCardCount;
                        methodInstance.punchCardReedemCountpunch=reponsetemp[1].punchCardReedemCount; 

                        methodInstance.coinCount=reponsetemp[0].coinCount;
                        methodInstance.coinReedemCount=reponsetemp[1].coinReedemCount; 

                        methodInstance.couponCountcoupon=reponsetemp[0].couponCount;
                        methodInstance.couponReedemCountcoupon=reponsetemp[1].couponReedemCount;
                        
                        if(reponsetemp[4].giftdiff){
                           methodInstance.giftdiff=(reponsetemp[4].giftdiff).toFixed(2);
                         }else{
                            methodInstance.giftdiff=0.00;
                         }

                         if(reponsetemp[4].giftRedeemdiff){
                         methodInstance.giftRedeemdiff=(reponsetemp[4].giftRedeemdiff).toFixed(2)
                         }else{
                            methodInstance.giftRedeemdiff=0.00;
                         }


                         if(reponsetemp[4].storediff){
                           methodInstance.storediff=(reponsetemp[4].storediff).toFixed(2);
                         }else{
                            methodInstance.storediff=0.00;
                         }

                         if(reponsetemp[4].storeRedeemdiff){
                         methodInstance.storeRedeemdiff=(reponsetemp[4].storeRedeemdiff).toFixed(2)
                         }else{
                            methodInstance.storeRedeemdiff=0.00;
                         }
                         

                        methodInstance.storecreditstore=reponsetemp[0].storecredit;
                        methodInstance.storeCardRedeemCountstore=reponsetemp[1].storeCardRedeemCount;

/********************************gift difference ***********/
                        if(methodInstance.giftdiff>0){
                            methodInstance.isShowGiftVariation=true;
                            methodInstance.giftisIncreased=true;  
                        }else if(methodInstance.giftdiff<0){
                            methodInstance.isShowGiftVariation=true;
                            methodInstance.giftisIncreased=false;  
                        }else{
                            methodInstance.isShowGiftVariation=false;
                        }

                    /********************************gift difference redeem***********/
                        if(methodInstance.giftRedeemdiff>0){
                            methodInstance.isShowGiftVariationRedeem=true;
                            methodInstance.giftisIncreasedRedeem=true;  
                        }else if(methodInstance.giftRedeemdiff<0){
                            methodInstance.isShowGiftVariationRedeem=true;
                            methodInstance.giftisIncreasedRedeem=false;  
                        }else{
                            methodInstance.isShowGiftVariationRedeem=false;
                        }

/********************************store difference ***********/
                        if(methodInstance.storediff>0){
                            methodInstance.isShowstorediff=true;
                            methodInstance.storeisIncreasedstorediff=true;  
                        }else if(methodInstance.storediff<0){
                            methodInstance.isShowstorediff=true;
                            methodInstance.storeisIncreasedstorediff=false;  
                        }else{
                            methodInstance.isShowstorediff=false;
                        }

                    /********************************store difference redeem***********/
                        if(methodInstance.storeRedeemdiff>0){
                            methodInstance.isShowstoreRedeemdiff=true;
                            methodInstance.storeisIncreasedstoreRedeemdiff=true;  
                        }else if(methodInstance.storeRedeemdiff<0){
                            methodInstance.isShowstoreRedeemdiff=true;
                            methodInstance.storeisIncreasedstoreRedeemdiff=false;  
                        }else{
                            methodInstance.isShowstoreRedeemdiff=false;
                        }
/*scroll top code*/

try{
 if(refresher!="undefined") {
               refresher.complete();
      }
}catch(Exception){}
          methodInstance.content.scrollToTop();
            }, function (error) {
                methodInstance.userdetailsProv.HideLoading();
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
                
                
            
  }
  

  /******************************Round value**********************/
  getRoundUpvalue(value){
    debugger
    if(value){
      return parseFloat(value).toFixed(2);
    }else{
     return "0.00";
    }
    
    
  }
}
