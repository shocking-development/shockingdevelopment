import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CarItem extends React.Component {
  render() {
    const options = [
      { key: 1, text: 'Choice 1', value: 1 },
      { key: 2, text: 'Choice 2', value: 2 },
      { key: 3, text: 'Choice 3', value: 3 },
    ];
    return (
        <Table.Row>
          <Table.Cell>{this.props.car.firstName}</Table.Cell>
          <Table.Cell>{this.props.car.lastName}</Table.Cell>
          <Table.Cell>{this.props.car.userName}</Table.Cell>
          <Table.Cell>{this.props.car.email}</Table.Cell>
          <Table.Cell>{this.props.car.password}</Table.Cell>
          <Table.Cell>{this.props.car.transportation}</Table.Cell>
          <Table.Cell>{this.props.car.zipcode}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
CarItem.propTypes = {
  car: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CarItem);
