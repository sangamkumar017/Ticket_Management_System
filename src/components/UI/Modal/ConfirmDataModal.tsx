import { FrownOutlined, SmileOutlined } from '@ant-design/icons'
import { Button, Modal, notification } from 'antd'
import React, { useState } from 'react'
import { postUserTicket } from '../../../actions'

const ConfirmDataModal: React.FC<any> = ({
  formValues,
  showConfirmationModal,
  setShowConfirmationModal,
  form,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (response: any) => {
    if (response.status >= 200) {
      api.open({
        message: 'Ticket Successfully Created',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      })
      form.resetFields()
    } else {
      api.open({
        message: 'Something Went Wrong',
        description: `Your submit responded with ${response.code} Please try again`,
        icon: <FrownOutlined style={{ color: '#108ee9' }} />,
      })
    }
    // form.resetFields()
  }

  const handleOk = () => {
    const postUserData = async () => {
      await postUserTicket(formValues)
        .then((response) => {
          openNotification(response)
          console.log(response)
          return response
        })
        .catch((error) => {
          openNotification(error)
          return error
        })
    }
    setConfirmLoading(true)
    setTimeout(() => {
      setShowConfirmationModal(false)
      setConfirmLoading(false)
      postUserData()
    }, 1000)
  }

  const handleCancel = () => {
    setShowConfirmationModal(false)
  }

  return (
    <>
      <Modal
        title="Submit Below Details ?"
        open={showConfirmationModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Email: {formValues?.email}</p>
        <p>Phone Number: {formValues?.phone_number}</p>
        <div style={{ display: 'inline', wordSpacing: '10px' }}>
          Issue Catogery: Main-&#62;{formValues?.key_issue[0]} Sub-&#62;
          {formValues?.key_issue[1] ?? '-'}
        </div>
        {formValues?.['other catogery'] && (
          <p>Other Catogery: {formValues?.['other catogery'] && 'Ticked'}</p>
        )}

        {formValues?.description && (
          <p>Description: {formValues?.description}</p>
        )}
        {formValues?.upload && (
          <Button href={formValues?.upload}>Preview Uploaded</Button>
        )}
      </Modal>
      {contextHolder}
    </>
  )
}

export default ConfirmDataModal
