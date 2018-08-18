import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { coindetails } from './coindetails';

@NgModule({
  declarations: [
    coindetails,
  ],
  imports: [
    IonicPageModule.forChild(coindetails),
  ],
})
export class coindetailsModule {}
