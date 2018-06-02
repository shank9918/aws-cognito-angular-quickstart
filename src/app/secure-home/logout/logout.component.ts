import {Component} from '@angular/core';
import {UserLoginService} from "../../service/user-login.service";
import {Router} from "@angular/router";
import {LoggedInCallback} from "../../service/cognito.service";

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements LoggedInCallback {
	constructor(public router: Router,
				public userService: UserLoginService) {
		console.log("LogoutComponent constructor");
		this.userService.isAuthenticated(this);
	}

	isLoggedIn(message: string, isLoggedIn: boolean) {
		if (isLoggedIn) {
			console.log('LogoutComponent: logging out')
			this.userService.logout();
			this.router.navigate(['/home']);
		}
		this.router.navigate(['/home']);
	}
}
