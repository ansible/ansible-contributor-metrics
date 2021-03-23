import { Line } from "react-chartjs-2";

const LineGraph = ({ dataGroupedByMonth: data, label, heading }) => {
  // console.log(totalOpenIssues);
  // console.log(data);
  const dataToPlot = {
    labels: data.map((item) => item.Month),
    datasets: [
      {
        label: label,
        fill: true,
        lineTension: 0.1,

        backgroundColor: "rgba(77, 161, 169,0.07)",
        borderColor: "rgba(77, 161, 169,1)",
        borderWidth: 1,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(77, 161, 169,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(61,88,97,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,

        data: data.map((item) =>
          ((item.closed / (item.open + item.closed)) * 100).toFixed(2)
        ),
      },
    ],
  };

  const option = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "% of closed issues",
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var currentValue = dataset.data[tooltipItem.index];
          return currentValue + "%";
        },
      },
    },
  };

  // console.log("Plotting data: ", dataToPlot.datasets[0].data);

  return (
    <div className="chart-line">
      <h3>{heading}</h3>
      <Line data={dataToPlot} options={option} />
    </div>
  );
};

export default LineGraph;
