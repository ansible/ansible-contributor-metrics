import { BarChartOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { Bar } from "react-chartjs-2";

const BarGraph = ({ dataGroupedByMonth: data, label1, label2, heading }) => {
  // console.log("DATA FROM GRAPH", data);
  const dataToPlot = {
    labels: data.map((item) => item.Month),
    datasets: [
      {
        label: label1,
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(255,166,0,0.4)",
        borderColor: "rgba(255,166,0,1)",
        borderWidth: 1,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data.map((item) => {
          return item.open;
        }),
      },
      {
        label: label2,
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(66,153,138,0.4)",
        borderColor: "rgba(66,153,138,1)",
        borderWidth: 1,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data.map((item) => {
          return label2 === "Closed Issue" ? item.closed : item.merged;
        }),
      },
    ],
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
        <BarChartOutlined />
      </Tooltip>
      <h3>{heading}</h3>
      <Bar data={dataToPlot} />
    </div>
  );
};

export default BarGraph;
