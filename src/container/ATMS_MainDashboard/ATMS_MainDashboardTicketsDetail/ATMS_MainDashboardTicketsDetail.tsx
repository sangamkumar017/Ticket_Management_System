import React, { useEffect, useState } from 'react'
import './ATMS_MainDashboardTicketsDetail.css'
// import ATMS_MainDashboardTicketFilter from '../ATMS_MainDashboardTicketFilter/ATMS_MainDashboardTicketFilter'

interface MetaData {
  [date: string]: {
    Status_count: {
      [status: string]: any
    }
    // other properties
  }
}

const ATMS_MainDashboardTicketsDetail: React.FC<{ metaData: MetaData }> = ({
  metaData,
}) => {
  const ticketmetadata = Object.values(metaData)

  const [counts, setCounts] = useState<any>({
    resolvedCount: 0,
    pendingCount: 0,
    openCount: 0,
    unresolvedCount: 0,
    inreviewCount: 0,
    inprogressCount: 0,
    resolveCount: 0,
  })

  useEffect(() => {
    if (ticketmetadata) {
      const updatedCounts = {
        resolvedCount: 0,
        pendingCount: 0,
        openCount: 0,
        unresolvedCount: 0,
        inreviewCount: 0,
        inprogressCount: 0,
        resolveCount: 0,
      }

      ticketmetadata.forEach((ticket: any) => {
        Object.keys(ticket).forEach((ticketItem) => {
          if (ticketItem === 'total') {
            const statusCount = ticket[ticketItem]?.Status_count
            if (statusCount?.Closed) {
              updatedCounts.resolvedCount += statusCount.Closed
            }
            if (statusCount?.['In Progress']) {
              updatedCounts.inprogressCount += statusCount['In Progress']
            }
            if (statusCount?.Pending) {
              updatedCounts.pendingCount += statusCount.Pending
            }
            if (statusCount?.Open) {
              updatedCounts.openCount += statusCount['Open']
            }
            if (statusCount?.['Un Resolved']) {
              updatedCounts.unresolvedCount += statusCount['Un Resolved']
            }
            // if (statusCount?.resolved) {
            //   updatedCounts.resolveCount += statusCount.resolved
            // }
            if (statusCount?.['In Review']) {
              updatedCounts.inreviewCount += statusCount['In Review']
            }
          }
        })
      })

      setCounts(updatedCounts)
    }
  }, [metaData])

  return (
    <div>
      <div className="button-container">
        {/* {ticketmetadata && (
          <p className="resolvedbox">
            Resolved{'\t \t'}{' '}
            <span className="ticketnumber">{counts.resolvedCount}</span>
          </p>
        )} */}
        {ticketmetadata && (
          <p className="openbox">
            Open <span className="ticketnumber">{counts.openCount}</span>
          </p>
        )}
        {ticketmetadata && (
          <p className="inprogressbox">
            In Progress{' '}
            <span className="ticketnumber-big">{counts.inprogressCount}</span>
          </p>
        )}
        {ticketmetadata && (
          <p className="duetodaybox">
            Closed <span className="ticketnumber">{counts.resolvedCount}</span>
          </p>
        )}
        {ticketmetadata && (
          <p className="unresolvedbox">
            Unresolved{' '}
            <span className="ticketnumber-big">{counts.unresolvedCount}</span>
          </p>
        )}
        {/* <p className="iframecontainer">
          <iframe
            src="http://localhost:8080/ticket/e78342cf-a5bc-4841-80f6-cf4b4c613808"
            scrolling="no"
            className="iframecontent"
          >
            {' '}
          </iframe>
        </p> */}
      </div>
    </div>
  )
}

export default ATMS_MainDashboardTicketsDetail
