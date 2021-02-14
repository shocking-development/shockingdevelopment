import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.profile.firstName}</Table.Cell>
          <Table.Cell>{this.props.profile.lastName}</Table.Cell>
          <Table.Cell>{this.props.profile.userName}</Table.Cell>
          <Table.Cell>{this.props.profile.email}</Table.Cell>
          <Table.Cell>{this.props.profile.password}</Table.Cell>
          <Table.Cell>{this.props.profile.transportation}</Table.Cell>
          <Table.Cell>{this.props.profile.zipcode}</Table.Cell>
          <Table.Cell>
            <Link to={`/editprofile/${this.props.profile._id}`}>Edit</Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileItem);
