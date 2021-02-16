import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserInfo } from '../../api/userInfo/userInfo';
import UserInfoAdmin from '../components/UserInfoAdmin';
// eslint-disable-next-line no-unused-vars
import NavBarHome from '../components/home/NavBarHome';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListofUsersAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container>
        <NavBarHome/>
        <Header as="h2" textAlign="center"> LIST OF USERS</Header>
        <Card.Group>
          {this.props.userinfos.map((userinfo) => <UserInfoAdmin key={userinfo._id} userinfo={userinfo} />)}
        </Card.Group>
      </Container>

    );
  }
}

/** Require an array of Stuff documents in the props. */
ListofUsersAdmin.propTypes = {
  userinfos: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(UserInfo.adminPublicationName);
  return {
    userinfos: UserInfo.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListofUsersAdmin);
