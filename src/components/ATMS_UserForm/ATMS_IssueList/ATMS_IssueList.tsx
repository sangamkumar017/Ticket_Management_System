import React, { useEffect, useState } from 'react'
import { Button, Cascader, Form, Divider } from 'antd'
import ModalFaq from '../../UI/Modal/ModalFaq'

import './ATMS_IssueList.css'
import { getIssuesDepartmentPriorityStatusAPI } from '../../../actions'

interface propType {
  require: boolean
  setRequiresDesc: any
}

interface modalPropType {
  modalState: boolean
  selectedOption: any
}

const ATMS_IssueList: React.FC<propType> = (props) => {
  const [modalItem, setModalItem] = useState<modalPropType>({
    modalState: false,
    selectedOption: '',
  })
  const [issuesList, setIssuesList] = useState<any>()
  const [issuesListOptionsData, setIssuesListOptionsData] = useState<any>()

  useEffect(() => {
    const getIssuesList = async () => {
      const issuesResponse = await getIssuesDepartmentPriorityStatusAPI(
        'issuerelated'
      )

      if (issuesResponse.status >= 200 && issuesResponse.status < 300) {
        const issuesLstObjKeys = Object.keys(issuesResponse.data)
        issuesLstObjKeys.forEach((issuesLstObjKey: any) => {
          if (issuesLstObjKey === 'issuesList') {
            setIssuesList(issuesResponse.data[issuesLstObjKey])
          }
        })
      }
    }
    getIssuesList()
  }, [])

  const modalHandler = (value: any, selectedOptions: any) => {
    try {
      if (value[1] !== '' && value[1] !== 'Others') {
        setModalItem({
          modalState: true,
          selectedOption: selectedOptions[1] ?? 'Others',
        })
        props.setRequiresDesc(false)
        if (!selectedOptions[1]) {
          props.setRequiresDesc(true)
        }
      }
      if (value[1] === 'Others') {
        setModalItem({ modalState: false, selectedOption: selectedOptions[1] })
        props.setRequiresDesc(true)
      }
    } catch {
      setModalItem({ modalState: false, selectedOption: '' })
    }
  }

  return (
    <>
      <Form.Item
        label="Issue Catogery"
        name="key_issue"
        rules={[
          {
            required: !props.require,
            message: 'Please Select Issue Catogery',
          },
        ]}
        style={{ marginTop: '2%', width: '50%' }}
        labelCol={{}}
        wrapperCol={{ span: 16 }}
      >
        <Cascader
          options={issuesList}
          onChange={modalHandler}
          expandTrigger="hover"
        />
      </Form.Item>

      {modalItem.modalState &&
        !props.require &&
        modalItem.selectedOption.label && [
          <>
            <Button type="primary" style={{ marginLeft: '10%' }}>
              FAQ's related to {modalItem.selectedOption.label ?? ''}. . .
            </Button>

            <ModalFaq
              selectedOption={modalItem.selectedOption}
              modalState={modalItem.modalState}
            />
          </>,
        ]}
    </>
  )
}

export default ATMS_IssueList
