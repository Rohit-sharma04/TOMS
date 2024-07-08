import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

// eslint-disable-next-line react/prop-types
const ComplaintStatusChart = ({ data }) => {
  const chartData = {
    labels: ['Pending', 'In Progress', 'Resolved', 'Rejected', 'Under Review'],
    datasets: [{
      data: data,
      backgroundColor: ['#FFCE56', '#36A2EB', '#4BC0C0', '#FF6384', '#c800ff']
    }]
  };

  return <>
    <div className="">
      {chartData ? (
        <Doughnut data={chartData}
          options={{ responsive: true }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </>;
};

export default ComplaintStatusChart;