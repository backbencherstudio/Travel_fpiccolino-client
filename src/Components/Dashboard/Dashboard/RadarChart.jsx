/* eslint-disable react/prop-types */
import ReactApexChart from "react-apexcharts";

const RadarChart = ({ data }) => {
  const totalCompleted = data?.radarData?.completed.reduce(
    (acc, val) => acc + val,
    0
  );
  const totalPending = data?.radarData?.pending.reduce(
    (acc, val) => acc + val,
    0
  );
  const totalOngoing = data?.radarData?.ongoing.reduce(
    (acc, val) => acc + val,
    0
  );

  // Calculate the total tours count (completed + pending)
  const totalTours = totalCompleted + totalPending + totalOngoing;

  const chartData = {
    series: [
      {
        name: "Completed",
        data: data?.radarData?.completed, // Using prop data for Completed
      },
      {
        name: "Pending",
        data: data?.radarData?.pending, // Using prop data for Pending
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
        max: totalTours,
        stepSize: 20,
      },
      xaxis: {
        categories: data?.radarData?.destination, // Using prop categories for x-axis
      },
      colors: ["#62d3d4", "#e86731"], // Custom colors for Completed and Pending
      legend: {
        position: "top",
        horizontalAlign: "center",
      },
      tooltip: {
        y: {
          formatter: (val) => `${val}`,
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
      <div className="flex justify-around">
        <h1 className="text-[#62d3d4] font-semibold">
          Completed : {parseInt(data?.completedPercentage)}%
        </h1>
        <h1 className="primary_text font-semibold">
          Pending : {parseInt(data?.pendingPercentage)}%
        </h1>
      </div>
    </div>
  );
};

export default RadarChart;
