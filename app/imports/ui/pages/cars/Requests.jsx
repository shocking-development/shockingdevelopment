import React from 'react';
import { Header, Grid, Segment } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SubmitField, TextField, ErrorsField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { newRequest } from '../../../api/cars/UserRequest';

const formSchema = new SimpleSchema({
  recommendationType: String,
  recommendation: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class Requests extends React.Component {
  submit(data, formRef) {
    const { recommendationType, recommendation } = data;
    const owner = Meteor.user().username;
    const username = owner;
    newRequest.collection.insert({ username, recommendationType, recommendation },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Recommendation processed', 'success');
            formRef.reset();
          }
        });
  }

  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Create Profile</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='recommendationType' label='Type of Recommendation'/>
                <TextField name='recommendation' label='Type your recommendation here'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Requests;
