import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import GHGEmissionsCalculator from '../imports/ui/pages/ghg-emissions-calculator/GHGEmissionsCalculator';
import { emissionsCalculator } from './GHG.Emissions.Calculator';
import { SignUpPage } from './signup.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme', input: 30 };
const signup = { firstName: 'Johnny', lastName: 'Guitar', zipcode: '98674', email: 'johnny@foo.com', password: '12345678', cPassword: '12345678'};

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
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the GHG Emissions Calculator works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await emissionsCalculator.testCalculation(testController, credentials.input);
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
