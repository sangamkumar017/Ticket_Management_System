import { LinkOutlined } from '@ant-design/icons'
import { Input, Spin, Tag, notification } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words'
import {
  getAllTickets,
  getIssuesDepartmentPriorityStatusAPI,
} from '../../actions'
import {
  fetchStatusDataType,
  ticketDataStructure,
} from '../../components/ATMS_Utilities/ATMS_Interfaces'
import './ATMS_TicketsPage.css'
import {
  ATMS_TicketsPageHeaderAddTicket,
  ATMS_TicketsPageHeaderColumnFilter,
  ATMS_TicketsPageHeaderRowFilter,
  ATMS_TicketspageHeaderSmartSearch,
} from './ATMS_TicketsPageHeader'
import {
  ATMS_TicketPageTable,
  ATMS_filterFunctionHandler,
  useTableFilter,
} from '../../components'

const { Search } = Input

const ATMS_TicketsPage = () => {
  const [responseData, setResponseData] = useState<Array<object>>()
  const [deptStatusPriority, setDeptStatusPriority] = useState<any>()
  const [filteredSearchedData, setFilteredSearchedData] =
    useState<Array<object>>()
  const [searchedValue, setSearchedValue] = useState<any>()
  const [fetchStatus, setFetchStatus] = useState<fetchStatusDataType>({
    isLoading: false,
    loadingFailed: false,
  })
  const [mainFilteredData, setMainFilteredData] = useState<any>()
  const [selectedFilterDropdown, setSelectedFilterDropdown] = useState<any>({
    selectedKind: { array: [], type: 'status' },
    selectedDepartment: { array: [], type: 'departmentCode' },
    selectedStatus: { array: [], type: 'status' },
    selectedPriority: { array: [], type: 'priority' },
  })
  const [mainSearchFilteredData, setMainSearchFilteredData] = useState<any>()
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = () => {
    api['success']({
      message: 'Copied link to clipboard !',
    })
  }
  const [mainTableColumnOptions, setMainTableColumnOptions] = useState<
    ColumnsType<ticketDataStructure>
  >([
    {
      title: 'Ticket - Id',
      dataIndex: 'ticketId',
      key: 'ticketId',
      render: (text) =>
        text.includes(searchedValue) ? (
          <>
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchedValue]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
            <LinkOutlined
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/ticket/${text}`
                )
                openNotificationWithIcon()
              }}
              style={{ marginLeft: '10px', fontSize: '1rem' }}
            />
          </>
        ) : (
          <>
            <p
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              {text}
            </p>
            <LinkOutlined
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/ticket/${text}`
                )
                openNotificationWithIcon()
              }}
              style={{ marginLeft: '10px', fontSize: '1rem' }}
            />
          </>
        ),
    },
    {
      title: 'Created At',
      dataIndex: 'postedTimeEpoch',
      key: 'postedTimeEpoch',
      render: (text: any) => (
        <p>{moment(Number(text)).format('Do MMM, YYYY h:mm A') ?? ' -'}</p>
      ),
    },
    {
      title: 'Issue Category',
      dataIndex: 'key_issue',
      key: 'key_issue',
    },
    {
      title: 'Department',
      dataIndex: 'departmentCode',
      key: 'departmentCode',
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
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ])

  useEffect(() => {
    setFetchStatus((prev: fetchStatusDataType) => ({
      ...prev,
      isLoading: true,
    }))
    const getTicketData = async () => {
      const allTicketResponse = await getAllTickets()
      if (allTicketResponse.status >= 200 && allTicketResponse.status < 300) {
        console.log(allTicketResponse.data)
        setFetchStatus((prev: fetchStatusDataType) => ({
          ...prev,
          isLoading: false,
        }))
      } else {
        setFetchStatus((prev: fetchStatusDataType) => ({
          ...prev,
          loadingFailed: true,
          isLoading: false,
        }))
      }
      // allTicketResponse.data.sort(
      //   (ticket1: ticketDataStructure, ticket2: ticketDataStructure) =>
      //     ticket1.postedTimeEpoch < ticket2.postedTimeEpoch
      //       ? 1
      //       : ticket1.postedTimeEpoch > ticket2.postedTimeEpoch
      //       ? -1
      //       : 0
      // )
      setResponseData(allTicketResponse.data)
    }
    const getDeptStatusPriority = async () => {
      const DeptStatusPriorityData = await getIssuesDepartmentPriorityStatusAPI(
        'issuerelated'
      )
      if (DeptStatusPriorityData.status >= 200) {
        setDeptStatusPriority(DeptStatusPriorityData.data)
      }
    }
    getTicketData()
    getDeptStatusPriority()
  }, [])

  const filteredTableData = useTableFilter(responseData, selectedFilterDropdown)

  useEffect(() => {
    if (filteredTableData[2]) {
      setMainFilteredData(filteredTableData[0])
    } else {
      setMainFilteredData(responseData)
    }
  }, [responseData, filteredTableData])

  useEffect(() => {
    if (mainFilteredData) {
      if (searchedValue) {
        let result = ATMS_filterFunctionHandler(mainFilteredData, searchedValue)
        if (result) {
          setMainSearchFilteredData(result)
        }
      } else {
        setMainSearchFilteredData(null)
      }
    }
  }, [searchedValue])

  return (
    <div>
      {fetchStatus.isLoading && (
        <div style={{ textAlign: 'center', marginTop: '10rem' }}>
          <Spin style={{ justifyContent: 'center' }} tip="Loading..."></Spin>
        </div>
      )}
      {fetchStatus.loadingFailed && (
        <div style={{ textAlign: 'center', marginTop: '7rem' }}>
          <strong>
            Something Went Wrong <br />
            Please Come back later
          </strong>
        </div>
      )}
      {responseData && (
        <>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '10px',
            }}
          >
            <ATMS_TicketspageHeaderSmartSearch
              searchedValue={searchedValue}
              setSearchedValue={setSearchedValue}
            />
          </div>
          <div
            style={{
              textAlign: 'right',
              marginRight: '20px',
              marginBottom: '10px',
            }}
          >
            <ATMS_TicketsPageHeaderAddTicket />
          </div>
          <div className="atms-tickets-page-layout-header-select-container">
            <ATMS_TicketsPageHeaderRowFilter
              selectedFilterDropdown={selectedFilterDropdown}
              setSelectedFilterDropdown={setSelectedFilterDropdown}
              deptStatusPriority={deptStatusPriority}
            />
            <ATMS_TicketsPageHeaderColumnFilter
              mainTableColumnOptions={mainTableColumnOptions}
              setMainTableColumnOptions={setMainTableColumnOptions}
              searchedValue={searchedValue}
            />
          </div>

          <ATMS_TicketPageTable
            tableData={
              mainSearchFilteredData ? mainSearchFilteredData : mainFilteredData
            }
            setTableData={setResponseData}
            mainTableColumnOptions={mainTableColumnOptions}
            setMainTableColumnOptions={setMainTableColumnOptions}
          />
        </>
      )}
    </div>
  )
}

export default ATMS_TicketsPage
