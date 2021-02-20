import React from 'react';
import { Grid, Segment, Header, Statistic, Image, Container, Menu, Button, Card, Dropdown, } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarHome from '../components/home/NavBarHome';

/** A simple static component to render the home page when users are logged in. */
class GoToSavings extends React.Component {

  render() {
    const inCardStyle = {
      /**width: 50,
      height: 20,
      textAlignment: 'center',
      marginLeft: '0em',
      paddingTop: '3em',
      backgroundColor: 'green',**/
      textSize: 50,
    };

    const cardStyle = {
      marginLeft: '20em',
      marginRight: '5em',
      paddingTop: '10em',
      alignment: 'left',
    };

    const pageStyle = {
      marginLeft: '20em',
      paddingTop: '10em',
      paddingBottom: '150px',
      height: '47.9em',
      backgroundSize: 'cover',
      marginTop: '-10px',
      marginRight: '6em',
    };
    return (
        <div className='Home-page-background'>
          <NavBarHome/>

          <Card.Group style = {cardStyle}>
            <Card>
              <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='images/HEI-WAVE-LOGO.png'
                />
                <Card.Header>Your Car</Card.Header>
                <Card.Meta>Car(s)' make and modole</Card.Meta>
                <Card.Description>See what your car's out put is</Card.Description>
              </Card.Content>

              <Card.Content extra color='green'>
                <div className='ui four buttons'>
                  <Button color='green' as={NavLink} exact to="/notfound">Add Usage</Button>
                  <Button color='blue' as={NavLink} exact to="/notfound">Add Car</Button>
                  <Button color='red' as={NavLink} exact to="/notfound">Delete Car</Button>
                  <Button color='green' as={NavLink} exact to="/notfound" style = {inCardStyle}>Daily Use</Button>

                </div>
        </Card.Content>
        </Card>
    <Card>
      <Card.Content>
        <Image
            floated='right'
            size='mini'
            src='images/HEI-WAVE-LOGO.png'
        />
        <Card.Header>Molly Thomas</Card.Header>
        <Card.Meta>New User</Card.Meta>
        <Card.Description>
          Molly wants to add you to the group <strong>musicians</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
    <Card>
    <Card.Content>
    <Image
    floated='right'
    size='mini'
    src='images/HEI-WAVE-LOGO.png'
        />
        <Card.Header>Jenny Lawrence</Card.Header>
    <Card.Meta>New User</Card.Meta>
    <Card.Description>
    Jenny requested permission to view your contact details
    </Card.Description>
  </Card.Content>
  <Card.Content extra>
  <div className='ui two buttons'>
  <Button basic color='green'>
  Approve
  </Button>
  <Button basic color='red'>
  Decline
  </Button>
  </div>
  </Card.Content>
  </Card>
  </Card.Group>
        </div>
    );
  }
}

/** Declare the types of all properties. */
GoToSavings.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const GoToSavingsContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(GoToSavings);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(GoToSavingsContainer);

