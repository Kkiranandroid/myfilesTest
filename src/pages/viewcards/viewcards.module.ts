import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { viewcards } from './viewcards';

@NgModule({
  declarations: [
    viewcards,
  ],
  imports: [
    IonicPageModule.forChild(viewcards),
  ],
})
export class viewcardsModule {}
