import React from 'react';
import { Loader, Header, Segment, Container, Image, Grid } from 'semantic-ui-react';
import swal from 'sweetalert';
// eslint-disable-next-line no-unused-vars
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';
import { userInfoUpdateMethod } from '../../../api/userInfo/UserInfoCollection.methods';
import NavBarHome from '../../components/main-navbar/NavBarMain';

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userImage: 'no-change',
    };
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { firstName, lastName, user, email, zipcode, transportation, unitSystem, _id } = data;
    let userImage;
    if (this.state.userImage === 'no-change') {
      userImage = this.props.doc.userImage;
    } else {
      userImage = this.state.userImage;
    }

    const updateData = {
      id: _id,
      firstName,
      lastName,
      user,
      email,
      zipcode,
      userImage,
      transportation,
      unitSystem,
    };

    userInfoUpdateMethod.call(updateData, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));

    /*
    if (email) {
      Meteor.call('updateEmail', email, (err) => {
        if (err) {
          console.log(`Error updating email address: {err}`);
        }
      });
    } */

    const emailResult = Meteor.call('updateEmail', email);
    if (!emailResult) {
      console.log('Error updating email address: {err}');
    }

    const usernameResult = Meteor.call('updateUsername', user);
    if (!usernameResult) {
      console.log('Error updating username: {err}');
    }

  }

  /* For user profile image upload */
  onImageUpload = (event) => {
    const edit = this;
    event.preventDefault();
    const files = event.target.files;
    if (files) {
      /* global FileReader */
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        const fileSize = files[0].size / 1000 / 1000;
        if (fileSize > 2) {
          swal('Error', 'This Image is too big, cannot exceed 2 MB', 'error');
        } else {
          edit.setState({ userImage: this.result });
        }
      });

      reader.readAsDataURL(files[0]);
    }
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const bridge = new SimpleSchema2Bridge(UserInfos.getSchema());
    const pageStyle = {
      paddingLeft: '15em',
      paddingTop: '6em',
      height: '70em',
      backgroundSize: 'cover',
    };

    let dataImage = this.state.userImage;
    if (this.state.userImage === 'no-change') {
      dataImage = this.props.doc.userImage;
    }
    console.log(Meteor.users.findOne(Meteor.userId()).emails[0].address);
    console.log(Meteor.user());

    return (
        <div style={{
          background: 'rgb(21 51 62)',
          backgroundSize: 'cover',
          height: '100%',
          marginTop: '-10px',
        }}>
          <NavBarHome/>
          <Container style={pageStyle}>
            <Header inverted as="h2" textAlign="center">Edit Profile</Header>
            <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>
            <Grid>
              <Grid.Row style={{ marginTop: '3em', background: 'rgb(21 51 62)' }}>
                <Grid.Column width={5}>
                  <Image
                      size={'massive'}
                      style={{ borderRadius: '5%' }}
                      src={dataImage}
                      centered
                  />
                  <div style={{ color: 'black' }}>
                    <label style={{ cursor: 'pointer', color: 'aliceblue' }} htmlFor="file-input">
                      Choose Your Photo here
                    </label>
                  </div>
                  <input type="file"
                         id="file-input"
                         name="picture"
                         accept=".jpg, .jpeg, .png"
                         style={{ display: 'none' }}
                         onChange={this.onImageUpload}/>
                </Grid.Column>
                <Grid.Column stretched width={11}>
                  <AutoForm
                      schema={bridge}
                      onSubmit={data => {
                        // eslint-disable-next-line no-undef,no-alert
                        if (window.confirm('Are you sure you wish to save your changes?')) this.submit(data);
                      }} model={this.props.doc}>
                    <Segment className='viewProfile'>
                      <TextField className={'carDropdownSelectField'} id='update-first' name='firstName'/>
                      <TextField className={'carDropdownSelectField'} id='update-last' name='lastName'/>
                      <TextField className={'carDropdownSelectField'} id='update-user' name='user'/>
                      <TextField className={'carDropdownSelectField'} id='update-email' name='email'/>
                      <SelectField className={'carDropdownSelectField'} id='update-units' name='unitSystem'/>
                      <TextField className={'carDropdownSelectField'} id='update-transportation' name='transportation'/>
                      <NumField className={'carDropdownSelectField'} name='zipcode' id='update-zipcode' decimal={false}/>
                      <SubmitField value='Update' id='update-form-submit'/>
                      <ErrorsField/>
                      <HiddenField name='owner'/>
                    </Segment>
                  </AutoForm>
                </Grid.Column>
              </Grid.Row>
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
