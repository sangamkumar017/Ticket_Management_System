import React from 'react'
import highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import moment from 'moment'

const ATMS_MainDashboardStatisticsRange: React.FC<any> = ({ metaData }) => {
  const dates: any = Object.keys(metaData)
  const sortedDates = dates.sort((a: string, b: string) => {
    const dateA = moment(a, 'DD-M-YYYY')
    const dateB = moment(b, 'DD-M-YYYY')
    return dateA.diff(dateB)
  })

  const datesValue: any = []
  sortedDates.forEach((date: string) => {
    if (date !== 'total') {
      const totalCount = metaData[date].Total_count
      datesValue.push(totalCount)
    }
  })

  const formattedDates = sortedDates.map((date: string) =>
    moment(date, 'DD-M-YYYY').format('D MMM')
  )

  const myChartOptions = {
    title: {
      text: 'Total Tickets',
      align: 'center',
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: 'Ticket Count',
      },
    },
    xAxis: {
      categories: formattedDates,
      title: {
        text: 'Dates->',
      },
    },
    series: [
      {
        name: 'Tickets',
        data: datesValue,
        showInLegend: false,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  }

  return (
    <>
      <HighchartsReact highcharts={highcharts} options={myChartOptions} />
    </>
  )
}

export default ATMS_MainDashboardStatisticsRange
