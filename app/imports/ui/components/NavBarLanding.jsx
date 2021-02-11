import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBarLanding extends React.Component {
  render() {
    const menuStyle = { height: '10px', paddingTop: '10px' };
    return (
        <div style={menuStyle}>

          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Image src='/images/HEI-LOGO.png' style={{ width: '10%', marginTop: '25px', paddingLeft: '20px' }}/>
          </Menu.Item>
          <Menu.Item>
            {this.props.currentUser === '' ? (
                <Dropdown id="login-dropdown" text="LOGIN" pointing="top right" style={{
                  paddingLeft: '92%',
                  color: '#3CAEA3',
                  fontSize: '15px',
                  letterSpacing: '2px',
                  fontWeight: 'bold',
                  zIndex: 'auto',
                  top: '-2.3em',
                }}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact
                                   to="/signin"/>
                    <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact
                                   to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}
                          style={{
                            paddingLeft: '92%',
                            color: '#3CAEA3',
                            fontSize: '15px',
                            letterSpacing: '2px',
                            fontWeight: 'bold',
                            zIndex: 'auto',
                            top: '-2.3em',
                          }}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact
                                   to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>

          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item position="right">

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