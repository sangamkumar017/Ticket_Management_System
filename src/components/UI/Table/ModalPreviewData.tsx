import Highlighter from 'react-highlight-words'

import {
  Button,
  ConfigProvider,
  Popover,
  Steps,
  StepsProps,
  notification,
} from 'antd'
import { LinkOutlined } from '@ant-design/icons'

import moment from 'moment'

import { modalPreviewDataType } from '../../ATMS_Utilities/ATMS_Interfaces'
import './ModalPreviewData.css'

const ModalPreviewData: React.FC<modalPreviewDataType> = ({
  tableData,
  selectedRowIndex,
  searchedValue,
}) => {
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = () => {
    api['success']({
      message: 'Copied link to clipboard !',
    })
  }

  let statusCode = 0
  if (tableData[selectedRowIndex].status === '-') {
    statusCode = 0
  } else if (tableData[selectedRowIndex].status === 'Un-initialized') {
    statusCode = 0
  } else if (tableData[selectedRowIndex].status === 'initialized') {
    statusCode = 1
  } else if (tableData[selectedRowIndex].status === 'resolved') {
    statusCode = 2
  } else {
    statusCode = 0
  }

  const customDot: StepsProps['progressDot'] = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index} status: {itemsData[index].customStatus}
        </span>
      }
    >
      {dot}
    </Popover>
  )

  const itemsData = [
    { title: 'Un-initialized', customStatus: 'Ticket Yet to initialize' },
    { title: 'Initialized', customStatus: 'Ticket successfully initialized' },
    { title: 'Resolved', customStatus: 'Ticket Resolved' },
  ]

  return (
    <>
      {selectedRowIndex >= 0 && (
        <>
          <p>
            Ticket-ID: {tableData[selectedRowIndex]?.ticketId ?? ' - '}
            <LinkOutlined
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/ticket/${tableData[selectedRowIndex]?.ticketId}`
                )
                openNotificationWithIcon()
              }}
              style={{ marginLeft: '10px', fontSize: '1rem' }}
            />
            {contextHolder}
          </p>

          <p>
            {tableData[selectedRowIndex]?.email
              ?.toString()
              .includes(searchedValue) ? (
              <>
                <span>E - Mail - </span>
                <Highlighter
                  highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                  searchWords={[searchedValue]}
                  autoEscape
                  textToHighlight={tableData[
                    selectedRowIndex
                  ]?.email.toString()}
                />
              </>
            ) : (
              <p>E - Mail : {tableData[selectedRowIndex]?.email}</p>
            )}
          </p>

          <p>
            {tableData[selectedRowIndex]?.phone_number
              ?.toString()
              .includes(searchedValue) ? (
              <>
                <span>Phone Number - </span>
                <Highlighter
                  highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                  searchWords={[searchedValue]}
                  autoEscape
                  textToHighlight={tableData[
                    selectedRowIndex
                  ]?.phone_number.toString()}
                />
              </>
            ) : (
              <p>Phone Number: {tableData[selectedRowIndex]?.phone_number}</p>
            )}
          </p>

          <p>
            {tableData[selectedRowIndex]?.description
              ?.toString()
              .includes(searchedValue) ? (
              <>
                <span>Description - </span>
                <Highlighter
                  highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                  searchWords={[searchedValue]}
                  autoEscape
                  textToHighlight={tableData[
                    selectedRowIndex
                  ]?.description.toString()}
                />
              </>
            ) : (
              <p>Description: {tableData[selectedRowIndex]?.description}</p>
            )}
          </p>

          {
            <p>
              Created Date:
              {moment(tableData[selectedRowIndex]?.postedTimeEpoch).format(
                'Do MMM, YYYY h:mm A'
              ) ?? ' -'}
            </p>
          }

          {tableData[selectedRowIndex]?.upload && (
            <Button href={tableData[selectedRowIndex]?.upload} target="_blank">
              Preview Uploaded
            </Button>
          )}
          <p>
            Depatrment -{' '}
            {tableData[selectedRowIndex].departmentCode
              ? tableData[selectedRowIndex].departmentCode
              : '-'}
          </p>

          <p>
            Priority -
            {tableData[selectedRowIndex].priority
              ? tableData[selectedRowIndex].priority
              : '-'}
          </p>
          <ConfigProvider
            theme={{
              inherit: false,
              components: {
                Steps: {
                  colorPrimary: 'green',
                },
              },
            }}
          >
            <span>
              Status :
              <Steps
                className="custom-steps"
                style={{ color: '#52c41a' }}
                size="small"
                progressDot={customDot}
                current={statusCode}
                items={itemsData}
              />
            </span>
          </ConfigProvider>
        </>
      )}
    </>
  )
}

export default ModalPreviewData
