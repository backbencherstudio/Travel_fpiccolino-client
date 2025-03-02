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

  const totalTours = totalCompleted + totalPending + totalOngoing;

  // Calculate percentages
  const pendingPercentage = ((totalPending / totalTours) * 100).toFixed(1);
  const ongoingPercentage = ((totalOngoing / totalTours) * 100).toFixed(1);
  const completedPercentage = ((totalCompleted / totalTours) * 100).toFixed(1);

  const chartData = {
    series: [
      {
        name: "Pending",
        data: data?.radarData?.pending, // Using prop data for Pending
      },
      {
        name: "Ongoing",
        data: data?.radarData?.ongoing, // Using prop data for Ongoing
      },
      {
        name: "Completed",
        data: data?.radarData?.completed, // Using prop data for Completed
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 60,
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
        // stepSize: 80,
      },
      xaxis: {
        categories: data?.radarData?.destination, // Using prop categories for x-axis
      },
      colors: ["#e86731", "#1993e1", "#088c4a"], // Custom colors for Completed and Pending
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
        <h1 className="text-[#e86731] font-semibold">
          Pending : {pendingPercentage}%
        </h1>
        <h1 className="text-[#1993e1] font-semibold">
          Ongoing : {ongoingPercentage}%
        </h1>
        <h1 className="text-[#088c4a] font-semibold">
          Completed : {completedPercentage}%
        </h1>
      </div>
    </div>
  );
};

export default RadarChart;
