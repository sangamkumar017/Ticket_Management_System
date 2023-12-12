import React, { useEffect, useState } from 'react'
import { ConfigProvider, Input, Steps, notification } from 'antd'
import { getTicketDetails } from '../../actions'
import { useSearchParams } from 'react-router-dom'
import ATMS_AddTicketEmbed from '../ATMS_AddTicketEmbed/ATMS_AddTicketEmbed'

const { Search } = Input

const ATMS_TicketDetailsEmbed = () => {
  const [ticketDetails, setTicketDetails] = useState<any>(null)
  const [api, contextHolder] = notification.useNotification()
  const [searchParams, setSearchParams] = useSearchParams()
  const [settings, setSettings] = useState<any>({
    primaryColor: '#9254de',
    secondaryColor: '#b37feb !important',
    size: '80%',
    addTicket: 'true',
  })
  console.log(searchParams.get('primaryColor'))
  let primary = searchParams.get('primaryColor')
  let secondary = searchParams.get('secondaryColor')
  let add = searchParams.get('addTicket')
  useEffect(() => {
    if (primary && secondary) {
      setSettings((prevValues: any) => {
        return {
          ...prevValues,
          primaryColor: '#' + primary,
          secondaryColor: '#' + secondary + ' !important',
          addTicket: add,
        }
      })
    }

    if (add) {
      setSettings((prevValues: any) => {
        return {
          ...prevValues,
          addTicket: add,
        }
      })
    }

    let setSize = ''
    if (searchParams.get('size') === 'large') {
      setSize = '100%'
    } else if (searchParams.get('size') === 'medium') {
      setSize = '50%'
    } else if (searchParams.get('size') === 'small') {
      setSize = '25%'
    } else {
      setSize = '80%'
    }

    if (setSize) {
      setSettings((prev: any) => {
        return {
          ...prev,
          size: setSize,
        }
      })
    }
  }, [searchParams.get('primaryColor'), searchParams.get('size')])

  const getDetails = async (ticketId: string) => {
    const response = await getTicketDetails(ticketId)
    response.data ? setTicketDetails(response.data) : console.log('error')
  }

  const openNotificationWithIcon = () => {
    api['error']({
      message: 'Invalid Ticket ID',
      description: 'Ticket ID should be 36 characters',
    })
  }

  const ticketIdSearchHandler = (value: any, event: any) => {
    if (event._reactName === 'onKeyDown' || event._reactName === 'onClick') {
      if (value.length === 36) {
        getDetails(value)
      } else if (value.length !== 0) {
        openNotificationWithIcon()
      }
    }
  }

  let statusCurrent: any = {
    Open: 0,
    'In Progress': 1,
    Closed: 2,
    'Un Resolved': 3,
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorFillAlter: settings.secondaryColor,
          colorPrimary: settings.primaryColor,
          colorPrimaryHover: settings.secondaryColor,
        },
      }}
    >
      <div
        style={{
          textAlign: 'center',
          width: settings.size,
        }}
      >
        <div style={{ display: 'inline-flex', width: '80%' }}>
          <Search
            addonBefore={
              settings.size.replace('%', '') >= 50 ? 'Ticket ID' : ''
            }
            placeholder="enter ticket id"
            allowClear
            onSearch={ticketIdSearchHandler}
          />
          {settings.addTicket === 'true' && <ATMS_AddTicketEmbed />}
        </div>

        {contextHolder}
        {ticketDetails?.ticketId && (
          <div style={{ marginTop: 10 }}>
            <Steps
              direction={settings.size <= '50' ? 'vertical' : 'horizontal'}
              current={
                ticketDetails?.status && statusCurrent[ticketDetails.status]
              }
              // percent={60}
              items={[
                {
                  title: 'Open',
                  description: 'Ticket successfully raised !',
                },
                {
                  title: 'In Progress',
                  // subTitle: 'Left 00:00:08',
                  description: 'A developer has been assigned !!',
                },
                {
                  title: 'Closed',
                  description: 'Ticket resolved successfully',
                },
                {
                  title: 'Un Resolved',
                },
              ]}
            />
          </div>
        )}
      </div>
    </ConfigProvider>
  )
}

export default ATMS_TicketDetailsEmbed
