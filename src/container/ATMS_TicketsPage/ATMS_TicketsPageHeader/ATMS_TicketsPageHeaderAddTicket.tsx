import { Button, ConfigProvider, Modal } from 'antd'
import React, { useState } from 'react'
import ATMS_TicketsPageHeaderTicketRaisingForm from './ATMS_TicketsPageHeaderTicketRaisingForm'

import './ATMS_TicketsPageHeader.css'

const ATMS_TicketsPageHeaderAddTicket = () => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 3000)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <div id="add-ticket">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#9254de',
            colorPrimaryHover: '#b37feb',
          },
        }}
      >
        <Button
          className="atms-tickets-page-header-add-tickets-button primary-button"
          type="primary"
          onClick={showModal}
        >
          Add Ticket
        </Button>
      </ConfigProvider>
      <Modal
        open={open}
        title="Add Ticket"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        mask={true}
        maskStyle={{ backdropFilter: 'blur(4px)' }}
      >
        <ATMS_TicketsPageHeaderTicketRaisingForm />
      </Modal>
    </div>
  )
}

export default ATMS_TicketsPageHeaderAddTicket
