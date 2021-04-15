import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Loader, Image, Button, Icon, Header, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';
import { UserInfosCars } from '../../../api/userInfo/UserInfoCarCollection';
import RecentlyAddedCars from '../cars/RecentlyAddedCars';
import NavBarMain from '../../components/main-navbar/NavBarMain';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfileCard extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() :
        <div
            className={'loaderStyle'}>
          <Loader active inverted> Loading Your Profile </Loader>
        </div>;

  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    console.log(this.props);
    const pageStyle = {
      paddingLeft: '10em',
      paddingTop: '6em',
      minHeight: '120vh',
    };

    return (
        <div style={{
          background: '#001947',
          backgroundSize: 'cover',

        }}>
          <NavBarMain/>

          <Container style={pageStyle}>
            <Grid className={'profileGrid'}>

              <Grid.Row>
                <Grid.Column width={5}>

                  <div className={'profilepicCard'}>
                    <Image src={this.props.profiles.userImage}
                        // eslint-disable-next-line
                           onError={(i) => i.target.src = '/images/default_image.png'}
                           style={{ borderRadius: '0.28571429rem', width: '305px' }}
                    />
                  </div>

                </Grid.Column>

                <Grid.Column width={11}>
                  <Segment className={'viewProfile'} style={{ height: '305px', width: '305px' }}>
                    <div className={'infoCard'}>
                      <Header as='h1' inverted style={{ fontWeight: 'lighter' }}>
                        {this.props.profiles.firstName} {this.props.profiles.lastName}
                        <Button
                            as={NavLink}
                            id='edit-profile'
                            exact to={`/edit/${this.props.profiles._id}`}
                            animated='vertical'
                            size='tiny'
                            color='blue'
                            style={{ marginLeft: '20px', width: '9%' }}
                            circular
                            className={'editButtonProfile'}
                        >
                          <Button.Content hidden>Edit</Button.Content>
                          <Button.Content visible>
                            <Icon name='pencil'/>
                          </Button.Content>
                        </Button>
                      </Header>

                      <Header as='h3' inverted style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}>
                        <p>
                          Username: {this.props.profiles.owner}
                        </p>
                        <p>
                          State: {this.props.profiles.State}
                        </p>
                        <p>
                          Unit Preference: {this.props.profiles.unitSystem}
                        </p>
                        <p>
                          Password:
                        </p>
                          <Button
                              as={NavLink}
                              exact to={`/change/${this.props.profiles._id}`}
                              animated='vertical'
                              size='medium'
                              style={{ position: 'absolute', width: '23%', bottom: '47px', right: '22em' }}
                              color='blue'
                              id='edit-password'
                              className={'editButtonProfile'}
                          >
                            <Button.Content hidden>Edit Password</Button.Content>
                            <Button.Content visible>
                              <Icon name='lock'/>
                            </Button.Content>
                          </Button>

                      </Header>
                    </div>
                  </Segment>
                </Grid.Column>

              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={16}>
                  <Segment className={'viewProfile'}>
                    <RecentlyAddedCars/>
                  </Segment>
                </Grid.Column>
              </Grid.Row>

            </Grid>
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
  cars: PropTypes.array,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to UserInfo documents.
  const userID = Meteor.userId();
  const sub1 = UserInfos.subscribeUserInfo();
  const userAccount = Meteor.users.findOne({ _id: userID });
  const sub2 = UserInfosCars.subscribeUserInfoCars();
  const profiles = UserInfos.findOne({ owner: userAccount?.username });
  return {
    profiles,
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentId: match.params._id,
    ready: sub1.ready() && sub2.ready(),
    cars: UserInfosCars.find({}).fetch(),
  };
})(ProfileCard);
