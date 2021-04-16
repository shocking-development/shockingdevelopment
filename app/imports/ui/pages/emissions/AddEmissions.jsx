import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import UpdateEmissions from '../../components/emissions/UpdateEmissions';
import RecentlyAdded from '../../components/emissions/RecentlyAdded';
import AllEmissions from '../../components/emissions/AllEmissions';

function AddEmissions() {

  return (
      <div style={{ marginTop: '-10px' }}>
        <NavBarHome/>
        <div style={{
          background: '#001947',
          minHeight: '110vh',
          Width: '100%',
          paddingLeft: '15em',
          paddingTop: '8em',
          paddingBottom: '8em',
        }}>
          <Grid stackable>
            <Grid.Row>

              <Grid.Column width={5} style={{ paddingLeft: '10vw' }}>
                <Header inverted size='huge' textAlign={'center'}>Add Emissions</Header>
                <UpdateEmissions/>
              </Grid.Column>

              <Grid.Column width={10} style={{}}>
                <Header inverted size='huge' textAlign={'center'}>Recently Added</Header>
                <RecentlyAdded/>
              </Grid.Column>

            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16}>
                <Header inverted size='huge' textAlign={'center'}>All Emissions</Header>
                <AllEmissions/>
              </Grid.Column>
            </Grid.Row>

          </Grid>
        </div>
      </div>
  );
}

export default AddEmissions;
