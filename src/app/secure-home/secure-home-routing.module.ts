import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecureHomeComponent} from "./secure-home.component";
import {PlaceOrderComponent} from "./orders/place-order/place-order.component";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
	{
		path: 'secure-home',
		component: SecureHomeComponent,
		children: [
			{path: 'place-order', component: PlaceOrderComponent},
			{path: 'logout', component: LogoutComponent}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SecureHomeRoutingModule {
}
