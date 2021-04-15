import React from 'react';
import { Grid, Header, Image, Statistic } from 'semantic-ui-react';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import LandingPagePieChart from '../../components/defaultcharts/LandingPagePieChart';
import LandingPageBarGraph from '../../components/defaultcharts/LandingPageBarGraph';
import { cumulativeEmissionsData } from '../../components/defaultcharts/cumulativeEmissionsData';

/* A simple static component to render the home page when users are logged in. */
function CumulativeGraphs() {

  /* STYLINGS */
  const pageStyle = {
    background: '#001947',
    minHeight: '110vh',
    width: '100%',
  };
  const divstyle = {
    paddingLeft: '15%',
    paddingTop: '3%',
    paddingRight: '2%',
    background: '#001947',
    width: '100vw',
  };
  const boxStyling = {
    background: 'rgba(0, 73, 122, 1)',
    borderRadius: '6px',
    boxShadow: ' 28px 5px 44px -3px #0E324C',
    paddingTop: '10px',
    paddingRight: '10px',
    position: 'relative',
    left: '10px',
    height: '100%',
    width: '24%',
  };

  /* GET CUMULATIVE DATA */
  const savings = cumulativeEmissionsData('totalSavings');
  const gasSaved = cumulativeEmissionsData('totalGasSaved');

  return (
      <div style={pageStyle}>
        <NavBarHome/>
        <div style={divstyle}>
          <Header as="h2" textAlign="center" inverted>CUMULATIVE DATA</Header>
          <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
            paddingBottom: '50px',
          }}/>
          <Grid stackable centered>
            <Grid.Row>
              <Grid centered relaxed columns={'3'}>
                <Grid.Column textAlign={'center'} width={4}>
                  <Statistic inverted>
                    <Statistic.Value>1,550</Statistic.Value>
                    <Statistic.Label>Users</Statistic.Label>
                  </Statistic>
                </Grid.Column>
                <Grid.Column textAlign={'center'} width={8}>
                  <Statistic inverted>
                    <Statistic.Value>${savings}</Statistic.Value>
                    <Statistic.Label>Saved</Statistic.Label>
                  </Statistic>
                </Grid.Column>
                <Grid.Column textAlign={'center'} width={4}>
                  <Statistic inverted>
                    <Statistic.Value>{gasSaved}</Statistic.Value>
                    <Statistic.Label>Gallons Saved</Statistic.Label>
                  </Statistic>
                </Grid.Column>
              </Grid>
            </Grid.Row>
            <Grid.Row style={boxStyling}>
              <LandingPagePieChart/>
              <LandingPageBarGraph/>
            </Grid.Row>
          </Grid>
        </div>
      </div>
  );

}

/* Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default CumulativeGraphs;
