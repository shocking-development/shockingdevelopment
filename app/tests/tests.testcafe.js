import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { emissionsCalculator } from './GHG.Emissions.Calculator';
import { SignUpPage } from './signup.page';
import { yourSavings } from './Go.To.Savings';
import { emissions } from './Add.Emissions';
import { emissionsCalculatorMetric } from './GHG.Emissions.Calculator.Metric';
import { userProfilePage } from './Profile.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme', inputImperial: 30, inputMetric: 60 };
const signup = { firstName: 'Johnny', lastName: 'Guitar', zipcode: '98674', email: 'johnny@foo.com', password: '12345678', cPassword: '12345678' };
const updateInfo = { firstName: 'Jonathan', lastName: 'MacKenzie', user: 'JohnnyFuntar', email: 'johnny@foo.com', zipcode: '96717', unitSystem: 'metric', password: '87654321', cPassword: '87654321' };
const updatedEmissions = { updateEmissions: 35 };
const updateImperial = { newImperial: 50 };
const updateMetric = { newMetric: 100 }
const addedEmissions = { year: '2019', make: 'Ford', model: 'Mondeo', name: 'Mondeo Hybrid' };

fixture('meteor-application-template-react localhost test with default db')
    .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that GoToSavings page work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await yourSavings.goToSavingsPage(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the GHG Emissions Calculator works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await emissionsCalculator.testCalculation(testController, credentials.inputImperial);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('test that the signup page works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await SignUpPage.signupUser(testController, signup.firstName, signup.lastName, signup.zipcode, signup.email, signup.password, signup.cPassword);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('test that the add emissions page works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await emissions.addTrip(testController);
  await emissions.updateEmissions(testController, updatedEmissions.updateEmissions);
  await emissions.deleteTrip(testController, addedEmissions.year, addedEmissions.make, addedEmissions.model, addedEmissions.name);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('test to make sure that the GHG emissions metric calculator work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await emissionsCalculatorMetric.testCalculationMetric(testController, updateMetric.newMetric);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('test to make sure that the GHG emissions imperial calculator works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await emissionsCalculator.testCalculation(testController, updateImperial.newImperial);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('test that makes sure that everything in the profile page works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await userProfilePage.visitProfile(testController);
  await signoutPage.isDisplayed(testController);
});

test('test that the user can update credentials', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await userProfilePage.editProfile(testController, updateInfo.firstName, updateInfo.lastName, updateInfo.email, updateInfo.zipcode, updateInfo.password, updateInfo.cPassword);
  await userProfilePage.profilePassword(testController);
  await signoutPage.isDisplayed(testController);
});

test('test that will conduct multiple cases at once', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await signoutPage.isDisplayed(testController);
});
