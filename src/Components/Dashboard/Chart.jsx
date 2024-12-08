/* eslint-disable react/prop-types */
import { LineChart } from "@mui/x-charts";

const Chart = ({title,color,data}) => {


  return (
    <div style={{ width: "100%", height: "400px",margin:'32px' }}>
      <LineChart
        width={800}
        height={400}
        xAxis={[
          {
            scaleType: "band", // For displaying categorical (month) values on the x-axis
            data: data.map((data) => data.x),
          },
        ]}
        series={[
          {
            data: data.map((data) => data.y),
            label: `${title} (in $)`,
            color: color,
          },
        ]}
      />
    </div>
  );
};

export default Chart;
