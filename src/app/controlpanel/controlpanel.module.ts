import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlpanelRoutingModule } from './controlpanel-routing.module';
import { ControlpanelComponent } from './controlpanel.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    ControlpanelComponent
  ],
  imports: [
    CommonModule,
    ControlpanelRoutingModule,
    SharedModule,
    Ng2SearchPipeModule
  ]
})
export class ControlpanelModule { }
