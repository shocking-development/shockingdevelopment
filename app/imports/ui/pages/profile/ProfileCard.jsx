import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Loader, Image, Button, Icon, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import { UserInfosCars } from '../../../api/userInfo/UserInfoCarCollection';
import { Cars } from '../../../api/cars/CarsCollection';
import RecentlyAddedCars from '../cars/RecentlyAddedCars';

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
      paddingLeft: '15em',
      paddingTop: '6em',
      height: '100vh',
      backgroundSize: 'cover',
    };

    return (
        <div style={{
          background: 'rgb(21 51 62)',
          height: '100%',
          backgroundSize: 'cover',
        }}>
          <NavBarHome/>

          <Container style={pageStyle}>
            <Grid className='viewProfile'>
              <Grid.Column width={5}

              >
                <Image src={this.props.profiles.userImage}
                    // eslint-disable-next-line
                       onError={(i) => i.target.src = '/images/default_image.png'}
                       style={{ borderRadius: '5%' }}
                />

                <Button.Group
                    style={{
                      position: 'relative',
                      left: '36%',
                    }}
                >
                  <Button
                      as={NavLink}
                      exact to={`/change/${this.props.profiles._id}`}
                      animated='vertical'
                      size='medium'
                      style={{ marginTop: '10px' }}
                      color='blue'
                      id='edit-password'
                  >
                    <Button.Content hidden>Password</Button.Content>
                    <Button.Content visible>
                      <Icon name='lock'/>
                    </Button.Content>
                  </Button>

                  <Button
                      as={NavLink}
                      id='edit-profile'
                      exact to={`/edit/${this.props.profiles._id}`}
                      animated='vertical'
                      size='medium'
                      style={{ marginTop: '10px' }}
                      color='blue'
                  >
                    <Button.Content hidden>Edit</Button.Content>
                    <Button.Content visible>
                      <Icon name='pencil'/>
                    </Button.Content>
                  </Button>
                </Button.Group>

              </Grid.Column>

              <Grid.Column
                  width={4}
                  style={{ top: '2vh', left: '2%' }}
              >

                <Header as='h1' inverted style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}>
                  {this.props.profiles.firstName} {this.props.profiles.lastName}
                </Header>
                <Header as='h3' inverted style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}>
                  <p>
                    Username: {this.props.profiles.user}
                  </p>
                  <p>
                    Zipcode: {this.props.profiles.zipcode}
                  </p>
                  <p>
                    Unit Preference: {this.props.profiles.unitSystem}
                  </p>
                </Header>

              </Grid.Column>

              <Grid.Column width={6}>

                <RecentlyAddedCars/>

              </Grid.Column>

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
  // Get access to Stuff documents.
  const sub1 = UserInfos.subscribeUserInfo();
  const userAccount = Meteor.users.findOne(match.params._id);
  const sub2 = UserInfosCars.subscribeUserInfoCars();
  const sub3 = Cars.subscribeCars();
  const profiles = UserInfos.findOne(userAccount);
  return {
    profiles,
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentId: match.params._id,
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
    cars: UserInfosCars.find({}).fetch(),
  };
})(ProfileCard);
