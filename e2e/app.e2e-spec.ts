import { AwsCognitoAngularQuickstartPage } from './app.po';

describe('aws-cognito-angular-quickstart App', function() {
  let page: AwsCognitoAngularQuickstartPage;

  beforeEach(() => {
    page = new AwsCognitoAngularQuickstartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
