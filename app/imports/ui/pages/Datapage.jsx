import React from 'react';
import { Grid, Segment, Header, Statistic, Image } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarHome from '../components/NavBarHome';

/** A simple static component to render the home page when users are logged in. */
class Home extends React.Component {

  render() {
    const pageStyle = { marginLeft: '20em', paddingTop: '8em', paddingBottom: '135px', height: '47.9em', backgroundSize: 'cover', marginTop: '-10px', marginRight: '6em' };
    return (
        <div className='Home-page-background'>
          <NavBarHome/>
          <div style={pageStyle}>
          <Image src='images/Datapage-image.png' centered style={{
            paddingBottom: '50px',
            height: 'auto%',
          }}/>

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
