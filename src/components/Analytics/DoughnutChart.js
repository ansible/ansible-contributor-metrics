import { PieChartOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ heading, label1, data1, label2, data2 }) => {
  // console.log("DOUGHNUT DATA", data1, data2);
  const dataToPlot = {
    labels: [label2, label1],
    datasets: [
      {
        data: [data2, data1],
        backgroundColor: ["#fbc02d", "#9E9E9E"],
        hoverBackgroundColor: ["#f9a825", "#757575"],
      },
    ],
  };

  const option = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          );
          return currentValue + " (" + percentage + "%)";
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
      },
    },
    legend: {
      display: true,
      position: "left",
      labels: {
        boxWidth: 15,
      },
    },
  };

  const contentForInfo = (
    <div style={{ textAlign: "center" }}>
      <p>
        The {heading === "Issue Chart" ? "issues" : "pull requests"} doughnut
        chart is a representation of the current condition of the repository in
        terms of '% of{" "}
        {heading === "Issue Chart" ? "issues closed" : "pull requests merged"}.
      </p>
    </div>
  );

  return (
    <div className="chart-pie">
      <Tooltip title={contentForInfo}>
        <PieChartOutlined />
      </Tooltip>
      <h3>{heading}</h3>
      <Doughnut data={dataToPlot} options={option} />
    </div>
  );
};

export default DoughnutChart;
