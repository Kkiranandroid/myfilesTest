import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { loginconfirmation } from './loginconfirmation';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    loginconfirmation,
  ],
  imports: [
    IonicPageModule.forChild(loginconfirmation),
	TranslateModule.forChild()
  ],
})
export class loginconfirmationModule {}
