import {
  ATMS_MainDashboardSlaDetails,
  ATMS_MainDashboardStatistics,
  ATMS_MainDashboardTicketsDetail,
} from './ATMS_MainDashboardIndex'
// import { Col, DatePicker, Row, Spin } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { Col, DatePicker, Row, Skeleton, Spin } from 'antd'
import { useEffect, useState } from 'react'
const { RangePicker } = DatePicker
import dayjs from 'dayjs'
import ATMS_MainDashboardStatisticsRange from './ATMS_MainDashboardStatistics/ATMS_MainDashboardStatistics/ATMS_MainDashboardStatisticsRange'
import ATMS_MainDashboardStatisticsBarGraph from './ATMS_MainDashboardStatistics/ATMS_MainDashboardStatistics/ATMS_MainDashboardStatisticsDepartmentwise_BarGraph'
import ATMS_MainDashboardStatisticsDepartmentBarGraph from './ATMS_MainDashboardStatistics/ATMS_MainDashboardStatistics/ATMS_MainDashboardStatisticsDepartmentwise_BarGraph'
import './ATMS_MainDashboard.css'
import { TbBorderRadius } from 'react-icons/tb'
const ATMS_MainDashboard = () => {
  const [metaData, setMetaData] = useState<any>({})
  const [loadingStatus, setLoadingStatus] = useState<any>({
    isLoading: true,
    isLoaded: false,
  })
  const [dateRange, setDateRange] = useState<any>({
    first: +String(moment().startOf('month').unix() + '160'),
    second: +String(moment().endOf('month').unix() + '160'),
    selected: true,
    date: [
      moment().startOf('month').toISOString(),
      moment().endOf('month').toISOString(),
    ],
  })
  useEffect(() => {
    axios
      .get(
        ` https://5jg01ylkhd.execute-api.ap-southeast-1.amazonaws.com/reporting-module?type=metadataGenerator&startDate=${dateRange.first}&endDate=${dateRange.second}`
      )

      .then((response) => {
        if (response.data.metaData) {
          if (Object.keys(response.data.metaData).length > 1) {
            setLoadingStatus(() => {
              return { isLoading: false, isLoaded: true }
            })
          } else
            setLoadingStatus(() => {
              return { isLoading: false, isLoaded: false }
            })
        }
        return setMetaData(response.data)
      })
      .catch((error) => console.log('Something Went Wrong', error))
  }, [dateRange])

  const graphRangeHandler = (date: any, dateString: any) => {
    if (date) {
      setDateRange({
        first: +String(moment(date[0].$d).unix() + '160'),
        second: +String(moment(date[1].$d).unix() + '160'),
        selected: true,
        date: date,
      })
    } else {
      setDateRange((prev: any) => {
        return {
          ...prev,
          selected: false,
        }
      })
    }
  }

  const dateFormat = 'YYYY/MM/DD'
  console.log(dateRange)
  console.log(metaData)
  return (
    <div className="ATMS_MainDashboard">
      <div>
        <RangePicker
          onChange={graphRangeHandler}
          style={{ marginLeft: '40%' }}
          defaultValue={[
            dayjs(moment().startOf('month').format('YYYY-MM-DD'), dateFormat),
            dayjs(moment().endOf('month').format('YYYY-MM-DD'), dateFormat),
          ]}
        />
      </div>
      {loadingStatus.isLoading && (
        <>
          <div style={{ textAlign: 'center', marginTop: '10rem' }}>
            <Spin style={{ justifyContent: 'center' }} tip="Loading..."></Spin>
          </div>
        </>
      )}
      {/* Rendering ATMS_MainDashboardHeader */}
      {metaData.metaData && (
        <div style={{ borderRadius: '50px' }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ATMS_MainDashboardTicketsDetail metaData={metaData} />
            </Col>
            <Col span={12}>
              <ATMS_MainDashboardStatisticsRange metaData={metaData.metaData} />
            </Col>
            <Col span={12}>
              <ATMS_MainDashboardStatisticsDepartmentBarGraph
                departmentDetails={metaData?.metaData?.total?.Departments}
              />
            </Col>
            <Col span={12}>
              <ATMS_MainDashboardStatistics metaData={metaData} />
            </Col>
            <Col span={12}>
              <ATMS_MainDashboardSlaDetails />
            </Col>
          </Row>
        </div>
      )}
      {!loadingStatus.isLoading && !loadingStatus.isLoaded && (
        <p>No Data Found</p>
      )}
    </div>
  )
}

export default ATMS_MainDashboard
