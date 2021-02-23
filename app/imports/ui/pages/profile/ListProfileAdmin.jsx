import React from 'react';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';
import ProfileItemAdmin from '../../components/profile/ProfileItemAdmin';
import NavBarMain from '../../components/main-navbar/NavBarMain';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListProfileAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='Home-page-background'>
          <NavBarMain/>
          <Container style={{ padding: '6em' }}>
            <Header as="h2" textAlign="center" inverted>List Profiles (Admin)</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>UserName</Table.HeaderCell>
                  <Table.HeaderCell>firstName</Table.HeaderCell>
                  <Table.HeaderCell>lastName</Table.HeaderCell>
                  <Table.HeaderCell>email</Table.HeaderCell>
                  <Table.HeaderCell>password</Table.HeaderCell>
                  <Table.HeaderCell>transportation</Table.HeaderCell>
                  <Table.HeaderCell>zipcode</Table.HeaderCell>
                  <Table.HeaderCell>owner</Table.HeaderCell>
                  <Table.HeaderCell>remove</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.profiles.map((profile) => <ProfileItemAdmin key={profile._id} profile={profile}/>)}
              </Table.Body>
            </Table>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListProfileAdmin.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = UserInfos.subscribeUserInfoAdmin();
  return {
    profiles: UserInfos.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListProfileAdmin);
