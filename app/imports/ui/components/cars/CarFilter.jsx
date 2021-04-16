import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export class CarFilter extends React.Component {
  state = { isFilter: false, make: 'All Makes' };

  make;

  constructor(props) {
    super(props);
    this.state = { isFilter: false, make: 'All Makes' };
    this.make = 'All Makes';
  }

  select(make) {
    this.make = make;
    // eslint-disable-next-line react/prop-types
    this.props.sendMaker(this.make);
  }

  renderMake() {
    // eslint-disable-next-line react/prop-types
    const dataArray = this.props.make;

    // eslint-disable-next-line react/prop-types
    return dataArray.map((make, i) => <Dropdown.Item key={i} onClick={() => this.select(make)} >
      {make}
    </Dropdown.Item>);
  }

  render() {

    return (
        <div>
          <div>
            <Dropdown text="Pick a major" clearable >
              <Dropdown.Menu>
                {this.renderMake()}
              </Dropdown.Menu>
            </Dropdown>
          </div>

        </div>
    );
  }
}
CarFilter.propTypes = {
  search: PropTypes.array,
};

export default withRouter(CarFilter);
