import { Selector } from 'testcafe';

class AddEmissions {
  constructor() {
    this.pageId = '#add-emissions';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async updateEmissions(testController, mpg) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
    await testController.typeText('add-mpg', mpg);
    await testController.click('#update-mpg');
  }

  async addTrip(testController) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
    await testController.click();
    await testController.click();
  }
}

export const emissions = new AddEmissions();
