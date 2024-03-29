import React from 'react';
import { Loader, Header, Segment, Container, Image, Grid } from 'semantic-ui-react';
import swal from 'sweetalert';
// eslint-disable-next-line no-unused-vars
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
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
    const { firstName, lastName, user, unitSystem, State, _id } = data;
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
      userImage,
      unitSystem,
      State,
    };

    /* Update info in UserInfos Collection */
    userInfoUpdateMethod.call(updateData, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
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
      minHeight: '110vh',
      backgroundSize: 'cover',
    };

    let dataImage = this.state.userImage;
    if (this.state.userImage === 'no-change') {
      dataImage = this.props.doc.userImage;
    }

    return (
        <div style={{
          background: '#001947',
          backgroundSize: 'cover',
          height: '100%',
          marginTop: '-10px',
        }}>
          <NavBarHome/>
          <Container style={pageStyle}>
            <Header inverted as="h2" style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }} textAlign="center"
            >Edit Profile</Header>
            <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>
            <Grid>
              <Grid.Row style={{ marginTop: '3em', background: '#001947' }}>
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
                      <SelectField className={'carDropdownSelectField'} id='update-units' name='unitSystem'/>
                      <SelectField className={'carDropdownSelectField'} id='update-state' name='State'/>
                      <SubmitField style={{ background: '#3184d8', color: 'white' }} value='Update' id='update-form-submit'/>
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
  // Subscribe to UserInfos collection.
  const subscription = UserInfos.subscribeUserInfo();
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  const doc = UserInfos.findOne(documentId);
  const ready = subscription.ready();

  return {
    doc,
    ready,
  };
})(EditProfile);
