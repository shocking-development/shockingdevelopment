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
export function sumAllMilesForMonthBasedOnTransportation(ObjArray) {
  let sum = [];
  if (ObjArray.length > 0) {
    ObjArray.reduce(function (acc, val) {
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
* FUNCTION: sumAllEmissionsByMonth
* This function sums all the emissions for a month.
* Code from https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
* ObjArray: the object array being passed in
* sum: this holds the final filtered array
* returns the sum array.
*/
export function sumAllEmissionsByMonth(ObjArray) {
  let sum = [];
  const n = ObjArray.length;
  if (n > 0) {
    ObjArray.reduce(function (acc, val) {
      const o = acc.filter(function (obj) {

        return obj.date.getMonth() === val.date.getMonth();
      }).pop() || { date: val.date, emissions: 0 };

      o.emissions += val.emissions;
      acc.push(o);
      sum = acc;
      return acc;
    }, []);
  }
  return sum;
}

/*
* FUNCTION: totalMilesbyMonth
* This function sums all the emissions for a month.
* Code from https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
* ObjArray: the object array being passed in
* sum: this holds the final filtered array
* returns the sum array.
*/
export function totalMilesbyMonth(ObjArray) {
  let sum = [];
  const n = ObjArray.length;
  if (n > 0) {
    ObjArray.reduce(function (acc, val) {
      const o = acc.filter(function (obj) {
        // for debugging console.log(obj.date.getTime() === val.date.getTime());
        // https://stackoverflow.com/questions/7244513/javascript-date-comparisons-dont-equal
        return obj.date.getMonth() === val.date.getMonth();
      }).pop() || { date: val.date, miles: 0 };

      o.miles += val.miles;
      acc.push(o);
      sum = acc;
      return acc;
    }, []);
  }
  return sum;
}

/*
* FUNCTION: totalMoneySpentByMonth
* This function sums all the money spent for a month.
* Code from https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
* ObjArray: the object array being passed in
* sum: this holds the final filtered array
* returns the sum array.
*/
export function totalMoneySpentByMonth(ObjArray) {
  let sum = [];
  const n = ObjArray.length;
  if (n > 0) {
    ObjArray.reduce(function (acc, val) {
      const o = acc.filter(function (obj) {
        return obj.date.getMonth() === val.date.getMonth();
      }).pop() || { date: val.date, spent: 0 };

      o.spent += val.spent;
      acc.push(o);
      sum = acc;
      return acc;
    }, []);
  }
  return sum;
}

/*
* FUNCTION: totalSavingsByMonth
* This function sums all the money saved per month.
* Code from https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
* ObjArray: the object array being passed in
* sum: this holds the final filtered array
* returns the sum array.
*/
export function totalSavingsByMonth(ObjArray) {
  let sum = [];
  const n = ObjArray.length;
  if (n > 0) {
    ObjArray.reduce(function (acc, val) {
      const o = acc.filter(function (obj) {
        return obj.date.getMonth() === val.date.getMonth();
      }).pop() || { date: val.date, savings: 0 };

      o.savings += val.savings;
      acc.push(o);
      sum = acc;
      return acc;
    }, []);
  }
  return sum;
}

/*
* FUNCTION: totalEmissionsReducedByMonth
* This function sums all the emissions reduced per month.
* Code from https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
* ObjArray: the object array being passed in
* sum: this holds the final filtered array
* returns the sum array.
*/
export function totalEmissionsReducedByMonth(ObjArray) {
  let sum = [];
  const n = ObjArray.length;
  if (n > 0) {
    ObjArray.reduce(function (acc, val) {
      const o = acc.filter(function (obj) {
        return obj.date.getMonth() === val.date.getMonth();
      }).pop() || { date: val.date, emissionsReduced: 0 };

      o.emissionsReduced += val.emissionsReduced;
      acc.push(o);
      sum = acc;
      return acc;
    }, []);
  }
  return sum;
}

/*
* FUNCTION: totalfuelGallonSavedByMonth
* This function sums all the gallons saved per month.
* Code from https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
* ObjArray: the object array being passed in
* sum: this holds the final filtered array
* returns the sum array.
*/
export function totalfuelGallonSavedByMonth(ObjArray) {
  let sum = [];
  const n = ObjArray.length;
  if (n > 0) {
    ObjArray.reduce(function (acc, val) {
      const o = acc.filter(function (obj) {
        // for debugging console.log(obj.date.getTime() === val.date.getTime());
        // https://stackoverflow.com/questions/7244513/javascript-date-comparisons-dont-equal
        return obj.date.getMonth() === val.date.getMonth();
      }).pop() || { date: val.date, gallonsSaved: 0 };

      o.gallonsSaved += val.gallonsSaved;
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
* returns finalObjArray
*/
export function duplicateFilter(ObjArray) {
  let finalObjArray = [];
  finalObjArray = ObjArray.filter(function (itm, index1, a) {
    return index1 === a.indexOf(itm);
  });
  return finalObjArray;
}

/*
* FUNCTION: countLengthOfNumber
* This function counts the length of a number e.g. the number of digits.
*/
export function countLengthOfNumber(x) {

  return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;

}
