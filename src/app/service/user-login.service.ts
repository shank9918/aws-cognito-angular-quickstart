import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {DynamoDBService} from "./ddb.service";
import {Callback, CognitoCallback, CognitoUtil, LoggedInCallback} from "./cognito.service";
import {AuthenticationDetails, CognitoUser, CognitoUserSession} from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";
import * as STS from "aws-sdk/clients/sts";

declare var FB: any;

@Injectable()
export class UserLoginService {
	private platform: string;
	private onCognitoLoginSuccess = (callback: CognitoCallback, session: CognitoUserSession) => {
		console.log("UserLoginService.onCognitoLoginSuccess: In authenticateUser onSuccess callback");
		AWS.config.credentials = this.cognitoUtil.buildCognitoCreds(session.getIdToken().getJwtToken());
		this.invokeCallback(callback, session);
	};
	private onFacebookLoginSuccess = (callback: CognitoCallback, response: any) => {
		console.log("UserLoginService.onFacebookLoginSuccess: In authenticateUser onSuccess callback");
		AWS.config.credentials = this.cognitoUtil.buildFacebookCreds(response);
		this.invokeCallback(callback, null);
	};
	private onLoginError = (callback: CognitoCallback, err) => {
		callback.cognitoCallback(err.message, null);
	};

	constructor(public ddb: DynamoDBService, public cognitoUtil: CognitoUtil) {
		FB.init(environment.fb_configs);
	}

	authenticate(username: string, password: string, platform: string, callback: CognitoCallback) {
		console.log("UserLoginService: starting the authentication");
		this.platform = platform;
		let authenticationData = {
			Username: username,
			Password: password,
		};
		let authenticationDetails = new AuthenticationDetails(authenticationData);
		let userData = {
			Username: username,
			Pool: this.cognitoUtil.getUserPool()
		};
		if (this.platform == 'cognito') {
			console.log("UserLoginService: authenticating the user against cognito");
			let cognitoUser = new CognitoUser(userData);
			cognitoUser.authenticateUser(authenticationDetails, {
				newPasswordRequired: (userAttributes, requiredAttributes) => callback.cognitoCallback(`User needs to set password.`, null),
				onSuccess: result => this.onCognitoLoginSuccess(callback, result),
				onFailure: err => this.onLoginError(callback, err),
				mfaRequired: (challengeName, challengeParameters) => {
					callback.handleMFAStep(challengeName, challengeParameters, (confirmationCode: string) => {
						cognitoUser.sendMFACode(confirmationCode, {
							onSuccess: result => this.onCognitoLoginSuccess(callback, result),
							onFailure: err => this.onLoginError(callback, err)
						});
					});
				}
			});
		} else if (this.platform == 'facebook') {
			FB.login(response => this.onFacebookLoginSuccess(callback, response));
		}
	}

	forgotPassword(username: string, callback: CognitoCallback) {
		let userData = {
			Username: username,
			Pool: this.cognitoUtil.getUserPool()
		};
		let cognitoUser = new CognitoUser(userData);
		cognitoUser.forgotPassword({
			onSuccess: function () {
			},
			onFailure: function (err) {
				callback.cognitoCallback(err.message, null);
			},
			inputVerificationCode() {
				callback.cognitoCallback(null, null);
			}
		});
	}

	confirmNewPassword(email: string, verificationCode: string, password: string, callback: CognitoCallback) {
		let userData = {
			Username: email,
			Pool: this.cognitoUtil.getUserPool()
		};
		let cognitoUser = new CognitoUser(userData);
		cognitoUser.confirmPassword(verificationCode, password, {
			onSuccess: function () {
				callback.cognitoCallback(null, null);
			},
			onFailure: function (err) {
				callback.cognitoCallback(err.message, null);
			}
		});
	}

	signout(callback: Callback) {
		let cognitoUser = this.cognitoUtil.getCurrentUser()
		if (cognitoUser != null) {
			this.cognitoUtil.getCurrentUser().signOut();
			console.log('UserLoginService: logged out from cognito');
		}
		FB.getLoginStatus(function (response) {
			if (response.status == 'connected' || response.status == 'not_authorized') {
				FB.logout((response) => {
					console.log('UserLoginService: logged out from facebook');
					callback.callbackWithParam(response);
				});
			}
		});
		this.ddb.writeLogEntry("logout");
	}

	isAuthenticated(callback: LoggedInCallback) {
		if (callback == null)
			throw("UserLoginService: Callback in isAuthenticated() cannot be null");
		let cognitoUser = this.cognitoUtil.getCurrentUser();
		if (cognitoUser != null) {
			cognitoUser.getSession(function (err, session) {
				if (err) {
					console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
					callback.isLoggedIn(err, false);
				}
				else {
					console.log("UserLoginService: Session is " + session.isValid());
					callback.isLoggedIn(err, session.isValid());
				}
			});
		}
		FB.getLoginStatus(function (response) {
			if (response.status == 'connected') {
				console.log("UserLoginService: facebook status connected");
				callback.isLoggedIn(null, true);
			} else if (response.status == 'not_authorized ') {
				console.log("UserLoginService: facebook status not_authorized");
				// TODO call onFacebookLoginSuccess and try to authorize the user
			}
		});
		callback.isLoggedIn('not authenticated', false);
	}

	private invokeCallback(callback: CognitoCallback, session: CognitoUserSession) {

		// So, when CognitoIdentity authenticates a user, it doesn't actually hand us the IdentityID,
		// used by many of our other handlers. This is handled by some sly underhanded calls to AWS Cognito
		// API's by the SDK itself, automatically when the first AWS SDK request is made that requires our
		// security credentials. The identity is then injected directly into the credentials object.
		// If the first SDK call we make wants to use our IdentityID, we have a
		// chicken and egg problem on our hands. We resolve this problem by "priming" the AWS SDK by calling a
		// very innocuous API call that forces this behavior.
		let clientParams: any = {};
		if (environment.sts_endpoint) {
			clientParams.endpoint = environment.sts_endpoint;
		}
		let sts = new STS(clientParams);
		sts.getCallerIdentity(function (err, data) {
			console.log("UserLoginService: successfully set the AWS credentials");
			callback.cognitoCallback(null, session);
		});
	}
}
