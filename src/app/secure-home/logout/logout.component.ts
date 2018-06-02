import {Component} from '@angular/core';
import {UserLoginService} from "../../service/user-login.service";
import {Router} from "@angular/router";
import {Callback, LoggedInCallback} from "../../service/cognito.service";

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements LoggedInCallback, Callback {
	constructor(public router: Router,
				public userService: UserLoginService) {
		console.log("LogoutComponent constructor");
		this.userService.isAuthenticated(this);
	}

	isLoggedIn(message: string, isLoggedIn: boolean) {
		if (isLoggedIn) {
			console.log('LogoutComponent: logging out')
			this.userService.signout(this);
		}
		this.router.navigate(['/home']);
	}

	callback(): void {
		this.router.navigate(['/home']);
	}

	callbackWithParam(result: any): void {
		this.router.navigate(['/home']);
	}
}
