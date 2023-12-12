import React, { useEffect, useRef } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/css/highcharts.css'

interface Props {
  metaData: any
}

const ATMS_MainDashboardStatisticsStatuswise_DougnutGraph: React.FC<Props> = ({
  metaData,
}) => {
  const chartRef = useRef<HighchartsReact.Props | null>(null)

  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      const chart = chartRef.current.chart

      chart.update({
        series: [
          {
            type: 'pie',
            name: '',
            innerSize: '50%',
            data: totalChartData,
          },
        ],
      })
    }
  }, [])

  const statusCounts = metaData.metaData.total.Status_count

  const totalChartData: Highcharts.PointOptionsObject[] = Object.entries(
    statusCounts
  ).map(([status, count]) => ({
    name: status,
    y: count as number,
  }))

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
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
        name: '',
        innerSize: '50%',
        data: totalChartData,
      },
    ],
  }

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  )
}

export default ATMS_MainDashboardStatisticsStatuswise_DougnutGraph
