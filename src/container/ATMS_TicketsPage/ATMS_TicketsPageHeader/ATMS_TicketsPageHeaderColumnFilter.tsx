import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Popover,
  Radio,
  RadioChangeEvent,
  Row,
  Tag,
} from 'antd'
import {
  CheckCircleOutlined,
  CheckOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import { useEffect, useState } from 'react'
import { LinkOutlined } from '@ant-design/icons'
import { notification } from 'antd'

import './ATMS_TicketsPageHeader.css'
import moment from 'moment'
import Highlighter from 'react-highlight-words'
import { NavLink, useNavigate } from 'react-router-dom'

const ATMS_TicketsPageHeaderColumnFilter = ({
  mainTableColumnOptions,
  setMainTableColumnOptions,
  searchedValue,
}: any) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(1)
  const navigate = useNavigate()
  const [hideColSettingItem, setHideColSettingItem] = useState<any>({
    ticketId: false,
    user_id: true,
    postedTimeEpoch: false,
    departmentCode: false,
    key_issue: true,
    description: true,
    priority: false,
    status: false,
  })

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = () => {
    api['success']({
      message: 'Copied Ticket ID to Clipboard !',
    })
  }

  const tagsForStatus = [
    ['lime', <CheckOutlined />],
    ['warning', <ExclamationCircleOutlined />],
    ['processing', <SyncOutlined spin />],
    ['success', <CheckCircleOutlined />],
    ['volcano', <ClockCircleOutlined />],
    ['error', <CloseCircleOutlined />],
  ]

  const fullColumnSettings: any = [
    {
      title: 'Ticket - Id',
      dataIndex: 'ticketId',
      key: 'ticketId',
      hidden: hideColSettingItem.ticketId,
      render: (text: string, record: any, index: any) =>
        text.includes(searchedValue) ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchedValue]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          <>
            <p
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              <LinkOutlined
                onClick={(event) => {
                  event.stopPropagation()
                  navigator.clipboard.writeText(
                    // `${window.location.origin}/ticket/${text}`
                    `${text}`
                  )
                  openNotificationWithIcon()
                }}
                style={{ marginRight: '12px', fontSize: '1rem' }}
              />
              <NavLink
                to={`/ticket/${record.ticketId}`}
                style={{ color: 'rgb(66,158,239)' }}
              >
                {text}
              </NavLink>
            </p>

            {contextHolder}
          </>
        ),
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
      hidden: hideColSettingItem.user_id,
    },
    {
      title: 'Created At',
      dataIndex: 'postedTimeEpoch',
      key: 'postedTimeEpoch',
      render: (text: any) => (
        <p>
          <p>{moment(Number(text)).format('Do MMM, YYYY h:mm A') ?? ' -'}</p>
          {/* {moment.unix(text).format('Do MMM, YYYY h:mm A')} */}
        </p>
      ),
      hidden: hideColSettingItem.postedTimeEpoch,
    },
    {
      title: 'Department',
      dataIndex: 'departmentCode',
      key: 'departmentCode',
      hidden: hideColSettingItem.departmentCode,
    },
    {
      title: 'Issue Category',
      dataIndex: 'key_issue',
      key: 'key_issue',
      // render: (text: any) =>
      //   text ? (
      //     <div>
      //       <span>Main - </span>
      //       {text[0] ? text[0].toString() : ''}
      //       <span>Sub - </span>
      //       {text[1] ? text[1].toString() : ''}
      //     </div>
      //   ) : (
      //     <strong>NOT FOUND</strong>
      //   ),
      render: (text: any) =>
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
      hidden: hideColSettingItem.key_issue,
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      render: (text: any) =>
        text?.includes(searchedValue) ? (
          <>
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchedValue]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          </>
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
      hidden: hideColSettingItem.description,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (text: any) => {
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
      sorter: (a: any, b: any) => {
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
      hidden: hideColSettingItem.priority,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: any) => {
        let statusTag

        tagsForStatus.forEach((item) => {
          if (text === 'Open') {
            statusTag = 1
          } else if (text === 'In Review') {
            statusTag = 2
          } else if (text === 'In Progress') {
            statusTag = 3
          } else if (text === 'Closed') {
            statusTag = 4
          } else if (text === 'Pending') {
            statusTag = 5
          } else if (text === 'Un Resolved') {
            statusTag = 6
          }
        })

        return text?.includes(searchedValue) ? (
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
            <>
              <Tag
                icon={statusTag && tagsForStatus[statusTag - 1][1]}
                className="AIM-ticket-details-page-status-tag"
                color={statusTag && tagsForStatus[statusTag - 1][0]}
              >
                {text}
              </Tag>
            </>
          </span>
        ) : (
          '-'
        )
      },
      hidden: hideColSettingItem.status,
    },
  ].filter((item) => !item.hidden)

  const hide = () => {
    setOpen(false)
  }
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  const radioSettingsChangeHandler = (e: RadioChangeEvent) => {
    if (e.target.value == 2) {
      setHideColSettingItem((prevHideSettings: any) => {
        return {
          ticketId: false,
          user_id: false,
          postedTimeEpoch: false,
          departmentCode: false,
          key_issue: false,
          description: false,
          priority: false,
          status: false,
        }
      })
    } else if (e.target.value == 1) {
      setHideColSettingItem((prevHideSettings: any) => {
        return {
          ticketId: false,
          user_id: true,
          postedTimeEpoch: false,
          departmentCode: false,
          key_issue: true,
          description: true,
          priority: false,
          status: false,
        }
      })
    }
    setValue(e.target.value)
  }
  const checkBoChangeHandler = (event: any) => {
    let checkedValue: any = event.target.value
    setHideColSettingItem((prev: any) => ({
      ...prev,
      [checkedValue]: !hideColSettingItem[checkedValue],
    }))
  }

  useEffect(() => {
    setMainTableColumnOptions(fullColumnSettings)
  }, [hideColSettingItem])

  const content = (
    <div className="atms-tickets-page-header-column-filter-content-container">
      <Radio.Group
        onChange={radioSettingsChangeHandler}
        value={value}
        className="atms-tickets-page-header-column-filter-content-radio-container"
      >
        <Radio value={1}>Default</Radio>
        <Radio value={2}>Select All</Radio>
      </Radio.Group>

      <div>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Checkbox
              checked={!hideColSettingItem.ticketId}
              onChange={checkBoChangeHandler}
              value="ticketId"
            >
              Ticket ID
            </Checkbox>
          </Col>

          <Col span={12}>
            <Checkbox
              checked={!hideColSettingItem.postedTimeEpoch}
              onChange={checkBoChangeHandler}
              value="postedTimeEpoch"
            >
              Created At
            </Checkbox>
          </Col>

          <Col span={12}>
            <Checkbox
              checked={!hideColSettingItem.status}
              onChange={checkBoChangeHandler}
              value="status"
            >
              Status
            </Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox
              checked={!hideColSettingItem.priority}
              onChange={checkBoChangeHandler}
              value="priority"
            >
              Priority
            </Checkbox>
          </Col>

          <Col span={12}>
            <Checkbox
              checked={!hideColSettingItem.departmentCode}
              onChange={checkBoChangeHandler}
              value="departmentCode"
            >
              Department
            </Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox
              checked={!hideColSettingItem.key_issue}
              onChange={checkBoChangeHandler}
              value="key_issue"
            >
              Issue Category
            </Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox
              checked={!hideColSettingItem.description}
              onChange={checkBoChangeHandler}
              value="description"
            >
              Description
            </Checkbox>
          </Col>
          <Col span={12}>
            <Checkbox
              checked={!hideColSettingItem.user_id}
              onChange={checkBoChangeHandler}
              value="user_id"
            >
              User ID
            </Checkbox>
          </Col>
        </Row>
      </div>
    </div>
  )
  return (
    <div className="atms-ticketspage-header-column-filter-popover-container">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#9254de',
            colorPrimaryHover: '#b37feb',
          },
        }}
      >
        <Popover
          overlayStyle={{
            position: 'fixed',
            width: '25vw',
          }}
          content={content}
          title="Column Settings"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button
            className="atms-tickets-page-header-column-filter-settings-button primary-button"
            type="primary"
          >
            Column Settings
          </Button>
        </Popover>
      </ConfigProvider>
    </div>
  )
}

export default ATMS_TicketsPageHeaderColumnFilter
