import React from 'react';
import { Container, Grid, Image, Segment, Form, Button } from 'semantic-ui-react';
import LandingDataAddition from './LandingDataAddition';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const header = { fontSize: '14px', color: 'white', letterspacing: '3px' };
    const footercolor = {
      backgroundColor: '#052235',
      paddingLeft: '100px',
      paddingTop: '50px',
      paddingBottom: '50px',
      width: 'auto',
    };
    const footercolor2 = { backgroundColor: '#052235', border: 'none', boxShadow: 'none' };
    return (
        <div>
          <LandingDataAddition/>
          <Container textAlign="left" style={footercolor}>
            <Segment style={footercolor2}>
              <Grid columns={3} relaxed='very'>
                <Grid.Column>
                  <p>
                    <Image style={{ width: '190px', marginTop: '-25px' }} src="/images/HEI-WHOLE-LOGO.png"/>
                  </p>
                  <p style={{ paddingLeft: '12px', marginBottom: '6px', color: 'white' }}> Corporate Headquarters </p>
                  <p style={{ paddingLeft: '12px', marginBottom: '6px', color: 'white' }}> 1001 Bishop Street, Suite
                    2900 </p>
                  <p style={{ paddingLeft: '12px', marginBottom: '6px', color: 'white' }}> Honolulu, HI 96813 </p>
                  <p style={{ paddingLeft: '12px', marginBottom: '6px', color: 'white' }}> Telephone: (808)543-5662 </p>
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
          </Container>
        </div>
    );
  }
}

export default Footer;
