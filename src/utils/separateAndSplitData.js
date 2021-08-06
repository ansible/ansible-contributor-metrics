import _ from "lodash";

export const separateAndSplitData = (data) => {
  // console.log("DATA FROM FUNCTION", data);

  const keys = Object.keys(data);

  const issues = _.groupBy(keys, (key) => key.includes("ISSUES"));

  const issuesByMonth = _.groupBy(issues.true, (key) => {
    const x = key.split("_");
    const y = `${x[0]} ${x[1]}`;

    return y;
  });

  const prsByMonth = _.groupBy(issues.false, (key) => {
    const x = key.split("_");
    const y = `${x[0]} ${x[1]}`;

    return y;
  });

  // console.log("ISSUES", issuesByMonth);
  // console.log("PRS", prsByMonth);

  const issuesStatSplit = Object.keys(issuesByMonth).map((issue) => {
    const a = issuesByMonth[issue];

    const x = a[0];
    const y = a[1];

    return {
      Month: issue,
      open: data[x].issueCount,
      closed: data[y].issueCount,
    };
  });

  const prsStatSplit = Object.keys(prsByMonth).map((pr) => {
    const a = prsByMonth[pr];

    const x = a[0];
    const y = a[1];

    return {
      Month: pr,
      open: data[x].issueCount,
      merged: data[y].issueCount,
    };
  });

  // console.log("PRS", prsStatSplit);
  // console.log("ISSUES", issuesStatSplit);

  return { issuesStatSplit, prsStatSplit };
};
