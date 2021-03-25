import React from 'react';
import { Form, Segment, Header, Container, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import { tesing } from '../../../ui/components/defaultcharts/TestinBarGraph';
import  SavingsPageBarGraph  from '../../components/defaultcharts/TestingPageBarGraph';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';


/** A simple static component to render the GHGEmissionsCalculator when users are logged in. */

const dataPageBarGraphstyling = {
  background: 'rgb(200, 200, 200)',
  borderRadius: '5px',
  paddingTop: '5px',
  paddingRight: '5px',
  color: 'black',
};
class GraphTest extends React.Component {


  /** Initialize component state with properties for input */
  constructor(props) {
    super(props);
    this.state = {
      input1: '',
      input2: '',
      input3: '',
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
    /*console.log('input:', this.state.input1);
    // eslint-disable-next-line no-console
    console.log('input CO2:', calculateCO2(this.state.input1));
    // eslint-disable-next-line no-console
    console.log('input GHG:', calculateGHG(this.state.input1))*/
  }

  /** Update the form controls each time the user interacts with them. */
  handleInputChange = (e) => {
    this.setState({
      input1: e.target.value,
    });
  };

  handleInputChange2 = (e) => {
    this.setState({
      input2: e.target.value,
    });
  };

  handleInputChange3 = (e) => {
    this.setState({
      input3: e.target.value,
    });
  };

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
              <Header inverted size={'huge'}>Greenhouse Gas Calculator</Header>
              <Form size='small' onSubmit={this.handleFormSubmit}>
                <Form.Input
                    placeholder='Data 1'
                    value={this.state.input1}
                    onChange={this.handleInputChange}
                />

                <Form.Input
                    placeholder='Data 2'
                    value={this.state.input2}
                    onChange={this.handleInputChange2}
                />

                <Form.Input
                    placeholder='Data 3'
                    value={this.state.input3}
                    onChange={this.handleInputChange3}
                />

                <Button color='blue' onClick={this.showResult}>Calculate</Button>
              </Form>
              {this.state.show &&
              (<Segment>

                <p> tons of CO2 emissions is generated
                  from {this.state.input1} and {this.state.input2} for {this.state.input3} gallon(s) of
                  gas </p>*



              </Segment>)}
            </Container>
          </div>

          <div style={dataPageBarGraphstyling}>
            <SavingsPageBarGraph/>
            <script>{console.log(this.state.input1, this.state.input2, this.state.input3)}</script>
            <div>
              <HighchartsReact
                  highcharts={Highcharts}
                  options={tesing(this.state.input1, this.state.input2, this.state.input3,
                      [this.state.input1, this.state.input2, this.state.input3])}

              />
            </div>

          </div>

        </div>
    );
  }
}

/** Declare the types of all properties. */
GraphTest.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const GraphTestContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(GraphTest);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(GraphTestContainer);
