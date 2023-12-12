import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Table } from 'antd'

import { allTicketDataType } from '../ATMS_Utilities/ATMS_Interfaces'
import './ATMS_TicketPageTable.css'

const ATMS_TicketPageTable: React.FC<allTicketDataType> = ({
  tableData,
  mainTableColumnOptions,
  setMainTableColumnOptions,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <Table
        size="small"
        columns={mainTableColumnOptions}
        dataSource={tableData}
      />
    </>
  )
}

export default ATMS_TicketPageTable
