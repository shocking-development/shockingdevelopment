import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import NavBarHome from '../components/main-navbar/NavBarMain';
import StaticData from '../components/StaticData';
import WeeklyUpdate from '../components/WeeklyUpdate';

function AddData() {

  return (
      <div style={{ marginTop: '-10px' }}>
        <NavBarHome/>
        <div style={{ textAlign: 'center', background: '#174060', minHeight: '80vh', Width: '100%', paddingLeft: '15em', paddingTop: '8em', paddingBottom: '8em' }}>
        <Header inverted size='huge' textAlign={'center'}>Add Data</Header>
        <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>
          <StaticData/>
          <WeeklyUpdate/>
        </div>
      </div>
  );
}

export default AddData;
