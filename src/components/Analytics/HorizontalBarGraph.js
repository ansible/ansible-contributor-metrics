import { RadarChartOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { HorizontalBar } from "react-chartjs-2";

const HorizontalBarGraph = ({ heading, communityContributionData }) => {
  console.log(
    "Issues-comm",
    communityContributionData.ALL_ISSUES.issueCount -
      communityContributionData.NON_COMMUNITY_ISSUES.issueCount
  );
  console.log(
    "Issues-noncomm",
    communityContributionData.NON_COMMUNITY_ISSUES.issueCount
  );
  console.log(
    "PRs-comm",
    communityContributionData.ALL_PRS.issueCount -
      communityContributionData.NON_COMMUNITY_PRS.issueCount
  );
  console.log(
    "PRs-noncomm",
    communityContributionData.NON_COMMUNITY_PRS.issueCount
  );
  const dataToPlot = {
    labels: ["Issues", "PRs"],
    datasets: [
      {
        label: "Community",
        backgroundColor: "rgb(176,142,162,0.4)",
        borderColor: "rgb(176,142,162,1)",
        borderWidth: 2,
        data: [
          communityContributionData.ALL_ISSUES.issueCount -
            communityContributionData.NON_COMMUNITY_ISSUES.issueCount,
          communityContributionData.ALL_PRS.issueCount -
            communityContributionData.NON_COMMUNITY_PRS.issueCount,
        ],
      },
      {
        label: "Non Community",
        backgroundColor: "rgb(255,166,48,0.4)",
        borderColor: "rgb(255,166,48,1)",
        borderWidth: 2,
        data: [
          communityContributionData.NON_COMMUNITY_ISSUES.issueCount,
          communityContributionData.NON_COMMUNITY_PRS.issueCount,
        ],
      },
    ],
  };

  const options = {
    tooltips: {
      callbacks: {
        // label: function (tooltipItem, data) {
        //   var dataset = data.datasets[tooltipItem.datasetIndex];
        //   // var meta = dataset._meta[Object.keys(dataset._meta)[0]];
        //   var total = allData;
        //   var currentValue = dataset.data[tooltipItem.index];
        //   var percentage = parseFloat(
        //     ((currentValue / total) * 100).toFixed(1)
        //   );
        //   return currentValue + " (" + percentage + "%)";
        // },
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
        The {heading === "Issue Categories" ? "issues" : "pull requests"} bar
        graph views the number of{" "}
        {heading === "Issue Categories" ? "issues" : "pull requests"} with
        'open' or {heading === "Issue Categories" ? "'closed'" : "'merged'"}{" "}
        status in a specific repository over a period of 15 months.
      </p>
    </div>
  );

  return (
    <div className="chart-bar">
      <Tooltip title={contentForInfo}>
        <RadarChartOutlined />
      </Tooltip>
      <h3>{heading}</h3>
      <HorizontalBar data={dataToPlot} options={options} />
    </div>
  );
};

export default HorizontalBarGraph;
