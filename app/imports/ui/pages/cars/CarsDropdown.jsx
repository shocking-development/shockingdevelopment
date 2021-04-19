import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorField, SelectField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Cars } from '../../../api/cars/CarsCollection';
import NavBarMain from '../../components/main-navbar/NavBarMain';
import { userInfoCarDefineMethod } from '../../../api/userInfo/UserInfoCarCollection.methods';

const formSchema = new SimpleSchema({
  carName: String,
  makeofCar: String,
  modelofCar: String,
  yearofCar: Number,
  mpgofCar: Number,
});

/** Renders a drop down containing all of the car documents */
class CarsDropdown extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { carName, makeofCar, modelofCar, yearofCar, mpgofCar } = data;
    // console.log(data);
    const owner = Meteor.user().username;
    userInfoCarDefineMethod.call({ carName, makeofCar, modelofCar, yearofCar, mpgofCar, owner },
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
      make: [],
      model: [],
      years: [],
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
    const carDocs = Cars.find({}).fetch();
    const carModelForAllCars = carDocs.map((doc) => `${doc.model}-${doc._id}`);
    const carMakeForAllCars = carDocs.map((doc) => `${doc.make}-${doc._id}`);
    const allCars = carDocs.filter((doc) => carMakeForAllCars.indexOf(doc.make) === carModelForAllCars.indexOf(doc.model));

    const carMakeAllowedValues = ['Acura', 'Alfa Romeo', 'Audi', 'BMW', 'Bentley', 'Buick', 'Cadillac', 'Chevrolet',
      'Chrysler', 'Dodge', 'Fiat', 'Fisker', 'Ford', 'Ferrari', 'GMC', 'Genesis', 'Honda', 'Hyundai',
      'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Land Rover', 'Lamborghini', 'Lexus', 'Lincoln', 'Lotus', 'Maserati', 'Mazda',
      'Mercedes-Benz', 'Mercury', 'Mini', 'Mitsubishi',
      'Nikola', 'Nissan', 'Polestar', 'Pontiac', 'Porsche', 'Ram', 'Rivian',
      'Rolls-Royce', 'Saab', 'Saturn', 'Scion', 'Smart', 'Subaru', 'Suzuki',
      'Tesla', 'Toyota', 'Volkswagen', 'Volvo'];

    /* Code reference to generate Array of years https://renatello.com/javascript-array-of-years/ */
    function generateArrayOfYears() {
      const max = new Date().getFullYear();
      const min = max - 37;
      const years = [];

      for (let i = max; i >= min; i--) {
        years.push(i);
      }
      return years;
    }

    const years = generateArrayOfYears();

    const carYears = years;

    const sch = new SimpleSchema({
      make: { type: String, allowedValues: carMakeAllowedValues },
      model: { type: String, allowedValues: [] },
      years: { type: String, allowedValues: carYears },
    });

    const schema = new SimpleSchema2Bridge(sch);

    /** Update the form filters the selector each time the user interacts with them. */
    const handleChange = (key, value) => {
      // console.log(key, value);
      if (key === 'years') {
        this.setState({
          years: value,
        });

      } else
        if (key === 'make') {
          this.setState({
            make: value,
          });

        } else {
          this.setState({
            model: value,
          });

        }
    };

    const filteredSelectField = allCars.filter(({ year, make }) => year === Number(this.state.years) && make === this.state.make);

    // for debugging console.log(filteredSelectField);

    /*
    * In order to get the car Id we must do the following:
    */
    const filteredModel = filteredSelectField.filter(({ year, make, model }) => year === Number(this.state.years) && make === this.state.make && model === this.state.model);

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

              <SubmitField value='Submit' id='submit-car'/>
            </AutoForm>

          </Container>
        </div>
    );
  }
}

CarsDropdown.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Cars documents.
  const subscription = Cars.subscribeCars();
  return {
    ready: subscription.ready(),
  };
})(CarsDropdown);
