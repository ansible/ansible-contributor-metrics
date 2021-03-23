const tempFunction = (type, month, count1, count2 = 0) => {
  let data = {};
  if (type === "open") {
    data = {
      Month: month,
      open: count1,
      closed: count2,
    };
  } else if (type === "closed") {
    data = {
      Month: month,
      closed: count1,
      open: count2,
    };
  } else {
    data = {
      Month: month,
      merged: count1,
      open: count2,
    };
  }
  return data;
};

export const assembleData = (array1, array2, type) => {
  return array1.map((issue) => {
    const { Month, Count } = issue;

    const temp = array2.find((elem) => elem.Month === Month);
    if (!temp) {
      return tempFunction(type, Month, Count);
    }
    return tempFunction(type, Month, Count, temp.Count);
  });
};
