import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ApplicationLogoComponent } from './components/app-logo/app-logo.component';
import { RegisterComponent } from './components/register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpIntercepter } from './intercepters/http.intercepter';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ApplicationLogoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AppHttpIntercepter, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}
