import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { myprofile } from './myprofile';

@NgModule({
  declarations: [
    myprofile,
  ],
  imports: [
    IonicPageModule.forChild(myprofile),
  ],
})
export class myprofileModule {}
