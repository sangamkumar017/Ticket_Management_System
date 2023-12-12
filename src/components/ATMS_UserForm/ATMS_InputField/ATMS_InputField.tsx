import React from 'react'
import { Form, Input } from 'antd'
import './ATMS_InputField.css'

interface InputFieldProps {
  label?: string
  name: string
  require: boolean
  placeholder?: string
  labelColSpan?: any
}

export const ATMS_InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      rules={[
        {
          required: props.require,
          message: `Please Enter your ${props.label} !`,
        },
      ]}
      style={{ display: 'inline-block', width: '50%' }}
      labelCol={{ span: props.labelColSpan }}
      wrapperCol={{ span: 16 }}
    >
      <Input
        className="user-data"
        placeholder={props.placeholder ? props.placeholder : ''}
      />
    </Form.Item>
  )
}
