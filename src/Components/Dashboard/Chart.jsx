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
    <div style={{ width: "100%", height: "400px", margin: "32px" }}>
      {/* Filter buttons */}
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => setTimeInterval("weekly")}
          style={{ margin: "0 8px", padding: "8px 16px", cursor: "pointer", backgroundColor: timeInterval === 'weekly' ? '#ccc' : '#fff' }}
        >
          Weekly
        </button>
        <button
          onClick={() => setTimeInterval("monthly")}
          style={{ margin: "0 8px", padding: "8px 16px", cursor: "pointer", backgroundColor: timeInterval === 'monthly' ? '#ccc' : '#fff' }}
        >
          Monthly
        </button>
        <button
          onClick={() => setTimeInterval("yearly")}
          style={{ margin: "0 8px", padding: "8px 16px", cursor: "pointer", backgroundColor: timeInterval === 'yearly' ? '#ccc' : '#fff' }}
        >
          Yearly
        </button>
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
