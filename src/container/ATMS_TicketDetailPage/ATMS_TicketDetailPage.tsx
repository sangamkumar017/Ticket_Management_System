import { Button, Col, Modal, Row, notification } from 'antd'
import Layout, { Content, Header } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FrownOutlined, SmileOutlined } from '@ant-design/icons'
import {
  getIssuesDepartmentPriorityStatusAPI,
  getTicketDetails,
  updateTicket,
} from '../../actions'
import './ATMS_TicketDetailPage.css'
import {
  ATMS_TicketDetailComments,
  ATMS_TicketDetailPageTicketData,
} from '../../components'
import ATMS_TicketDetailHistory from '../../components/ATMS_TicketDetailHistory/ATMS_TicketDetailHistory'

const ATMS_TicketDetailPage = () => {
  const params = useParams()
  const [ticketDetails, setTicketDetails] = useState<any>({})
  const [api, contextHolder] = notification.useNotification()

  const [open, setOpen] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [modalText, setModalText] = useState<any>({
    priority: String,
    departmentCode: String,
    status: String,
    note: String,
  })

  const [changes, setChanges] = useState<any>({
    priority: undefined,
    status: undefined,
    departmentCode: undefined,
    author: 'Koushik',
  })

  const [deptPriorityStatus, setDeptPriorityStatus] = useState<any>()

  const [privileges, setPrivileges] = useState<any>({
    priority: false,
    departmentCode: false,
    status: false,
  })

  useEffect(() => {
    const userAttributesLocalStorage = localStorage.getItem('userAttributes')
    if (userAttributesLocalStorage) {
      const userAttributes = JSON.parse(userAttributesLocalStorage)
      if (userAttributes.userType?.includes('DEV')) {
        setPrivileges({
          priority: true,
          status: true,
        })
      }
      if (userAttributes.userType?.includes('ADMIN')) {
        setPrivileges({
          priority: true,
          departmentCode: true,
          status: true,
        })
      }
    }
  }, [])

  useEffect(() => {
    const getTicket = async () => {
      const ticketResponse = await getTicketDetails(params.ticketId)
      setTicketDetails(ticketResponse.data)
    }

    const getDepartmentPriorityStatus = async () => {
      const getDropDownResponse = await getIssuesDepartmentPriorityStatusAPI(
        'issuerelated'
      )
      setDeptPriorityStatus(getDropDownResponse.data)
    }
    getTicket()
    getDepartmentPriorityStatus()
  }, [])

  const initialState = {
    departmentCode: ticketDetails?.departmentCode || '-',
    status: ticketDetails?.status || '-',
    ticketStatus: ticketDetails?.ticketStatus || '-',
    category: ticketDetails?.category || '-',
    priority: ticketDetails?.priority || '-',
    description: ticketDetails?.description || '-',
    updatedBy: ticketDetails?.updatedBy || '-',
    resolutiondate: ticketDetails?.resolutiondate || '-',
    assignto: ticketDetails?.assignto || '-',
  }

  const handlePriority = (value: string, option: any) => {
    setModalText((prev: any) => {
      return {
        ...prev,
        priority: `Change Priority => ${option.label}`,
      }
    })
    setTicketDetails((prevState: any) => ({
      ...prevState,
      // ...initialState,
      priority: option.label,
    }))
    setChanges((prev: any) => {
      return {
        ...prev,
        priority: option.label,
      }
    })
  }
  const handleDepartment = (value: string, option: any) => {
    setModalText((prev: any) => {
      return {
        ...prev,
        departmentCode: `Change Department => ${option.label}`,
      }
    })
    setTicketDetails((prevState: any) => ({
      // ...initialState,
      ...prevState,
      departmentCode: option.label,
    }))
    setChanges((prev: any) => {
      return {
        ...prev,
        departmentCode: option.label,
      }
    })
  }
  const handleStatus = (values: string, option: any) => {
    setModalText((prev: any) => {
      return {
        ...prev,
        status: `Change status => ${option.label}`,
      }
    })
    setTicketDetails((prevState: any) => ({
      // ...initialState,
      ...prevState,
      status: option.label,
    }))
    setChanges((prev: any) => {
      return {
        ...prev,
        status: option.label,
      }
    })
  }

  const handleNoteEdit = (event: any) => {
    setModalText((prev: any) => {
      return {
        ...prev,
        note: `Change Note => ${event.target.value}`,
      }
    })
    setTicketDetails((prevState: any) => ({
      ...initialState,
      ...prevState,
      note: event.target.value,
    }))
  }

  const openNotification = (response: any) => {
    if (response.status >= 200) {
      api.open({
        message: 'Ticket Successfully updated',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      })
    } else {
      api.open({
        message: 'Something Went Wrong',
        icon: <FrownOutlined style={{ color: '#108ee9' }} />,
      })
    }
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)

      updateTicket(ticketDetails.ticketId, 'ticket', changes)
        .then((response) => {
          openNotification(response)
          return response
        })
        .catch((error) => {
          openNotification(error)
          return error
        })
    }, 1000)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  console.log(ticketDetails)

  return (
    <>
      <div>Header</div>
      <br />

      <Row>
        <Col span={6} className="atms-ticket-detail-page-column-1">
          <div className="atms-ticket-detail-page-ticket-details-column-container">
            <ATMS_TicketDetailPageTicketData
              ticketDetails={ticketDetails}
              handlePriority={handlePriority}
              handleDepartment={handleDepartment}
              handleStatus={handleStatus}
              handleNoteEdit={handleNoteEdit}
              deptPriorityStatus={deptPriorityStatus}
              privileges={privileges}
            />
            {privileges.priority && (
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true)
                }}
                className="atms-ticket-details-page-submit-button"
              >
                Submit Changes
              </Button>
            )}

            <Modal
              title="Are You Sure ?"
              footer={[
                <Button
                  key="Cancel"
                  onClick={handleCancel}
                  className="atms-ticket-details-page-cancel-button"
                >
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={confirmLoading}
                  onClick={handleOk}
                  className="atms-ticket-details-page-submit-confirm-button"
                >
                  Submit
                </Button>,
              ]}
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <p>{modalText?.priority}</p>
              <p>{modalText?.departmentCode}</p>
              <p>{modalText?.status}</p>
            </Modal>
            {contextHolder}
          </div>
        </Col>
        <Col span={11} className="atms-ticket-detail-page-column-2">
          <ATMS_TicketDetailComments
            ticketDetails={ticketDetails}
            setTicketDetails={setTicketDetails}
            privileges={privileges}
          />
        </Col>
        <Col span={6} className="atms-ticket-detail-page-column-3">
          <ATMS_TicketDetailHistory
            ticketDetails={ticketDetails}
            privileges={privileges}
          />
        </Col>
      </Row>
    </>
  )
}

export default ATMS_TicketDetailPage
