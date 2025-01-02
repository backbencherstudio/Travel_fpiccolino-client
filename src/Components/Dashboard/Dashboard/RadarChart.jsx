/* eslint-disable react/prop-types */
import ReactApexChart from "react-apexcharts";

const RadarChart = ({ data }) => {
  const chartData = {
    series: [
      {
        name: "Completed",
        data: data?.completed, // Using prop data for Completed
      },
      {
        name: "Pending",
        data: data?.pending, // Using prop data for Pending
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      title: {
        text: "Total Tour",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
      stroke: {
        width: 2,
      },
      fill: {
        opacity: 0.2,
      },
      markers: {
        size: 4,
      },
      yaxis: {
        max: 100,
        stepSize: 20,
      },
      xaxis: {
        categories: data?.destination, // Using prop categories for x-axis
      },
      colors: ["#62d3d4", "#e86731"], // Custom colors for Completed and Pending
      legend: {
        position: "top",
        horizontalAlign: "center",
      },
      tooltip: {
        y: {
          formatter: (val) => `${val}%`,
        },
      },
    },
  };

  return (
    <div id="chart" className="p-4">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radar"
        height={320}
      />
    </div>
  );
};

export default RadarChart;
