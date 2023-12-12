import { Select, Tag } from 'antd'
import React, { useState } from 'react'

import {
  CheckCircleOutlined,
  CheckOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'

import './ATMS_TicketsPageHeader.css'

const ATMS_TicketsPageHeaderRowFilter = ({
  selectedFilterDropdown,
  setSelectedFilterDropdown,
  deptStatusPriority,
}: any) => {
  const [ticketKind, setTicketKind] = useState<any>([
    { label: 'Open Tickets', value: 'Open' },
    { label: 'In Review Tickets', value: 'In Review' },
    { label: 'In Progress Tickets', value: 'In Progress' },
    { label: 'Pending Tickets', value: 'Pending' },
    { label: 'Un Resolved Tickets', value: 'Un Resolved' },
    { label: 'Closed Tickets', value: 'Closed' },
  ])

  const ticketKindFilterHandler = (value: any, option: any) => {
    setSelectedFilterDropdown((prev: any) => ({
      ...prev,
      selectedKind: { array: value, type: 'status' },
    }))
  }
  const ticketDepartmentFilterHandler = (value: any, option: any) => {
    setSelectedFilterDropdown((prev: any) => ({
      ...prev,
      selectedDepartment: { array: value, type: 'departmentCode' },
    }))
  }
  const ticketStatusFilterHandler = (value: any, option: any) => {
    setSelectedFilterDropdown((prev: any) => ({
      ...prev,
      selectedStatus: { array: value, type: 'status' },
    }))
  }
  const ticketPriorityFilterHandler = (value: any, option: any) => {
    setSelectedFilterDropdown((prev: any) => ({
      ...prev,
      selectedPriority: { array: value, type: 'priority' },
    }))
  }

  const options: any = {
    Critical: 'red',
    High: 'yellow',
    Medium: 'geekblue',
    Low: 'green',
  }

  //   <Tag
  //   icon={statusTag && tagsForStatus[statusTag - 1][1]}
  //   className="AIM-ticket-details-page-status-tag"
  //   color={statusTag && tagsForStatus[statusTag - 1][0]}
  // >
  //   {text}
  // </Tag>

  const tagsForStatus = [
    ['lime', <CheckOutlined />],
    ['warning', <ExclamationCircleOutlined />],
    ['processing', <SyncOutlined spin />],
    ['success', <CheckCircleOutlined />],
    ['volcano', <ClockCircleOutlined />],
    ['error', <CloseCircleOutlined />],
  ]

  const statusTagRender = (props: any) => {
    const { label, value, closable, onClose } = props
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }

    let statusTag: any

    if (value == 'Open') {
      statusTag = 1
    } else if (value == 'In Review') {
      statusTag = 2
    } else if (value == 'In Progress') {
      statusTag = 3
    } else if (value == 'Closed') {
      statusTag = 4
    } else if (value == 'Pending') {
      statusTag = 5
    } else if (value == 'Un Resolved') {
      statusTag = 6
    }

    return (
      <Tag
        icon={statusTag && tagsForStatus[statusTag - 1][1]}
        onMouseDown={onPreventMouseDown}
        // className="AIM-ticket-details-page-status-tag"
        color={statusTag && tagsForStatus[statusTag - 1][0]}
        onClose={onClose}
        closable={closable}
      >
        {label}
      </Tag>
    )
  }

  const priorityTagRender = (props: any) => {
    const { label, value, closable, onClose } = props
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }
    return (
      <Tag
        color={options[value]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    )
  }
  return (
    <div className="atms-tickets-page-layout-header-select-options-container">
      <Select
        bordered={false}
        className="atms-tickets-page-layout-header-select"
        mode="multiple"
        placeholder="Ticket"
        value={selectedFilterDropdown.selectedKind.array}
        tagRender={statusTagRender}
        onChange={ticketKindFilterHandler}
        style={{ width: '100%' }}
        options={ticketKind}
        maxTagCount={'responsive'}
      />

      <Select
        bordered={false}
        className="atms-tickets-page-layout-header-select"
        mode="multiple"
        placeholder="Department"
        value={selectedFilterDropdown.selectedDepartment.array}
        onChange={ticketDepartmentFilterHandler}
        style={{ width: '100%' }}
        options={
          deptStatusPriority?.departmentCode || [
            {
              value: 'marketing',
              label: 'Marketing',
            },
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
        maxTagCount={'responsive'}
      />

      {/* <Select
              bordered={false}
              className="atms-tickets-page-layout-header-select"
              mode="multiple"
              placeholder="Select Status"
              value={selectedFilterDropdown.selectedStatus}
              onChange={ticketStatusFilterHandler}
              style={{ width: '100%' }}
              options={deptStatusPriority?.status}
              maxTagCount={'responsive'}
            /> */}

      <Select
        bordered={false}
        className="atms-tickets-page-layout-header-select"
        mode="multiple"
        placeholder="Priority"
        value={selectedFilterDropdown.selectedPriority.array}
        tagRender={priorityTagRender}
        onChange={ticketPriorityFilterHandler}
        style={{ width: '100%' }}
        options={
          deptStatusPriority?.priority || [
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
        maxTagCount={'responsive'}
      />
    </div>
  )
}

export default ATMS_TicketsPageHeaderRowFilter
