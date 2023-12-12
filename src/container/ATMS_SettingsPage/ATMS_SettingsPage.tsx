import { UserOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Modal, Row, Upload } from 'antd'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import './ATMS_SettingsPage.css'

const ATMS_SettingsPage = () => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<any>('')
  const [fileList, setFileList] = useState<any>([])
  const [userAttributes, setUserAttributes] = useState<any>()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const userAttributesLocal = localStorage.getItem('userAttributes')
  useEffect(() => {
    if (userAttributesLocal) {
      setUserAttributes(JSON.parse(userAttributesLocal))
    }
  }, [userAttributesLocal])
  const handleImageUpload = (file: any) => {
    const reader = new FileReader()
    reader.onload = () => {
      setFileList([
        ...fileList,
        { uid: file.uid, name: file.name, url: reader.result },
      ])
    }
    reader.readAsDataURL(file)
  }

  const handleImageRemove = (file: any) => {
    const updatedList = fileList.filter((item: any) => item.uid !== file.uid)
    setFileList(updatedList)
  }

  const handlePreview = (file: any) => {
    setPreviewVisible(true)
    setPreviewImage(file.url || file.thumbUrl)
  }

  const handlePreviewCancel = () => {
    setPreviewVisible(false)
  }

  const emailChangeHandler = (event: any) => {
    setUserAttributes((prev: any) => {
      return {
        ...prev,
        email: event.target.value,
      }
    })
  }
  const firstNameChangeHandler = (event: any) => {
    setUserAttributes((prev: any) => {
      return {
        ...prev,
        first_name: event.target.value,
      }
    })
  }
  const lastNameChangeHandler = (event: any) => {
    setUserAttributes((prev: any) => {
      return {
        ...prev,
        last_name: event.target.value,
      }
    })
  }
  const phoneNumberChangeHandler = (event: any) => {
    setUserAttributes((prev: any) => {
      return {
        ...prev,
        phone_number: event.target.value,
      }
    })
  }
  const submitUserSettingsHandler = () => {
    localStorage.setItem('userAttributes', JSON.stringify(userAttributes))
  }
  const logOutHandler = () => {
    localStorage.removeItem('userAttributes')
    navigate('/')
  }
  const uploadUserProfilePictureHandler = (file: any) => {
    console.log(file.file.originFileObj)
  }

  return (
    <>
      <div className="atms-settings-page-container">
        <Row>
          <Col span={24}>
            <h1 className="atms-settings-page-header">Profile Settings</h1>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Upload
              beforeUpload={handleImageUpload}
              onRemove={handleImageRemove}
              fileList={fileList}
              listType="picture-card"
              onPreview={handlePreview}
              onChange={uploadUserProfilePictureHandler}
              className="atms-settings-page-upload-image"
            >
              {fileList.length === 0 ? (
                <div>
                  <UserOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              ) : (
                fileList.url
              )}
            </Upload>
            <Modal
              open={previewVisible}
              footer={null}
              onCancel={handlePreviewCancel}
            >
              <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Col>
          <Col span={24}>
            <div className="atms-settings-page-user-details-container">
              <Input
                addonBefore="E - Mail"
                value={userAttributes?.email}
                onChange={emailChangeHandler}
              />
              <Input
                addonBefore="First Name"
                value={userAttributes?.first_name}
                onChange={firstNameChangeHandler}
              />
              <Input
                addonBefore="Last Name"
                value={userAttributes?.last_name}
                onChange={lastNameChangeHandler}
              />
              <Input
                addonBefore="Phone Number"
                value={userAttributes?.phone_number}
                onChange={phoneNumberChangeHandler}
              />
            </div>
          </Col>
        </Row>
        <div className="atms-settings-page-button-container">
          <Button
            onClick={submitUserSettingsHandler}
            type="primary"
            className="atms-settings-page-user-submit-button"
          >
            Submit Changes
          </Button>
          <Button
            className="atms-settings-page-user-logout-button"
            type="primary"
            onClick={logOutHandler}
          >
            Log Out
          </Button>
        </div>
      </div>
    </>
  )
}

export default ATMS_SettingsPage
