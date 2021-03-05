import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CarItem extends React.Component {
  render() {
    const options = [
      { key: this.props.car.make, text: this.props.car.make, value: this.props.car.make },
    ];
    return (
        <Dropdown
            placeholder='Select the make of your car'
            fluid
            selection
            options={options}
        />
    );
  }
}

/** Require a document to be passed to this component. */
CarItem.propTypes = {
  car: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CarItem);
