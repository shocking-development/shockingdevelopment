import React from 'react';
import { Input, Form, Segment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarHome from '../components/home/NavBarHome';

/** A simple static component to render the home page when users are logged in. */
class GHGEmissionsCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  calculateGHG = function () {
    const mutltifactor = 10 ** -3;
    return (this.state.input * (8.887 * mutltifactor)).toFixed(2);
  };

  handleFormSubmit = () => {
    console.log('input:', this.state.input);
  }

  handleInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  }

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
              <Form.Input placeholder='Gallons of gas...' value={this.state.input} onChange={this.handleInputChange}/>
              <Form.Button
                  color='teal'
                  style={{ borderRadius: '20px' }}
                  fluid
                  id="calculator-submit"
                  content="calculate"
              />
            </Form>
            <Segment><p> {this.calculateGHG()} tons of GHG emissions generated </p></Segment>

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
