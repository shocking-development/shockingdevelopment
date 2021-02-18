import React from 'react';
import NavBarHome from '../components/main-navbar/NavBarMain';
import StaticData from '../components/StaticData';
import WeeklyUpdate from '../components/WeeklyUpdate';

function AddData() {

  return (
      <div style={{ marginTop: '-10px' }}>
        <NavBarHome/>
        <div style={{ textAlign: 'center', background: '#174060', minHeight: '80vh', Width: '100%', paddingLeft: '15em' }}>
          <h1 style={{ color: 'white', paddingTop: '10vh', paddingBottom: '2rem', fontSize: '36px' }}><u>ADD DATA</u>
          </h1>
          <StaticData/>
          <WeeklyUpdate/>
        </div>
      </div>
  );
}

export default AddData;
