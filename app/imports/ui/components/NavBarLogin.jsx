import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBarLogin extends React.Component {
  render() {
    const menuStyle = { height: '10px', paddingTop: '10px' };

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

        </div>
    );
  }
}

/** Declare the types of all properties. */
NavBarLogin.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBar2Container = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBarLogin);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBar2Container);
