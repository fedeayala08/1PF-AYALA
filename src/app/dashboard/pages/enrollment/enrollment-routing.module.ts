import { RouterModule, Routes } from "@angular/router";
import { EnrollmentComponent } from "./enrollment.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
      path: '',
      component: EnrollmentComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class EnrollmentRoutingModule {}
  