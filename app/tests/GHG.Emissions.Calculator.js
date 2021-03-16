import { Selector } from 'testcafe';

class GHGEmissionsCalculator {
  constructor() {
    this.pageId = '#calculator';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
    await testController.expect(rowCount).get(2);
  }
}

export const emissionsCalculator = new GHGEmissionsCalculator();
