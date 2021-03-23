import moment from "moment";

export const calculateAverageDays = (data) => {
  let totalDaysDifference = 0;
  data.map((item) => {
    const startDate = moment(item.createdAt);
    const endDate = item.closedAt
      ? moment(item.closedAt)
      : moment(item.mergedAt);
    const diff = endDate.diff(startDate, "days");
    totalDaysDifference += diff;
    // console.log("Start Date: ", startDate);
    // console.log("End Date: ", endDate);
    // console.log("Diff: ", diff);
  });

  //   console.log("Length: ", data.length);
  return Math.floor(totalDaysDifference / data.length);
};
