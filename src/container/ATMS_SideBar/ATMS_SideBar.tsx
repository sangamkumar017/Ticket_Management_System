import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { SettingOutlined, UserOutlined, TagsOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'

import type { MenuProps } from 'antd'
type MenuItem = Required<MenuProps>['items'][number]

import './ATMS_SideBar.css'

const { Sider, Content } = Layout

interface propType {
  userTypeLocalStorage: any
}

const ATMS_SideBar: React.FC<propType> = ({ userTypeLocalStorage }) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const mouseEnterHandler = () => {
    setCollapsed(false)
  }
  const mouseLeaveHandler = () => {
    setCollapsed(true)
  }

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }

  useEffect(() => {
    if (location.pathname == '/') {
      navigate('dashboard')
    }
  }, [])

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
    className?: string
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
      className,
    } as MenuItem
  }

  const items: MenuProps['items'] = [
    getItem(
      'Dashboard',
      'dashboard',
      <UserOutlined style={{ fontSize: '25px' }} />
    ),
    getItem(
      'Tickets',
      'tickets',
      <TagsOutlined style={{ fontSize: '25px' }} />
    ),
    getItem(
      'Settings',
      'settings',
      <SettingOutlined style={{ fontSize: '25px' }} />,
      undefined,
      undefined,
      'settings-nav-icon'
    ),
  ]

  return (
    <>
      <Layout style={{ backgroundColor: 'white' }}>
        <Sider
          className="sider-style"
          style={{
            overflow: 'auto',
            height: '100%auto',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 1,
          }}
          trigger={null}
          collapsible
          theme="light"
          collapsed={collapsed}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <Menu
            className="atms-main-side-bar-menu-container"
            defaultSelectedKeys={[location.pathname.replace('/', '')]}
            onClick={onClick}
            mode="inline"
            theme="light"
            // inlineCollapsed={collapsed}
            items={items}
          />
        </Sider>
        <Layout style={{ backgroundColor: 'white' }}>
          <Content
            style={{
              marginLeft: '10px',
              marginTop: '10px',
              marginRight: '10px',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default ATMS_SideBar
