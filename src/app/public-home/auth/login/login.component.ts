import {Component, OnInit} from '@angular/core';
import {ChallengeParameters, CognitoCallback, LoggedInCallback} from "../../../service/cognito.service";
import {DynamoDBService} from "../../../service/ddb.service";
import {UserLoginService} from "../../../service/user-login.service";
import {Router} from "@angular/router";

@Component({
	selector: 'awscognito-angular2-app',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements CognitoCallback, LoggedInCallback, OnInit {
	email: string;
	password: string;
	errorMessage: string;
	mfaStep = false;
	mfaData = {
		destination: '',
		callback: null
	};

	constructor(public router: Router,
				public ddb: DynamoDBService,
				public userService: UserLoginService) {
		console.log("LoginComponent constructor");
	}

	ngOnInit() {
		this.errorMessage = null;
		console.log("LoginComponent: checking if the user is already authenticated. If so, then redirect to the secure site");
		this.userService.isAuthenticated(this);
	}

	onLogin(platform: string) {
		if (platform == 'cognito') {
			if (this.email == null || this.password == null) {
				this.errorMessage = "All fields are required";
				return;
			}
			this.errorMessage = null;
			this.userService.authenticate(this.email, this.password, platform, this);
		} else if (platform == 'facebook') {
			this.userService.authenticate(this.email, this.password, platform, this);
		}
	}

	cognitoCallback(message: string, result: any) {
		if (message != null) { //error
			this.errorMessage = message;
			console.log("result: " + this.errorMessage);
			if (this.errorMessage === 'User is not confirmed.') {
				console.log("redirecting");
				this.router.navigate(['/home/confirmRegistration', this.email]);
			} else if (this.errorMessage === 'User needs to set password.') {
				console.log("redirecting to set new password");
				this.router.navigate(['/home/newPassword']);
			}
		} else { //success
			this.ddb.writeLogEntry("login");
			this.router.navigate(['/secure-home/place-order']);
			console.log('Operation completed');
		}
	}

	handleMFAStep(challengeName: string, challengeParameters: ChallengeParameters, callback: (confirmationCode: string) => any): void {
		this.mfaStep = true;
		this.mfaData.destination = challengeParameters.CODE_DELIVERY_DESTINATION;
		this.mfaData.callback = (code: string) => {
			if (code == null || code.length === 0) {
				this.errorMessage = "Code is required";
				return;
			}
			this.errorMessage = null;
			callback(code);
		};
	}

	isLoggedIn(message: string, isLoggedIn: boolean) {
		if (isLoggedIn) {
			this.router.navigate(['/secure-home/place-order']);
		}
	}

	cancelMFA(): boolean {
		this.mfaStep = false;
		return false;   //necessary to prevent href navigation
	}
}