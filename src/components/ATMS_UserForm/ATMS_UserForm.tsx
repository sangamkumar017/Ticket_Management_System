import React, { useCallback, useEffect, useState } from 'react'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Upload } from 'antd'

import { ATMS_InputField } from './ATMS_InputField/ATMS_InputField'
import IssueList from './ATMS_IssueList/ATMS_IssueList'

import ConfirmDataModal from '../UI/Modal/ConfirmDataModal'
import './ATMS_UserForm.css'
import { getUploadURlSecureDownload, uploadFileApi } from '../../actions-second'
import { putFileToS3 } from '../../actions'

const { TextArea } = Input

const ATMS_UserForm: React.FC = () => {
  const [requiredDesc, setRequiresDesc] = useState<boolean>(false)
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false)
  const [formValues, setFormValues] = useState<any>()
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<any>('')
  const [uploadDocumentsDatas, setUploadDocumentsDatas] = useState<any>()
  const [fileList, setFileList] = useState<any>([])
  const [documentUploadedPath, setDocumentUploadedPath] = useState<any>()

  const finishHandler = useCallback((values: any) => {
    setFormValues(values)
    setShowConfirmationModal(true)
  }, [])

  const [form] = Form.useForm()

  const uploadImageSecureDownloadHandler = (fileUploaded: any) => {
    console.log(fileUploaded)
    if (fileUploaded.file.type) {
      const payload = {
        details: {
          userId: 'reporting-module-user',
          fileCategory: 'issue-attachment',
        },
      }
      setFileList(fileUploaded.file)
      getUploadURlSecureDownload(fileUploaded.file.type, payload).then(
        (res) => {
          setUploadDocumentsDatas(res.data)
        }
      )
    }
  }
  const handlePreview = (file: any) => {
    setPreviewVisible(true)
    setPreviewImage(file.url || file.thumbUrl)
  }
  const handlePreviewCancel = () => {
    setPreviewVisible(false)
  }

  // useEffect(() => {
  //   if (uploadDocumentsDatas?.uploadURL) {
  //     const uploadingActualFile = uploadFileApi(
  //       uploadDocumentsDatas.uploadURL,
  //       fileList
  //     )
  //     console.log(uploadingActualFile)
  //   }
  // }, [uploadDocumentsDatas])

  console.log(uploadDocumentsDatas)

  const customRequestHandler = async (event: any) => {
    const { file } = event
    // console.log(file)
    const putS3LinkResp = await getUploadURlSecureDownload(file.type, {
      details: {
        userId: 'reporting-module-user',
        fileCategory: 'issue-attachment',
      },
    })
    console.log(putS3LinkResp.data)
    const putS3Link = putS3LinkResp.data.uploadURL

    console.log(putS3Link)
    if (putS3Link) {
      console.log(file)
      // const uploadActualImage = await axios.post(putS3Link, file)
      const uploadActualImage = await putFileToS3(putS3Link, file, file.type)
      // const uploadActualImage = await axios.put(parsedLink, file)
      console.log(uploadActualImage)
    }
    setDocumentUploadedPath(putS3LinkResp.data.docPath)
  }

  console.log(documentUploadedPath)

  return (
    <div>
      <Form
        form={form}
        onFinish={finishHandler}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <ATMS_InputField
          label="Phone Number"
          name="phone_number"
          require={true}
        />
        <ATMS_InputField label="Email" name="email" require={true} />

        <IssueList require={requiredDesc} setRequiresDesc={setRequiresDesc} />

        <Form.Item
          name="description"
          label={`Description ${requiredDesc ? '' : '(Optional)'}`}
          rules={[
            { required: requiredDesc, message: `Please Enter Description !` },
          ]}
          style={{ marginTop: '3%' }}
          labelCol={{}}
          wrapperCol={{ span: 16 }}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '50%',
          }}
          labelCol={{}}
          wrapperCol={{}}
        >
          <Upload
            // action="/upload.do"
            listType="picture-card"
            // onChange={uploadImageSecureDownloadHandler}
            customRequest={customRequestHandler}
            onPreview={handlePreview}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
          {/* <Upload
            beforeUpload={handleImageUpload}
            onRemove={handleImageRemove}
            fileList={fileList}
            // listType="picture-card"
            onPreview={handlePreview}
            onChange={uploadImageSecureDownloadHandler}
          >
            {fileList.length === 0 ? (
              <div>

                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            ) : (
              fileList.url
            )}
          </Upload> */}
        </Form.Item>
        <Modal
          open={previewVisible}
          footer={null}
          onCancel={handlePreviewCancel}
        >
          <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Form.Item
          className="button"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      {
        <ConfirmDataModal
          formValues={formValues}
          showConfirmationModal={showConfirmationModal}
          setShowConfirmationModal={setShowConfirmationModal}
          form={form}
        />
      }
    </div>
  )
}

export default ATMS_UserForm
