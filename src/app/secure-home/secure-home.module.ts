import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecureHomeRoutingModule} from './secure-home-routing.module';
import {SecureHomeComponent} from './secure-home.component';
import {PlaceOrderComponent} from './orders/place-order/place-order.component';
import {LogoutComponent} from './logout/logout.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {PublicHomeModule} from "../public-home/public-home.module";

@NgModule({
	imports: [
		CommonModule,
		SecureHomeRoutingModule,
		FormsModule,
		RouterModule,
		PublicHomeModule
	],
	declarations: [SecureHomeComponent, PlaceOrderComponent, LogoutComponent]
})
export class SecureHomeModule {
}
