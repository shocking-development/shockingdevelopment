import React from 'react';
import { Grid, Segment, Header, Container } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { userInfoDefineMethod } from '../../../api/userInfo/UserInfoCollection.methods';
import NavBarHome from '../../components/main-navbar/NavBarMain';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  userName: String,
  image: String,
  email: String,
  password: String,
  zipcode: Number,
  transportation: String,
});

/** Renders the Page for adding a document. */
class AddProfile extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { firstName, lastName, userName, image, email, password, zipcode, transportation } = data;
    const owner = Meteor.user().username;
    userInfoDefineMethod.call({ firstName, lastName, userName, image, email, password, zipcode, transportation, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
            console.error(error.message);
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
            // console.log('Success');
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const bridge = new SimpleSchema2Bridge(formSchema);
    return (
        <div className='Home-page-background'>
          <NavBarHome/>
          <Container>
            <Grid container>
              <Grid.Column>
                <Header as="h2" textAlign="center">Add Stuff</Header>
                <AutoForm ref={ref => {
                  fRef = ref;
                }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
                  <Segment>
                    <TextField name='firstName'/>
                    <TextField name='lastName'/>
                    <TextField name='userName'/>
                    <TextField name='email'/>
                    <TextField name='password'/>
                    <TextField name='transportation'/>
                    <NumField name='zipcode' decimal={false}/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                  </Segment>
                </AutoForm>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
    );
  }
}

export default AddProfile;
