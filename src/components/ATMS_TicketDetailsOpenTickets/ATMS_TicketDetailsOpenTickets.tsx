import { useEffect, useState } from 'react'

import './ATMS_TicketDetailsOpenTickets.css'
import { NavLink } from 'react-router-dom'
import { getAllTickets } from '../../actions'

const ATMS_TicketDetailsOpenTickets = () => {
  const [openticketdata, setOpenticketdata] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(null)

  useEffect(() => {
    getAllTickets()
      .then((openticketdata) => {
        setOpenticketdata(openticketdata.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setError(error.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  if (!openticketdata) {
    return <div>No data found</div>
  }

  return (
    <div className="open-ticket-list">
      {openticketdata && (
        <div>
          {openticketdata.map((item: any, index: any) => {
            if (item.status !== 'Closed' && item.status !== 'Un Resolved') {
              return (
                <div key={index} className="open-ticket-item">
                  <NavLink to={`/ticket/${item.ticketId}`} target="_blank">
                    {item.description}
                  </NavLink>
                </div>
              )
            }
          })}
        </div>
      )}
    </div>
  )
}

export default ATMS_TicketDetailsOpenTickets
