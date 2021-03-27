import { Selector } from 'testcafe';

class GHGCalculatorMetric {
  constructor() {
    this.pageId = '#calculator-metric';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async testCalculationMetric(testController, determinantMetric) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
    await testController.typeText('#input-metric', determinantMetric);
    await testController.click('#submit-metric');
  }
}

export const emissionsCalculatorMetric = new GHGCalculatorMetric();
