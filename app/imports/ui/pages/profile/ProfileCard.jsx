import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Image, Card, Button, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';
import NavBarHome from '../../components/main-navbar/NavBarMain';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfileCard extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() :
        <Loader active inverted>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const pageStyle = {
      display: 'flex',
      background: 'rgb(21 51 62)',
    };
    const divstyle = {
      height: '100vh',
      paddingTop: '2em',
    };

    return (
        <div style={pageStyle}>
          <NavBarHome/>
          <div style={divstyle}>
            <Container style={{ paddingTop: '5em' }}>
              <Header inverted as="h2" textAlign="center">The User Profile</Header>
              <Card style={{ margin: 'auto' }}>
                <Image size='medium' src ={this.props.profiles.userImage}
                    // eslint-disable-next-line
                       onError={(i) => i.target.src='/images/default_image.png'}/>
                <Card.Content>
                  <Card.Header>
                    {this.props.profiles.firstName}  {this.props.profiles.lastName}
                  </Card.Header>
                  <Card.Meta>
                   {this.props.profiles.user}
                  </Card.Meta>
                  <Card.Description>
                    <p>
                      Zipcode: {this.props.profiles.zipcode}
                    </p>

                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button as={NavLink} exact to={`/edit/${this.props.profiles._id}`} animated='vertical' floated='right' size='big'>
                    <Button.Content hidden>Edit</Button.Content>
                    <Button.Content visible>
                      <Icon name='pencil' />
                    </Button.Content>
                  </Button><Button as={NavLink} exact to={`/change/${this.props.profiles._id}`} animated='vertical' floated='left' size='big'>
                  <Button.Content hidden>Password</Button.Content>
                  <Button.Content visible>
                    <Icon name='lock' />
                  </Button.Content>
                </Button>
                </Card.Content>
              </Card>
            </Container>
          </div>
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
