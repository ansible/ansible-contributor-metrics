import _ from "lodash";

export const groupByMonth = (data, totalCount) => {
  // console.log("Total count: ", totalCount);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const map_result = _.map(data, function (item) {
    const d = new Date(item.createdAt);
    const month = monthNames[d.getMonth()] + " " + d.getFullYear();
    return {
      Month: month,
      Count: 1,
    };
  });

  const result_temp = _.reduce(
    map_result,
    function (memo, item) {
      if (memo[item.Month] === undefined) {
        memo[item.Month] = item.Count;
      } else {
        memo[item.Month] += item.Count;
      }
      return memo;
    },
    {}
  );

  //then wrap the result to the format you expected.
  const result = _.map(result_temp, function (value, key) {
    return {
      Month: key,
      Count: value,
    };
  });
  return result;
};
