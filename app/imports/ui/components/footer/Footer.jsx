import React from 'react';
import { Grid, Image, Segment, Form, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-scroll';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const footerLogo = { width: '190px', marginTop: '-25px' };
    const footercolor2 = {
      backgroundColor: '#052235',
      border: 'none',
      boxShadow: 'none',
      paddingLeft: '10%',
      paddingTop: '3%',
      paddingBottom: '3%',
      paddingRight: '10%',
    };
    const footertext = { paddingLeft: '12px', marginBottom: '6px', color: 'white' };
    const mailingAdressstyling = { /*paddingTop: '135px',*/ marginBottom: '6px', color: 'white' };
    const footercolumn2text = { marginBottom: '6px', color: 'white' };
    const footercolumn3text = {
      color: 'white',
      fontSize: '25px',
      marginBottom: '2px',
      fontWeight: 'lighter',
      letterSpacing: '1px',
    };

    return (
        <div id="footer-container" style={{ backgroundColor: '#052235' }}>

          <Segment style={footercolor2}>
            <Grid columns={4} relaxed='very'>
              <Grid.Column style={{ marginTop: '40px' }}>
                <p style={{ display: 'flex', justifyContent: 'center' }}>
                  <Image style={footerLogo} src="/images/HEI-WHOLE-LOGO.png"/>
                </p>
                <p style={{ display: 'flex', justifyContent: 'center' }}>
                  <a href="https://www.facebook.com/HawaiianElectric/">
                    <Icon size={'big'} style={{ color: 'white', margin: '5px' }} className="facebook"></Icon>
                  </a>
                  <a href="https://www.instagram.com/hawaiianelectric/?hl=en">
                    <Icon size={'big'} style={{ color: 'white', margin: '5px' }} className="instagram"></Icon>
                  </a>
                  <a href="https://twitter.com/HwnElectric?s=20">
                    <Icon size={'big'} style={{ color: 'white', margin: '5px' }} className="twitter"></Icon>
                  </a>
                  <a href="https://www.youtube.com/user/HawaiianElectric/featured">
                    <Icon size={'big'} style={{ color: 'white', margin: '5px' }} className="youtube"></Icon>
                  </a>
                </p>
              </Grid.Column>
              <Grid.Column style={{ marginTop: '40px' }}>
                <p style={footertext}> Corporate Headquarters </p>
                <p style={footertext}> 1001 Bishop Street, Suite
                  2900 </p>
                <p style={footertext}> Honolulu, HI 96813 </p>
                <p style={footertext}> Telephone: (808)543-5662 </p>
              </Grid.Column>
              <Grid.Column style={{ marginTop: '40px' }}>
                <p style={mailingAdressstyling}>Mailing Address </p>
                <p style={footercolumn2text}>P.O. Box 730</p>
                <p style={footercolumn2text}>Honolulu, HI 96808-0730 </p>
                <p style={footercolumn2text}>Email: info@hei.com </p>
              </Grid.Column>
              <Grid.Column style={{ marginTop: '40px' }}>
                <p style={footercolumn3text}>SIGN UP FOR</p>
                <p style={footercolumn3text}>EMAIL ALERTS</p>
                <Form success>
                  <Form.Input iconPosition='left' icon='mail' placeholder='Enter Your Email Address'
                              style={{ width: '85%' }}/>
                  <Button color='teal'>Submit</Button>
                </Form>
                <Link to="landing-page" spy={true} smooth={true}>
                  <Button color='blue'>Back to top</Button>
                </Link>
              </Grid.Column>
            </Grid>
          </Segment>

        </div>
    );
  }
}

export default Footer;
