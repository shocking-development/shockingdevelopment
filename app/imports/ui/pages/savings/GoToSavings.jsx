import React from 'react';
import { Button, Card, Image, Header, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarMain from '../../components/main-navbar/NavBarMain';
import SavingsPageBarGraph from '../../components/defaultcharts/SavingsPageBarGraph';

// A simple static component to render this page.
class GoToSavings extends React.Component {

  render() {

    // In page styling for the graphs.
    const dataPageBarGraphstyling = {
      background: 'transparent',
      borderRadius: '5px',
      paddingTop: '5px',
      paddingRight: '5px',
      color: 'black',
    };

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
            <Card.Group style={cardStyle}>
              <Card style={{ background: 'rgba(0, 73, 122, 0.5)', boxShadow: 'none' }}>
                <Card.Content>
                  <div align="right"><Icon inverted name='car'/></div>
                  <Card.Header className={'CarcardFont'}>Car</Card.Header>
                  <Card.Meta className={'CarcardFont'}>How much would you save by using this car.</Card.Meta>
                  <Card.Description className={'CarcardFont'}>{this.props.currentUser.transportation}</Card.Description>
                </Card.Content>
                <Card.Content>
                  <div style={dataPageBarGraphstyling}>
                    <SavingsPageBarGraph/>
                  </div>
                </Card.Content>
                <Card.Content extra color='teal'>
                  <div className='ui three buttons'>
                    <Button color='teal' as={NavLink} exact to="/add">Input Usage</Button>
                    <Button color='teal' as={NavLink} exact to="/notfound">Input Car</Button>
                    <Button color='teal' as={NavLink} exact to="/notfound" style={inCardStyle}>See results</Button>

                  </div>
                </Card.Content>
              </Card>

              <Card style={{ background: 'rgba(0, 73, 122, 0.5)', boxShadow: 'none' }}>
                <Card.Content>
                  <div align="right"><Icon inverted name='battery three'/></div>
                  <Card.Header className={'CarcardFont'}>Electric Car</Card.Header>
                  <Card.Meta className={'CarcardFont'}>How much would you save by using this electric car.</Card.Meta>
                  <Card.Description className={'CarcardFont'}>{this.props.currentUser.transportation}</Card.Description>
                </Card.Content>

                <Card.Content className={'CarcardFont'}>
                  <div style={dataPageBarGraphstyling}>
                    <SavingsPageBarGraph/>
                  </div>
                </Card.Content>

                <Card.Content extra color='teal'>
                  <div className='ui three buttons'>
                    <Button color='teal' as={NavLink} exact to="/add">Input Usage</Button>
                    <Button color='teal' as={NavLink} exact to="/notfound">Input Car</Button>
                    <Button color='teal' as={NavLink} exact to="/notfound" style={inCardStyle}>See results</Button>

                  </div>
                </Card.Content>
              </Card>

              <Card style={{ background: 'rgba(0, 73, 122, 0.5)', boxShadow: 'none' }}>
                <Card.Content>
                  <div align="right"><Icon inverted align="right" name='truck'/></div>
                  <Card.Header className={'CarcardFont'}>Car Pool</Card.Header>
                  <Card.Meta className={'CarcardFont'}>How much would you save by using this carpool.</Card.Meta>
                  <Card.Description className={'CarcardFont'}>{this.props.currentUser.transportation}</Card.Description>
                </Card.Content>

                <Card.Content>
                  <div style={dataPageBarGraphstyling}>
                    <SavingsPageBarGraph/>
                  </div>
                </Card.Content>

                <Card.Content extra>
                  <div className='ui four buttons'>
                    <Button color='teal' as={NavLink} exact to="/add">Input Usage</Button>
                    <Button color='teal' as={NavLink} exact to="/add">Input Car</Button>
                    <Button color='teal' as={NavLink} exact to="/notfound">Input Members</Button>
                    <Button color='teal' as={NavLink} exact to="/notfound" style={inCardStyle}>See results</Button>
                  </div>
                </Card.Content>
              </Card>

              <Card style={{ background: 'rgba(0, 73, 122, 0.5)', boxShadow: 'none' }}>
                <Card.Content>
                  <div align="right"><Icon inverted name='bus'/>
                    <Icon inverted name='train'/></div>
                  <Card.Header className={'CarcardFont'}>Public Transport</Card.Header>
                  <Card.Meta className={'CarcardFont'}>How much would you save by using this public transport system.</Card.Meta>
                  <Card.Description className={'CarcardFont'}>{this.props.currentUser.transportation}</Card.Description>
                </Card.Content>

                <Card.Content>
                  <div style={dataPageBarGraphstyling}>
                    <SavingsPageBarGraph/>
                  </div>
                </Card.Content>

                <Card.Content extra>
                  <div className='ui three buttons'>
                    <Button color='teal' as={NavLink} exact to="/add">Input Usage</Button>
                    <Button color='teal' as={NavLink} exact to="/add">Input type</Button>
                    <Button color='teal' as={NavLink} exact to="/notfound" style={inCardStyle}>See results</Button>
                  </div>
                </Card.Content>
              </Card>

              <Card style={{ background: 'rgba(0, 73, 122, 0.5)', boxShadow: 'none' }}>
                <Card.Content>
                  <div align="right"><Icon inverted name='bicycle'/></div>
                  <Card.Header className={'CarcardFont'}>Biking</Card.Header>
                  <Card.Meta className={'CarcardFont'}>How much would you save by Biking</Card.Meta>
                  <Card.Description className={'CarcardFont'}>{this.props.currentUser.transportation}</Card.Description>
                </Card.Content>

                <Card.Content>
                  <div style={dataPageBarGraphstyling}>
                    <SavingsPageBarGraph/>
                  </div>
                </Card.Content>

                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button color='teal' as={NavLink} exact to="/add" style={inCardStyle}>Input Usage</Button>
                    <Button color='teal' as={NavLink} exact to="/notfound" style={inCardStyle}>See results</Button>
                  </div>
                </Card.Content>
              </Card>

            </Card.Group>
          </div>
        </div>
    );
  }
}

// Declare the types of all properties.
GoToSavings.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const GoToSavingsContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(GoToSavings);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(GoToSavingsContainer);
