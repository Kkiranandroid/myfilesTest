import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { login } from './login';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    login,
  ],
  imports: [
    IonicPageModule.forChild(login),
	TranslateModule.forChild()
  ],
})
export class loginModule {}
