import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { dashboard } from './dashboard';

@NgModule({
  declarations: [
    dashboard,
  ],
  imports: [
    IonicPageModule.forChild(dashboard),
  ],
})
export class dashboardModule {}
