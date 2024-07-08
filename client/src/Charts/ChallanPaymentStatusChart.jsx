import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

// eslint-disable-next-line react/prop-types
const ChallanPaymentStatusChart = ({ data }) => {
  console.log(data)

  const chartData = {
    labels: ['Pending', 'Completed'],
    datasets: [
      {
        label: 'count',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)', 
        ],
        borderWidth: 1,
      },
    ],
  };

  return <>
    <div className="">
      {chartData ? (
        <Pie data={chartData}
          options={{ responsive: true }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </>
};

export default ChallanPaymentStatusChart;
