import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CarItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.car.carType}</Table.Cell>
          <Table.Cell>{this.props.car.make}</Table.Cell>
          <Table.Cell>{this.props.car.model}</Table.Cell>
          <Table.Cell>{this.props.car.year}</Table.Cell>
          <Table.Cell>{this.props.car.mpg}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
CarItem.propTypes = {
  car: PropTypes.object,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CarItem);
