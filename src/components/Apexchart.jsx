import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Requests per Hotel',
        align: 'center'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        min: 0, 
        tickAmount: 6, 
        labels: {
          formatter: function (value) {
            return value.toFixed(0); 
          }
        }
      }
    }
  });

  useEffect(() => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    setChartData(prevState => ({
      ...prevState,
      series: [{ data: values }],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: keys,
        }
      }
    }));
  }, [data]);

  return (
    <div>
      <div id="chart" className='px-20 pt-20'>
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
