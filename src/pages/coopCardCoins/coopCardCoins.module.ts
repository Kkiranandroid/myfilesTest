import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { coopCardCoins } from './coopCardCoins';

@NgModule({
  declarations: [
    coopCardCoins,
  ],
  imports: [
    IonicPageModule.forChild(coopCardCoins),
  ],
})
export class coopCardCoinsModule {}
