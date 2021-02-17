import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarHome from '../components/home/NavBarHome';

/** A simple static component to render the home page when users are logged in. */
class GHGEmissionsCalculator extends React.Component {



  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    console.log(e.target.value);
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit() {
    const input = this.state;
    console.log("this works");
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
            <Input
                label={{ basic: true, content: 'gal' }}
                labelPosition='right'
                placeholder='Enter gallons of gasoline...'
                name="GHG"
                onChange={this.handleChange.bind(this)}
            />
            <Button
                attached='bottom'
                content='Click'
                onClick={this.submit}
                onKeyPress={this.submit}
            />
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
