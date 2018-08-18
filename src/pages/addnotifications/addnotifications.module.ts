import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { addnotifications } from './addnotifications';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    addnotifications,
  ],
  imports: [
    IonicPageModule.forChild(addnotifications),
	TranslateModule.forChild()
  ],
})
export class addnotificationsModule {}
