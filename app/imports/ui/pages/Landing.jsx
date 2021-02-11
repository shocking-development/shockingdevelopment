import React from 'react';
import { Grid, Segment, Icon } from 'semantic-ui-react';
import LandingAddition from '../components/LandingAddition';
import NavBar2 from '../components/NavBar2';

/**
 * A simple static component to render some text for the landing page.
 * @memberOf ui/pages
 */
class Landing extends React.Component {
  render() {
    return (
        <div className='landing-page-background'>
          <NavBar2/>
          <LandingAddition/>
          <Grid className='menu-boxes' columns='equal' id='landing-page'>
            <Grid.Column className="column">
              <Segment className="zoom" style={{ background: 'rgba(0, 73, 122, 0.57)', borderRadius: '0px' }}>
                <Icon style={{ color: '#0047cc', fontSize: '2.2em', paddingTop: '8px' }}
                      className="money bill alternate icon"></Icon>
                <p style={{
                  color: 'white',
                  fontSize: '25px',
                  fontWeight: 'bold',
                  paddingTop: '10px',
                  marginTop: '0em',
                  marginBottom: '0em',
                  paddingBottom: '10px',
                }}>Savings</p>
                <p style={{ color: '#4085AC', paddingBottom: '24px' }}>
                  Learn how much you can save by switching to an electric vehicle.
                </p>
              </Segment>
            </Grid.Column>

            <Grid.Column className="column">
              <Segment className="zoom" style={{ background: 'rgba(0, 73, 122, 0.57)', borderRadius: '0px' }}>
                <Icon style={{ color: '#0047cc', fontSize: '2.2em', paddingTop: '8px' }} className="line graph"></Icon>
                <p style={{
                  color: 'white',
                  fontSize: '25px',
                  fontWeight: 'bold',
                  paddingTop: '10px',
                  marginTop: '0em',
                  marginBottom: '0em',
                  paddingBottom: '10px',
                }}>Data</p>
                <p style={{ color: '#4085AC', paddingBottom: '24px' }}>
                  View your daily GHG emissions and learn how to reduce your emissions.
                </p>
              </Segment>
            </Grid.Column>

            <Grid.Column className="column">
              <Segment className="zoom" style={{ background: 'rgba(0, 73, 122, 0.57)', borderRadius: '0px' }}>
                <Icon style={{ color: '#0047cc', fontSize: '2.2em', paddingTop: '8px' }}
                      className="check circle icon"></Icon>
                <p style={{
                  color: 'white',
                  fontSize: '25px',
                  fontWeight: 'bold',
                  paddingTop: '10px',
                  marginTop: '0em',
                  marginBottom: '0em',
                  paddingBottom: '10px',
                }}>Benefits</p>
                <p style={{ color: '#4085AC', paddingBottom: '24px' }}>
                  Learn the benefits of switching to an electrical vehicle.
                </p>
              </Segment>
            </Grid.Column>

            <Grid.Column className="column">
              <Segment className="zoom" style={{ background: 'rgba(0, 73, 122, 0.57)', borderRadius: '0px' }}>
                <i style={{ color: '#0047cc', fontSize: '2.2em', paddingTop: '8px' }}
                   className="map marker alternate icon"></i>
                <p style={{
                  color: 'white',
                  fontSize: '25px',
                  fontWeight: 'bold',
                  paddingTop: '10px',
                  marginTop: '0em',
                  marginBottom: '0em',
                  paddingBottom: '10px',
                }}>Map your route</p>
                <p style={{ color: '#4085AC', paddingBottom: '24px' }}>
                  Map your daily route and learn how much gas you can save by switching to an electrical vehicle.
                </p>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
