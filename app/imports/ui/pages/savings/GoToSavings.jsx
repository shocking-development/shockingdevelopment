import React from 'react';
import { Card, Image, Header,  Dropdown  } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarMain from '../../components/main-navbar/NavBarMain';
import { GraphOptions } from '../../components/defaultcharts/SavingsPageBarGraph';
import { UserInfosCars } from '../../../api/userInfo/UserInfoCarCollection';
import { Cars } from '../../../api/cars/CarsCollection';
import { SaveingsGraphCard } from './SavingsGraphCard';
import SavingsQuestions from './SavingsQuestions';

let currentCar = '';
let currentMpg = 30;
let tripM = 5;

// A simple static component to render this page.
class GoToSavings extends React.Component {

  HandlChange = function (event, element) {
    currentMpg = element.children[2];
    currentCar = element.children[0];
    console.log(currentMpg);
  };

  render() {

    // In page styling for the graphs.
    const dataPageBarGraphstyling = {
      background: 'transparent',
      borderRadius: '5px',
      paddingTop: '5px',
      paddingRight: '5px',
      color: 'black',
    };
// eslint-disable-next-line no-unused-vars

    // In page styling for within the display cards
    const inCardStyle = {
      textSize: 50,
    };

    // In page styling for the display cards themselves.
    const cardStyle = {
      marginLeft: '15em',
      marginRight: '5em',
      alignment: 'left',
    };

    // In page styling for the page.
    const pageStyle = {
      background: '#001947',
      height: '100em',
    };

    UserInfosCars.subscribeUserInfoCars();
    const carList = UserInfosCars.find().fetch();
    console.log(carList[0]?.carName);

    // returns the GoToSaveings page.
    return (

        <div style={pageStyle}>
          <NavBarMain/>
          <div style={{
            textAlign: 'center',
            background: '#001947',
            minHeight: '100vh',
            Width: '100%',
            paddingLeft: '15em',
            paddingTop: '8em',
            paddingBottom: '8em',
          }}>
            <Header as='h1' inverted textAlign='center'>SAVINGS</Header>
            <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>
            <SavingsQuestions/>

            <Dropdown className='spacing-menu-item' placeholder="Choose current transportation" pointing="top">
              <Dropdown.Menu>
                <Dropdown className='spacing-menu-item' text="Your Car" pointing="top">
                  <Dropdown.Menu>
                      {carList.map((car) => <Dropdown.Item onClick={this.HandlChange}
                                                           key={car._id}>{car.carName} (MPG: {car.mpgofCar})</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown.Item onClick={this.HandlChange}>Some One else&aposs Car</Dropdown.Item>
                <Dropdown.Item>Bus</Dropdown.Item>
                <Dropdown.Item>Bike</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>


            

            <Card.Group style={cardStyle}>

              { SaveingsGraphCard( "Car", "How much would you save by using this car.",
                  "info",'car', currentMpg * tripM, 38.3 * tripM, currentCar) }
              { SaveingsGraphCard( "Electric Car", "How much would you save by using this electric car.",
                  "info",'battery three', currentMpg * tripM, 0.3 * tripM, currentCar) }
              { SaveingsGraphCard( "Car Pool", "How much would you save by using this carpool.",
                  "info",'truck', currentMpg * tripM, 38.3 * tripM, currentCar) }
              { SaveingsGraphCard( "Public Transport", "How much would you save by using this public transport system.",
                "info", 'bus', currentMpg * tripM, 38.3 * tripM, currentCar) }
              { SaveingsGraphCard( "Biking", "How much would you save by Biking.",
                  "info", 'bicycle', currentMpg * tripM, 0, currentCar) }

            </Card.Group>
          </div>
        </div>
    );
  }
}

// Declare the types of all properties.
GoToSavings.propTypes = {
  currentUser: PropTypes.string,
  Car: PropTypes.array,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const GoToSavingsContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(GoToSavings);







// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(GoToSavingsContainer);
