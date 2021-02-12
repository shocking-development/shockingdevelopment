import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Container, Grid, Image, Segment, Form, Button } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    // eslint-disable-next-line no-unused-vars
    const footercolor = {
      backgroundColor: '#052235',
      paddingLeft: '100px',
      paddingTop: '50px',
      paddingBottom: '50px',
      width: 'auto',
    };
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
    return (
        <div id="footer-container" style={{ backgroundColor: '#052235' }}>

          <Segment style={footercolor2}>
            <Grid columns={3} relaxed='very'>
              <Grid.Column>
                <p>
                  <Image style={footerLogo} src="/images/HEI-WHOLE-LOGO.png"/>
                </p>
                <p style={footertext}> Corporate Headquarters </p>
                <p style={footertext}> 1001 Bishop Street, Suite
                  2900 </p>
                <p style={footertext}> Honolulu, HI 96813 </p>
                <p style={footertext}> Telephone: (808)543-5662 </p>
              </Grid.Column>
              <Grid.Column>
                <p style={{ paddingTop: '135px', marginBottom: '6px', color: 'white' }}>Mailing Address </p>
                <p style={{ marginBottom: '6px', color: 'white' }}>P.O. Box 730</p>
                <p style={{ marginBottom: '6px', color: 'white' }}>Honolulu, HI 96808-0730 </p>
                <p style={{ marginBottom: '6px', color: 'white' }}>Email: info@hei.com </p>
              </Grid.Column>
              <Grid.Column>
                <p style={{
                  color: 'white',
                  fontSize: '25px',
                  marginBottom: '2px',
                  fontWeight: 'lighter',
                  letterSpacing: '1px',
                }}>SIGN UP FOR</p>
                <p style={{
                  color: 'white',
                  fontSize: '25px',
                  marginBottom: '18px',
                  fontWeight: 'bolder',
                  letterSpacig: '1px',
                }}>EMAIL ALERTS</p>
                <Form success>
                  <Form.Input iconPosition='left' icon='mail' placeholder='Enter Your Email Address'
                              style={{ width: '85%' }}/>
                  <Button color='teal'>Submit</Button>
                </Form>
              </Grid.Column>
            </Grid>
          </Segment>

        </div>
    );
  }
}

export default Footer;
