import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SecureHomeComponent} from './secure-home.component';

describe('SecureHomeComponent', () => {
	let component: SecureHomeComponent;
	let fixture: ComponentFixture<SecureHomeComponent>;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SecureHomeComponent]
		})
			.compileComponents();
	}));
	beforeEach(() => {
		fixture = TestBed.createComponent(SecureHomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
