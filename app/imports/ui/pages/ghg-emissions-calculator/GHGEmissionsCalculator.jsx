import React from 'react';
import { Form, Segment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarHome from '../../components/navbar/NavBarHome';

/** A simple static component to render the GHGEmissionsCalculator when users are logged in. */
class GHGEmissionsCalculator extends React.Component {

  /** Initialize component state with properties for input */
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  /** This function calculates the CO2 created by user inputted gallons. */
  calculateCO2 = function () {
    const mutltifactor = 10 ** -3;
    return (this.state.input * (8.887 * mutltifactor)).toFixed(2);
  };

  /** This function calculates the GHG emissions equivalency. */
  calculateGHG = function () {
    const mutltifactor = 0.00043;
    return (4.63 * (this.state.input * mutltifactor)).toFixed(3);
  };

  /** Handle submission by outputing the values to the console. */
  handleFormSubmit = () => {
    // eslint-disable-next-line no-console
    console.log('input:', this.state.input);
    // eslint-disable-next-line no-console
    console.log('input CO2:', this.calculateCO2());
    // eslint-disable-next-line no-console
    console.log('input GHG:', this.calculateGHG());
  }

  /** Update the form controls each time the user interacts with them. */
  handleInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  }

  /** Render the calculation page. */
  render() {
    const pageStyle = {
      marginLeft: '20em',
      paddingTop: '8em',
      paddingBottom: '135px',
      height: '47.9em',
      backgroundSize: 'cover',
      marginTop: '-10px',
      marginRight: '6em',
    };
    return (
        <div className='Home-page-background'>
          <NavBarHome/>
          <div style={pageStyle}>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Input
                  placeholder='Enter gallons...'
                  value={this.state.input}
                  onChange={this.handleInputChange}
                  label={{ basic: true, content: 'gal' }}
              />
              <Form.Button
                  color='teal'
                  style={{ borderRadius: '20px' }}
                  fluid
                  id="calculator-submit"
                  content="calculate"
              />
            </Form>
            <Segment>
              <p> {this.calculateCO2()} Metric tons of CO2 emissions is generated from {this.state.input} gallon(s) of
                gas </p>
              <p> This is equivalent to the GHG emissions from {this.calculateGHG()} passenger vehicles driven for one
                year.</p>
            </Segment>

          </div>
        </div>
    );
  }
}

/** Declare the types of all properties. */
GHGEmissionsCalculator.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const GHGEmissionsCalculatorContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(GHGEmissionsCalculator);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(GHGEmissionsCalculatorContainer);
