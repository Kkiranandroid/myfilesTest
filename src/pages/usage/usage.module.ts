import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { usage } from './usage';

@NgModule({
  declarations: [
    usage,
  ],
  imports: [
    IonicPageModule.forChild(usage),
  ],
})
export class usageModule {}
