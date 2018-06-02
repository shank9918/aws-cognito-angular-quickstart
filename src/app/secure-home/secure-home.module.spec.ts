import {SecureHomeModule} from './secure-home.module';

describe('SecureHomeModule', () => {
	let secureHomeModule: SecureHomeModule;
	beforeEach(() => {
		secureHomeModule = new SecureHomeModule();
	});
	it('should create an instance', () => {
		expect(secureHomeModule).toBeTruthy();
	});
});
