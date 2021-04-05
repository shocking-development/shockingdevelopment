import React from 'react';
import { Grid, Segment, Icon, Container } from 'semantic-ui-react';
import { Link } from 'react-scroll';

/** A simple static component to render some boxes for the landing page. */

class LandingSection1Boxes extends React.Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {

    const infoBoxesStyling = {
      color: 'white',
      fontSize: '1.9625em',
      fontWeight: 'bold',
      paddingTop: '10px',
      marginTop: '0',
      marginBottom: '0',
      paddingBottom: '10px',
      fontfamily: 'Roboto',

    };

    const infoBoxColoring = {
      background: 'rgba(0, 73, 122, 0.57)',
      borderRadius: '0px',
      height: '100%',
      fontfamily: 'Roboto',
    };
    const pargraphInfoBoxesStyling = { color: '#4085AC', paddingBottom: '24px', fontfamily: 'Roboto' };

    const iconStyling = {
      color: '#0047cc',
      fontSize: '2.2em',
      paddingTop: '8px',
      fontfamily: 'Roboto',
    };

    const containerStyling = {
      width: '100%',
      display: 'inline-block',
      fontfamily: 'Roboto',
    };

    return (
        <div id='landing-section-1-boxes'>
          <Container id='landing-boxes-container' style={containerStyling}>
            <Grid stackable className='menu-boxes' columns='equal' id='landing-page'>
              <Grid.Column className="menu-boxes-column">
                <Segment className="zoom" style={infoBoxColoring}>
                  <Icon style={iconStyling}
                        className="money bill alternate icon"></Icon>
                  <p className='body' style={infoBoxesStyling}>Savings</p>
                  <p className='body' style={pargraphInfoBoxesStyling}>
                    Learn how much you can save by switching to an electric vehicle.
                  </p>
                </Segment>
              </Grid.Column>

              <Grid.Column className="menu-boxes-column">
                <Segment className="zoom" style={infoBoxColoring}>
                  <Icon style={iconStyling} className="line graph"></Icon>
                  <p className='body' style={infoBoxesStyling}>Data</p>
                  <p className='body' style={pargraphInfoBoxesStyling}>
                    View your daily GHG emissions and learn how to reduce your emissions.
                  </p>
                </Segment>
              </Grid.Column>

              <Grid.Column className="menu-boxes-column">
                <Segment className="zoom" style={infoBoxColoring}>
                  <Icon style={iconStyling}
                        className="check circle icon"></Icon>
                  <p className='body' style={infoBoxesStyling}>Benefits</p>
                  <p className='body' style={pargraphInfoBoxesStyling}>
                    Learn the benefits of switching to an electrical vehicle.
                  </p>
                </Segment>
              </Grid.Column>

              <Grid.Column className="menu-boxes-column">
                <Segment className="zoom" style={infoBoxColoring}>
                  <Link to="ghgCalc" spy={true} smooth={true}>
                    <i style={iconStyling}
                       className="calculator icon"></i>
                    <p className='body' style={infoBoxesStyling}>Emissions Calculator</p>
                    <p className='body' style={pargraphInfoBoxesStyling}>
                      Calculate how much GHG you could have reduced.
                    </p>
                  </Link>
                </Segment>
              </Grid.Column>

            </Grid>
          </Container>
        </div>
    );
  }
}

export default LandingSection1Boxes;
