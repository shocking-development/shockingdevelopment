import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Dropdown, Card, Button, Input, Popup, Form } from 'semantic-ui-react';
import { Trip } from '../../api/data/TripCollection';
import { Data } from '../../api/data/DataCollection';

function UpdateData() {

    const trips = useTracker(() => Trip.collection.find({ owner: 'currentuser' }).fetch());
    console.log(trips);

    const currentDate = new Date();
    let cMonth = currentDate.getMonth() + 1;
    if (cMonth.toString().length === 1) {
        cMonth = `0${cMonth}`;
    }
    const fullDate = `${currentDate.getFullYear().toString()}-${cMonth.toString()}-${currentDate.getDate().toString()}`;

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

    const tripOptions = [
        {
            key: 'Work',
            text: 'Work',
            value: 20,
        },
        {
            key: 'Grocery Store',
            text: 'Grocery Store',
            value: 10,
        },
        {
            key: 'Custom',
            text: 'Custom',
            value: 'Custom',
        },
    ];

    const [dateState, setDateState] = useState({
        date: fullDate,
    });

    const [transportationState, setTransportationState] = useState({
        transportation: null,
    });

    const [tripState, setTripState] = useState({
        custom: false,
        trip: null,
        miles: null,
    });

    const changeDate = (e) => {
        setDateState({
            date: e.target.value,
        });
    };

    const changeTransportation = (e, data) => {
        setTransportationState({
            transportation: data.value,
        });
    };

    const changeTrip = (e, data) => {
        if (data.value === 'Custom') {
            setTripState({
                custom: true,
                trip: null,
                miles: null,
            });
        } else {
            setTripState({
                custom: false,
                trip: data.key,
                miles: data.value,
            });
        }
    };

    const changeTripName = (e) => {
        setTripState({
            custom: true,
            trip: e.target.value,
            miles: tripState.miles,
        });
    };

    const changeTripMiles = (e) => {
        setTripState({
            custom: true,
            trip: tripState.trip,
            miles: e.target.value,
        });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (tripState.custom) {
        Trip.collection.insert({
            owner: 'currentuser',
            name: tripState.trip,
            miles: tripState.miles,
        });
      }

      Data.collection.insert({
        owner: 'currentuser',
        date: dateState.date,
        transportation: transportationState.transportation,
        miles: tripState.miles,
      });

      console.log("it worked!");
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
                        <input type="date" value={dateState.date} onChange={changeDate}/>
                        </Form.Field>
                        <Form.Field required>
                        <label style={{ color: 'white' }}>Transportation</label>
                        <Dropdown placeholder='Select transportation' fluid selection options={transportationOptions} onChange={changeTransportation}/>
                        </Form.Field>
                        <Form.Field required>
                        <label style={{ color: 'white' }}>Trip</label>
                        <Dropdown name='Trip Search' placeholder='Select trip' fluid selection options={tripOptions} onChange={changeTrip}/>
                        </Form.Field>
                        {tripState.custom ?
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
