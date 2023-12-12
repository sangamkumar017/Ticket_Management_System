import React, { useEffect, useState } from 'react'
import { Steps } from 'antd'
import moment from 'moment'
import { MailOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons'
import { Collapse } from 'antd'
import ATMS_TicketDetailsOpenTickets from '../ATMS_TicketDetailsOpenTickets/ATMS_TicketDetailsOpenTickets'
import './ATMS_TicketDetailHistory.css'
import TimeAgo from '../ATMS_Utilities/ATMS_timeAgo'
const { Panel } = Collapse
const { Step } = Steps

const ATMS_TicketDetailsHistory: React.FC<any> = ({ ticketDetails }) => {
  const [historydata, setHistorydata] = useState<any>([null])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (ticketDetails) {
      setHistorydata(ticketDetails)
    }
  }, [ticketDetails])
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  if (!historydata) {
    return <div>No data found</div>
  }
  const userMail = localStorage.getItem('userAttributes')
  const [isOpen, setIsOpen] = useState(true)

  const handleCollapse = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div className="person-details">
        {historydata && (
          <>
            <MailOutlined /> {userMail && JSON.parse(userMail).email}
            <br />
            <UserOutlined />
            {userMail && JSON.parse(userMail).first_name}
            {userMail && JSON.parse(userMail).last_name}
            <br />
            <MobileOutlined />
            {userMail && JSON.parse(userMail).phone_number}
          </>
        )}
      </div>

      <div className="ticket-history">
        <Collapse
          accordion
          className="atms-ticket-details-page-ticket-history-collapse"
          defaultActiveKey={isOpen ? '2' : ''}
          onChange={handleCollapse}
        >
          <Panel header="TICKET HISTORY" key="2">
            <div className="history-list">
              {historydata &&
                historydata?.TransactionHistory?.reverse().map(
                  (item: any, index: any) => {
                    const hasPriorityChange =
                      item.changes.priority &&
                      Object.keys(item.changes.priority).length > 0
                    const hasStatusChange =
                      item.changes.status &&
                      Object.keys(item.changes.status).length > 0
                    const hasDepartmentChange =
                      item.changes.departmentCode &&
                      Object.keys(item.changes.departmentCode).length > 0
                    if (
                      hasPriorityChange ||
                      hasStatusChange ||
                      hasDepartmentChange
                    ) {
                      return (
                        <div key={index} className="history-Item">
                          <div>
                            Updated by {item.author}
                            <span className="timesago">
                              <TimeAgo timestamp={item.updatedAt} />
                            </span>
                            <div className="tickethistorydata">
                              <Steps
                                direction="vertical"
                                progressDot
                                current={3}
                                className="atms-ticket-detail-history-steps"
                              >
                                {hasPriorityChange && (
                                  <Step
                                    description={
                                      <span>
                                        {item.changes.priority.previousPriority}
                                        -&gt;
                                        {item.changes.priority.currentPriority}
                                      </span>
                                    }
                                  />
                                )}

                                {hasStatusChange && (
                                  <Step
                                    description={
                                      <span>
                                        {item.changes.status.previousStatus}
                                        -&gt;
                                        {item.changes.status.currentStatus}
                                      </span>
                                    }
                                  />
                                )}

                                {hasDepartmentChange && (
                                  <Step
                                    description={
                                      <span>
                                        {
                                          item.changes.departmentCode
                                            .previousDepartmentCode
                                        }
                                        -&gt;
                                        {
                                          item.changes.departmentCode
                                            .currentDepartmentCode
                                        }
                                      </span>
                                    }
                                  />
                                )}
                              </Steps>
                            </div>
                          </div>
                        </div>
                      )
                    } else {
                      return null
                    }
                  }
                )}
            </div>
          </Panel>
        </Collapse>
      </div>

      <div className="open-tickets">
        <Collapse
          accordion
          className="atms-ticket-details-page-ticket-history-collapse"
        >
          <Panel header="OPEN TICKETS" key="1">
            <ATMS_TicketDetailsOpenTickets />
            {/* Add your content for open tickets here */}
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}

export default ATMS_TicketDetailsHistory
