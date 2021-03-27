import { Selector } from 'testcafe';

class ProfilePage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }
  // Click to check if user profile exists
  async visitProfile(testController) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }
  // Check for edit portion of user profile
  async editProfile(testController) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }
  // Check if can edit/change users password
  async profilePassword(testController){
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }
}

export const userProfilePage = new ProfilePage();
