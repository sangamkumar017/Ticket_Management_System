import { ConfigProvider, Select, Space, Tag } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import moment from 'moment'
import React, { useState } from 'react'
import { ticketDetailPageDataType } from '../ATMS_Utilities/ATMS_Interfaces'
import './ATMS_TicketDetailPageTicketData.css'

import {
  CheckCircleOutlined,
  CheckOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'

const ATMS_TicketDetailPageTicketData: React.FC<ticketDetailPageDataType> = ({
  ticketDetails,
  handlePriority,
  handleDepartment,
  handleStatus,
  handleNoteEdit,
  privileges,
  deptPriorityStatus,
}) => {
  const tagsForStatus = [
    ['lime', <CheckOutlined />],
    ['warning', <ExclamationCircleOutlined />],
    ['processing', <SyncOutlined spin />],
    ['success', <CheckCircleOutlined />],
    ['volcano', <ClockCircleOutlined />],
    ['error', <CloseCircleOutlined />],
  ]
  const [showMore, setShowMore] = useState<any>(false)

  let statusTag

  tagsForStatus.forEach((item) => {
    if (ticketDetails?.status === 'Open') {
      statusTag = 1
    } else if (ticketDetails?.status === 'In Review') {
      statusTag = 2
    } else if (ticketDetails?.status === 'In Progress') {
      statusTag = 3
    } else if (ticketDetails?.status === 'Closed') {
      statusTag = 4
    } else if (ticketDetails?.status === 'Pending') {
      statusTag = 5
    } else if (ticketDetails?.status === 'Un Resolved') {
      statusTag = 6
    }
  })

  return (
    <>
      <div className="atms-ticket-details-page-ticket-container">
        <p className="atms-ticket-details-page-ticket-primary-paragraph">
          Ticket #
          {ticketDetails?.ticketId && (
            <>
              {showMore ? (
                <b>{ticketDetails?.ticketId}</b>
              ) : (
                <b>{ticketDetails?.ticketId.substring(0, 8)}</b>
              )}
              <button
                className="show-more-button"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? (
                  <b
                    style={{
                      cursor: 'pointer',
                      fontSize: '10px',
                      color: 'rgb(104,155,183)',
                    }}
                  >
                    Show Less
                  </b>
                ) : (
                  <b style={{ cursor: 'pointer', fontSize: '20px' }}>...</b>
                )}
              </button>
            </>
          )}
          <Tag
            icon={statusTag && tagsForStatus[statusTag - 1][1]}
            className="atms-ticket-details-page-status-tag"
            color={statusTag && tagsForStatus[statusTag - 1][0]}
          >
            {ticketDetails?.status}
          </Tag>
        </p>
        <p className="atms-ticket-details-page-ticket-secondary-paragraph">
          Created Date
        </p>
        <b className="atms-ticket-details-page-ticket-dates">
          {moment(ticketDetails?.postedTimeEpoch).format('YYYY-MM-DD HH:mm:ss')}
        </b>

        <p className="atms-ticket-details-page-ticket-secondary-paragraph">
          Resolution Due
        </p>
        <b className="atms-ticket-details-page-ticket-dates">
          {moment(ticketDetails?.postedTimeEpoch).format('YYYY-MM-DD HH:mm:ss')}
        </b>
      </div>
      <Space
        direction="vertical"
        size="small"
        className="atms-ticket-details-page-select-menu"
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#9254de',
              colorPrimaryHover: '#b37feb',
              colorBgContainer: '#F9FAFA',
            },
          }}
        >
          {privileges?.priority && (
            <>
              <p className="atms-ticket-details-page-ticket-normal-paragraph">
                Priority
              </p>

              <Select
                suffixIcon={<EditOutlined />}
                value={ticketDetails?.priority}
                placeholder={ticketDetails?.priority ? '' : 'Select Priority'}
                onChange={handlePriority}
                options={
                  deptPriorityStatus?.priority || [
                    {
                      value: 'Critical',
                      label: 'Critical',
                    },
                    {
                      value: 'High',
                      label: 'High',
                    },
                    {
                      value: 'Medium',
                      label: 'Medium',
                    },
                    {
                      value: 'Low',
                      label: 'Low',
                    },
                  ]
                }
                className="atms-ticket-details-page-ticket-select-dropdown"
              />
            </>
          )}

          {privileges?.departmentCode && (
            <>
              <p className="atms-ticket-details-page-ticket-normal-paragraph">
                Asigned to
              </p>
              <Select
                suffixIcon={<EditOutlined />}
                value={ticketDetails?.departmentCode}
                placeholder={
                  ticketDetails?.departmentCode ? '' : 'Select Department'
                }
                onChange={handleDepartment}
                options={
                  deptPriorityStatus?.departmentCode || [
                    {
                      value: 'Front End',
                      label: 'Front End',
                    },
                    {
                      value: 'Back End',
                      label: 'Back End',
                    },
                    {
                      value: 'Data automation',
                      label: 'Data automation',
                    },
                    {
                      value: 'UAT testing',
                      label: 'UAT testing',
                    },
                    {
                      value: 'Product management',
                      label: 'Product management',
                    },
                  ]
                }
                className="atms-ticket-details-page-ticket-select-dropdown"
              />
            </>
          )}

          {privileges?.status && (
            <>
              <p className="atms-ticket-details-page-ticket-normal-paragraph">
                Status
              </p>
              <Select
                suffixIcon={<EditOutlined />}
                value={ticketDetails?.status}
                placeholder={ticketDetails?.status ? '' : 'Select Status'}
                onChange={handleStatus}
                options={
                  deptPriorityStatus?.status || [
                    {
                      value: 'Pending',
                      label: 'Pending',
                    },
                    {
                      value: 'Started',
                      label: 'Started',
                    },
                    {
                      value: 'In Progress',
                      label: 'In Progress',
                    },
                    {
                      value: 'In Review',
                      label: 'In Review',
                    },
                    {
                      value: 'Resolved',
                      label: 'Resolved',
                    },
                    {
                      value: 'Closed',
                      label: 'Closed',
                    },
                  ]
                }
                className="atms-ticket-details-page-ticket-select-dropdown"
              />
            </>
          )}
        </ConfigProvider>
      </Space>
    </>
  )
}

export default ATMS_TicketDetailPageTicketData
