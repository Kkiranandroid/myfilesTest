import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, Platform } from 'ionic-angular';
import { viewcards } from '../viewcards/viewcards';
import { SocialSharing } from '@ionic-native/social-sharing';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
@IonicPage()
@Component({
  selector: 'page-sharesuccess',
  templateUrl: 'sharesuccess.html',
})
export class SharesuccessPage {
mobile: any;
shareBody: any;
shareSubjectTitle: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public userdetailsProv: UserdetailsProvider, public platform:Platform) {
  this.mobile= navParams.get('mobile');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharesuccessPage');
  }

backToList(){
this.navCtrl.setRoot(viewcards);
}



 //Share click event
    btnShareClick() {
        //share(message, subject, file, url)
        //this.socialSharing.share(this.result.body, this.result.title, "", "");this.result.body+
       this.shareSubjectTitle="";     
       let AppStoreURL='http://apple.co/2ngbRPc';
       let PlayStoreURL='http://bit.ly/2ymhiNV';
     this.shareBody='Get app from\nIOS: http://apple.co/2ngbRPc\nAndroid: http://apple.co/2ngbRPc';
        
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Share with',
            cssClass: 'sharevia',
          
            buttons: [
                {
                    //text: 'Camera',
                    icon:'md-mail',
                    handler: () => {
                        this.shareViaEmail();
                    }
                }, {
                    icon:"logo-facebook",
                    handler: () => {
                        this.shareViaFacebook();
                    }
                }, {
                    icon:"logo-twitter",
                    handler: () => {
                        this.shareViaTwitter();
                    }
                },
               {
                    icon:"logo-whatsapp",
                    handler: () => {
                        this.shareViaWhatsapp();
                        console.log('shareViaTwitter clicked');
                    }
                }, 
                {
                    icon:"md-chatboxes",
                    handler: () => {
                        this.shareViaMessage();
                        console.log('shareViaMessage clicked');
                    }
                }
            ]
        });
            
        actionSheet.present();
    }
    
    
    
     shareViaEmail(){
     
     
     this.shareSubjectTitle="";     
       let AppStoreURL='http://apple.co/2ngbRPc';
       let PlayStoreURL='http://bit.ly/2ymhiNV';
     this.shareBody='Get app from\nIOS: http://apple.co/2ngbRPc\nAndroid: http://bit.ly/2ymhiNV';
     
       this.socialSharing.canShareViaEmail().then(() => {
          // Sharing via email is possible
           this.socialSharing.shareViaEmail(this.shareBody, this.shareSubjectTitle, []).then(() => {
              // Success!
            }).catch((e) => {
              // Error!
               
               console.log(e);
            });
        }).catch((e) => {
          // Sharing via email is not possible
          
           this.userdetailsProv.ShowToast("Verify that the application is installed in the device",3000);
        });
   }
  
   
     shareViaFacebook(){
    this.shareSubjectTitle="";     
        let AppStoreURL='http://apple.co/2ngbRPc';
       let PlayStoreURL='http://bit.ly/2ymhiNV';
     this.shareBody='Get app from\nIOS: http://apple.co/2ngbRPc\nAndroid: http://bit.ly/2ymhiNV';
     
       //canShareVia(appName, message, subject, image, url)
       //android-'facebook' ios- 'com.apple.social.facebook'
       let appname='';
       if(this.platform.is('ios')){
           appname="com.apple.social.facebook"

           
       }else{
           appname="com.facebook.orca"

            this.socialSharing.shareVia(appname,this.shareBody,this.shareSubjectTitle,'','').then(() => {
          // Sharing via email is possible
      
        }).catch((e) => {
          // Sharing via email is not possible
           
               this.userdetailsProv.ShowToast("Verify that the Messenger application is installed in the device",3000);
        });
       }

          
   }
   

   
    shareViaTwitter(){
   
    this.shareSubjectTitle="";     
        let AppStoreURL='http://apple.co/2ngbRPc';
       let PlayStoreURL='http://bit.ly/2ymhiNV';
     this.shareBody='Get app from\nIOS: http://apple.co/2ngbRPc\nAndroid: http://bit.ly/2ymhiNV';
     
       //canShareVia(appName, message, subject, image, url)
       //android-'facebook' ios- 'com.apple.social.facebook'
       let appname='';
       if(this.platform.is('ios')){
           appname="com.apple.social.twitter"
       }else{
           appname="twitter"
       }
       
       
       this.socialSharing.canShareVia(appname,this.shareBody,this.shareSubjectTitle,'','').then(() => {
       //shareViaFacebook(message, image, url)
              this.socialSharing.share(this.shareBody, '', '', '')
                .then(() => {
            // Success!
                }).catch(() => {
       //error
            });
        }).catch((e) => {
          // Sharing via email is not possible
           
           this.userdetailsProv.ShowToast("Verify that Twitter application is installed in the device",3000);
        });
        

   }
   
   shareViaWhatsapp(){
 
   
   this.shareSubjectTitle="";     
        let AppStoreURL='http://apple.co/2ngbRPc';
       let PlayStoreURL='http://bit.ly/2ymhiNV';
     this.shareBody='Get app from\nIOS: http://apple.co/2ngbRPc\nAndroid: http://bit.ly/2ymhiNV';
     
       //whatsapp
       //android-'whatsapp', ios-'com.apple.social.whatsapp'
       //canShareVia(appName, message, subject, image, url)
       
       let appname='';
       if(this.platform.is('ios')){
           appname="com.apple.social.whatsapp"
       }else{
           appname="whatsapp"
       }
       
       this.socialSharing.canShareVia(appname,this.shareBody,this.shareSubjectTitle,'','').then(() => {
       //shareViaFacebook(message, image, url)
           this.socialSharing.shareViaWhatsApp(this.shareBody, '', "").then(() => {
            
              // Success!
            }).catch((e) => {
              // Error!
               
               console.log(e);
            });
        }).catch((e) => {
          // Sharing via email is not possible
           
           this.userdetailsProv.ShowToast("Verify that the application is installed in the device",3000);
        });
   }
   
   shareViaMessage(){
 
   
   this.shareSubjectTitle="";     
       let AppStoreURL='http://apple.co/2ngbRPc';
       let PlayStoreURL='http://bit.ly/2ymhiNV';
     this.shareBody='Get app from\nIOS: http://apple.co/2ngbRPc\nAndroid: http://bit.ly/2ymhiNV';
     
       //canShareVia
       //shareViaSMS(messge, phoneNumber)
           this.socialSharing.shareViaSMS(this.shareSubjectTitle+"\n"+this.shareBody, this.mobile).then(() => {
              // Success!
            }).catch((e) => {
              // Error!
               
               console.log(e);
            });
   }
    
}
