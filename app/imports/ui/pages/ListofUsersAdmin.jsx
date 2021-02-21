import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
// eslint-disable-next-line no-unused-vars
import StuffItemAdmin from '../components/StuffItemAdmin';
import NavBarHome from '../components/main-navbar/NavBarMain';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListofUsersAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div>
          <NavBarHome/>
          <Container style={{ margin: '120px', paddingLeft: '191px' }}>
            <Header as="h2" textAlign="center">List of Users (Admin)</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Main Transportation</Table.HeaderCell>
                  <Table.HeaderCell>Savings</Table.HeaderCell>
                  <Table.HeaderCell>Type of car</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Header as='h2' textAlign='center'>
                      A
                    </Header>
                  </Table.Cell>
                  <Table.Cell singleLine>Biking</Table.Cell>
                  <Table.Cell>
                    $100
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    N/A <br/>

                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as='h2' textAlign='center'>
                      B
                    </Header>
                  </Table.Cell>
                  <Table.Cell singleLine> Car </Table.Cell>
                  <Table.Cell>
                    $20
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    Honda Accord 2018 <br/>

                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Container>
        </div>

    );
  }
}

/** Require an array of Stuff documents in the props. */
ListofUsersAdmin.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.adminPublicationName);
  return {
    stuffs: Stuffs.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListofUsersAdmin);
