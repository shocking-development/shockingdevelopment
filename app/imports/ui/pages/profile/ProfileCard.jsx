import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Image, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';
import NavBarHome from '../../components/main-navbar/NavBarMain';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfileCard extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='Home-page-background'>
          <NavBarHome/>
          <Container style={{ paddingTop: '5em' }}>
            <Header inverted as="h2" textAlign="center">The User Profile</Header>

            <Card style={{ margin: 'auto' }}>
              <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium'/>
              <Card.Content>
                <Card.Header>
                  {this.props.profiles.user}
                </Card.Header>
                <Card.Meta>
                        <span className='date'>
                          Joined in 2015
                        </span>
                </Card.Meta>
                <Card.Description>
                  <p>
                    First name: {this.props.profiles.firstName}
                    <br/>
                    Last name: {this.props.profiles.lastName}
                    <br/>
                    Email: {this.props.profiles.email}
                    <br/>
                    Password: {this.props.profiles.password}
                    <br/>
                    Transportation: {this.props.profiles.transportation}
                    <br/>
                    Zipcode: {this.props.profiles.zipcode}
                  </p>

                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Link to={`/edit/${this.props.profiles._id}`}>Edit Information</Link>
                </a>
              </Card.Content>
            </Card>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfileCard.propTypes = {
  profiles: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
  currentId: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const subscription = UserInfos.subscribeUserInfo();
  const userAccount = Meteor.users.findOne(match.params._id);
  return {
    profiles: UserInfos.findOne(userAccount),
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentId: match.params._id,
    ready: subscription.ready(),
  };
})(ProfileCard);
