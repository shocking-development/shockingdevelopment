import React from 'react';
import NavBarHome from '../components/NavBarHome';
import StaticData from '../components/StaticData';
import WeeklyUpdate from '../components/WeeklyUpdate';

function AddData() {

    return (
        <div style={{ marginTop: '-10px' }}>
            <NavBarHome />
            <div style={{ textAlign: 'center', background: '#20639B', minHeight: '80vh', minWidth: '100%' }}>
                <h1 style={{ color: 'white', paddingTop: '10vh', paddingBottom: '2rem', fontSize: '36px' }}><u>ADD DATA</u></h1>
                <StaticData />
                <WeeklyUpdate />
            </div>
        </div>
    );
}

export default AddData;
