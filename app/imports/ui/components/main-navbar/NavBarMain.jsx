import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Image, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/**
 * The NavBarMain appears at the top of every loged-in page. Rendered in pages such as Home, EditProfile, ...
 *  * @memberOf ui/components/main-navbar
 */
class NavBarMain extends React.Component {
  render() {
    /** Some styling components */
    const navbarVerticle = {
      height: '100%', /* Full-height: remove this if you want "auto" height */
      width: 'auto', /* Set the width of the sidebar */
      position: 'fixed', /* Fixed Sidebar (stay in place on scroll) */
      zIndex: '1', /* Stay on top */
      top: '0', /* Stay at the top */
      left: '0',
      overflowX: 'hidden', /* Disable horizontal scroll */
      paddingTop: '20px',
    };

    const userstyling = {
      margin: 'auto',
      width: '86%',
      fontSize: 'large',
      fontWeight: 'lighter',
    };

    return (

        <div className={'css-selector'} style={navbarVerticle}>
          {this.props.currentUser ? (
              // eslint-disable-next-line react/jsx-key
              [<Menu inverted pointing secondary vertical style={{ borderWidth: '0', fontFamily: 'sans-serif' }}>
                <Menu.Item as={NavLink} activeClassName="" exact to="/profile">
                  <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' circular/>
                </Menu.Item>
                <Menu.Item style={userstyling}> Hello, {this.props.currentUser} </Menu.Item>

                <Menu.Item as={NavLink} activeClassName="active" exact to="/profile" key='key8'>
                  <Icon name='user' size='large'/>
                  View Profile
                </Menu.Item>

                <Menu.Item as={NavLink} activeClassName="active" exact to="/home" key='key1'>
                  <Icon name='home' size='large'/>
                  Home
                </Menu.Item>

                <Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='key3'>
                  <Icon name='cloud' size='large'/>
                  Add Today&apos;s Emissions
                </Menu.Item>

                <Menu.Item as={NavLink} activeClassName="active" exact to="/ghgCal" key='key5'>
                  <Icon name='calculator' size='large'/>
                  GHG calculator
                </Menu.Item>

                <Menu.Item as={NavLink} activeClassName="active" exact to="/notfound" key='key6'>
                  <Icon name='map' size='large'/>
                  Map your route
                </Menu.Item>

                <Menu.Item as={NavLink} activeClassName="active" exact to="/gotosavings" key='key6'>
                  <Icon name='map' size='large'/>
                  Go to savings
                </Menu.Item>

                <Menu.Item as={NavLink} activeClassName="active" exact to="/signout" key='key9'>
                  <Icon name='sign-out' size='large'/>
                  Sign Out
                </Menu.Item>

              </Menu>,
              ]
          ) : ''}

          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'
                         style={{ color: 'white', marginLeft: '20px' }}>Admin</Menu.Item>
          ) : ''}
        </div>

    );
  }
}

/** Declare the types of all properties. */
NavBarMain.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBar2Container = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBarMain);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBar2Container);
