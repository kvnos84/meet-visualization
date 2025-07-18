import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CityEventsChart = ({ data }) => {
  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
        >
          <CartesianGrid />
          <XAxis
            type="category"
            dataKey="city"
            name="City"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            type="number"
            dataKey="numberOfEvents"
            name="Events"
            allowDecimals={false}
            tick={{ fontSize: 12 }}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Events per City" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CityEventsChart;