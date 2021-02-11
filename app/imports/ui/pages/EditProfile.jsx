import React from 'react';
import EditProfileForm from '../components/EditProfileForm';
import NavBarHome from '../components/NavBarHome';

function EditProfile() {
    return (
        <div style={{ marginTop: '-10px' }}>
            <NavBarHome/>
            <div style={{ textAlign: 'center', background: '#174060', minHeight: '80vh', minWidth: '100vw' }}>
                <h1 style={{ color: 'white', paddingTop: '10vh', paddingBottom: '2rem', fontSize: '36px' }}><u>EDIT PROFILE</u></h1>
                <EditProfileForm/>
            </div>
        </div>
    );
}

export default EditProfile;
