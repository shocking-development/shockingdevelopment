import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Emissions } from '../../../api/emissions/EmissionsCollection';
// eslint-disable-next-line no-unused-vars
import { calculateCO2, calculateGHG } from '../../../api/trips/ghgcalculation';

// A export function to give data to other pages.
export function User() {
  const user = useTracker(() => Meteor.userId());
  return user;
}

export function UserEmissions() {
  const user = useTracker(() => Meteor.userId());
  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.emissionsPublicationName);
    return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 } }).fetch();
  });

  return emissions;

}

export function UserDateRecorded() {
  const user = useTracker(() => Meteor.userId());
  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.emissionsPublicationName);
    return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 } }).fetch();
  });
  const dateRecorded = emissions.map(recentEmissions => `${recentEmissions.date.getMonth() + 1}/${recentEmissions.date.getDate()}/${recentEmissions.date.getFullYear()}`);

  return dateRecorded;

}

export function UserDataMiles() {
  const user = useTracker(() => Meteor.userId());
  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.emissionsPublicationName);
    return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 } }).fetch();
  });
  const dataMiles = emissions.map(recentEmissions => recentEmissions.miles);

  return dataMiles;

}

export function UserEmissionData(index) {
  const user = useTracker(() => Meteor.userId());
  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.emissionsPublicationName);
    return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 } }).fetch();
  });
  const dateRecorded = emissions.map(recentEmissions => `${recentEmissions.date.getMonth() + 1}/${recentEmissions.date.getDate()}/${recentEmissions.date.getFullYear()}`);
  const dataMiles = emissions.map(recentEmissions => recentEmissions.miles);

  if (index === 'User') {
    return user;
  }

  if (index === 'Emissions') {
    return emissions;
  }

  if (index === 'DateRecorded') {
    return dateRecorded;
  }

  if (index === 'DataMiles') {
    return dataMiles;
  }
  if (index === 'Transportation') {
    return emissions.map(recentEmissions => recentEmissions.transportation);
  }

  return user;
}

export default UserEmissions;