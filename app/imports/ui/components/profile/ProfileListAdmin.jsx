import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ProfileListAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.userinfo.username}</Table.Cell>
          <Table.Cell>{this.props.userinfo.firstName }</Table.Cell>
          <Table.Cell>{this.props.userinfo.lastName }</Table.Cell>
          <Table.Cell>{this.props.userinfo.email}</Table.Cell>
          <Table.Cell>{this.props.userinfo.zipcode}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileListAdmin.propTypes = {
  userinfo: PropTypes.object.isRequired,
};

export default ProfileListAdmin;
