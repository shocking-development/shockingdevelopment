import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The ToolBar appears at the top of every page. Rendered by the App Layout component. */
class ToolBar extends React.Component {
  render() {

    const menuStyle = { marginBottom: '10px', background: '#001947' };
    return (

        <Menu style={menuStyle} attached="top" borderless inverted>

          {this.props.currentUser ? (
              [<Menu.Item as={NavLink} position="right" activeClassName="active" exact to="/landing"
                          key='landing'>Landing</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/home" key='home'>Home Page</Menu.Item>,
                <Menu.Item as={NavLink} position="right" activeClassName="active" exact to="/add" key='add'>Add
                  Stuff</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/notfound" key='data'>Go To Data</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/notfound" key='savings'>Go To
                  Savings</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/notfound" key='route'>Map your
                  route</Menu.Item>,
              ]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (

                <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact
                                   to="/signin"/>
                    <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact
                                   to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>

            ) : (
                <Dropdown id="toolbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="toolbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact
                                   to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )
            }
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
