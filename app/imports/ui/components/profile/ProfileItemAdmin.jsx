import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListProfileAdmin.jsx. */
class ProfileItemAdmin extends React.Component {

  removeUser(docID) {
    Meteor.users.remove(docID);
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.profile.user}</Table.Cell>
          <Table.Cell>{this.props.profile.firstName}</Table.Cell>
          <Table.Cell>{this.props.profile.lastName}</Table.Cell>
          <Table.Cell>{this.props.profile.password}</Table.Cell>
          <Table.Cell>{this.props.profile.transportation}</Table.Cell>
          <Table.Cell>{this.props.profile.zipcode}</Table.Cell>
          <Table.Cell>
            <Button as={NavLink} exact to='/admin'
                    data={this.props.profile._id}
                    onClick={(data) => this.removeUser(data)} color='red'
            >
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileItemAdmin.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItemAdmin;
