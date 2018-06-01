import {Component} from '@angular/core';
import {UserRegistrationService} from "../../../service/user-registration.service";
import {Router} from "@angular/router";
import {CognitoCallback} from "../../../service/cognito.service";

@Component({
	selector: 'awscognito-angular2-app',
	templateUrl: './resend-code.component.html',
	styleUrls: ['./resend-code.component.css']
})
export class ResendCodeComponent implements CognitoCallback {
	email: string;
	errorMessage: string;

	constructor(public registrationService: UserRegistrationService, public router: Router) {
	}

	resendCode() {
		this.registrationService.resendCode(this.email, this);
	}

	cognitoCallback(error: any, result: any) {
		if (error != null) {
			this.errorMessage = "Something went wrong...please try again";
		} else {
			this.router.navigate(['/home/confirmRegistration', this.email]);
		}
	}
}