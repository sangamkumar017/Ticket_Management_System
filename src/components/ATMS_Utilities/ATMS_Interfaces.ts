export interface ticketDataStructure {
  email: string
  'other catogery': boolean
  phone_number: string
  ticketId: string
  upload?: string
  key_issue?: Array<string>
  priority?: any
  departmentCode?: any
  postedTimeEpoch?: any
  description: string
  category?: any
  ticketStatus?: any
  status?: any
  note?: any
}

export interface fetchStatusDataType {
  isLoading: boolean
  loadingFailed: boolean
}

export interface allTicketDataType {
  tableData: any
  setTableData: React.Dispatch<React.SetStateAction<object[] | undefined>>
  searchedValue?: any
  mainTableColumnOptions: any
  setMainTableColumnOptions: any
}

export interface modalPreviewDataType {
  tableData: Array<ticketDataStructure>
  selectedRowIndex: number
  searchedValue: string
}

export interface ticketDetailPageDataType {
  ticketDetails: ticketDataStructure
  handlePriority: (value: any, option: any) => void
  handleDepartment: (value: any, option: any) => void
  handleStatus: (value: any, option: any) => void
  handleNoteEdit: any
  privileges: any
  deptPriorityStatus?: any
}
