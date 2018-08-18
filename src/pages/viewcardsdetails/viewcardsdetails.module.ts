import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { viewcardsdetails } from './viewcardsdetails';

@NgModule({
  declarations: [
    viewcardsdetails,
  ],
  imports: [
    IonicPageModule.forChild(viewcardsdetails),
  ],
})
export class viewcardsdetailsModule {}
