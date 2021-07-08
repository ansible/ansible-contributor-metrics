import { RadarChartOutlined } from "@ant-design/icons";
import { Select, Tooltip } from "antd";
import moment from "moment";
import { HorizontalBar } from "react-chartjs-2";
import { useState } from "react";
import { useEffect } from "react/cjs/react.production.min";

const HorizontalBarGraph = ({ heading, communityContributionData }) => {
  // console.log(
  //   "Issues-comm",
  //   communityContributionData.ALL_ISSUES.issueCount -
  //     communityContributionData.NON_COMMUNITY_ISSUES.issueCount
  // );
  // console.log(
  //   "Issues-noncomm",
  //   communityContributionData.NON_COMMUNITY_ISSUES.issueCount
  // );
  // console.log(
  //   "PRs-comm",
  //   communityContributionData.ALL_PRS.issueCount -
  //     communityContributionData.NON_COMMUNITY_PRS.issueCount
  // );
  // console.log(
  //   "PRs-noncomm",
  //   communityContributionData.NON_COMMUNITY_PRS.issueCount
  // );

  const [date, setDate] = useState("overall");

  // const [allIssues, setAllIssues] = useState(
  //   communityContributionData.OVERALL_ALL_ISSUES.issueCount
  // );
  // const [nonCommunityIssues, setNonCommunityIssues] = useState(
  //   communityContributionData.OVERALL_NON_COMMUNITY_ISSUES.issueCount
  // );
  // const [allPRs, setAllPRs] = useState(
  //   communityContributionData.OVERALL_ALL_PRS.issueCount
  // );
  // const [nonCommunityPRs, setNonCommunityPRs] = useState(
  //   communityContributionData.OVERALL_NON_COMMUNITY_PRS.issueCount
  // );
  // switch (date) {
  //   case "overall":
  //     setAllIssues(communityContributionData.OVERALL_ALL_ISSUES.issueCount);
  //     setNonCommunityIssues(
  //       communityContributionData.OVERALL_NON_COMMUNITY_ISSUES.issueCount
  //     );
  //     setAllPRs(communityContributionData.OVERALL_ALL_PRS.issueCount);
  //     setNonCommunityPRs(
  //       communityContributionData.OVERALL_NON_COMMUNITY_PRS.issueCount
  //     );
  //     break;

  //   case "lastMonth":
  //     setAllIssues(communityContributionData.LAST_MONTH_ALL_ISSUES.issueCount);
  //     setNonCommunityIssues(
  //       communityContributionData.LAST_MONTH_NON_COMMUNITY_ISSUES.issueCount
  //     );
  //     setAllPRs(communityContributionData.LAST_MONTH_ALL_PRS.issueCount);
  //     setNonCommunityPRs(
  //       communityContributionData.LAST_MONTH_NON_COMMUNITY_PRS.issueCount
  //     );
  //     break;

  //   case "lastSixMonth":
  //     setAllIssues(
  //       communityContributionData.LAST_SIX_MONTHS_ALL_ISSUES.issueCount
  //     );
  //     setNonCommunityIssues(
  //       communityContributionData.LAST_SIX_MONTHS_NON_COMMUNITY_ISSUES
  //         .issueCount
  //     );
  //     setAllPRs(communityContributionData.LAST_SIX_MONTHS_ALL_PRS.issueCount);
  //     setNonCommunityPRs(
  //       communityContributionData.LAST_SIX_MONTHS_NON_COMMUNITY_PRS.issueCount
  //     );
  //     break;

  //   case "lastYear":
  //     setAllIssues(communityContributionData.LAST_YEAR_ALL_ISSUES.issueCount);
  //     setNonCommunityIssues(
  //       communityContributionData.LAST_YEAR_NON_COMMUNITY_ISSUES.issueCount
  //     );
  //     setAllPRs(communityContributionData.LAST_YEAR_ALL_PRS.issueCount);
  //     setNonCommunityPRs(
  //       communityContributionData.LAST_YEAR_NON_COMMUNITY_PRS.issueCount
  //     );
  //     break;

  //   default:
  //     break;
  // }

  let allIssues = communityContributionData.OVERALL_ALL_ISSUES.issueCount;
  let nonCommunityIssues =
    communityContributionData.OVERALL_NON_COMMUNITY_ISSUES.issueCount;
  let allPRs = communityContributionData.OVERALL_ALL_PRS.issueCount;
  let nonCommunityPRs =
    communityContributionData.OVERALL_NON_COMMUNITY_PRS.issueCount;

  switch (date) {
    case "overall":
      allIssues = communityContributionData.OVERALL_ALL_ISSUES.issueCount;
      nonCommunityIssues =
        communityContributionData.OVERALL_NON_COMMUNITY_ISSUES.issueCount;
      allPRs = communityContributionData.OVERALL_ALL_PRS.issueCount;
      nonCommunityPRs =
        communityContributionData.OVERALL_NON_COMMUNITY_PRS.issueCount;
      break;

    case "lastMonth":
      allIssues = communityContributionData.LAST_MONTH_ALL_ISSUES.issueCount;
      nonCommunityIssues =
        communityContributionData.LAST_MONTH_NON_COMMUNITY_ISSUES.issueCount;
      allPRs = communityContributionData.LAST_MONTH_ALL_PRS.issueCount;
      nonCommunityPRs =
        communityContributionData.LAST_MONTH_NON_COMMUNITY_PRS.issueCount;
      break;

    case "lastSixMonth":
      allIssues =
        communityContributionData.LAST_SIX_MONTHS_ALL_ISSUES.issueCount;
      nonCommunityIssues =
        communityContributionData.LAST_SIX_MONTHS_NON_COMMUNITY_ISSUES
          .issueCount;
      allPRs = communityContributionData.LAST_SIX_MONTHS_ALL_PRS.issueCount;
      nonCommunityPRs =
        communityContributionData.LAST_SIX_MONTHS_NON_COMMUNITY_PRS.issueCount;
      break;

    case "lastYear":
      allIssues = communityContributionData.LAST_YEAR_ALL_ISSUES.issueCount;
      nonCommunityIssues =
        communityContributionData.LAST_YEAR_NON_COMMUNITY_ISSUES.issueCount;
      allPRs = communityContributionData.LAST_YEAR_ALL_PRS.issueCount;
      nonCommunityPRs =
        communityContributionData.LAST_YEAR_NON_COMMUNITY_PRS.issueCount;
      break;

    default:
      break;
  }

  // useEffect(() => {
  //   allIssues = communityContributionData.OVERALL_ALL_ISSUES.issueCount;
  //   nonCommunityIssues =
  //     communityContributionData.OVERALL_NON_COMMUNITY_ISSUES.issueCount;
  //   allPRs = communityContributionData.OVERALL_ALL_PRS.issueCount;
  //   nonCommunityPRs =
  //     communityContributionData.OVERALL_NON_COMMUNITY_PRS.issueCount;
  // }, []);

  const dataToPlot = {
    labels: ["Issues", "PRs"],
    datasets: [
      {
        label: "Community",
        backgroundColor: "rgb(176,142,162,0.4)",
        borderColor: "rgb(176,142,162,1)",
        borderWidth: 2,
        data: [allIssues - nonCommunityIssues, allPRs - nonCommunityPRs],
      },
      {
        label: "Non Community",
        backgroundColor: "rgb(255,166,48,0.4)",
        borderColor: "rgb(255,166,48,1)",
        borderWidth: 2,
        data: [nonCommunityIssues, nonCommunityPRs],
      },
    ],
  };

  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var totalIssues = data.datasets[0].data[0] + data.datasets[1].data[0];
          var totalPRs = data.datasets[0].data[1] + data.datasets[1].data[1];
          var total = [totalIssues, totalPRs];
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat(
            ((currentValue / total[tooltipItem.index]) * 100).toFixed(1)
          );
          return currentValue + " (" + percentage + "%)";
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: "No. of contributions",
          },
        },
      ],
    },
  };

  const contentForInfo = (
    <div style={{ textAlign: "center" }}>
      <p>
        The bar graph is the representation of the community and non-community
        contributions in terms of issues and PRs.
      </p>
      <p>
        1. <b>non-community contributions</b> &rarr; contributions by the team
        members
      </p>
      <p>
        2. <b>community contributions</b> &rarr; contributions by non-team
        members
      </p>
    </div>
  );

  const { Option } = Select;

  return (
    <div className="chart-bar">
      <Tooltip title={contentForInfo}>
        <RadarChartOutlined />
      </Tooltip>
      <h3>{heading}</h3>
      <Select
        style={{ width: 150 }}
        size="small"
        defaultValue={"overall"}
        onChange={(e) => {
          // console.log(e);
          setDate(e);
        }}
      >
        <Option value="overall">Overall</Option>
        <Option value="lastMonth">Last month</Option>
        <Option value="lastSixMonths">Last 6 months</Option>
        <Option value="lastYear">Last year</Option>
      </Select>
      <br />
      <HorizontalBar data={dataToPlot} options={options} />
    </div>
  );
};

export default HorizontalBarGraph;
