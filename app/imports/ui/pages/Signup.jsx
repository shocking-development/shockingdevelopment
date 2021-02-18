import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <div className='landing-page-background'>
          <Container id="signup-page" style={{ paddingTop: '13%', paddingBottom: '10%' }}>
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column>

                <Form onSubmit={this.submit}>
                  <Segment stacked inverted style={{ background: 'rgba(0, 73, 122, 0.57)', borderRadius: '0.5px' }}>
                    <Image as={NavLink} activeClassName="" exact to="/" src='images/HEI-LOGO.png' size='small'
                           style={{
                             top: '50%',
                             left: '50%',
                             transform: 'translate(-50%, -50%)',
                           }}/>
                    <div className={'sign-header2'}>
                      <Header as="h1" inverted textAlign="center" style={{ fontWeight: '100' }}>
                        Start tracking your emissions.
                      </Header>
                      <Header as="h2" inverted textAlign="center" style={{ fontWeight: '50' }}>
                        Register your account
                      </Header>
                    </div>
                    <Form.Input className={'signoutInput'}
                        label="Email"
                        id="signup-form-email"
                        icon="user"
                        iconPosition="left"
                        name="email"
                        type="email"
                        placeholder="E-mail address"
                        onChange={this.handleChange}
                    />
                    <Form.Input className={'signoutInput'}
                        label="Password"
                        id="signup-form-password"
                        icon="lock"
                        iconPosition="left"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <Form.Input className={'signoutInput'}
                        label="Confirm Password"
                        id="signup-form-password"
                        icon="lock"
                        iconPosition="left"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <Form.Button
                        id="signup-form-submit"
                        content="Submit"
                        fluid
                        color='linkedin'
                        style={{ borderRadius: '20px' }}
                    />
                    <p>Already have an account?<Link to="/signin"> Login here.</Link></p>
                  </Segment>

                </Form>

                {this.state.error === '' ? (
                    ''
                ) : (
                    <Message
                        error
                        header="Registration was not successful"
                        content={this.state.error}
                    />
                )}
              </Grid.Column>
            </Grid>
          </Container>
        </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
