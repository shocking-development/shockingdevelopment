import React from 'react';
import { Header, Grid, Segment, Image, Button, Form } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SubmitField, TextField, ErrorsField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { newRequest } from '../../../api/cars/UserRequest';
import NavBarMain from '../../components/main-navbar/NavBarMain';

const formSchema = new SimpleSchema({
  recommendationType: String,
  recommendation: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);
const pageStyle = {
  background: '#001947',
  height: '100vh',
  backgroundSize: 'cover',
  paddingTop: '5em',
  paddingLeft: '10%',
  justifyContent: 'center',
};

const buttonStyle = {
  justifyContent: 'center',
};

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
        <div style={pageStyle}>
          <NavBarMain/>
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Make a Request</Header>
            <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='recommendationType' label='Type of Recommendation'/>
                <TextField name='recommendation' label='Type your recommendation here'/>
                <Button color='blue' style={buttonStyle} onClick={this.showResult} id='submit-request'>Submit Request</Button>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
        </div>
    );
  }
}

export default Requests;
