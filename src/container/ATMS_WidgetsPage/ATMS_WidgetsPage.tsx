import React, { useState, useEffect } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import './ATMS_WidgetsPage.css'
import {
  Button,
  Checkbox,
  ConfigProvider,
  Radio,
  RadioChangeEvent,
  Select,
  notification,
} from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import ATMS_TicketDetailsEmbed from '../ATMS_TicketDetailsEmbed/ATMS_TicketDetailsEmbed'
import ATMS_AddTicketEmbed from '../ATMS_AddTicketEmbed/ATMS_AddTicketEmbed'

const presets = [
  { label: 'Default', value: 'default' },
  { label: 'Large', value: 'large' },
  { label: 'Medium', value: 'medium' },
  { label: 'Small', value: 'small' },
]

const ATMS_WidgetsPage = () => {
  const [api, contextHolder] = notification.useNotification()
  const [sizePresets, setSizePresets] = useState<any>('default')
  const [settings, setSettings] = useState<any>({
    primaryColor: '9254de',
    secondaryColor: 'b37feb',
    size: 'default',
    addTicket: true,
  })
  const [settings2, setSettings2] = useState<any>({
    primaryColor: '9254de',
    secondaryColor: 'b37feb',
  })
  let codeString: string = `<!DOCTYPE html>
    <html>
      <body>
        <div
          style="height: 100vh; width: 100%; text-align: center"
          id="content"
        ></div>
    
        <script
          src="http://localhost:3000/embed.js"
          type="application/javascript"
        ></script>
    
        <script type="application/javascript">
          let embedableElement = AVRComponentEmbed ({
            id: "ticket-details",
            primaryColor: "${settings.primaryColor}",
            secondaryColor: "${settings.secondaryColor}",
            size: "${settings.size}",
            addTicket: ${settings.addTicket},
          });
          const content = document.getElementById("content");
    
          content.appendChild(embedableElement);
        </script>
      </body>
    </html>
    `

  let codeString2: string = `<!DOCTYPE html>
    <html>
      <body>
        <div
          style="height: 100vh; width: 100%; text-align: center"
          id="content"
        ></div>
    
        <script
          src="http://localhost:3000/embed.js"
          type="application/javascript"
        ></script>
    
        <script type="application/javascript">
          let embedableElement = AVRComponentEmbed ({
            id: "add-ticket",
            primaryColor: "${settings2.primaryColor}",
            secondaryColor: "${settings2.secondaryColor}",
          });
          const content = document.getElementById("content");
    
          content.appendChild(embedableElement);
        </script>
      </body>
    </html>
    `

  const openNotificationWithIcon = () => {
    api['success']({
      message: 'Copied Code to Clipboard !',
    })
  }

  const copyToClipBoardHandler = () => {
    navigator.clipboard.writeText(`${codeString}`)
    openNotificationWithIcon()
  }

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    const colors = value.value.split(':')
    setSettings((prevSettings: any) => {
      return {
        ...prevSettings,
        primaryColor: colors[0],
        secondaryColor: colors[1],
      }
    })
  }

  const handleChange2 = (value: { value: string; label: React.ReactNode }) => {
    const colors2 = value.value.split(':')
    setSettings2((prevSettings2: any) => {
      return {
        ...prevSettings2,
        primaryColor: colors2[0],
        secondaryColor: colors2[1],
      }
    })
  }

  const sizeChangeHandler = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio4 checked', value)
    setSettings((prevSettings: any) => {
      return {
        ...prevSettings,
        size: value,
      }
    })
    setSizePresets(value)
  }
  const checkboxChangeHandler = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`)
    setSettings((prevValues: any) => {
      return {
        ...prevValues,
        addTicket: e.target.checked,
      }
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const button = document.getElementById('floating-button')

      // Adjust the button's position based on the scroll
      if (button?.style) {
        if (window.pageYOffset > 0) {
          button.style.position = 'fixed'
          button.style.top = '10px'
        } else {
          button.style.position = 'relative'
          button.style.top = 'auto'
        }
      }
    }

    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Reporting Module Widgets</h1>
        <p>Here are the widgets that can be embedded anywhere</p>
        <hr />
      </div>

      <h3 style={{ textAlign: 'center' }}>
        <u>Embedable Component for Ticket Detail</u>
      </h3>

      <div className="atms-widgets-page-embedable-component-container">
        <div className="atms-widgets-page-embedable-component-demo-container">
          <ATMS_TicketDetailsEmbed />
        </div>

        <div className="atms-widgets-page-code-and-settings-container">
          <div className="atms-widgets-page-code-container">
            <SyntaxHighlighter language="javascript" style={docco}>
              {codeString}
            </SyntaxHighlighter>

            <Button
              id="floating-button"
              type="primary"
              icon={<CopyOutlined />}
              onClick={copyToClipBoardHandler}
              style={{ float: 'right', backgroundColor: '#219161' }}
            >
              Copy
            </Button>
          </div>
          {contextHolder}

          <div className="atms-widgets-page-code-editor-container">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#9254de',
                  colorPrimaryHover: '#b37feb',
                  colorBgContainer: '#F9FAFA',
                },
              }}
            >
              <p>
                Color
                <span className="atms-widgets-page-code-editor-span">
                  <Select
                    labelInValue
                    defaultValue={{ value: '9254de:b37feb', label: 'Purple' }}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                      {
                        value: '9254de:b37feb',
                        label: 'Purple',
                      },
                      {
                        value: '597ef7:85a5ff',
                        label: 'Geek Blue',
                      },
                      {
                        value: '73d13d:95de64',
                        label: 'Green',
                      },
                      {
                        value: 'ffa940:ffc069',
                        label: 'Orange',
                      },
                      {
                        value: 'ff4d4f:ff7875',
                        label: 'Red',
                      },
                      {
                        value: 'f759ab:ff85c0',
                        label: 'Magenta',
                      },
                    ]}
                  />
                </span>
              </p>
              <p>
                Size
                <span className="atms-widgets-page-code-editor-span">
                  <Radio.Group
                    options={presets}
                    onChange={sizeChangeHandler}
                    value={sizePresets}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </span>
              </p>

              <p>
                Add Ticket
                <span className="atms-widgets-page-code-editor-span">
                  <Checkbox
                    defaultChecked={settings.addTicket}
                    onChange={checkboxChangeHandler}
                  ></Checkbox>
                </span>
              </p>
            </ConfigProvider>
          </div>
        </div>
      </div>

      <hr />
      <h3 style={{ textAlign: 'center' }}>
        <u>Embedable Component for Add Ticket</u>
      </h3>

      <div className="atms-widgets-page-embedable-component-demo-container-2">
        <ATMS_AddTicketEmbed />
      </div>

      <div className="atms-widgets-page-code-and-settings-container">
        <div className="atms-widgets-page-code-container">
          <SyntaxHighlighter language="javascript" style={docco}>
            {codeString2}
          </SyntaxHighlighter>
          <Button
            type="primary"
            icon={<CopyOutlined />}
            onClick={copyToClipBoardHandler}
            style={{ float: 'right', backgroundColor: '#219161' }}
          />
        </div>
        <div className="atms-widgets-page-code-editor-container">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#9254de',
                colorPrimaryHover: '#b37feb',
                colorBgContainer: '#F9FAFA',
              },
            }}
          >
            <p>
              Color
              <span className="atms-widgets-page-code-editor-span">
                <Select
                  labelInValue
                  defaultValue={{ value: '9254de:b37feb', label: 'Purple' }}
                  style={{ width: 120 }}
                  onChange={handleChange2}
                  options={[
                    {
                      value: '9254de:b37feb',
                      label: 'Purple',
                    },
                    {
                      value: '597ef7:85a5ff',
                      label: 'Geek Blue',
                    },
                    {
                      value: '73d13d:95de64',
                      label: 'Green',
                    },
                    {
                      value: 'ffa940:ffc069',
                      label: 'Orange',
                    },
                    {
                      value: 'ff4d4f:ff7875',
                      label: 'Red',
                    },
                    {
                      value: 'f759ab:ff85c0',
                      label: 'Magenta',
                    },
                  ]}
                />
              </span>
            </p>
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}

export default ATMS_WidgetsPage
