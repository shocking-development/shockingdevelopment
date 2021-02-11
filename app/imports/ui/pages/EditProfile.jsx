import React from 'react';
import EditProfileForm from '../components/EditProfileForm';
import NavBarHome from '../components/NavBarHome';

function EditProfile() {
    return (
        <div style={{ textAlign: 'center', background: '#20639B', minHeight: '80vh', marginTop: '-10px' }}>
            <NavBarHome/>
            <h1 style={{ color: 'white', paddingTop: '20vh', paddingBottom: '2rem', fontSize: '36px' }}><u>EDIT PROFILE</u></h1>
            <EditProfileForm/>
        </div>
    );
}

export default EditProfile;
