import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { notifications } from './notifications';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    notifications,
  ],
  imports: [
    IonicPageModule.forChild(notifications),
	TranslateModule.forChild()
  ],
})
export class notificationsModule {}
