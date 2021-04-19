import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import swal from 'sweetalert';
import { userInfoDefineMethod } from '../../api/userInfo/UserInfoCollection.methods';
import Footer from '../components/footer/Footer';

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
      State: '',
      error: '',
      redirectToReferer: false,
    };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName, State } = this.state;
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
            userImage: 'images/default-image.jpg', // set default user profile image
            owner: user,
            State,
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
    /* Get allowed values for State to use in form select field */
    const stateValues = ['Alaska', 'Alabama', 'Arkansas', 'Arizona', 'California', 'Colorado', 'Connecticut',
      'District of Columbia', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Iowa', 'Idaho', 'Illinois',
      'Indiana', 'Kansas', 'Kentucky', 'Louisiana', 'Massachusetts', 'Maryland', 'Maine', 'Michigan',
      'Minnesota', 'Missouri', 'Mississippi', 'Montana', 'North Carolina', 'North Dakota', 'Nebraska',
      'New Hampshire', 'New Jersey', 'New Mexico', 'Nevada', 'New York', 'Ohio', 'Oklahoma', 'Oregon',
      'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
      'Virginia', 'Vermont', 'Washington', 'Wisconsin', 'West Virginia', 'Wyoming'];
    const options = _.map(stateValues, function (cat) {
      return { key: cat, value: cat, text: cat };
    });

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
                                label="Email"
                                id="signup-form-email"
                                icon="mail"
                                iconPosition="left"
                                name="email"
                                type="email"
                                placeholder="example@email.com"
                                onChange={this.handleChange}
                    />
                    <Form.Select className={'signupSelectInput'}
                                 label="State"
                                 id="signup-form-state"
                                 name="State"
                                 type="State"
                                 placeholder={'Choose a State'}
                                 options={options}
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
                                id="signup-form-confirm-password"
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
                        disabled={!this.state.firstName || !this.state.lastName || !this.state.password || !this.state.confirm}
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
