import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { merchantDetails } from './merchantDetails';

@NgModule({
  declarations: [
    merchantDetails,
  ],
  imports: [
    IonicPageModule.forChild(merchantDetails),
  ],
})
export class coindetailsModule {}
