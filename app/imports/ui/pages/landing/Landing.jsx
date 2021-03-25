import React from 'react';
import LandingSection1Text from '../../components/landing/LandingSection1Text';
import NavBarLanding from '../../components/landing/NavBarLanding';
import LandingSection1Boxes from '../../components/landing/LandingSection1Boxes';
import LandingSection2 from '../../components/landing/LandingSection2';
import Footer from '../../components/footer/Footer';

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
          <Footer/>
        </div>
    );
  }
}

export default Landing;
