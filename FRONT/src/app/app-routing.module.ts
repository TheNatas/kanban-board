import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainContainerComponent } from './main-container/main-container.component';

const routes: Routes = [
  {path: '', redirectTo: 'kanban-board', pathMatch: 'full'},
  {path: 'kanban-board', canActivate: [AuthGuard], component: MainContainerComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
