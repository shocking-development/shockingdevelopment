import React from 'react';
import { Grid, Segment, Statistic } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import Datapage from './Datapage';

/** A simple static component to render the home page when users are logged in. */
class Home extends React.Component {

  render() {
    const square = { width: 285, height: 285 };
    const pageStyle = {
      background: 'rgb(21 51 62)',
      minHeight: '110vh',
      width: '100%',
    };
    const divstyle = {
      paddingLeft: '14%',
      paddingTop: '3%',
    };

    return (
        <div style={pageStyle}>
          <NavBarHome/>
          <div style={divstyle}>
            <Grid stackable centered columns={3}>
              <Grid.Row centered>
                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">
                    <Segment className={'grow'} circular style={square}>
                      <Statistic inverted>
                        {/* Needs to be filled with actual data. */}
                        <Statistic.Value>$20</Statistic.Value>
                        <Statistic.Label>saved</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </div>
                </Grid.Column>

                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">
                    <Segment className={'grow'} circular style={square}>
                      <Statistic inverted>
                        {/* Needs to be filled with actual data. */}
                        <Statistic.Value>5 lbs</Statistic.Value>
                        <Statistic.Label>GHG reduced</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </div>
                </Grid.Column>

                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">
                    <Segment className={'grow'} circular style={square}>
                      <Statistic inverted>
                        {/* Needs to be filled with actual data. */}
                        <Statistic.Value>1 gal</Statistic.Value>
                        <Statistic.Label>gas saved</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </div>

                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Datapage/>
          </div>
        </div>
    );
  }
}

/** Declare the types of all properties. */
Home.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const HomeContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Home);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(HomeContainer);
