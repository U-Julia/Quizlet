import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { BaseComponent } from './components/base/base.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ButtonModule } from "primeng/button";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditLanguageComponent } from './components/edit-language/edit-language.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { CongratulationsComponent } from './components/congratulations/congratulations.component';
import { InputTextareaModule } from "primeng/inputtextarea";
import { CreateModuleComponent } from './components/create-module/create-module.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./services/in-memory-data.service";
import {HttpClientModule} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {StoreModule} from "@ngrx/store";
import {moduleReducer} from "./store/reducer";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    BaseComponent,
    LoginComponent,
    RegistrationComponent,
    EditLanguageComponent,
    LessonComponent,
    CongratulationsComponent,
    CreateModuleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    OverlayPanelModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    StoreModule.forRoot({modules: moduleReducer} as any, {metaReducers: []})
    // StoreModule.forFeature('moduleFeature', moduleReducer)
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
