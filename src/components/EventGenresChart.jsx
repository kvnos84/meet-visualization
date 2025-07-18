import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA46BE'];
const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
const outerRadius = window.innerWidth < 480 ? 70 : 130;

const renderCustomizedLabel = ({ cx, cy, midAngle, percent, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius;
  const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
  const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
  return percent ? (
    <text
      x={x}
      y={y}
      fill="#8884d8"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const EventGenresChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={outerRadius}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;