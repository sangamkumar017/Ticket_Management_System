import { Button, Form, Input, Modal } from 'antd'
import './ATMS_LoginModal.css'

const ATMS_LoginModal: React.FC<any> = ({ modalStatus, setModalStatus }) => {
  const onFinish = (values: any) => {
    setModalStatus((prevModalStatus: any) => {
      return { ...prevModalStatus, loginOpen: false }
    })
    localStorage.setItem(
      'userAttributes',
      JSON.stringify({
        accessLevel: [],
        first_name: 'Koushik',
        last_name: 'H R',
        userType: ['USER', 'ADMIN', 'DEV'],
        phone_number: '9353980635',
        email: values.email,
      })
    )
    setModalStatus((prevModalStatus: any) => {
      return { ...prevModalStatus, isLoggedIn: true }
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const handleOk = () => {
    setModalStatus((prevModalStatus: any) => {
      return { ...prevModalStatus, loginOpen: false }
    })
  }

  const handleCancel = () => {
    setModalStatus((prevModalStatus: any) => {
      return { ...prevModalStatus, loginOpen: false }
    })
  }
  return (
    <>
      <Modal
        open={modalStatus.loginOpen}
        title="Login Form"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            className="atms-login-modal-cancel-button"
            onClick={handleCancel}
          >
            Return
          </Button>,
          <Button
            type="primary"
            form="AIM-login-form"
            key="submit"
            htmlType="submit"
            className="atms-login-modal-submit-button"
          >
            Submit
          </Button>,
        ]}
        closable={false}
        maskClosable={false}
      >
        <Form
          className="AIM-login-form"
          id="AIM-login-form"
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <img
            src="https://media.licdn.com/dms/image/C4E0BAQHDrBj0ETLcqw/company-logo_200_200/0/1632230044076?e=2147483647&v=beta&t=xxzmxWUyUsMpxe-W2ZSlOH769DM46qmHImHS578A7mw"
            alt="Adroit Vantage"
            style={{ width: 60, marginLeft: '50%' }}
          />
          <Form.Item
            label="E - Mail"
            name="email"
            rules={[{ required: true, message: 'Please input your E - Mail!' }]}
          >
            <Input className="atms-login-modal-input-field" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password className="atms-login-modal-input-field" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ATMS_LoginModal
