import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './ATMS_MainDashboardSlaDetails.css'
// import ATMS_MainDashboardTicketFilter from '../ATMS_MainDashboardTicketFilter/ATMS_MainDashboardTicketFilter'

const ATMS_MainDashboardSlaDetails: React.FC<any> = ({ metaData }) => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 300,
    },
    title: {
      text: 'SLA Summary',
    },
    xAxis: {
      categories: [
        'Avg First Response Time(hrs)',
        'Avg Resolution Time(hrs)',
        'Resolution within SLA(hrs)',
      ],
    },
    yAxis: {
      title: {
        text: 'Hours',
      },
      min: 0,
      max: 150, // Specify the desired maximum value on the y-axis
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
        colors: [
          'rgba(255, 99, 132, .5)',
          'rgba(54, 162, 235, .5)',
          'rgba(255, 206, 86, .5)',
        ],

        colorByPoint: true,
      },
    },
    series: [
      {
        name: 'Hours',
        data: [80, 50, 75],
        showInLegend: false,
      },
    ],
    credits: {
      enabled: false,
    },
  }

  const SLAData = [
    {
      name: 'Avg First Response Time ',
      value: 80,
    },
    {
      name: 'Avg Resolution Time ',
      value: 50,
    },
    {
      name: 'Resolution within SLA ',
      value: 75,
    },
  ]

  return (
    <>
      {' '}
      <div className="ATMS_MainDashboardSlaDetailsChartContainer">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
      <div className="ATMS_Button">
        {' '}
        <button>sangam</button>
      </div>
    </>
  )
}

export default ATMS_MainDashboardSlaDetails
