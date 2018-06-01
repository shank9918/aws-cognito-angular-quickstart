import {PublicHomeModule} from './public-home.module';

describe('PublicHomeModule', () => {
  let publicHomeModule: PublicHomeModule;

  beforeEach(() => {
    publicHomeModule = new PublicHomeModule();
  });

  it('should create an instance', () => {
    expect(publicHomeModule).toBeTruthy();
  });
});
