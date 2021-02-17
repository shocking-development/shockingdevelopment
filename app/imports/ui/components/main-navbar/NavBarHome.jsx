import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBarHome extends React.Component {
  render() {
    const menuStyle = { height: '10px', paddingTop: '10px' };
    const navbarStyle = {
      position: 'relative',
      zIndex: '1000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      flexGrow: '1',
      width: '100%',
      height: '60px',
      background: '#1f2326',
    };
    const navbarVerticle = {
      position: 'absolute',
      overflow: 'hidden',
      flexDirection: 'column',
      flexGrow: '1',
      background: '#1f2326',
      height: '100%',
    };
    return (
        <div style={menuStyle}>
          <div style={navbarStyle}>
            <Menu.Item as={NavLink} activeClassName="" exact to="/home">
              <Image src='/images/HEI-LOGO.png'
                     style={{ width: '8%', marginTop: '25px', paddingLeft: '20px', marginBottom: '2%' }}/>
            </Menu.Item>
            <Menu.Item>
              {this.props.currentUser === '' ? (
                  <Dropdown id="login-dropdown" text="LOGIN" pointing="top right" style={{
                    color: '#3CAEA3',
                    fontSize: '1.2375em',
                    letterSpacing: '2px',
                    fontWeight: '100',
                    zIndex: 'auto',
                    position: 'absolute',
                    top: '1.7em',
                    left: '85%',
                    paddingRight: '1em',
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
                              color: '#3CAEA3',
                              fontSize: '1.2em',
                              letterSpacing: '2px',
                              fontWeight: '100',
                              zIndex: 'auto',
                              position: 'absolute',
                              top: '25%',
                              left: '87%',
                              paddingRight: '1em',
                            }}>
                    <Dropdown.Menu>
                      <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact
                                     to="/signout"/>
                    </Dropdown.Menu>
                  </Dropdown>
              )}
            </Menu.Item>
          </div>
          <div style={navbarVerticle}>
            {this.props.currentUser ? (
                // eslint-disable-next-line react/jsx-key
                [<Menu inverted pointing vertical>
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/home" key='1home'>Home</Menu.Item>
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/data" key='data1'>Go To
                    Data</Menu.Item>
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='adddata'>Add
                    Data</Menu.Item>
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/addprofile" key='addprof'>Add
                    Profile</Menu.Item>
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='listprof'>List
                    Profile</Menu.Item>
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/ghgCal" key='ghgCal'>ghg cal</Menu.Item>
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/notfound" key='route'>Map
                    your
                    route</Menu.Item>
                </Menu>,
                ]
            ) : ''}

            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'
                           style={{ color: 'white', marginLeft: '20px' }}>Admin</Menu.Item>
            ) : ''}
          </div>
          <Menu.Item position="right">

          </Menu.Item>

        </div>
    );
  }
}

/** Declare the types of all properties. */
NavBarHome.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBar2Container = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBarHome);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBar2Container);
