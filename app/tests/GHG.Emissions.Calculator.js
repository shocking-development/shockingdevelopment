import { Selector } from 'testcafe';

class GHGCalculator {
  constructor() {
    this.pageId = '#calculator-imperial';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async testCalculation(testController, determinant) {
    await this.isDisplayed(testController);
    await testController.typeText('#input-imperial', determinant);
    await testController.click('#submit-imperial');
  }
}

export const emissionsCalculator = new GHGCalculator();
