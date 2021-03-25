import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import UpdateEmissions from '../../components/emissions/UpdateEmissions';
import RecentlyAdded from '../../components/emissions/RecentlyAdded';

function AddEmissions() {

  return (
      <div style={{ marginTop: '-10px' }}>
        <NavBarHome/>
        <div style={{ textAlign: 'center', background: 'rgb(21 51 62)', minHeight: '110vh', Width: '100%', paddingLeft: '15em', paddingTop: '8em', paddingBottom: '8em' }}>
        <Header inverted size='huge' textAlign={'center'}>Add Emissions</Header>
        <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>
          <UpdateEmissions/>
          <RecentlyAdded/>
        </div>
      </div>
  );
}

export default AddEmissions;
