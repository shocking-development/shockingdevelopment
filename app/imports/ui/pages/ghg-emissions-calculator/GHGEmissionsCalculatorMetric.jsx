import React from 'react';
import { Form, Segment, Header, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import { calculateCO2, calculateGal, calculateGHG, convertTons } from '../../../api/ghgEquations/ghgcalculation';

/** A simple static component to render the GHGEmissionsCalculatorMetricwhen users are logged in. */
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
    // eslint-disable-next-line no-unused-vars
    const pageStyle = {
      paddingTop: '20em',
      paddingBottom: '10em',
      height: '59em',
      backgroundSize: 'cover',
      margin: 'auto',
      width: '66%',

    };

    const outer_div_pagestyle = {
      background: '#001947',
      backgroundSize: 'cover',
      height: '100%',
    };

    return (
        <div style={outer_div_pagestyle}>
          <NavBarHome/>
          <div style={{
            textAlign: 'center',
            background: '#001947',
            minHeight: '110vh',
            width: '70%',
            paddingLeft: '20em',
            paddingTop: '25em',
            paddingRight: '8em',
            paddingBottom: '8em',
            margin: 'auto',
          }}>

            <Segment className={'viewProfile'}>
              <Header inverted size={'huge'}>Greenhouse Gas Calculator (Metric)</Header>
              <Segment>
                <p>
                  Use this calculator to predict the amount of greenhouse gasses your trip will generate.
                </p>
              </Segment>
              <Form size='small' onSubmit={this.handleFormSubmit}>
                <Form.Input
                    id='calculator-metric'
                    placeholder='Enter liters of gas'
                    value={this.state.input}
                    onChange={this.handleInputChange}
                />
                <Button color='blue' onClick={this.showResult} id='submit-metric'>Calculate</Button>
              </Form>
              {this.state.show &&
              (<Segment>
                <p> {convertTons(calculateCO2(calculateGal(this.state.input)))} tons of CO2 emissions is generated
                  from {this.state.input} liter(s) of
                  gas </p>
                <p> This is equivalent to the GHG emissions
                  from {calculateGHG(calculateGal(this.state.input))} passenger vehicles
                  driven for one
                  year.</p>
              </Segment>)}
            </Segment>
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
