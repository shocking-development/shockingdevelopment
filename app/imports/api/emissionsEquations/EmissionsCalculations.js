import { useTracker } from 'meteor/react-meteor-data';
import { UserInfos } from '../userInfo/UserInfoCollection';

/*
* This File holds all the functions, and variables which assist in calculating the
* Emissions for the User, Admin, and landing page.
*/

/*
* FUNCTION: sumAllMilesForMonthBasedOnTransportation
* This function sums all the Miles for a month based on the transportation,
* and month.
* Code from https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
* ObjArray: the object array being passed in
* sum: this holds the final filtered array
*/

export function sumAllMilesForMonthBasedOnTransportation(Objarray) {
  let sum = [];
  if (Objarray.length > 0) {
    Objarray.reduce(function (acc, val) {
      const o = acc.filter(function (obj) {
        return (obj.date.getMonth() === val.date.getMonth() && obj.transportation === val.transportation);
      }).pop() || { date: val.date, miles: 0, transportation: val.transportation };

      o.miles += val.miles;
      acc.push(o);
      sum = acc;
      return acc;
    }, []);
  }
  return sum;
}

/*
* FUNCTION: duplicateFilter
* This function filters an array of objects to its final form, and returns the final array.
* It basically removes the duplicates from the array.
*/
export function duplicateFilter(ObjArray) {
  let finalObjArray = [];
  finalObjArray = ObjArray.filter(function (itm, index1, a) {
    return index1 === a.indexOf(itm);
  });
  return finalObjArray;
}

  const userInfoDocs = UserInfos.count();

export const numberofUsers = userInfoDocs.length;
