import {Component, OnDestroy, OnInit} from '@angular/core';
import {CognitoCallback} from "../../../service/cognito.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserLoginService} from "../../../service/user-login.service";

@Component({
	selector: 'awscognito-angular2-app',
	templateUrl: './forgot-password-step2.component.html',
	styleUrls: ['./forgot-password-step2.component.css']
})
export class ForgotPasswordStep2Component implements CognitoCallback, OnInit, OnDestroy {
	verificationCode: string;
	email: string;
	password: string;
	errorMessage: string;
	private sub: any;

	constructor(public router: Router, public route: ActivatedRoute,
				public userService: UserLoginService) {
		console.log("email from the url: " + this.email);
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.email = params['email'];
		});
		this.errorMessage = null;
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	onNext() {
		this.errorMessage = null;
		this.userService.confirmNewPassword(this.email, this.verificationCode, this.password, this);
	}

	cognitoCallback(message: string) {
		if (message != null) { //error
			this.errorMessage = message;
			console.log("result: " + this.errorMessage);
		} else { //success
			this.router.navigate(['/home/login']);
		}
	}
}
