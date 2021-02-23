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
                <Card.Meta>How much are you saving by using a carpool</Card.Meta>
                <Card.Description>{this.props.currentUser.transportation}</Card.Description>
              </Card.Content>

              <Card.Content extra color='green'>
                <div className='ui three buttons'>
                  <Button color='green' as={NavLink} exact to="/add">Input Usage</Button>
                  <Button color='green' as={NavLink} exact to="/notfound">Input Car</Button>
                  <Button color='green' as={NavLink} exact to="/notfound" style = {inCardStyle}>See results</Button>

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
        <Card.Header>Your Car Pool</Card.Header>
        <Card.Meta>How much are you saving by using a carpool</Card.Meta>
        <Card.Description>{this.props.currentUser.transportation}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui four buttons'>
          <Button color='green' as={NavLink} exact to="/add">Input Usage</Button>
          <Button color='green' as={NavLink} exact to="/add">Input Car</Button>
          <Button color='green' as={NavLink} exact to="/notfound">Input Members</Button>
          <Button color='green' as={NavLink} exact to="/notfound" style = {inCardStyle}>See results</Button>
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
        <Card.Header>Your Bikeing</Card.Header>
    <Card.Meta>How much are you saving by not using a car</Card.Meta>
      <Card.Description>{this.props.currentUser.transportation}</Card.Description>
  </Card.Content>
  <Card.Content extra>
  <div className='ui two buttons'>
    <Button color='green' as={NavLink} exact to="/add" style = {inCardStyle}>Input Usage</Button>
    <Button color='green' as={NavLink} exact to="/notfound" style = {inCardStyle}>See results</Button>
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

