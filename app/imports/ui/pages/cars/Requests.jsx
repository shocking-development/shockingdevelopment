import React from 'react';
import { Header, Grid, Image } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { AutoForm, TextField, ErrorsField, SubmitField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { newRequest } from '../../../api/cars/UserRequest';
import NavBarMain from '../../components/main-navbar/NavBarMain';
import RequestQuestions from './RequestQuestions';

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
            <Header as="h2" textAlign="center" inverted>Message Admin</Header>
            <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>
            <RequestQuestions/>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
                <TextField name='recommendationType' className={'SelectFieldforCarDropdown'} label='Subject of Contact'/>
                <TextField name='recommendation' className={'SelectFieldforCarDropdown'} label='Type your message here'/>
                <SubmitField className={'carsDropDownBtn'} value='Submit' id='submit-car'/>
                <ErrorsField/>
            </AutoForm>
          </Grid.Column>
        </Grid>
        </div>
    );
  }
}

export default Requests;
