import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostcreateComponent } from './posts/post-create/post-create.component';
import { PostlistComponent } from './posts/post-list/post-list.component';
import { RoutesComponent } from './posts/routes/routes.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { canactivate } from './auth.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'create',component:PostcreateComponent,canActivate:[canactivate]},
  {path:'edit/:_id',component:PostcreateComponent,canActivate:[canactivate]},
  {path:'post-list',component:PostlistComponent,canActivate:[canactivate]},
  {path:'login',component:LoginComponent},
  
  {path:'signup',component:SignupComponent},
  {path:'routes',component:RoutesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
