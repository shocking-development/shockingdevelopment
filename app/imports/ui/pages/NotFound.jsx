import React from 'react';
import NavBarMain from '../components/main-navbar/NavBarMain';
import { Header, Image } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class NotFound extends React.Component {
  render() {
    const outer_div_pagestyle = {
      background: 'rgb(21 51 62)',
      backgroundSize: 'cover',
      height: '100%',
    };
    return (
        <div style={outer_div_pagestyle}>
    <NavBarMain/>
          <div style={{ textAlign: 'center', background: 'rgb(21 51 62)', minHeight: '80vh', Width: '100%', paddingLeft: '15em', paddingTop: '8em', paddingBottom: '8em' }}>
            <Header inverted size={'huge'}> Page Not Found </Header>
            <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>
          </div>
        </div>
    );
  }
}

export default NotFound;
