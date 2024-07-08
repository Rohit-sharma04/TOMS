/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// eslint-disable-next-line react/prop-types
const ComplaintsOverTimeChart = ({ data }) => {
  console.log(data)
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Complaints Received',
      data: data.counts,
      borderColor: '#36A2EB',
      fill: false
    }]
  };

  return <>
    <div>
      <Line data={chartData}
        options={{ responsive: true }}/>
    </div>
  </>
};

export default ComplaintsOverTimeChart;