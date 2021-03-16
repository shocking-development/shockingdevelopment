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

  async addTrip(testController, year, make, model, name) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
    await testController.click('select-year', year);
    await testController.click('select-make', make);
    await testController.click('select-model', model);
    await testController.typeText('input-car', name);
  }

  async deleteTrip(testController, year, make, model, name) {
    await testController.click('select-year', year);
    await testController.click('select-make', make);
    await testController.click('select-model', model);
    await testController.typeText('input-car', name);
    await testController.click('delete-trip');
  }
}

export const emissions = new AddEmissions();
