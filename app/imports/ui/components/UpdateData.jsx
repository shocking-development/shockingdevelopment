import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Dropdown, Card, Button, Input, Popup, Form } from 'semantic-ui-react';
import { TripsCollection } from '../../api/data/TripsCollection';

function UpdateData() {

    const user = useTracker(() => Meteor.userId());
    const trips = useTracker(() => {
    Meteor.subscribe('trips');
    return TripsCollection.find({ owner: user }).fetch();
    });

    const currentDate = new Date();
    let cMonth = currentDate.getMonth() + 1;
    if (cMonth.toString().length === 1) {
        cMonth = `0${cMonth}`;
    }
    const fullDate = `${currentDate.getFullYear().toString()}-${cMonth.toString()}-${currentDate.getDate().toString()}`;

    const tripOptions = [];

    trips.forEach(trip => {
        tripOptions.push({
            key: trip.name,
            text: trip.name,
            value: trip.miles,
        });
    });

    tripOptions.push({
        key: 'Custom',
        text: 'Custom',
        value: 'Custom',
    });

    const transportationOptions = [
        {
            key: 'Drove',
            text: 'Drove',
            value: 'Drove',
        },
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

    const [tripDetails, setTripDetails] = useState({
        date: fullDate,
        transportation: null,
        custom: false,
        trip: null,
        miles: null,
    });

    const changeDate = (e) => {
        setTripDetails({
            date: e.target.value,
            transportation: tripDetails.transportation,
            custom: tripDetails.custom,
            trip: tripDetails.trip,
            miles: tripDetails.miles,
        });
    };

    const changeTransportation = (e, data) => {
        setTripDetails({
            date: tripDetails.date,
            transportation: data.value,
            custom: tripDetails.custom,
            trip: tripDetails.trip,
            miles: tripDetails.miles,
        });
    };

    const changeTrip = (e, data) => {
        if (data.value === 'Custom') {
            setTripDetails({
                date: tripDetails.date,
                transportation: tripDetails.transportation,
                custom: true,
                trip: null,
                miles: null,
            });
        } else {
            setTripDetails({
                date: tripDetails.date,
                transportation: tripDetails.transportation,
                custom: false,
                trip: data.key,
                miles: data.value,
            });
        }
    };

    const changeTripName = (e) => {
        setTripDetails({
            date: tripDetails.date,
            transportation: tripDetails.transportation,
            custom: true,
            trip: e.target.value,
            miles: tripDetails.miles,
        });
    };

    const changeTripMiles = (e) => {
        setTripDetails({
            date: tripDetails.date,
            transportation: tripDetails.transportation,
            custom: true,
            trip: tripDetails.trip,
            miles: e.target.value,
        });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

    if (tripDetails.custom) {
        Meteor.call('trips.insert', {
            owner: user,
            name: tripDetails.trip,
            miles: tripDetails.miles,
        });
        }

        Meteor.call('data.insert', {
        owner: user,
        date: tripDetails.date,
        transportation: tripDetails.transportation,
        miles: tripDetails.miles,
        });

    };

    return (
        <div style={{ paddingTop: '3rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card style={{ padding: '1rem', background: '#4282AF' }}>
                <Card.Content>
                    <Card.Header style={{ color: 'white' }}>Add</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field required>
                        <label style={{ color: 'white' }}>Date</label>
                        <input type="date" value={tripDetails.date} onChange={changeDate}/>
                        </Form.Field>
                        <Form.Field required>
                        <label style={{ color: 'white' }}>Transportation</label>
                        <Dropdown placeholder='Select transportation' fluid selection options={transportationOptions} onChange={changeTransportation}/>
                        </Form.Field>
                        <Form.Field required>
                        <label style={{ color: 'white' }}>Trip</label>
                        <Dropdown name='Trip Search' placeholder='Select trip' fluid selection options={tripOptions} onChange={changeTrip}/>
                        </Form.Field>
                        {tripDetails.custom ?
                            <div>
                                <br/>
                                <Popup content='Insert a name for this trip' trigger={<Input style={{ width: '60%', float: 'left' }} placeholder='Trip Name' onChange={changeTripName}/>}/>
                                <Popup content='Insert Roundtrip Miles' trigger={<Input style={{ width: '30%', float: 'right' }} placeholder='Miles' onChange={changeTripMiles}/>}/>
                                <br/>
                                <br/>
                            </div> : null
                        }
                        <br/>
                        <Button inverted type='submit'>Add</Button>
                    </Form>
                </Card.Content>
            </Card>
        </div>
    );
}

export default UpdateData;
