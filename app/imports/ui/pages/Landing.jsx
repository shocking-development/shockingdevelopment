import React from 'react';
import LandingSection1Text from '../components/Landing/LandingSection1Text';
import NavBarLanding from '../components/Landing/NavBarLanding';
import LandingSection1Boxes from '../components/Landing/LandingSection1Boxes';
import LandingSection2 from '../components/Landing/LandingSection2';

/**
 * A simple static component to render some text for the landing page.
 * @memberOf ui/pages
 */
class Landing extends React.Component {
  render() {

    return (
        <div id='landing-page' className='landing-page-background'>
          <NavBarLanding/>
          <LandingSection1Text/>
          <LandingSection1Boxes/>
          <LandingSection2/>
        </div>
    );
  }
}

export default Landing;
