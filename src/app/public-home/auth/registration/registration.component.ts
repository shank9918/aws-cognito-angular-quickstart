import {Component} from '@angular/core';
import {UserRegistrationService} from "../../../service/user-registration.service";
import {Router} from "@angular/router";
import {CognitoCallback} from "../../../service/cognito.service";

export class RegistrationUser {
	name: string;
	email: string;
	phone_number: string;
	password: string;
}

/**
 * This component is responsible for displaying and controlling
 * the registration of the user.
 */
@Component({
	selector: 'awscognito-angular2-app',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements CognitoCallback {
	registrationUser: RegistrationUser;
	router: Router;
	errorMessage: string;

	constructor(public userRegistration: UserRegistrationService, router: Router) {
		this.router = router;
		this.onInit();
	}

	onInit() {
		this.registrationUser = new RegistrationUser();
		this.errorMessage = null;
	}

	onRegister() {
		this.errorMessage = null;
		this.userRegistration.register(this.registrationUser, this);
	}

	cognitoCallback(message: string, result: any) {
		if (message != null) { //error
			this.errorMessage = message;
			console.log("result: " + this.errorMessage);
		} else { //success
			//move to the next step
			console.log("redirecting");
			this.router.navigate(['/home/confirmRegistration', result.user.username]);
		}
	}
}
