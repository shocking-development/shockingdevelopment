import React, { useState } from 'react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Dropdown, Card, Button, Input, Popup, Icon } from 'semantic-ui-react';
import { Trips } from '../../../api/emissions/TripsCollection';
import { UserInfosCars } from '../../../api/userInfo/UserInfoCarCollection';
import { EmissionsDefineMethod } from '../../../api/emissions/EmissionsCollection.methods';
import { TripsDefineMethod, TripsRemoveMethod } from '../../../api/emissions/TripsCollection.methods';
import { transportationOptions } from './TransportationOptions';

/* This component is rendered by the Add Data page and allows users to add trips */
function UpdateEmissions() {

  /* Gets the users saved preset trips */
  const [trips, user, cars] = useTracker(() => {
    Meteor.subscribe(Trips.tripsPublicationName);
    UserInfosCars.subscribeUserInfoCars();
    const currUser = Meteor.userId();
    return [Trips.collection.find({ owner: currUser }).fetch(), currUser, UserInfosCars.find({}).fetch()];
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

  /* DeleteTrip function allows users to delete preset trips */
  const deleteTrip = ({ _id }) => TripsRemoveMethod.call(_id);

  /* Adds the users preset trips along with the custom option to an array that holds the dropdown options */
  const tripOptions = [];
  trips.forEach(trip => {
    tripOptions.push({
      key: trip._id,
      text: `${trip.name} (${trip.miles})`,
      value: trip._id,
      content: (
          <div>
            {`${trip.name} (${trip.miles})`}<Icon style={{ float: 'right' }} name='remove' color='red'
                                                  onClick={() => deleteTrip(trip)}/>
          </div>
      ),
    });
  });

  tripOptions.push({
    key: 'Custom',
    text: 'Custom',
    value: 'Custom',
  });

  const carOptions = [];
  cars.forEach(car => {
    carOptions.push({
      key: car._id,
      text: car.carName,
      value: car.mpgofCar,
    });
  });

  /* Initializing the trip state */
  const [tripState, setTripState] = useState({
    date: fullDate,
    transportation: null,
    custom: false,
    trip: null,
    miles: null,
    mpg: null,
  });

  /* Changes the date state */
  const changeDate = (e) => {
    setTripState({
      date: e.target.value,
      transportation: tripState.transportation,
      custom: tripState.custom,
      trip: tripState.trip,
      miles: tripState.miles,
      mpg: tripState.mpg,
    });
  };

  /* Changes the transportation state */
  const changeTransportation = (e, data) => {
    setTripState({
      date: tripState.date,
      transportation: data.value,
      custom: tripState.custom,
      trip: tripState.trip,
      miles: tripState.miles,
      mpg: null,
    });
  };

  /* Changes the mpg state */
  const changeCar = (e, data) => {
    setTripState({
      date: tripState.date,
      transportation: tripState.transportation,
      custom: tripState.custom,
      trip: tripState.trip,
      miles: tripState.miles,
      mpg: Number(data.value),
    });
  };

  /* Changes the trip state, sets custom to true if custom trip is chosen */
  const changeTrip = (e, data) => {
    if (data.value === 'Custom') {
      setTripState({
        date: tripState.date,
        transportation: tripState.transportation,
        custom: true,
        trip: null,
        miles: null,
        mpg: tripState.mpg,
      });
    } else {
      setTripState({
        date: tripState.date,
        transportation: tripState.transportation,
        custom: false,
        trip: data.key,
        miles: data.value,
        mpg: tripState.mpg,
      });
    }
  };

  /* Changes the trip state to the trip name the user inputs for a custom trip */
  const changeTripName = (e) => {
    setTripState({
      date: tripState.date,
      transportation: tripState.transportation,
      custom: true,
      trip: e.target.value,
      miles: tripState.miles,
      mpg: tripState.mpg,
    });
  };

  /* Changes the miles state that the user inputs for a custom trip */
  const changeTripMiles = (e) => {
    setTripState({
      date: tripState.date,
      transportation: tripState.transportation,
      custom: true,
      trip: tripState.trip,
      miles: Number(e.target.value),
      mpg: tripState.mpg,
    });
  };

  /* Handles the submission and checks for errors, also adds to the trip collection if a custom trip was made */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tripState.transportation === null) {
      swal('Error', 'Please select transportation', 'error');
    } else if (typeof tripState.miles !== 'number' && tripState.custom) {
      swal('Error', 'Please enter a number in the miles input', 'error');
    } else if (!tripState.custom && tripState.trip === null) {
      swal('Error', 'Please select a trip', 'error');
    } else {
          try {
            let miles;
            if (tripState.custom) {
              if (tripState.trip !== null) {
                TripsDefineMethod.call({
                  owner: user,
                  name: tripState.trip,
                  miles: tripState.miles,
                });
              }
              miles = tripState.miles;
            } else {
              miles = Trips.collection.findOne({ _id: tripState.miles }).miles;
            }

            EmissionsDefineMethod.call({
                  owner: user,
                  date: tripState.date,
                  transportation: tripState.transportation,
                  miles: miles,
                  mpg: tripState.mpg,
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
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
        <Card style={{
          padding: '1rem', background: 'rgba(0, 73, 122, 0.5)',
          border: '2px solid #004486', boxShadow: 'none',
        }}>
          <Card.Content>
            <Card.Header style={{ color: 'white' }}>Date<p style={{ color: 'red', display: 'inline' }}>*</p></Card.Header>
            <input type="date" value={tripState.date} onChange={changeDate}/>
            <Card.Header style={{ color: 'white', paddingTop: '0.5em' }}>Transportation<p style={{ color: 'red', display: 'inline' }}>*</p></Card.Header>
            <Dropdown placeholder='Select transportation' fluid selection options={transportationOptions}
                      onChange={changeTransportation}/>
            {tripState.transportation === 'Drove' ?
                <div>
                  <br/>
                  <Dropdown name='Car Used' placeholder='Select car' fluid selection options={carOptions}
                            onChange={changeCar}/>
                </div> : null
            }
            <Card.Header style={{ color: 'white', paddingTop: '0.5em' }}>Trip<p style={{ color: 'red', display: 'inline' }}>*</p></Card.Header>
            <Dropdown name='Trip Search' placeholder='Select trip' fluid selection options={tripOptions}
                      onChange={changeTrip}/>
            {tripState.custom ?
                <div>
                  <br/>
                  <Popup content='Insert a name if you would like to save this trip'
                         trigger={<Input style={{ width: '60%', float: 'left' }} placeholder='Trip Name'
                                         onChange={changeTripName}/>}/>
                  <Popup content='Insert Roundtrip Miles' trigger={
                    <Input style={{ width: '30%', float: 'right' }} type="number" min="0" max="99" placeholder='Miles'
                           onChange={changeTripMiles}/>
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
