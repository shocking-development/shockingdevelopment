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

    const carDocs = Cars.find({}).fetch();
    const carYears = carDocs.map((doc) => `${doc.year}`);
    const carModel = carDocs.map((doc) => `${doc.model}-${doc._id}`);
    const carMake = carDocs.map((doc) => `${doc.make}-${doc._id}`);

    // an example of how to filter the cars
    const filteredMake = carDocs.filter((doc) => carMake.indexOf(doc.make) === carModel.indexOf(doc.model));
    const carYears2 = carYears.filter((v, i, a) => a.indexOf(v) === i);

    const sch = new SimpleSchema({
      make: { type: String, allowedValues: carMake },
      model: { type: String, allowedValues: carModel },
      years: { type: String, allowedValues: carYears2 },
    });

    const schema = new SimpleSchema2Bridge(sch);

    // console.log(carYears);
    // console.log(carModel);
    // console.log(carMake);
    console.log(filteredMake);

    /** Update the form filters the selector each time the user interacts with them. */
    const handleChange = (key, value) => {
      // console.log(key, value);
      if (key === 'years') {
        this.setState({
          years: value,
        });
        // console.log(carMake[carYears.indexOf(value)]);
        // console.log(carYears.indexOf(value));
      } else
        if (key === 'make') {
          // console.log(value);
          // console.log(carMake.indexOf(value));
          this.setState({
            make: value,
          });

        } else {
          // console.log(value);
          // console.log(carModel.indexOf(value));
          this.setState({
            model: value,
          });

        }
    };

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
                  allowedValues={carMake.filter((make) => carYears.indexOf(this.state.years) === carMake.indexOf(make))}
              />
              <SelectField
                  name='model'
                  allowedValues={carModel.filter((model) => carYears.indexOf(this.state.years) === carModel.indexOf(model))}
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
