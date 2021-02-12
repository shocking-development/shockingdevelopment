import React from 'react';
import { Container, Image, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class LandingSection1Text extends React.Component {
  render() {

    const header1 = {
      color: 'white',
      paddingTop: '20%',
      fontWeight: 'bold',
      fontSize: 'calc(0.5vw + 0.9vh + 2vmin)',
    };

    const header2 = {
      color: '#3CAEA3', fontSize: 'calc(0.4vw + 0.4vh + 2vmin)', paddingTop: '1em',
    };

    return (
        <div id='center-info'>

          <Container textAlign="center" style={header1}>
            Monitor your greenhouse gas emissions.
          </Container>

          <Container textAlign="center" style={header2}>
            Find out how much GHG emissions are generated from your mode of transportation.
          </Container>

          <Container textAlign="center" style={header2}>
            <Button className="ui teal circular button"
                    style={{ fontSize: '16px' }}
                    as={NavLink} exact
                    to="/signup">
              Get Started
            </Button>
          </Container>

          <Container textAlign="center" style={{ paddingTop: '0.1em' }}>
            <Image src='/images/HEI-WAVE-LOGO.png' style={{ width: '15%', marginTop: '20px' }} centered/>
          </Container>

        </div>
    );
  }
}

export default LandingSection1Text;
