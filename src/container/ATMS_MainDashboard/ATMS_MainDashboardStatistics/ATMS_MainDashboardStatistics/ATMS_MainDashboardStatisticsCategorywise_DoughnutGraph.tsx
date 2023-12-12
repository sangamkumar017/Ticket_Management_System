import React from 'react'
import Highcharts from 'highcharts'
import { HighchartsReact } from 'highcharts-react-official'

const ATMS_MainDashboardStatisticsCategorywise_DoughnutGraph: React.FC<any> = ({
  totalCategoryCount,
}) => {
  const dataItems: any = []

  console.log(totalCategoryCount)
  Object.keys(totalCategoryCount).forEach((categoryName) => {
    dataItems.push({
      name: categoryName.split(',')[0],
      y: totalCategoryCount[categoryName],
    })
  })

  const myOptions: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    credits: {
      enabled: false,
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

    series: [
      {
        type: 'pie',
        name: 'Percentage',
        innerSize: '50%',
        data: dataItems,
      },
    ],
  }

  return <HighchartsReact highcharts={Highcharts} options={myOptions} />
}

export default ATMS_MainDashboardStatisticsCategorywise_DoughnutGraph
