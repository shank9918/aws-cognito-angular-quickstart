import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicHomeRoutingModule} from './public-home-routing.module';
import {PublicHomeComponent} from './public-home.component';
import {ConfirmRegistrationComponent} from './auth/confirm-registration/confirm-registration.component';
import {LoginComponent} from './auth/login/login.component';
import {MFAComponent} from './auth/mfa/mfa.component';
import {NewPasswordComponent} from './auth/new-password/new-password.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {ResendCodeComponent} from './auth/resend-code/resend-code.component';
import {ForgotPasswordStep1Component} from './auth/forgot-password-step1/forgot-password-step1.component';
import {ForgotPasswordStep2Component} from './auth/forgot-password-step2/forgot-password-step2.component';
import {AboutComponent} from './about/about.component';
import {HomeLandingComponent} from './home-landing/home-landing.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		PublicHomeRoutingModule
	],
	declarations: [
		PublicHomeComponent,
		ConfirmRegistrationComponent,
		ForgotPasswordStep1Component,
		ForgotPasswordStep2Component,
		LoginComponent,
		MFAComponent,
		NewPasswordComponent,
		RegistrationComponent,
		ResendCodeComponent,
		ForgotPasswordStep1Component,
		ForgotPasswordStep2Component,
		AboutComponent,
		HomeLandingComponent
	],
	exports: [
		LoginComponent
	]
})
export class PublicHomeModule {
}
