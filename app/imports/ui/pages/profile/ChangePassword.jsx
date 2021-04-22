import React from 'react';
import { Loader, Header, Image, Segment, Container, Card, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
// eslint-disable-next-line no-unused-vars
import { ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';
import NavBarHome from '../../components/main-navbar/NavBarMain';

/** Renders the Page for editing a single document. */
class ChangePassword extends React.Component {

  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { currPass: '', newPass: '', confirm: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** On successful submit, insert the data. */
  submit = () => {
    const { currPass, newPass, confirm, error } = this.state;
    if (newPass !== confirm) {
      this.setState({ error: 'New passwords do not match. Please double check.' });
      swal('Error', error, 'error');
    } else {
      Accounts.changePassword(currPass, newPass, (err) => {
          if (err) {
            this.setState({ error: err.reason });
            swal('Error', err.message, 'error');
          } else {
            swal('Success', 'Password changed successfully', 'success');
          }
        });

    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const pageStyle = {
      marginLeft: '20em',
      paddingTop: '6em',
      height: '90em',
      backgroundSize: 'cover',
      marginRight: '6em',
    };
    return (

        <div style={{
          background: '#001947',
          backgroundSize: 'cover',
          height: '100%',
          marginTop: '-10px',
        }}>
          <NavBarHome/>
          <Container style={pageStyle}>
            <Header inverted as="h2" textAlign="center">Change Password</Header>
            <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>
            <Card style={{ margin: 'auto' }}>

              <Form onSubmit={data => {
                // eslint-disable-next-line no-undef,no-alert
                if (window.confirm('Are you sure you wish to save your changes?')) this.submit(data);
              }}>
                <Form.Input
                    label="Current Password"
                    icon="user"
                    iconPosition="left"
                    name="currPass"
                    type="password"
                    placeholder="Enter your current password"
                    onChange={this.handleChange}
                />
                <Form.Input
                    label="New Password"
                    icon="user"
                    iconPosition="left"
                    name="newPass"
                    type="password"
                    placeholder="Enter a new password"
                    onChange={this.handleChange}
                />
                <Form.Input
                    label="Confirm New Password"
                    icon="user"
                    iconPosition="left"
                    name="confirm"
                    type="password"
                    placeholder="Confirm new password"
                    onChange={this.handleChange}
                />

                <Form.Button content={'Submit'}>

                </Form.Button>

              </Form>

            </Card>
          </Container>
        </div>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
ChangePassword.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = UserInfos.subscribeUserInfo();
  return {
    doc: UserInfos.findOne(documentId),
    ready: subscription.ready(),
  };
})(ChangePassword);
