import React, { useState } from 'react'
import Highlighter from 'react-highlight-words'

import { Button, Modal, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import moment from 'moment'

import {
  allTicketDataType,
  ticketDataStructure,
} from '../../ATMS_Utilities/ATMS_Interfaces'
import ModalPreviewData from './ModalPreviewData'

import './TableLayout.css'
import { useNavigate, useParams } from 'react-router-dom'
import AIM_TMS_TableCustomizationFilter from './AIM_TMS_TableCustomizationFilter'

const TableLayout: React.FC<allTicketDataType> = ({
  tableData,
  searchedValue,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedRowIndex, setselectedRowIndex] = useState<number>(-1)
  const [tableCustomizationFilter, setTableCustomizationFilter] =
    useState<any>()
  const navigate = useNavigate()

  const params = useParams()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const columns: ColumnsType<ticketDataStructure> = [
    {
      title: 'Ticket - Id',
      dataIndex: 'ticketId',
      key: 'ticketId',
    },
    {
      title: 'Created At',
      dataIndex: 'postedTimeEpoch',
      key: 'postedTimeEpoch',
      render: (text) => (
        <p
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          {moment(Number(text)).format('Do MMM, YYYY h:mm A') ?? ' -'}
        </p>
      ),
    },
    {
      title: 'Issue Category',
      dataIndex: 'key_issue',
      key: 'key_issue',
      render: (text) =>
        text ? (
          text[0]?.includes(searchedValue) ||
          text[1]?.includes(searchedValue) ? (
            <div
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              <span>Main - </span>
              <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchedValue]}
                autoEscape
                textToHighlight={text[0] ? text[0].toString() : ''}
              />
              {'     '}
              <span>Sub - </span>
              <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchedValue]}
                autoEscape
                textToHighlight={text[1] ? text[1].toString() : ''}
              />
            </div>
          ) : (
            <p
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              {String(' Main - ' + text[0] + ' Sub - ' + text[1])}
            </p>
          )
        ) : (
          <strong>Not found</strong>
        ),
    },
    {
      title: 'Department',
      dataIndex: 'departmentCode',
      key: 'departmentCode',
      render: (text) =>
        text?.includes(searchedValue) ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchedValue]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : text ? (
          <span
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            {text}
          </span>
        ) : (
          '-'
        ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (text) => {
        if (text) {
          let color = ''
          if (text?.includes('critical') || text?.includes('Critical')) {
            color = 'red'
          } else if (text?.includes('hig') || text?.includes('Hig')) {
            color = 'yellow'
          } else if (text?.includes('medium') || text?.includes('Medium')) {
            color = 'geekblue'
          } else if (text?.includes('low') || text?.includes('Low')) {
            color = 'green'
          }
          return (
            <span>
              <Tag color={color}>{text !== '-' ? text : 'Yet to assign'}</Tag>
            </span>
          )
        } else {
          return (
            <span>
              <Tag color={''}>Yet to assign</Tag>
            </span>
          )
        }
      },
      sorter: (a, b) => {
        const order: any = {
          Critical: 0,
          critical: 0,
          high: 1,
          High: 1,
          higgggggggggggggggggh: 1,
          Medium: 2,
          medium: 2,
          Low: 3,
          low: 3,
        }
        return order[a.priority] - order[b.priority]
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) =>
        text?.includes(searchedValue) ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchedValue]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : text ? (
          <span
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            {text}
          </span>
        ) : (
          '-'
        ),
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => (
        <Button
          type="primary"
          onClick={(event: React.SyntheticEvent) => {
            event.stopPropagation()
            setselectedRowIndex(index)
            showModal()
          }}
        >
          Preview
        </Button>
      ),
    },
  ]

  return (
    <>
      <AIM_TMS_TableCustomizationFilter
        tableData={tableData}
        tableCustomizationFilter={tableCustomizationFilter}
        setTableCustomizationFilter={setTableCustomizationFilter}
      />
      <Modal
        title="Ticket Details"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ModalPreviewData
          tableData={tableData}
          selectedRowIndex={selectedRowIndex}
          searchedValue={searchedValue}
        />
      </Modal>
      <Table
        size="small"
        columns={columns}
        dataSource={tableData}
        onRow={(record: any, index: any) => {
          return {
            onClick: (event: any) => {
              // window.open(`/ticket/${record.ticketId}`, '_self')
              navigate(`/ticket/${record.ticketId}`)
            },
          }
        }}
      />
    </>
  )
}

export default TableLayout
