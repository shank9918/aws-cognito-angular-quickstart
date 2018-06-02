import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MFAComponent} from "./mfa.component";

describe('MfaComponent', () => {
	let component: MFAComponent;
	let fixture: ComponentFixture<MFAComponent>;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MFAComponent]
		})
			.compileComponents();
	}));
	beforeEach(() => {
		fixture = TestBed.createComponent(MFAComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
