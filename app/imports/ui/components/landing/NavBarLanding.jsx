import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';

/**
 * The NavBar appears at the top of the Landing page. Rendered by the Landing page.
 * @memberOf ui/components/landing
 */
function NavBarLanding() { // implement function and have boolean for user/admin

  /* Some styling components */
  const menuStyle = { height: '10px', paddingTop: '10px' };
  const loginButton = {
    color: '#3CAEA3',
    fontSize: '1.2375em',
    letterSpacing: '2px',
    fontWeight: 'bold',
    zIndex: 'auto',
    position: 'absolute',
    top: '1.7em',
    left: '85%',
    paddingRight: '1em',

  };
  const logo = {
    width: '100%',
    marginTop: '25px',
    paddingLeft: '45px',
    height: 'auto',
    maxWidth: '155px',
    left: '6%',
  };

  /* Gets the current user and tells us if we are logging in */
  const { isLoggedIn } = useTracker(() => {
    const userId = Meteor.userId(); // gets the id of the user
    const isLoggingIn = Meteor.loggingIn();
    return {
      userId,
      isLoggingIn,
      isLoggedIn: !!userId, // if the user logged in does not equal the userId then we are signing in
    };
  });

  if (isLoggedIn) { // if we are signing in then render this else
    return <div id='navbar-landing' style={menuStyle}>

      <Menu.Item as={NavLink} activeClassName="" exact to="/">
        <Image src='/images/HEI-LOGO.png' style={logo}/>
      </Menu.Item>

      <Menu.Item>

        <Dropdown className='body' id="navbar-current-user" pointing="top right"
                  icon={'user'}
                  style={loginButton}>
          <Dropdown.Menu>
            <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact
                           to="/signout"/>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>

    </div>;
  }

  return (
      <div id='navbar-landing' style={menuStyle}>

        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image src='/images/HEI-LOGO.png' style={logo}/>
        </Menu.Item>

        <Menu.Item>

          <Dropdown className='body' id="login-dropdown" text="LOGIN" pointing="top right" style={loginButton}>
            <Dropdown.Menu>
              <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact
                             to="/signin"/>
              <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact
                             to="/signup"/>
            </Dropdown.Menu>
          </Dropdown>

        </Menu.Item>
      </div>
  );
}

export default NavBarLanding;
