import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserRegistrationService} from "../../../service/user-registration.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'awscognito-angular2-app',
	templateUrl: './confirm-registration.component.html',
	styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit, OnDestroy {
	confirmationCode: string;
	email: string;
	errorMessage: string;
	private sub: any;

	constructor(public regService: UserRegistrationService, public router: Router, public route: ActivatedRoute) {
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.email = params['username'];
		});
		this.errorMessage = null;
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	onConfirmRegistration() {
		this.errorMessage = null;
		this.regService.confirmRegistration(this.email, this.confirmationCode, this);
	}

	cognitoCallback(message: string, result: any) {
		if (message != null) { //error
			this.errorMessage = message;
			console.log("message: " + this.errorMessage);
		} else { //success
			//move to the next step
			console.log("Moving to securehome");
			// this.configs.curUser = result.user;
			this.router.navigate(['/secure-home/place-order']);
		}
	}
}
