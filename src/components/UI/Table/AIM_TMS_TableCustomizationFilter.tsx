import { Button, Popover } from 'antd'
import React, { useState } from 'react'

import './AIM_TMS_TableCustomizationFilter.css'

const AIM_TMS_TableCustomizationFilter: React.FC<any> = ({
  tableData,
  tableCustomizationFilter,
  setTableCustomizationFilter,
}) => {
  const [open, setOpen] = useState<any>(false)

  const hide = () => {
    setOpen(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  return (
    <div className="AIM-TMS-table-customization-filter-container">
      <Popover
        content={<a onClick={hide}>Close</a>}
        title="Title"
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Button type="primary">Add Customization</Button>
      </Popover>
    </div>
  )
}

export default AIM_TMS_TableCustomizationFilter
