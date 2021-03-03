import React from 'react';
import { Container, Form, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
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
      make: '',
      model: '',
      years: '',

    };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e) => {
    this.setState({
      make: e.target,
    });
    console.log(`selected ${e}`);
  };

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
    // const filtered by year
    // const filtered by model
    // const filtered by make
    // create a set state
    const carYears = carDocs.map((doc) => `${doc.year}`);
    const carModel = carDocs.map((doc) => `${doc.model}`);
    const carMake = carDocs.map((doc) => `${doc.make}`);

    const sch = new SimpleSchema({
      make: { type: String, allowedValues: carMake },
      model: { type: String, allowedValues: carModel },
      years: { type: String, allowedValues: carYears },
    });

    const schema = new SimpleSchema2Bridge(sch);

    // console.log(carMake);

    return (
        <div style={pageStyle}>
          <NavBarMain/>
          <Container style={{ padding: '10em' }}>
            <Header as="h2" textAlign="center" inverted>Cars</Header>
            <AutoForm schema={schema} onChange={(key, value) => {
              console.log(key, value);
            }}>
              <SelectField
                  name='make'
              />
              <SelectField
                  name='model'
              />
              <SelectField
                  name='years'
              />
              {/* multiple select fields */}
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
