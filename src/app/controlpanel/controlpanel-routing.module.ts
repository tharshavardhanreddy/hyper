import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlpanelComponent } from './controlpanel.component';

const routes: Routes = [{ path: '', component: ControlpanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlpanelRoutingModule { }
