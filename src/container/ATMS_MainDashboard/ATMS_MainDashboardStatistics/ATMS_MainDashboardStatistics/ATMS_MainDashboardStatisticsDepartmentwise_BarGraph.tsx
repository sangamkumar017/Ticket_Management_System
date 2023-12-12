import React from 'react'
import highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface propType {
  metaData: any
  range: any
}

const ATMS_MainDashboardStatisticsDepartmentwise_BarGraph: React.FC<any> = ({
  departmentDetails,
}) => {
  let xAxis: any = []
  let status: any = {}
  Object.keys(departmentDetails).forEach((departmentName) => {
    xAxis.push(departmentName)
    status[departmentName] = departmentDetails[departmentName]
  })

  const myChartOptions = {
    chart: {
      type: 'column',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Department Wise Tickets',
    },
    xAxis: {
      categories: [
        'Front End',
        'Back End',
        'Data Automation',
        'Marketing',
        'UAT Testing',
      ],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Department Ticket Count',
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: 'gray',
          textOutline: 'none',
        },
      },
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: 'Open',
        data: [
          departmentDetails?.['Front End']?.['Open'] || 0,
          departmentDetails?.['Back End']?.['Open'] || 0,
          departmentDetails?.['Data automation']?.['Open'] || 0,
          departmentDetails?.['UAT testing']?.['Open'] || 0,
          departmentDetails?.['Marketing']?.['Open'] || 0,
        ],
      },
      {
        name: 'In Review',
        data: [
          departmentDetails?.['Front End']?.['In Review'] || 0,
          departmentDetails?.['Back End']?.['In Review'] || 0,
          departmentDetails?.['Data automation']?.['In Review'] || 0,
          departmentDetails?.['UAT testing']?.['In Review'] || 0,
          departmentDetails?.['Marketing']?.['In Review'] || 0,
        ],
      },
      {
        name: 'In Progress',
        data: [
          departmentDetails?.['Front End']?.['In Progress'] || 0,
          departmentDetails?.['Back End']?.['In Progress'] || 0,
          departmentDetails?.['Data automation']?.['In Progress'] || 0,
          departmentDetails?.['UAT testing']?.['In Progress'] || 0,
          departmentDetails?.['Marketing']?.['In Progress'] || 0,
        ],
      },
      {
        name: 'Pending',
        data: [
          departmentDetails?.['Front End']?.['Pending'] || 0,
          departmentDetails?.['Back End']?.['Pending'] || 0,
          departmentDetails?.['Data automation']?.['Pending'] || 0,
          departmentDetails?.['UAT testing']?.['Pending'] || 0,
          departmentDetails?.['Marketing']?.['Pending'] || 0,
        ],
      },
      {
        name: 'Un Resolved',
        data: [
          departmentDetails?.['Front End']?.['Un Resolved'] || 0,
          departmentDetails?.['Back End']?.['Un Resolved'] || 0,
          departmentDetails?.['Data automation']?.['Un Resolved'] || 0,
          departmentDetails?.['UAT testing']?.['Un Resolved'] || 0,
          departmentDetails?.['Marketing']?.['Un Resolved'] || 0,
        ],
      },
      {
        name: 'Closed',
        data: [
          departmentDetails?.['Front End']?.['Closed'] || 0,
          departmentDetails?.['Back End']?.['Closed'] || 0,
          departmentDetails?.['Data automation']?.['Closed'] || 0,
          departmentDetails?.['UAT testing']?.['Closed'] || 0,
          departmentDetails?.['Marketing']?.['Closed'] || 0,
        ],
      },
    ],
  }

  return <HighchartsReact highcharts={highcharts} options={myChartOptions} />
}

export default ATMS_MainDashboardStatisticsDepartmentwise_BarGraph
