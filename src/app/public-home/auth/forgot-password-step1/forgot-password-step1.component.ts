import {Component} from '@angular/core';
import {UserLoginService} from "../../../service/user-login.service";
import {Router} from "@angular/router";
import {CognitoCallback} from "../../../service/cognito.service";

@Component({
	selector: 'awscognito-angular2-app',
	templateUrl: './forgot-password-step1.component.html',
	styleUrls: ['./forgot-password-step1.component.css']
})
export class ForgotPasswordStep1Component implements CognitoCallback {
	email: string;
	errorMessage: string;

	constructor(public router: Router,
				public userService: UserLoginService) {
		this.errorMessage = null;
	}

	onNext() {
		this.errorMessage = null;
		this.userService.forgotPassword(this.email, this);
	}

	cognitoCallback(message: string, result: any) {
		if (message == null && result == null) { //error
			this.router.navigate(['/home/forgotPassword', this.email]);
		} else { //success
			this.errorMessage = message;
		}
	}
}
