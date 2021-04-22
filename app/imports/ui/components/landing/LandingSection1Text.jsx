import React from 'react';
import { Container, Image, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class LandingSection1Text extends React.Component {
  render() {

    const header1 = {
      color: 'white',
      paddingTop: '20%',
      fontWeight: 'bold',
      fontSize: 'calc(0.5vw + 0.9vh + 2vmin)',
    };

    const header2 = {
      color: '#3CAEA3', fontSize: 'calc(0.3vw + 0.3vh + 2vmin)', paddingTop: '1em',
    };

    const logoStyle = { width: '15%', marginTop: '20px' };

    return (
        <div id='center-info'>

          <Container className='body' textAlign="center" style={header1}>
            Monitor your greenhouse gas emissions.
          </Container>

          <Container className='body' textAlign="center" style={header2}>
            Find out how much GHG emissions are generated from your mode of transportation.
          </Container>

          <Container className='body' textAlign="center" style={header2}>
            <Button className="ui teal circular button"
                    style={{ fontSize: '16px' }}
                    as={NavLink} exact
                    to="/signup">
              Get Started
            </Button>
          </Container>

          <Container textAlign="center" style={{ paddingTop: '0.1em' }}>
            <Image src='/images/HEI-WAVE-LOGO.png' style={logoStyle} centered/>
          </Container>

        </div>
    );
  }
}

export default LandingSection1Text;
