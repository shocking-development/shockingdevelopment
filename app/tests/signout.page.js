import { Selector } from 'testcafe';

class SignoutPage {
  constructor() {
    this.pageId = '#navbar-sign-out';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const signoutPage = new SignoutPage();
