import React from 'react';
import { Loader, Header, Image, Segment, Container, Card } from 'semantic-ui-react';
import swal from 'sweetalert';
// eslint-disable-next-line no-unused-vars
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';
import NavBarHome from '../../components/main-navbar/NavBarMain';

/** Renders the Page for editing a single document. */
class ChangePassword extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { password } = data;
    Meteor.call('changePass', password, (err) => {
          if (err) {
            console.log('Error changing password: {err}');
          } else {
            swal('Success', 'Password changed successfully', 'success');
          }
        });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const bridge = new SimpleSchema2Bridge(UserInfos.getSchema());
    const pageStyle = {
      marginLeft: '20em',
      paddingTop: '6em',
      height: '90em',
      backgroundSize: 'cover',
      marginRight: '6em',
    };
    return (

        <div style={{
          background: 'rgb(21 51 62)',
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
              <AutoForm
                  schema={bridge}
                  onSubmit={data => {
                    // eslint-disable-next-line no-undef,no-alert
                    if (window.confirm('Are you sure you wish to save your changes?')) this.submit(data);
                  }} model={this.props.doc}>
                <Segment>
                  <TextField name='password' id='update-password-submit'/>
                  <SubmitField value='Update'/>
                  <ErrorsField/>
                  <HiddenField name='owner'/>
                </Segment>
              </AutoForm>
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
