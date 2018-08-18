import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { otp } from './otp';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    otp,
  ],
  imports: [
    IonicPageModule.forChild(otp),
	TranslateModule.forChild()
  ],
})
export class otpModule {}
