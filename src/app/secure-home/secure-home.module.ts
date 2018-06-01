import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecureHomeRoutingModule} from './secure-home-routing.module';
import {SecureHomeComponent} from './secure-home.component';
import {PlaceOrderComponent} from './orders/place-order/place-order.component';
import {LogoutComponent} from './logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    SecureHomeRoutingModule,
  ],
  declarations: [SecureHomeComponent, PlaceOrderComponent, LogoutComponent]
})
export class SecureHomeModule { }
