import React from 'react';
import { Grid, Loader, Header, Segment, Container } from 'semantic-ui-react';
import swal from 'sweetalert';
// eslint-disable-next-line no-unused-vars
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';
import { userInfoUpdateMethod } from '../../../api/userInfo/UserInfoCollection.methods';
import NavBarHome from '../../components/main-navbar/NavBarHome';

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { firstName, lastName, userName, email, password, zipcode, transportation, _id } = data;
    const updateData = {
      id: _id,
      firstName,
      lastName,
      userName,
      email,
      password,
      zipcode,
      transportation,
    };
    userInfoUpdateMethod.call(updateData, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const bridge = new SimpleSchema2Bridge(UserInfos.getSchema());
    return (

        <div className='Home-page-background'>
          <NavBarHome/>
          <Container>
            <Grid container>
              <Grid.Column>
                <Header as="h2" textAlign="center">Edit Profile</Header>
                <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
                  <Segment>
                    <TextField name='firstName'/>
                    <TextField name='lastName'/>
                    <TextField name='userName'/>
                    <TextField name='email'/>
                    <TextField name='password'/>
                    <TextField name='transportation'/>

                    <NumField name='zipcode' decimal={false}/>

                    <SubmitField value='Update'/>
                    <ErrorsField/>
                    <HiddenField name='owner'/>
                  </Segment>
                </AutoForm>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
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
})(EditProfile);
