import { createRef } from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ data }) => {
  const ref = createRef();

  return <Line ref={ref} data={data} />;
};

export default Chart;
