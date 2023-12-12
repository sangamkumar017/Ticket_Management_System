import React from 'react'
import highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface propType {
  metaData: any
  range: any
}

const ATMS_MainDashboardStatisticsDepartmentwise_DonutGraph: React.FC<any> = ({
  departmentDetails,
}) => {
  let status: any = {}
  Object.keys(departmentDetails).forEach((departmentName) => {
    status[departmentName] = departmentDetails[departmentName]
  })

  const myChartOptions = {
    chart: {
      type: 'pie',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Department Wise Tickets',
    },
    tooltip: {
      pointFormat:
        '{series.name}: <b>{point.y}</b><br/>Total: {point.stackTotal}',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Ticket Status',
        colorByPoint: true,
        innerSize: '50%',

        data: Object.keys(status).map((departmentName) => ({
          name: departmentName,
          y: departmentDetails[departmentName]['Open'] || 0,
        })),
      },
    ],
  }

  return (
    <div>
      <HighchartsReact highcharts={highcharts} options={myChartOptions} />
    </div>
  )
}

export default ATMS_MainDashboardStatisticsDepartmentwise_DonutGraph
