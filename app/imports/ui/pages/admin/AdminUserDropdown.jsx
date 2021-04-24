import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorField, SelectField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { userInfoDefineMethod } from 'app/imports/api/userInfo/UserInfoCollection.methods.js';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';
import NavBarMain from '../../components/main-navbar/NavBarMain';
import CarsAccordianQuestions from '../cars/CarsAccordianQuestions';

const formSchema = new SimpleSchema({
  State: String,
  unitSystem: String,
});

/** Renders a drop down containing all of the car documents */
class AdminUserDropdown extends React.Component {
  /** On submit, insert the data. */
  submit(data, formRef) {
    const { State, unitSystem } = data;
    // console.log(data);
    const owner = Meteor.user().username;
    userInfoDefineMethod.call({ State, unitSystem, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
            // eslint-disable-next-line no-console
            console.error(error.message);
          } else {
            swal('Success', 'Your car has been added! Please visit your profile to view your cars.', 'success');
            formRef.reset();
            // console.log('Success');
          }
        });
  }

  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      State: [],
      unitSystem: [],
    };
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() :
        <div className={'loaderStyle'}>
          <Loader inverted active size='big'>Getting Cars</Loader>
        </div>;

  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const pageStyle = {
      background: '#001947',
      height: '100vh',
      backgroundSize: 'cover',
      paddingTop: '5em',
      paddingLeft: '10%',
      justifyContent: 'center',
    };

    /*
    * The goal of this page is to filter the select fields based on the user input.
    * We want to only show the relevant car models based on the years and the make.
    * To do this we retrieve the car documents and create two arrays with the models
    * and the make. Then to separate it into an array with objects we filter the car docs
    * based on the car docs and make. After we create a scheme with the allowedValues the
    * user can select. After getting the selected values we filter all the cars based on
    * the make and year chose and return the model.
    */
    const userDocs = UserInfos.find({}).fetch();
    const userState = userDocs.map((doc) => `${doc.State}-${doc._id}`);
    const userUnitSystem = userDocs.map((doc) => `${doc.unitSystem}-${doc._id}`);
    const allUsers = userDocs.filter((doc) => userState.indexOf(doc.State) === userUnitSystem.indexOf(doc.unitSystem));

    const stateAllowedValues = ['Alaska', 'Alabama', 'Arkansas', 'Arizona', 'California', 'Colorado', 'Connecticut',
      'District of Columbia', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Iowa', 'Idaho', 'Illinois',
      'Indiana', 'Kansas', 'Kentucky', 'Louisiana', 'Massachusetts', 'Maryland', 'Maine', 'Michigan',
      'Minnesota', 'Missouri', 'Mississippi', 'Montana', 'North Carolina', 'North Dakota', 'Nebraska',
      'New Hampshire', 'New Jersey', 'New Mexico', 'Nevada', 'New York', 'Ohio', 'Oklahoma', 'Oregon',
      'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
      'Virginia', 'Vermont', 'Washington', 'Wisconsin', 'West Virginia', 'Wyoming'];

    const unitSystemAllowedValues = ['metric', 'us units'];

    const sch = new SimpleSchema({
      State: { type: String, allowedValues: stateAllowedValues },
      unitSystem: { type: String, allowedValues: unitSystemAllowedValues },
    });

    const schema = new SimpleSchema2Bridge(sch);

    /** Update the form filters the selector each time the user interacts with them. */
    const handleChange = (key, value) => {
      // console.log(key, value);
        if (key === 'State') {
          this.setState({
            State: value,
          });

        } else {
          this.setState({
            unitSystem: value,
          });

        }
    };

    const filteredSelectField = allUsers.filter(({ State, unitSystem }) => State === (this.state.State) && unitSystem === (this.state.make);

    // for debugging console.log(filteredSelectField);

    /*
    * In order to get the car Id we must do the following:
    */
    const filteredModel = filteredSelectField.filter(({ State, unitSystem }) => State === (this.state.State) && make === this.state.make && model === this.state.model);

    const make_of_Car = filteredModel.map((doc) => `${doc.make}`).toString(); // gets the id of the car selected
    // for debugging console.log(iDofCar);

    const model_of_Car = filteredModel.map((doc) => `${doc.model}`).toString(); // gets the id of the car selected
    // for debugging console.log(iDofCar);

    const year_of_Car = Number(filteredModel.map((doc) => `${doc.year}`)); // gets the id of the car selected
    // for debugging console.log(iDofCar);

    const mpg_of_Car = Number(filteredModel.map((doc) => `${doc.mpg}`)); // gets the id of the car selected
    // for debugging console.log(iDofCar);

    const allowedModelValues = filteredSelectField.map((doc) => `${doc.model}`);

    let fRef = null;
    const bridge = new SimpleSchema2Bridge(formSchema);

    return (

        <div style={pageStyle}>
          <NavBarMain/>
          <Container style={{ padding: '3em' }}>
            <Header as="h1" textAlign="center" inverted style={{ fontWeight: 'lighter' }}>Cars</Header>
            <CarsAccordianQuestions/>
            <AutoForm schema={schema} onChange={handleChange}>
              {/* multiple select fields which renders the car options */}
              <SelectField
                  id='select-year'
                  className={'SelectFieldforCarDropdown'}
                  name='years'
                  showInlineError={true}
                  placeholder='Select Year'
                  style={{ minHeight: '40px', minWidth: '100px', fontFamily: 'Roboto' }}
              />
              <SelectField
                  id='select-make'
                  className={'SelectFieldforCarDropdown'}
                  name='make'
                  showInlineError={true}
                  placeholder='Select Make'
                  style={{ fontFamily: 'Roboto' }}
              />
              <SelectField
                  id='select-model'
                  className={'SelectFieldforCarDropdown'}
                  name='model'
                  allowedValues={allowedModelValues}
                  showInlineError={true}
                  placeholder='Select Model'
                  style={{ fontFamily: 'Roboto' }}
              />
            </AutoForm>

            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>

              <TextField
                  style={{ paddingTop: '1em', fontFamily: 'Roboto' }}
                  id='input-car'
                  className={'SelectFieldforCarDropdown'}
                  name='carName'
                  placeholder='Enter the name of your vehicle'
              />
              <ErrorField
                  name="carName"
                  errorMessage="Please type the name of your vehicle"
              />
              <HiddenField name="makeofCar" value={make_of_Car}/>
              <HiddenField name="modelofCar" value={model_of_Car}/>
              <HiddenField name="yearofCar" value={year_of_Car}/>
              <HiddenField name="mpgofCar" value={mpg_of_Car}/>

              <SubmitField className={'carsDropDownBtn'} value='Submit' id='submit-car'/>
            </AutoForm>

          </Container>
        </div>
    );
  }
}

AdminUserDropdown.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Cars documents.
  const subscription = Cars.subscribeCars();
  return {
    ready: subscription.ready(),
  };
})(AdminUserDropdown);
