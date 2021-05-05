import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { userInfoRemoveItMethod } from '../../../api/userInfo/UserInfoCarCollection.methods';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ViewAllCarItem extends React.Component {

  render() {
    /* deleteCar function allows users to delete preset cars */
    const deleteCar = ({ _id }) => userInfoRemoveItMethod.call(_id);

    return (
        <Table.Row>
          <Table.Cell>{this.props.car.carName}</Table.Cell>
          <Table.Cell>{this.props.car.yearofCar}</Table.Cell>
          <Table.Cell>{this.props.car.makeofCar}</Table.Cell>
          <Table.Cell>{this.props.car.modelofCar}</Table.Cell>
          <Table.Cell>{this.props.car.mpgofCar}</Table.Cell>
          <Table.Cell>
            <Button id='delete-trip'
                    className={'removeCarbutton'}
                    onClick={() => deleteCar(this.props.car)} color={'red'}
            >
              Remove Car
            </Button>
          </Table.Cell>

        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ViewAllCarItem.propTypes = {
  car: PropTypes.object,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ViewAllCarItem);
