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
    const footerHeader = { paddingLeft: '12px', marginBottom: '24px', color: 'Gray', fontWeight: 'bolder' };
    /* const mailingAdressstyling = { paddingTop: '135px', marginBottom: '6px', color: 'white' }; */
    /* const footercolumn2text = { marginBottom: '6px', color: 'white' }; */
    const footercolumn3text = {
      color: 'gray',
      fontSize: '15px',
      marginBottom: '24px',
      fontWeight: 'lighter',
      letterSpacing: '1px',
    };

    return (
        <div id="footer-container" style={{ backgroundColor: '#052235' }}>
          <Segment style={footercolor2}>
            <Grid columns={4} relaxed='very'>
              <Grid.Column style={{ marginTop: '40px' }}>
                <p style={{ display: 'flex', justifyContent: 'left' }}>
                  <Image style={footerLogo} src="/images/HEI-WHOLE-LOGO.png"/>
                </p>
                <p style={{ display: 'flex', justifyContent: 'left' }}>
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <a href="https://www.hei.com/home/default.aspx" target="_blank">
                    <Icon centered size={'large'} style={{ color: 'white', margin: '10px' }} name="home"></Icon>
                  </a>
                </p>
              </Grid.Column>
              <Grid.Column style={{ marginTop: '30px' }}>
                <p style={footerHeader}> Corporate Headquarters </p>
                <p style={footertext}> 1001 Bishop Street, Suite
                  2900 </p>
                <p style={footertext}> Honolulu, HI 96813 </p>
                <p style={footertext}> Telephone: (808)543-5662 </p>
              </Grid.Column>
              <Grid.Column style={{ marginTop: '30px' }}>
                <p style={footerHeader}> Mailing Address </p>
                <p style={footertext}> P.O. Box 730 </p>
                <p style={footertext}> Honolulu, HI 96808-0730 </p>
                <p style={footertext}> Email: info@hei.com </p>
              </Grid.Column>
              <Grid.Column style={{ marginTop: '30px' }}>
                <p style={footercolumn3text}>SIGN UP FOR EMAIL ALERTS</p>
                <Form style={{ background: 'rgba(0, 0, 0, 0.5)' }} success>
                  <Form.Input iconPosition='left' icon='mail' placeholder='Enter Your Email Address'
                              style={{ background: 'rgba(0, 0, 0, 0.5)' }}/>
                  <Button floated={'right'} color='teal'>Submit</Button>
                </Form>
              </Grid.Column>
            </Grid>
          </Segment>
          <Link to="landing-page" spy={true} smooth={true}>
            <Button fluid compact inverted secondary button>Back to top</Button>
          </Link>
        </div>
    );
  }
}

export default Footer;
