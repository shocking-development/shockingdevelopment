import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import StaticData from '../../components/emissions/StaticData';
import UpdateEmissions from '../../components/emissions/UpdateEmissions';
import RecentlyAdded from '../../components/emissions/RecentlyAdded';
import EmissionsChart from '../../components/emissions/EmissionsChart';

function AddEmissions() {

  return (
      <div style={{ marginTop: '-10px' }}>
        <NavBarHome/>
        <div style={{ textAlign: 'center', background: 'rgb(21 51 62)', minHeight: '80vh', Width: '100%', paddingLeft: '15em', paddingTop: '8em', paddingBottom: '8em' }}>
        <Header inverted size='huge' textAlign={'center'}>Add Emissions</Header>
        <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>
          <StaticData/>
          <UpdateEmissions/>
          <RecentlyAdded/>
          {/*<EmissionsChart/>*/}
        </div>
      </div>
  );
}

export default AddEmissions;
