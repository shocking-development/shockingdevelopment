import React from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Cars } from '../../../api/cars/CarsCollection';
import NavBarMain from '../../components/main-navbar/NavBarMain';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class CarsDropdown extends React.Component {

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
    const carNames = carDocs.map((doc) => `${doc.model} ${doc.make} ${doc.year}`);
    const sch = new SimpleSchema({ name: { type: String, allowedValues: carNames } });
    const schema = new SimpleSchema2Bridge(sch);
    console.log(carNames);

    return (
        <div style={pageStyle}>
          <NavBarMain/>
          <Container style={{ padding: '10em' }}>
            <Header as="h2" textAlign="center" inverted>List Profiles (Admin)</Header>
            <AutoForm schema={schema}>
              <SelectField name='name'/>
              {/*multiple select fields*/}
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
