import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The ToolBar appears at the top of every page. Rendered by the App Layout component. */
class ToolBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu style={menuStyle} attached = "top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as = 'h1'>meteor-application-template</Header>
        </Menu.Item>
        {this.props.currentUser ? (
            [<Menu.Item as={NavLink} activeClassName = "active" exact to="/add" key='add'>Add Stuff</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName = "active" exact to="/list" key='list'>List Stuff</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName = "active" exact to = "/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position = "right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing = "top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon = "user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon = "add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                <Dropdown.Item id="login-dropdown-Data" icon = "add user" text="Go To Data" as={NavLink} exact to="/notfound"/>
                <Dropdown.Item id="login-dropdown-savings" icon = "add user" text="Go To Savings" as={NavLink} exact to="/notfound"/>
                <Dropdown.Item id="login-dropdown-map your route" icon = "add user" text="Map your route" as={NavLink} exact to="/notfound"/>
                <Dropdown.Item id="login-dropdown-list-stuff" icon = "add user" text="List Stuff" as={NavLink} exact to="/notfound"/>

              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="toolbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="toolbar-sign-out" icon = "sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
ToolBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const ToolBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(ToolBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(ToolBarContainer);
