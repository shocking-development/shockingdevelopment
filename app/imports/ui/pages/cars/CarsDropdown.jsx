import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { AutoForm, SelectField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Cars } from '../../../api/cars/CarsCollection';
import NavBarMain from '../../components/main-navbar/NavBarMain';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class CarsDropdown extends React.Component {

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
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const pageStyle = {
      background: 'rgb(21 51 62)',
      height: '60em',
      backgroundSize: 'cover',
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

    const carMakeAllowedValues = ['Acura', 'Alfa Romeo', 'Audi', 'BMW', 'Bentley', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler',
      'Dodge', 'Fiat', 'Ford', 'GMC', 'Genesis', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Land Rover', 'Lexus', 'Lincoln',
      'Lotus', 'Maserati', 'Mazda', 'Mercedes-Benz', 'Mercury', 'Mini', 'Mitsubishi', 'Nikola', 'Nissan', 'Polestar', 'Pontiac', 'Porsche', 'Ram', 'Rivian',
      'Rolls-Royce', 'Saab', 'Saturn', 'Scion', 'Smart', 'Subaru', 'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'];
    const carYears = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2018, 2019];

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
    const allowedModelValues = filteredSelectField.map((doc) => `${doc.model}`);

    return (
        <div style={pageStyle}>
          <NavBarMain/>
          <Container style={{ padding: '10em' }}>
            <Header as="h2" textAlign="center" inverted>Cars</Header>
            <AutoForm schema={schema} onChange={handleChange}>
              {/* multiple select fields which renders the car options */}
              <SelectField
                  name='years'
              />
              <SelectField
                  name='make'
              />
              <SelectField
                  name='model'
                  allowedValues={allowedModelValues}
              />
            </AutoForm>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
CarsDropdown.propTypes = {
  cars: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Cars.subscribeCars();
  return {
    cars: Cars.find({}).fetch(),
    ready: subscription.ready(),
  };
})(CarsDropdown);
