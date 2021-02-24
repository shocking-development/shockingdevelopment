import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import swal from 'sweetalert';
import { userInfoDefineMethod } from '../../api/userInfo/UserInfoCollection.methods';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      error: '',
      zipcode: '',
      transportation: '',
      redirectToReferer: false,
    };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName, zipcode, transportation } = this.state;
    const user = email;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
    userInfoDefineMethod.call({
          firstName,
          lastName,
          user,
          email,
          password,
          zipcode,
          transportation,
          owner: user,
        },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
            // eslint-disable-next-line no-console
            console.error(error.message);
          } else {
            swal('Success', 'Profile added successfully', 'success');
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
                  <Segment className='signupcontainer' stacked inverted>
                    <Image as={NavLink} activeClassName="" exact to="/" src='images/HEI-LOGO.png' size='small'
                           style={{
                             top: '50%',
                             left: '50%',
                             transform: 'translate(-50%, -50%)',
                           }}/>
                    <div className={'sign-header2'}>
                      <Header
                          as="h1"
                          textAlign="center"
                          style={{
                            fontFamily: 'Roboto',
                            fontWeight: '400',
                            color: 'rgb(4 204 194)',
                            letterSpacing: '2px',
                          }}>
                        Start tracking your emissions
                      </Header>
                      <Header
                          as="h2"
                          inverted
                          textAlign="center"
                          style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}>
                        Register your account
                      </Header>
                    </div>
                    <Form.Input className={'signupInput'}
                                label="Email"
                                id="signup-form-email"
                                icon="user"
                                iconPosition="left"
                                name="email"
                                type="email"
                                placeholder="E-mail address"
                                onChange={this.handleChange}
                    />
                    <Form.Input className={'signupInput'}
                                label="Password"
                                id="signup-form-password"
                                icon="lock"
                                iconPosition="left"
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={this.handleChange}
                    />
                    <Form.Input className={'signupInput'}
                                label="Confirm Password"
                                id="signup-form-password"
                                icon="lock"
                                iconPosition="left"
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={this.handleChange}
                    />
                    <Form.Input className={'signupInput'}
                                label="First Name"
                                id="signup-form-firstName"
                                icon="lock"
                                iconPosition="left"
                                name="firstName"
                                placeholder="firstName"
                                type="firstName"
                                onChange={this.handleChange}
                    />
                    <Form.Input className={'signupInput'}
                                label="Last Name"
                                id="signup-form-lastName"
                                icon="lock"
                                iconPosition="left"
                                name="lastName"
                                placeholder="lastName"
                                type="lastName"
                                onChange={this.handleChange}
                    />
                    <Form.Input className={'signupInput'}
                                label="Zipcode"
                                id="signup-form-zipcode"
                                name="zipcode"
                                placeholder="zipcode"
                                type="zipcode"
                                onChange={this.handleChange}
                    />
                    <Form.Input className={'signupInput'}
                                label="Transportation"
                                id="signup-form-transportation"
                                name="transportation"
                                placeholder="transportation"
                                type="transportation"
                                onChange={this.handleChange}
                    />
                    <Form.Button
                        id="signup-form-submit"
                        content="Submit"
                        fluid
                        color='linkedin'
                        style={{ borderRadius: '20px' }}
                    />
                    <p style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                      Already have an account?
                      <Link to="/signin"> Login here.</Link>
                    </p>
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
