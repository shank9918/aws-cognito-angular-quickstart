import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicHomeComponent} from "./public-home.component";
import {LoginComponent} from "./auth/login/login.component";
import {ResendCodeComponent} from "./auth/resend-code/resend-code.component";
import {ForgotPasswordStep2Component} from "./auth/forgot-password-step2/forgot-password-step2.component";
import {ForgotPasswordStep1Component} from "./auth/forgot-password-step1/forgot-password-step1.component";
import {NewPasswordComponent} from "./auth/new-password/new-password.component";
import {HomeLandingComponent} from "./home-landing/home-landing.component";
import {AboutComponent} from "./about/about.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {ConfirmRegistrationComponent} from "./auth/confirm-registration/confirm-registration.component";

const homeRoutes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	}, {
		path: 'home',
		component: PublicHomeComponent,
		children: [
			{path: 'login', component: LoginComponent},
			{path: 'about', component: AboutComponent},
			{path: 'register', component: RegistrationComponent},
			{path: 'confirmRegistration/:username', component: ConfirmRegistrationComponent},
			{path: 'resendCode', component: ResendCodeComponent},
			{path: 'forgotPassword/:email', component: ForgotPasswordStep2Component},
			{path: 'forgotPassword', component: ForgotPasswordStep1Component},
			{path: 'newPassword', component: NewPasswordComponent},
			{path: '', component: HomeLandingComponent}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(homeRoutes)],
	exports: [RouterModule]
})
export class PublicHomeRoutingModule {
}
