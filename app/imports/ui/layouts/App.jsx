import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import ListProfileAdmin from '../pages/profile/ListProfileAdmin';
import EditProfile from '../pages/profile/EditProfile';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Datapage from '../pages/Datapage';
import GoToSavings from '../pages/GoToSavings';
import AddEmissions from '../pages/AddEmissions';
import AddProfile from '../pages/profile/AddProfile';
import ProfileCard from '../pages/profile/ProfileCard';
import GHGEmissionsCalculator from '../pages/ghg-emissions-calculator/GHGEmissionsCalculator';
import CarsDropdown from '../pages/cars/CarsDropdown';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/signout" component={Signout}/>
              <Route path="/landing" component={Landing}/>
              <Route path="/gotosavings" component={GoToSavings}/>
              <ProtectedRoute path="/home" component={Home}/>
              <ProtectedRoute path="/add" component={AddEmissions}/>
              <ProtectedRoute path="/addprofile" component={AddProfile}/>
              <ProtectedRoute path="/edit/:_id" component={EditProfile}/>
              <ProtectedRoute path="/profile" component={ProfileCard}/>
              <ProtectedRoute path="/data" component={Datapage}/>
              <ProtectedRoute path="/cars" component={CarsDropdown}/>
              <ProtectedRoute path="/ghgCal" component={GHGEmissionsCalculator}/>
              <AdminProtectedRoute path="/admin" component={ListProfileAdmin}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
