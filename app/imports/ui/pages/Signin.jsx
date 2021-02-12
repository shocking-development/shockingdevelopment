import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import NavBarLogin from '../components/NavBarLogin';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Render the signin form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
        <div id="signin-page-div" className='landing-page-background'>
          <NavBarLogin/>
          <Container id="signin-page" style={{ paddingTop: '13%', paddingBottom: '10%' }}>
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column>

                <Form onSubmit={this.submit}>
                  <Segment stacked inverted
                           style={{ background: 'transparent', borderRadius: '0.5px' }}>
                    <div className={'sign-header'}>
                      <Header as="h2" inverted textAlign="left"
                              style={{ fontWeight: 'lighter', paddingBottom: '10px', paddingTop: '15px' }}>
                        Welcome Back!
                      </Header>
                    </div>

                    <Form.Input className={'type1'}

                                label="Email"
                                id="signin-form-email"
                                icon="user"
                                iconPosition="left"
                                name="email"
                                type="email"
                                placeholder="E-mail address"
                                onChange={this.handleChange}

                    />
                    <Form.Input
                        label="Password"
                        id="signin-form-password"
                        icon="lock"
                        iconPosition="left"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <Form.Button
                        color='linkedin'
                        style={{ borderRadius: '20px' }}
                        fluid id="signin-form-submit"
                        content="Log In"
                    />
                    <p>Don&apos;t have an account?<Link to="/signup"> Click here to sign up.</Link></p>
                  </Segment>
                </Form>
                {this.state.error === '' ? (
                    ''
                ) : (
                    <Message
                        error
                        header="Login was not successful"
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
Signin.propTypes = {
  location: PropTypes.object,
};
