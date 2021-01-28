import React from 'react';
import { Container, Image } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class LandingAddition extends React.Component {
  render() {

    return (
        <div>
          <Container textAlign="center"
                     style={{
                       color: 'white',
                       paddingTop: '7em',
                       fontWeight: 'bold',
                       fontSize: '30px',
                     }}>
            Monitor your greenhouse gas emissions.
          </Container>
          <Container textAlign="center" style={{ color: '#3CAEA3', fontSize: '22px', paddingTop: '1em' }}>
            Find out how much GHG emissions are generated from your mode of transportation.
          </Container>
          <Container textAlign="center" style={{ paddingTop: '1em' }}>
            <Image src='/images/HEI-WAVE-LOGO.png' style={{ width: '15%', marginTop: '25px' }} centered/>
          </Container>
        </div>
    );
  }
}

export default LandingAddition;
