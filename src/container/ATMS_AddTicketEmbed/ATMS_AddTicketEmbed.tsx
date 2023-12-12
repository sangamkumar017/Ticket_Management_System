import { PlusCircleOutlined } from '@ant-design/icons'
import ATMS_TicketsPageHeaderTicketRaisingForm from '../ATMS_TicketsPage/ATMS_TicketsPageHeader/ATMS_TicketsPageHeaderTicketRaisingForm'

import { Button, ConfigProvider, Modal } from 'antd'
import React, { useState } from 'react'

const ATMS_AddTicketEmbed = () => {
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
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#9254de',
            colorPrimaryHover: '#b37feb',
            colorBgContainer: '#F9FAFA',
          },
        }}
      >
        <Button
          type="primary"
          shape="round"
          icon={<PlusCircleOutlined />}
          size={'middle'}
          style={{ marginLeft: 10 }}
          onClick={showModal}
        >
          Add Ticket
        </Button>
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
      </ConfigProvider>
    </>
  )
}

export default ATMS_AddTicketEmbed
