import React, { Component } from 'react';
import EditProfileForm from '../components/EditProfileForm';

class EditProfile extends Component {
    render() {
        return (
            <div style={{ textAlign: 'center', background: '#20639B', minHeight: '100vh', marginTop: '-10px' }}>
                <h1 style={{ color: 'white', paddingTop: '20vh', fontSize: '36px' }}><u>EDIT PROFILE</u></h1>
                <EditProfileForm/>
            </div>
        );
    }
}

export default EditProfile;
