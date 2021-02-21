import React, { useState } from 'react';
import { Dropdown, Card, Button } from 'semantic-ui-react';

function UpdateData() {

    const currentDate = new Date();
    let cMonth = currentDate.getMonth() + 1;
    if (cMonth.toString().length === 1) {
        cMonth = `0${cMonth}`;
    }
    const fullDate = `${currentDate.getFullYear().toString()}-${cMonth.toString()}-${currentDate.getDate().toString()}`;

    const transportationOptions = [
        {
            key: 'Telework',
            text: 'Telework',
            value: 'Telework',
        },
        {
            key: 'Public Transportation',
            text: 'Public Transportation',
            value: 'Public Transportation',
        },
        {
            key: 'Biking',
            text: 'Biking',
            value: 'Biking',
        },
        {
            key: 'Walk',
            text: 'Walk',
            value: 'Walk',
        },
        {
            key: 'Carpool',
            text: 'Carpool',
            value: 'Carpool',
        },
        {
            key: 'Electric Vehicle',
            text: 'Electric Vehicle',
            value: 'Electric Vehicle',
        },
    ];

    const [dateState, setDateState] = useState({
        date: fullDate,
    });

    const [transportationState, setTransportationState] = useState({
        transportation: null,
    });

    const changeDate = (e) => {
        setDateState({
            date: e.target.value,
        });
    };

    const changeTransportation = (e) => {
        setTransportationState({
            transportation: e.target.value,
        });
    };

    return (
        <div style={{ paddingTop: '5rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card style={{ padding: '1rem', background: '#4282AF' }}>
                <Card.Content>
                    <Card.Header style={{ color: 'white' }}>Add</Card.Header>
                </Card.Content>
                <Card.Content>
                    <input type="date" value={dateState.date} onChange={changeDate}/>
                    <br/>
                    <br/>
                    <Dropdown placeholder='Select transportation' fluid selection options={transportationOptions} value={transportationState.transportation} onChange={changeTransportation}/>
                    <br/>
                    <Button inverted>Add</Button>
                </Card.Content>
            </Card>
        </div>
    );
}

export default UpdateData;
