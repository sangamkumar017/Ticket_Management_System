import Highcharts from 'highcharts'
import { HighchartsReact } from 'highcharts-react-official'
import React, { useEffect, useState } from 'react'

const ATMS_MainDashboardStatisticsPrioritywise_dougnutGraph: React.FC<any> = ({
  totalPriorityCount,
}) => {
  const dataItems: any = []

  Object.keys(totalPriorityCount).forEach((priorityName) => {
    dataItems.push({
      name: priorityName,
      y: totalPriorityCount[priorityName],
    })
  })

  console.log(dataItems)

  const myOptions: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '',
      align: 'center',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    // plotOptions: {
    //   pie: {
    //     allowPointSelect: true,
    //     cursor: 'pointer',
    //     dataLabels: {
    //       enabled: false,
    //     },
    //     showInLegend: true,
    //   },
    // },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
        },
        showInLegend: true,
      },
    },
    // series: [
    //   {
    //     name: 'Percentage',
    //     colorByPoint: true,
    //     data: dataItems,
    //   },
    // ],
    series: [
      {
        type: 'pie',
        name: 'Percentage',
        innerSize: '50%',
        data: dataItems,
      },
    ],
    credits: {
      enabled: false,
    },
  }

  return <HighchartsReact highcharts={Highcharts} options={myOptions} />
}

export default ATMS_MainDashboardStatisticsPrioritywise_dougnutGraph
