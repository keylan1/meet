import { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CityEventsChart = ({ events, allLocations }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [`${events}`]); //string interpolation, automatically calls data in variable as string, so whenever the data changes, it updates state.

  const getData = () => {
    // mapping the locations and filtering through the events to ensure that the location of an event is same and then taking the amount of events in that filter.
    const data = allLocations.map((location) => {
      const count = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(/, | - /)[0]; //removing the country to have city remaining
      return { city, count }; //destructuring city and count as we don't have these exact values
    });
    return data;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}>
        <CartesianGrid />
        <XAxis
          type="category"
          dataKey="city"
          name="City"
          angle={60}
          interval={0}
          tick={{ dx: 20, dy: 40, fontSize: 14 }}
        />
        <YAxis
          type="number"
          dataKey="count"
          name="Number of events"
          allowDecimals={false}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Events" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
