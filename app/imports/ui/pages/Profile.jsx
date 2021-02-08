import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Item, Header, Grid, Loader, Button, Segment, Divider, Icon } from 'semantic-ui-react';
import Text from 'uniforms-semantic/src/TextField';
import { Profiles } from '../../api/profile/Profile';

class Profile extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }
  renderPage() {
    return (
        <Container>
          <Grid divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Item.Group>
                  <Item.Image size='medium' src={this.props.Profiles.image}
                      // eslint-disable-next-line
                              onError={(i) => i.target.src='/images/default_image.png'}/>
                </Item.Group>
                <Item.Content>
                  <Item.Header as='a'>{this.props.Profiles.firstName} {this.props.Profiles.lastName}</Item.Header>
                </Item.Content>

              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}
/** Require an array of UserInfo documents in the props. */
Profile.propTypes = {
  Profiles: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
  currentId: PropTypes.string,
}

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const userAccount = Meteor.users.findOne(match.params._id);
  const userName = userAccount ? userAccount.username : '';
  const subscription = Meteor.subscribe('Profiles');
  return {
    Profiles: Profiles.findOne({ user: userName }) ? Profiles.findOne({ user: userName }) : {},
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentId: match.params._id,
    ready: subscription.ready(),
  };
})(Profile);
