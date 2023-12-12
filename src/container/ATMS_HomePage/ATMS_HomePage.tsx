import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ATMS_SideBar from '../ATMS_SideBar/ATMS_SideBar'

const ATMS_HomePage: React.FC<any> = () => {
  const [userTypeLocalStorage, setUserTypeLocalStorage] = useState<any>()
  const navigate = useNavigate()

  let userAttributes = localStorage.getItem('userAttributes')
  useEffect(() => {
    if (userAttributes) {
      setUserTypeLocalStorage(JSON.parse(userAttributes))
    } else {
      navigate('/')
    }
  }, [])

  return (
    <>
      {userTypeLocalStorage && (
        <ATMS_SideBar userTypeLocalStorage={userTypeLocalStorage} />
      )}
    </>
  )
}

export default ATMS_HomePage
