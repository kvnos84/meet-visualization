import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

const PieChartComponent = ({ events }) => {
  const getData = () => {
    return genres.map((genre) => {
      const count = events.filter((event) =>
        event.summary.includes(genre)
      ).length;
      return { name: genre, value: count };
    }).filter(data => data.value > 0); // Only keep genres with events
  };

  const data = getData();
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={100}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;