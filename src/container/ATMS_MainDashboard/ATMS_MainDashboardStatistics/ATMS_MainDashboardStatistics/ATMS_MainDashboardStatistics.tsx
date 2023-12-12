import React, { useState } from 'react'
import { Col, Row, Select } from 'antd'
import { FcDoughnutChart, FcPieChart, FcBarChart } from 'react-icons/fc'
import { TbChartRadar } from 'react-icons/tb'

import ATMS_MainDashboardStatisticsPolarAreaGraph from './ATMS_MainDashboardStatisticsPrioritywise_dougnutGraph'
import { color } from 'highcharts'

import '../ATMS_MainDashboardStatisticsCSS/ATMS_MainDashboardStatistics.css'
import ATMS_MainDashboardStatisticsCategorywise from './ATMS_MainDashboardStatisticsCategorywise_DoughnutGraph'
import ATMS_MainDashboardStatisticsCategorywise_DoughnutGraph from './ATMS_MainDashboardStatisticsCategorywise_DoughnutGraph'
import ATMS_MainDashboardStatisticsDepartmentwise_DonutGraph from './ATMS_MainDashboardStatisticsDepartmentwise_DonutGraph'
import ATMS_MainDashboardStatisticsStatuswise_DougnutGraph from './ATMS_MainDashboardStatisticsStatuswise_DougnutGraph'
import ATMS_MainDashboardStatisticsPrioritywise_dougnutGraph from './ATMS_MainDashboardStatisticsPrioritywise_dougnutGraph'
const { Option } = Select

const items = [
  {
    label: 'Status',
    key: 'Total',
  },
  {
    label: 'Department',
    key: 'Department',
  },
  {
    label: 'Priority',
    key: 'Priority',
  },
  {
    label: 'Category',
    key: 'Category',
  },
]

const ATMS_MainDashboardStatistics: React.FC<any> = ({ metaData }) => {
  const [currentTabActive, setCurrentTabActive] = useState('Total')

  const handleChange = (value: any) => {
    console.log('selected ', value)
    setCurrentTabActive(value)
  }

  return (
    <div className="ATMS_MainDashboardStatistics_Container">
      {' '}
      <Row>
        <Col span={24}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Select
              value={currentTabActive}
              onChange={handleChange}
              style={{ width: 200 }}
            >
              {items.map((item) => (
                <Option key={item.key} value={item.key}>
                  {/* {item.icon} */}
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
          {currentTabActive === 'Total' && (
            <ATMS_MainDashboardStatisticsStatuswise_DougnutGraph
              metaData={metaData}
            />
          )}
          {currentTabActive === 'Priority' && (
            <ATMS_MainDashboardStatisticsPrioritywise_dougnutGraph
              totalPriorityCount={metaData.metaData.total.Priority_counts}
            />
          )}
          {currentTabActive === 'Department' && (
            <ATMS_MainDashboardStatisticsDepartmentwise_DonutGraph
              departmentDetails={metaData.metaData.total.Departments}
            />
          )}
          {currentTabActive === 'Category' && (
            <ATMS_MainDashboardStatisticsCategorywise_DoughnutGraph
              totalCategoryCount={metaData.metaData.total.Category_counts}
            />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default ATMS_MainDashboardStatistics
