import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarMain from '../components/main-navbar/NavBarMain';
import SavingsPageBarGraph from '../components/defaultcharts/SavingsPageBarGraph';

/** A simple static component to render the home page when users are logged in. */
class GoToSavings extends React.Component {

  render() {

    const dataPageBarGraphstyling = {
      background: 'rgb(200, 200, 200)',
      borderRadius: '5px',
      paddingTop: '5px',
      paddingRight: '5px',
      color: 'black',
    };

    const inCardStyle = {
      textSize: 50,
    };

    const cardStyle = {
      marginLeft: '20em',
      marginRight: '5em',
      paddingTop: '10em',
      alignment: 'left',
    };

    const pageStyle = {
      background: 'rgb(21 51 62)',
      height: '70em',
    };

    return (
        <div style={pageStyle}>
          <NavBarMain/>

          <Card.Group style={cardStyle}>
            <Card>
              <Card.Content>
                <div align="right"><Icon name='car'/></div>
                <Card.Header>Car</Card.Header>
                <Card.Meta>How much would you save by using this car.</Card.Meta>
                <Card.Description>{this.props.currentUser.transportation}</Card.Description>
              </Card.Content>
              <Card.Content>
                <div style={dataPageBarGraphstyling}>
                  <SavingsPageBarGraph/>
                </div>
              </Card.Content>
              <Card.Content extra color='green'>
                <div className='ui three buttons'>
                  <Button color='green' as={NavLink} exact to="/add">Input Usage</Button>
                  <Button color='green' as={NavLink} exact to="/notfound">Input Car</Button>
                  <Button color='green' as={NavLink} exact to="/notfound" style={inCardStyle}>See results</Button>

                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <div align="right"><Icon name='battery three'/></div>
                <Card.Header>Electric Car</Card.Header>
                <Card.Meta>How much would you save by using this electric car.</Card.Meta>
                <Card.Description>{this.props.currentUser.transportation}</Card.Description>
              </Card.Content>
              <Card.Content>
                <div style={dataPageBarGraphstyling}>
                  <SavingsPageBarGraph/>
                </div>
              </Card.Content>
              <Card.Content extra color='green'>
                <div className='ui three buttons'>
                  <Button color='green' as={NavLink} exact to="/add">Input Usage</Button>
                  <Button color='green' as={NavLink} exact to="/notfound">Input Car</Button>
                  <Button color='green' as={NavLink} exact to="/notfound" style={inCardStyle}>See results</Button>

                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <div align="right"><Icon align="right" name='truck'/></div>
                <Card.Header>Car Pool</Card.Header>
                <Card.Meta>How much would you save by using this carpool.</Card.Meta>
                <Card.Description>{this.props.currentUser.transportation}</Card.Description>
              </Card.Content>

              <Card.Content>
                <div style={dataPageBarGraphstyling}>
                  <SavingsPageBarGraph/>
                </div>
              </Card.Content>

              <Card.Content extra>
                <div className='ui four buttons'>
                  <Button color='green' as={NavLink} exact to="/add">Input Usage</Button>
                  <Button color='green' as={NavLink} exact to="/add">Input Car</Button>
                  <Button color='green' as={NavLink} exact to="/notfound">Input Members</Button>
                  <Button color='green' as={NavLink} exact to="/notfound" style={inCardStyle}>See results</Button>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <div align="right"><Icon name='bus'/>
                  <Icon name='train'/></div>
                <Card.Header>Public Transport</Card.Header>
                <Card.Meta>How much would you save by using this public transport system.</Card.Meta>
                <Card.Description>{this.props.currentUser.transportation}</Card.Description>
              </Card.Content>

              <Card.Content>
                <div style={dataPageBarGraphstyling}>
                  <SavingsPageBarGraph/>
                </div>
              </Card.Content>

              <Card.Content extra>
                <div className='ui three buttons'>
                  <Button color='green' as={NavLink} exact to="/add">Input Usage</Button>
                  <Button color='green' as={NavLink} exact to="/add">Input type</Button>
                  <Button color='green' as={NavLink} exact to="/notfound" style={inCardStyle}>See results</Button>
                </div>
              </Card.Content>
            </Card>

            <Card>
              <Card.Content>
                <div align="right"><Icon name='bicycle'/></div>
                <Card.Header>Biking</Card.Header>
                <Card.Meta>How much would you save by Bikeing</Card.Meta>
                <Card.Description>{this.props.currentUser.transportation}</Card.Description>
              </Card.Content>
              <Card.Content>
                <div style={dataPageBarGraphstyling}>
                  <SavingsPageBarGraph/>
                </div>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button color='green' as={NavLink} exact to="/add" style={inCardStyle}>Input Usage</Button>
                  <Button color='green' as={NavLink} exact to="/notfound" style={inCardStyle}>See results</Button>
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
