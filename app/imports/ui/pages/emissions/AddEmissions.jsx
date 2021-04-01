import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import UpdateEmissions from '../../components/emissions/UpdateEmissions';
import RecentlyAdded from '../../components/emissions/RecentlyAdded';
import AllEmissions from '../../components/emissions/AllEmissions';

function AddEmissions() {

  return (
      <div style={{ marginTop: '-10px' }}>
        <NavBarHome/>
        <div style={{ textAlign: 'center', background: 'rgb(21 51 62)', minHeight: '110vh', Width: '100%', paddingLeft: '15em', paddingTop: '8em', paddingBottom: '8em' }}>
        <Header inverted size='huge' textAlign={'center'}>Add Emissions</Header>
        <Image src='images/HEI-WAVE-LOGO.png' centered size='small'/>
        <br/>
          <UpdateEmissions/>
          <Header inverted size='huge' textAlign={'center'}>Recently Added</Header>
        <Image src='images/HEI-WAVE-LOGO.png' centered size='small'/>
        <br/>
          <RecentlyAdded/>
          <Header inverted size='huge' textAlign={'center'}>All Emissions</Header>
        <Image src='images/HEI-WAVE-LOGO.png' centered size='small'/>
        <br/>
          <AllEmissions/>
        </div>
      </div>
  );
}

export default AddEmissions;
