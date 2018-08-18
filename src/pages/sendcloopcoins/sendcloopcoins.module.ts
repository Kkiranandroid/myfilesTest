import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { sendcloopcoins } from './sendcloopcoins';

@NgModule({
  declarations: [
    sendcloopcoins,
  ],
  imports: [
    IonicPageModule.forChild(sendcloopcoins),
  ],
})
export class sendcloopcoinsModule {}
