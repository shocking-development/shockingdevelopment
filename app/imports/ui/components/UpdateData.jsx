import React, { useState } from 'react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Dropdown, Card, Button, Input, Popup, Form, Icon } from 'semantic-ui-react';
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

    const deleteTrip = ({ _id }) => Meteor.call('trips.remove', _id);

    trips.forEach(trip => {
        tripOptions.push({
            key: trip._id,
            text: `${trip.name} (${trip.miles})`,
            value: Number(trip.miles),
            content: (
                <div>
                {`${trip.name} (${trip.miles})`}<Button icon='remove' size='small' color='red' onClick={() => deleteTrip(trip)} />
                </div>
            ),
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
            miles: Number(e.target.value),
        });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (tripDetails.transportation === null) {
        swal('Error', 'Please select transportation', 'error');
      } else if (tripDetails.trip === null) {
        swal('Error', 'Please select a trip', 'error');
      } else if (typeof tripDetails.miles !== 'number' || tripDetails.miles === null) {
        swal('Error', 'Please enter a number in the miles input', 'error');
      } else {
          try {
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

            swal('Success', 'Added successfully', 'success').then(() => {
                // eslint-disable-next-line no-undef
                window.location.reload();
            });
          } catch {
              swal('Error', 'Failed to add, please try again.', 'error').then(() => {
                // eslint-disable-next-line no-undef
                window.location.reload();
            });
          }
      }

    };

    return (
        <div style={{ paddingTop: '3rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card style={{ padding: '1rem', background: '#4282AF' }}>
                <Card.Content>
                    <Card.Header style={{ color: 'white' }}>Add</Card.Header>
                </Card.Content>
                <Card.Content>
                        <label style={{ color: 'white' }}>Date</label>
                        <br/>
                        <input type="date" value={tripDetails.date} onChange={changeDate}/>
                        <label style={{ color: 'white' }}>Transportation</label>
                        <Dropdown placeholder='Select transportation' fluid selection options={transportationOptions} onChange={changeTransportation}/>
                        <label style={{ color: 'white' }}>Trip</label>
                        <Dropdown name='Trip Search' placeholder='Select trip' fluid selection options={tripOptions} onChange={changeTrip}/>
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
                        <Button inverted onClick={handleSubmit}>Add</Button>
                </Card.Content>
            </Card>
        </div>
    );
}

export default UpdateData;
