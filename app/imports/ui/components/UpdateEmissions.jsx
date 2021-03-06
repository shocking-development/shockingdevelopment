import React, { useState } from 'react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Dropdown, Card, Button, Input, Popup } from 'semantic-ui-react';
import { Trips } from '../../api/emissions/TripsCollection';
import { EmissionsDefineMethod } from '../../api/emissions/EmissionsCollection.methods';
import { TripsDefineMethod, tripsRemoveMethod } from '../../api/emissions/TripsCollection.methods';

/* This component is rendered by the Add Data page and allows users to add trips */
function UpdateEmissions() {

    /* Gets the current user */
    const user = useTracker(() => Meteor.userId());

    /* Gets the users saved preset trips */
    const trips = useTracker(() => {
    Meteor.subscribe(Trips.tripsPublicationName);
    return Trips.collection.find({ owner: user }).fetch();
    });

    /* Gets the current date and puts it in the correct format for the date input */
    const currentDate = new Date();
    let cMonth = currentDate.getMonth() + 1;
    if (cMonth.toString().length === 1) {
        cMonth = `0${cMonth}`;
    }
    let cDay = currentDate.getDate();
    if (cDay.toString().length === 1) {
        cDay = `0${cDay}`;
    }
    const fullDate = `${currentDate.getFullYear().toString()}-${cMonth.toString()}-${cDay.toString()}`;

    /* Transportation options for the dropdown input */
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

    /* DeleteTrip function allows users to delete preset trips */
    const deleteTrip = ({ _id }) => tripsRemoveMethod.call(_id);

    /* Adds the users preset trips along with the custom option to an array that holds the dropdown options */
    const tripOptions = [];
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

    /* Initializing the trip state */
    const [TripState, setTripState] = useState({
        date: fullDate,
        transportation: null,
        custom: false,
        trip: null,
        miles: null,
    });

    /* Changes the date state */
    const changeDate = (e) => {
        setTripState({
            date: e.target.value,
            transportation: TripState.transportation,
            custom: TripState.custom,
            trip: TripState.trip,
            miles: TripState.miles,
        });
    };

    /* Changes the transportation state */
    const changeTransportation = (e, data) => {
        setTripState({
            date: TripState.date,
            transportation: data.value,
            custom: TripState.custom,
            trip: TripState.trip,
            miles: TripState.miles,
        });
    };

    /* Changes the trip state, sets custom to true if custom trip is chosen */
    const changeTrip = (e, data) => {
        if (data.value === 'Custom') {
            setTripState({
                date: TripState.date,
                transportation: TripState.transportation,
                custom: true,
                trip: null,
                miles: null,
            });
        } else {
            setTripState({
                date: TripState.date,
                transportation: TripState.transportation,
                custom: false,
                trip: data.key,
                miles: data.value,
            });
        }
    };

    /* Changes the trip state to the trip name the user inputs for a custom trip */
    const changeTripName = (e) => {
        setTripState({
            date: TripState.date,
            transportation: TripState.transportation,
            custom: true,
            trip: e.target.value,
            miles: TripState.miles,
        });
    };

    /* Changes the miles state that the user inputs for a custom trip */
    const changeTripMiles = (e) => {
        setTripState({
            date: TripState.date,
            transportation: TripState.transportation,
            custom: true,
            trip: TripState.trip,
            miles: Number(e.target.value),
        });
    };

    /* Handles the submission and checks for errors, also adds to the trip collection if a custom trip was made */
    const handleSubmit = (e) => {
      e.preventDefault();
      if (TripState.transportation === null) {
        swal('Error', 'Please select transportation', 'error');
      } else if (TripState.trip === null) {
        swal('Error', 'Please select a trip', 'error');
      } else if (typeof TripState.miles !== 'number') {
        swal('Error', 'Please enter a number in the miles input', 'error');
      } else {
          try {
              if (TripState.custom) {
                  TripsDefineMethod.call({
                    owner: user,
                    name: TripState.trip,
                    miles: TripState.miles,
                  });
              }

              EmissionsDefineMethod.call({
                owner: user,
                date: TripState.date,
                transportation: TripState.transportation,
                miles: TripState.miles,
                createdAt: new Date(),
            },
            (error) => {
                if (error) {
                  swal('Error', error.message, 'error');
                } else {
                    swal('Success', 'Added successfully', 'success').then(() => {
                        // eslint-disable-next-line no-undef
                        window.location.reload();
                    });
                }
              });

          } catch {
              swal('Error', 'Failed to add, please try again.', 'error').then(() => {
                // eslint-disable-next-line no-undef
                window.location.reload();
            });
          }
      }
    };

    /* Return function rendering the component */
    return (
        <div style={{ paddingTop: '3rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card style={{ padding: '1rem', background: '#4282AF' }}>
                <Card.Content>
                    <Card.Header style={{ color: 'white' }}>Date</Card.Header>
                        <input type="date" value={TripState.date} onChange={changeDate}/>
                        <Card.Header style={{ color: 'white', paddingTop: '0.5em' }}>Transportation</Card.Header>
                        <Dropdown placeholder='Select transportation' fluid selection options={transportationOptions} onChange={changeTransportation}/>
                        <Card.Header style={{ color: 'white', paddingTop: '0.5em' }}>Trip</Card.Header>
                        <Dropdown name='Trip Search' placeholder='Select trip' fluid selection options={tripOptions} onChange={changeTrip}/>
                        {TripState.custom ?
                            <div>
                                <br/>
                                <Popup content='Insert a name for this trip' trigger={<Input style={{ width: '60%', float: 'left' }} placeholder='Trip Name' onChange={changeTripName}/>}/>
                                <Popup content='Insert Roundtrip Miles' trigger={
                                <Input style={{ width: '30%', float: 'right' }} type="number" min="0" max="99" placeholder='Miles' onChange={changeTripMiles}/>
                                }/>
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

export default UpdateEmissions;
