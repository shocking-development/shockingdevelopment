import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class BarGraphItemItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.bar.name}</Table.Cell>
          <Table.Cell>{this.props.bar.dataOne}</Table.Cell>
          <Table.Cell>{this.props.bar.dataTwo}</Table.Cell>
          <Table.Cell>{this.props.bar.dataThree}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
BarGraphItemItem.propTypes = {
  bar: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(BarGraphItemItem);
