import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {UserRegistrationService} from "./service/user-registration.service";
import {UserParametersService} from "./service/user-parameters.service";
import {UserLoginService} from "./service/user-login.service";
import {CognitoUtil} from "./service/cognito.service";
import {AwsUtil} from "./service/aws.service";
import {DynamoDBService} from "./service/ddb.service";
import {HttpClientModule} from "@angular/common/http";
import {SecureHomeModule} from "./secure-home/secure-home.module";
import {PublicHomeModule} from "./public-home/public-home.module";
import {RouterModule} from "@angular/router";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		RouterModule.forRoot([]),
		HttpClientModule,
		SecureHomeModule,
		PublicHomeModule
	],
	providers: [
		CognitoUtil,
		AwsUtil,
		DynamoDBService,
		UserRegistrationService,
		UserLoginService,
		UserParametersService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
