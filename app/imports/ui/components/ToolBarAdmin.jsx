import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The ToolBar appears at the top of every page. Rendered by the App Layout component. */
class ToolBarAdmin extends React.Component {
  render() {

    const menuStyle = { marginBottom: '10px', background: '#3CAEA3' };
    return (

      <Menu style={menuStyle} attached = "top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName = "" exact to="/landing">
          <Header inverted as = 'h1'>Landing</Header>
          <Menu.Item as={NavLink} activeClassName="" exact to="/home">
            <Image src='/images/HEI.png' style={{ width: '10%', marginTop: '0px' }}/>
          </Menu.Item>
        </Menu.Item>



        {this.props.currentUser ? (
            [ <Menu.Item as={NavLink} activeClassName = "active" exact to="/add" key='add'>Add Stuff</Menu.Item>,

              <Menu.Item position = "right">
                <Dropdown id="list-dropdown" text="List Stuff">
                  <Dropdown.Menu>
                    <Dropdown.Item id="list" key = "list" text="User List" as={NavLink} exact to="/list"/>
                    <Dropdown.Item id="list" key = "listAdmin" text="Admin List" as={NavLink} exact to="/listAdmin"/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>,

              <Menu.Item as={NavLink} activeClassName = "active" exact to="/notfound" key='data'>Go To Data</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName = "active" exact to="/notfound" key='savings'>Go To Savings</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName = "active" exact to="/notfound" key='route'>Map your route</Menu.Item>]
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
              </Dropdown.Menu>
            </Dropdown>

          ) : (
            <Dropdown id="toolbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="toolbar-sign-out" icon = "sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
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
ToolBarAdmin.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const ToolBarAdminContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(ToolBarAdmin);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(ToolBarAdminContainer);
