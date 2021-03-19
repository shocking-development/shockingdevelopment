import React from 'react';
import { Form, Segment, Header, Container, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import { calculateCO2, calculateGal, calculateGHG } from '../../../api/trips/ghgcalculation';

/** A simple static component to render the GHGEmissionsCalculatorMetricwhen users are logged in. */

/* <Form.Button
    color='teal'
    style={{ borderRadius: '20px' }}
    fluid
    id="calculator-submit"
    content="calculate"
/> */
class GHGEmissionsCalculatorMetric extends React.Component {

  /** Initialize component state with properties for input */
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      show: false,
    };
  }

  /** Toggle segment that shows the calculation result */
  showResult = () => {
    this.setState({
      show: true,
    });
  }

  /** Handle submission by outputing the values to the console. */
  handleFormSubmit = () => {
    // eslint-disable-next-line no-console
    console.log('input:', this.state.input);
    // eslint-disable-next-line no-console
    console.log('convert liters to US units:', calculateGal(this.state.input));
    // eslint-disable-next-line no-console
    console.log('input CO2:', calculateCO2(calculateGal(this.state.input)));
    // eslint-disable-next-line no-console
    console.log('input GHG:', calculateGHG(calculateGal(this.state.input)));
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
      paddingTop: '20em',
      paddingBottom: '10em',
      height: '59em',
      backgroundSize: 'cover',
      margin: 'auto',
      width: '66%',

    };

    const outer_div_pagestyle = {
      background: 'rgb(21 51 62)',
      backgroundSize: 'cover',
      height: '100%',
    };

    const containerStyle = {
      paddingTop: '10em',
      paddingLeft: '5em',
      paddingRight: '5em',
      paddingBottom: '10em',
      backgroundColor: 'white',
    };

    return (
        <div style={outer_div_pagestyle}>
          <NavBarHome/>
          <div style={pageStyle}>
            <Container style={containerStyle} className='signupcontainer'>
              <Header inverted size={'huge'}>Greenhouse Gas Calculator For Metric Units</Header>
              <Form size='small' onSubmit={this.handleFormSubmit}>
                <Form.Input
                    placeholder='Enter liters of gas'
                    value={this.state.input}
                    onChange={this.handleInputChange}
                />
                <Button color='blue' onClick={this.showResult}>Calculate</Button>
              </Form>
              {this.state.show &&
              (<Segment>
                <p> {calculateCO2(this.state.input)} tons of CO2 emissions is generated
                  from {this.state.input} liter(s) of
                  gas </p>
                <p> This is equivalent to the GHG emissions from {calculateGHG(this.state.input)} passenger vehicles
                  driven for one
                  year.</p>
              </Segment>)}
            </Container>
          </div>
        </div>
    );
  }
}

/** Declare the types of all properties. */
GHGEmissionsCalculatorMetric.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const GHGEmissionsCalculatorContainerMetric = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(GHGEmissionsCalculatorMetric);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(GHGEmissionsCalculatorContainerMetric);
