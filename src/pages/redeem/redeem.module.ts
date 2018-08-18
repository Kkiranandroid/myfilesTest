import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { redeem } from './redeem';

@NgModule({
  declarations: [
    redeem,
  ],
  imports: [
    IonicPageModule.forChild(redeem),
  ],
})
export class redeemModule {}
