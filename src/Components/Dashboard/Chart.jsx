/* eslint-disable react/prop-types */
import { Select } from "@mui/material";
import { LineChart } from "@mui/x-charts";

const Chart = ({ title, color, data, timeInterval, setTimeInterval }) => {
  const getFilteredData = () => {
    switch (timeInterval) {
      case "weekly":
        return data.filter((d) => d.x.startsWith("Week")); // Filter weeks like "Week 1", "Week 2"
      case "yearly":
        return data.filter((d) => d.x.length === 4 && !isNaN(d.x)); // Filter years like "2021"
      case "monthly":
      default:
        return data.filter((d) => {
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          return months.includes(d.x); // Filter months like "Jan", "Feb", "Mar", etc.
        });
    }
  };

  const filteredData = getFilteredData();

  return (
    <div className="border rounded-xl p-4 my-4">
      {/* Filter buttons */}
      <div className="flex justify-between" style={{ marginBottom: "16px" }}>
       <h1 className="text-[24px] font-semibold">{title} Statistics</h1>
        <select
          value={timeInterval}
          onChange={(e) => setTimeInterval(e.target.value)}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            border: "1px solid #e86731",
            borderRadius: "4px",
            margin: "0 8px",
            color:'#e86731',
          }}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* LineChart */}
      <LineChart
        xAxis={[
          {
            scaleType: "band", // For displaying categorical (month, week, year) values on the x-axis
            data: filteredData.map((data) => data.x),
          },
        ]}
        series={[
          {
            data: filteredData.map((data) => data.y),
            label: `${title} (in $)`,
            color: color,
          },
        ]}
      />
    </div>
  );
};

export default Chart;
