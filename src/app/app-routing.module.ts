import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BaseComponent} from "./components/base/base.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {EditLanguageComponent} from "./components/edit-language/edit-language.component";
import {LessonComponent} from "./components/lesson/lesson.component";
import {CongratulationsComponent} from "./components/congratulations/congratulations.component";
import {CreateModuleComponent} from "./components/create-module/create-module.component";


const routes: Routes = [
  {
    path: '', component: BaseComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'language', component: EditLanguageComponent},
      {path: 'lesson/:id', component: LessonComponent},
      {path: 'congratulations', component: CongratulationsComponent},
      {path: 'create-module', component: CreateModuleComponent},
      {path: 'create-module/:id', component: CreateModuleComponent},
    ]
  },
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
