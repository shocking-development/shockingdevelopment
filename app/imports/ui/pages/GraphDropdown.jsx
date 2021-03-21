import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorField, SelectField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Cars } from '../../api/cars/CarsCollection';
import { Graphs } from '../../api/graphs/GraphsCollection';
import NavBarMain from '../components/main-navbar/NavBarMain';
import { userInfoCarDefineMethod } from '../../api/userInfo/UserInfoCarCollection.methods';
import RecentlyAddedCars from './AddGraph';
import SavingsPageBarGraph from '../components/defaultcharts/SavingsPageBarGraph';

const formSchema = new SimpleSchema({
  carName: String,
  carId: String,
});

const dataPageBarGraphstyling = {
  background: 'rgb(200, 200, 200)',
  borderRadius: '5px',
  paddingTop: '5px',
  paddingRight: '5px',
  color: 'black',
};

/** Renders a drop down containing all of the car documents */
class GraphDropdown extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { carName, carId } = data;
    // console.log(data);
    const owner = Meteor.user().username;
    userInfoCarDefineMethod.call({ carName, carId, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
            // eslint-disable-next-line no-console
            console.error(error.message);
          } else {
            swal('Success', 'Your car has been added!', 'success');
            formRef.reset();
            // console.log('Success');
          }
        });
  }

  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      name: [],
      model: [],
      years: [],
    };
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const pageStyle = {
      background: 'rgb(21 51 62)',
      height: '66em',
      backgroundSize: 'cover',
      paddingTop: '5em',
      marginLeft: '10%',
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
    const carDocs = Graphs.find({}).fetch();
    const carModelForAllCars = carDocs.map((doc) => `${doc.model}-${doc._id}`);
    const carMakeForAllCars = carDocs.map((doc) => `${doc.name}-${doc._id}`);
    const allCars = carDocs.filter((doc) => carMakeForAllCars.indexOf(doc.name) === carModelForAllCars.indexOf(doc.model));

    const carMakeAllowedValues = ['Acura', 'Alfa Romeo', 'Audi', 'BMW', 'Bentley', 'Buick', 'Cadillac', 'Chevrolet',
      'Chrysler', 'Dodge', 'Fiat', 'Ford', 'GMC', 'Genesis', 'Honda', 'Hyundai',
      'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Land Rover', 'Lexus', 'Lincoln', 'Lotus', 'Maserati', 'Mazda',
      'Mercedes-Benz', 'Mercury', 'Mini', 'Mitsubishi',
      'Nikola', 'Nissan', 'Polestar', 'Pontiac', 'Porsche', 'Ram', 'Rivian',
      'Rolls-Royce', 'Saab', 'Saturn', 'Scion', 'Smart', 'Subaru', 'Suzuki',
      'Tesla', 'Toyota', 'Volkswagen', 'Volvo'];

    // Code reference to generate Array of years https://renatello.com/javascript-array-of-years/
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
      name: { type: String, allowedValues: carMakeAllowedValues },
      model: { type: Number, allowedValues: [] },
      years: { type: Number, allowedValues: carYears },
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
            name: value,
          });

        } else {
          this.setState({
            model: value,
          });

        }
    };

    const filteredSelectField = allCars.filter(({ year, make }) => year === Number(this.state.years) && make === this.state.name);

    /*
    * In order to get the car Id we must do the following:
    */
    const iDofCar = filteredSelectField.map((doc) => `${doc._id}`).toString(); // gets the id of the car selected
    // console.log(iDofCar);
    const allowedModelValues = filteredSelectField.map((doc) => `${doc.model}`);

    let fRef = null;
    const bridge = new SimpleSchema2Bridge(formSchema);

    return (

        <div style={pageStyle}>
          <NavBarMain/>
          <Container>
            <Header as="h2" textAlign="center" inverted>Graph</Header>

            <AutoForm schema={schema} onChange={handleChange}>
              {/* multiple select fields which renders the car options */}
              <SelectField
                  className={'carDropdownSelectField'}
                  name='years'
                  showInlineError={true}
                  placeholder='Select Year'
              />
              <SelectField
                  className={'carDropdownSelectField'}
                  name='name'
                  showInlineError={true}
                  placeholder='Select Make'
              />
              <SelectField
                  className={'carDropdownSelectField'}
                  name='model'
                  allowedValues={allowedModelValues}
                  showInlineError={true}
                  placeholder='Select Model'
              />
            </AutoForm>


            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>

              <TextField
                  className={'carDropdownSelectField'}
                  name='carName'
                  placeholder='Enter the name of your vehicle'
              />
              <ErrorField
                  name="carName"
                  errorMessage="Please type the name of your vehicle"
              />
              <HiddenField name="carId" value={iDofCar}/>
              <ErrorField
                  name="carId"
                  errorMessage="Please select your car first"
              />
              <SubmitField value='Submit'/>
            </AutoForm>
            <div style={dataPageBarGraphstyling}>
              <SavingsPageBarGraph/>
            </div>


            <div className="ui input">

              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>

                <input type="text" placeholder="Name"/>
                <input type="text" placeholder="Data 1"/>
                <input type="text" placeholder="Data 2"/>
                <input type="text" placeholder="Data 3"/>

                <SubmitField value='Submit'/>
              </AutoForm>
            </div>



          </Container>
          <RecentlyAddedCars/>
        </div>
    );
  }
}

GraphDropdown.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Graphs.subscribeCars();
  return {
    ready: subscription.ready(),
  };
})(GraphDropdown);
