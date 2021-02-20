import React from 'react';
import { Grid, Segment, Header, Statistic, Image, Container, Menu } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarHome from '../components/home/NavBarHome';

/** A simple static component to render the home page when users are logged in. */
class GoToSavings extends React.Component {

  render() {
    const square = { width: 285, height: 285 };
    const pageStyle = {
      marginLeft: '20em',
      paddingTop: '8em',
      paddingBottom: '135px',
      height: '47.9em',
      backgroundSize: 'cover',
      marginTop: '-10px',
      marginRight: '6em',
    };
    return (
        <div className='Home-page-background'>
          <NavBarHome/>
          <div style={pageStyle}>
            <Header inverted size='huge' textAlign={'center'}>Welcome back, {this.props.currentUser} </Header>
            <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>
            <Grid stackable centered columns={3}>
              <Grid.Row centered>
                <Grid.Column>
                  <div align="center">
                    <Segment circular style={square}>
                      <Statistic inverted>
                        {this.props.currentUser ? (
                            [<Menu.Item as={NavLink} activeClassName="active" exact to="/notfound" key='data'>For Car</Menu.Item>,
                              <Menu.Item as={NavLink} activeClassName="active" exact to="/notfound" key='savings'>Go To
                                Savings</Menu.Item>,
                              <Menu.Item as={NavLink} activeClassName="active" exact to="/notfound" key='route'>Map your
                                route</Menu.Item>,
                            ]
                        ) : ''}
                      </Statistic>
                    </Segment>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div align="center">
                    <Segment circular style={square}>
                      <Statistic inverted>
                        {/* Needs to be filled with actual data. */}
                        <Statistic.Value>5 lbs</Statistic.Value>
                        <Statistic.Label>GHG reduced</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div align="center">
                    <Segment circular style={square}>
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
          </div>
        </div>
    );
  }
}

/** Declare the types of all properties. */
GoToSavings.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const GoToSavingsContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(GoToSavings);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(GoToSavingsContainer);

