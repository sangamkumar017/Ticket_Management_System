import { useState } from 'react'
import { Button, Modal } from 'antd'

import './ModalFaq.css'

interface propType {
  selectedOption: any
  modalState: boolean
}

const ModalFaq: React.FC<propType> = ({ selectedOption, modalState }) => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const showModal = () => {
    // setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="main-faq">
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>See FAQ's related to {selectedOption.label}</p>
      </Modal>
    </div>
  )
}

export default ModalFaq
