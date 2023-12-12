import { ConfigProvider, Input } from 'antd'

const { Search } = Input

const ATMS_TicketspageHeaderSmartSearch = ({
  searchedValue,
  setSearchedValue,
}: any) => {
  const onSearch = (value: string) => {
    setSearchedValue(value)
  }
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#9254de',
            colorPrimaryHover: '#b37feb',
          },
        }}
      >
        <Search
          placeholder="Search for anything . . ."
          onSearch={onSearch}
          enterButton
          style={{
            marginBottom: '1rem',
            width: '30%',
            textAlign: 'left',
          }}
          allowClear
        />
      </ConfigProvider>
    </>
  )
}

export default ATMS_TicketspageHeaderSmartSearch
