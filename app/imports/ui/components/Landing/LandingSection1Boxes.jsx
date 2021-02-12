import React from 'react';
import { Grid, Segment, Icon, Container } from 'semantic-ui-react';

/** A simple static component to render some boxes for the landing page. */

class LandingSection1Boxes extends React.Component {
  render() {

    const infoBoxesStyling = {
      color: 'white',
      fontSize: '1.9625em',
      fontWeight: 'bold',
      paddingTop: '10px',
      marginTop: '0',
      marginBottom: '0',
      paddingBottom: '10px',

    };

    const infoBoxColoring = { background: 'rgba(0, 73, 122, 0.57)', borderRadius: '0px', height: '100%' };
    const pargraphInfoBoxesStyling = { color: '#4085AC', paddingBottom: '24px' };

    const iconStyling = {
      color: '#0047cc',
      fontSize: '2.2em',
      paddingTop: '8px',
    };

    const containerStyling = {
      width: '100%',
      display: 'inline-block',
    };

    return (
        <div id='landing-section-1-boxes'>
          <Container id='landing-boxes-container' style={containerStyling}>
            <Grid stackable className='menu-boxes' columns='equal' id='landing-page'>
              <Grid.Column className="column">
                <Segment className="zoom" style={infoBoxColoring}>
                  <Icon style={iconStyling}
                        className="money bill alternate icon"></Icon>
                  <p style={infoBoxesStyling}>Savings</p>
                  <p style={pargraphInfoBoxesStyling}>
                    Learn how much you can save by switching to an electric vehicle.
                  </p>
                </Segment>
              </Grid.Column>

              <Grid.Column className="column">
                <Segment className="zoom" style={infoBoxColoring}>
                  <Icon style={iconStyling} className="line graph"></Icon>
                  <p style={infoBoxesStyling}>Data</p>
                  <p style={pargraphInfoBoxesStyling}>
                    View your daily GHG emissions and learn how to reduce your emissions.
                  </p>
                </Segment>
              </Grid.Column>

              <Grid.Column className="column">
                <Segment className="zoom" style={infoBoxColoring}>
                  <Icon style={iconStyling}
                        className="check circle icon"></Icon>
                  <p style={infoBoxesStyling}>Benefits</p>
                  <p style={pargraphInfoBoxesStyling}>
                    Learn the benefits of switching to an electrical vehicle.
                  </p>
                </Segment>
              </Grid.Column>

              <Grid.Column className="column">
                <Segment className="zoom" style={infoBoxColoring}>
                  <i style={iconStyling}
                     className="map marker alternate icon"></i>
                  <p style={infoBoxesStyling}>Map your route</p>
                  <p style={pargraphInfoBoxesStyling}>
                    Map your daily route and learn how much gas you can save by switching to an electrical vehicle.
                  </p>
                </Segment>
              </Grid.Column>

            </Grid>
          </Container>
        </div>
    );
  }
}

export default LandingSection1Boxes;
