import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';

/**
 * The NavBar appears at the top of the Landing page. Rendered by the Landing page.
 * @memberOf ui/components/landing
 */
class NavBarLanding extends React.Component {
  render() {
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

    return (
        <div id='navbar-landing' style={menuStyle}>

          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Image src='/images/HEI-LOGO.png' style={logo}/>
          </Menu.Item>

          <Menu.Item>
            {this.props.currentUser === '' ? (
                <Dropdown className='body' id="login-dropdown" text="LOGIN" pointing="top right" style={loginButton}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact
                                   to="/signin"/>
                    <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact
                                   to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown className='body' id="navbar-current-user" text={this.props.currentUser} pointing="top right"
                          icon={'user'}
                          style={loginButton}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact
                                   to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>

        </div>
    );
  }
}

/** Declare the types of all properties. */
NavBarLanding.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBar2Container = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBarLanding);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBar2Container);
