import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import DataPagePieChart from '../../components/defaultcharts/DataPagePieChart';
import DataPageBarGraph from '../../components/defaultcharts/DataPageBarGraph';
import DataPageDonutChart1 from '../../components/defaultcharts/DataPageDonutChart1';
import DataPageDonutChart2 from '../../components/defaultcharts/DataPageDonutChart2';
import EmissionForHome from './EmissionForHome';

/** A simple static component to render the datapage page when users are logged in. */
class Datapage extends React.Component {

  render() {
    /** Some styling components */
    const pageStyle = {
      paddingTop: '5em',
      paddingBottom: '10em',
      height: '100%',
      backgroundSize: 'cover',
    };
    const outer_div_pagestyle = {
      background: '#001947',
      backgroundSize: 'cover',
      height: '100%',
    };

    const dataPagePieChartstyling = {
      background: 'rgba(0, 73, 122, 1)',
      borderRadius: '6px',
      paddingTop: '10px',
    };

    const dataPagebarGraphstyling = {
      background: 'rgba(0, 73, 122, 1)',
      borderRadius: '6px',
      paddingTop: '10px',
      paddingRight: '10px',
    };

    const dataPageDonutChart1styling = {
      background: 'rgba(0, 73, 122, 1)',
      borderRadius: '6px',
      paddingTop: '10px',
      paddingRight: '10px',
      height: '100%',
    };

    const dataPageDonutChart2styling = {
      background: 'rgba(0, 73, 122, 1)',
      borderRadius: '6px',
      paddingTop: '10px',
      paddingRight: '10px',
      height: '100%',
    };

    const dataTableDivstyling = {
      background: 'rgba(0, 73, 122, 1)',
      /* background: '#0a69a7' */
      borderRadius: '6px',
      paddingTop: '10px',
      paddingRight: '10px',
      height: '100%',
    };
    /* const tablestyling = {
      background: '#0a69a7',
      position: 'relative',
      left: '1.29em',
      height: '100%',
      width: '94%',
      color: 'white',
      border: 'none',
    }; */

    return (
        <div style={outer_div_pagestyle}>
          <NavBarHome/>
          <div style={pageStyle}>
            <div style={{ width: '90%', margin: 'auto' }}>
              <Grid stackable columns='equal'>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <div style={dataPagePieChartstyling}>
                      <DataPagePieChart/>
                    </div>
                  </Grid.Column>
                <Grid.Column width={8}>
                  <div style={dataPagebarGraphstyling}>
                    <DataPageBarGraph/>
                  </div>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <div style={dataPageDonutChart1styling}>
                      <DataPageDonutChart1/>
                    </div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                    <div style={dataPageDonutChart2styling}>
                      <DataPageDonutChart2/>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <div style={dataTableDivstyling}>
                      <EmissionForHome/>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </div>
        </div>
    );
  }
}

/** Declare the types of all properties. */
Datapage.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const DatapageContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Datapage);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(DatapageContainer);
