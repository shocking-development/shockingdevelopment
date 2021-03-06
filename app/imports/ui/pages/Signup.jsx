import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import swal from 'sweetalert';
import { userInfoDefineMethod } from '../../api/userInfo/UserInfoCollection.methods';
import Footer from '../components/Footer';

/**
 * Signup component is similar to signIn component, but we create a new user instead.
 */
class Signup extends React.Component {
  // Initialize state fields.
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm: '',
      firstName: '',
      lastName: '',
      error: '',
      zipcode: '',
      redirectToReferer: false,
    };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName, zipcode } = this.state;
    const user = email;

    // Password validation
    if (this.state.password !== this.state.confirm) {
      this.setState({ error: 'Your passwords do not match.' });
    } else {
      userInfoDefineMethod.call({
            firstName,
            lastName,
            user,
            email,
            password,
            zipcode,
            userImage: 'images/default-image.jpg', // set default user profile image
            owner: user,
          },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
              // eslint-disable-next-line no-console
              console.error(error.message);
            } else {
              Accounts.createUser({
                email,
                username: email,
                password,
                firstName,
                lastName,
                zipcode,
                userImage: '',
              }, (err) => {
                if (err) {
                  this.setState({ error: err.reason });
                } else {
                  swal('Success', 'Profile added successfully', 'success');
                  this.setState({ error: '', redirectToReferer: true });
                }
              });
            }
          });
    }
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    // if correct authentication, redirect to home page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <div className='landing-page-background'>
          <Container id="signup-page" style={{ paddingTop: '13%', paddingBottom: '10%' }}>
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column>
                <Segment className='signupcontainer' stacked inverted>
                  <Image as={NavLink}
                         activeClassName=""
                         exact to="/"
                         src='images/HEI-LOGO.png'
                         size='small'
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
                  <Form inverted onSubmit={this.submit}>
                    <Form.Group widths={'equal'}>
                      <Form.Input className={'signupInput'}
                                  label="First Name"
                                  id="signup-form-firstName"
                                  icon="user"
                                  iconPosition="left"
                                  name="firstName"
                                  placeholder="First Name"
                                  type="firstName"
                                  onChange={this.handleChange}
                      />
                      <Form.Input className={'signupInput'}
                                  label="Last Name"
                                  id="signup-form-lastName"
                                  icon="user"
                                  iconPosition="left"
                                  name="lastName"
                                  placeholder="Last Name"
                                  type="lastName"
                                  onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Input className={'signupInput'}
                                label="Zipcode"
                                id="signup-form-zipcode"
                                icon="world"
                                iconPosition="left"
                                name="zipcode"
                                placeholder="Enter your zipcode"
                                type="zipcode"
                                onChange={this.handleChange}
                    />
                    <Form.Input className={'signupInput'}
                                label="Email"
                                id="signup-form-email"
                                icon="mail"
                                iconPosition="left"
                                name="email"
                                type="email"
                                placeholder="example@email.com"
                                onChange={this.handleChange}
                    />
                    <Form.Input className={'signupInput'}
                                label="Password"
                                id="signup-form-password"
                                icon="lock"
                                iconPosition="left"
                                name="password"
                                placeholder="Create a password"
                                type="password"
                                onChange={this.handleChange}
                    />
                    <Form.Input className={'signupInput'}
                                label="Confirm Password"
                                id="signup-form-password"
                                icon="lock"
                                iconPosition="left"
                                name="confirm"
                                placeholder="Confirm your password"
                                type="password"
                                onChange={this.handleChange}
                    />
                    <Form.Button
                        id="signup-form-submit"
                        content="Submit"
                        fluid
                        color='linkedin'
                        style={{ borderRadius: '20px' }}
                        disabled={!this.state.firstName || !this.state.lastName ||
                        !this.state.email || !this.state.password || !this.state.confirm ||
                        !this.state.zipcode}
                    />
                    <p style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                      Already have an account?
                      <Link to="/signin"> Login here.</Link>
                    </p>
                  </Form>

                </Segment>

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
          <Footer/>
        </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
