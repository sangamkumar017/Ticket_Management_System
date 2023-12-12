import { Button } from 'antd'
import { useEffect, useState } from 'react'
import ATMS_HomePage from '../ATMS_HomePage/ATMS_HomePage'
import './ATMS_LandingPage.css'
import { ATMS_LoginModal } from '../../components'

const ATMS_LandingPage = () => {
  const [userAttributesLocal, setUserAttributesLocal] = useState<any>()

  let userAttributes = localStorage.getItem('userAttributes')
  useEffect(() => {
    if (userAttributes) {
      setUserAttributesLocal(JSON.parse(userAttributes))
    }
  }, [])

  const [modalStatus, setModalStatus] = useState({
    loginOpen: false,
    isLoggedIn: false,
    signupOpen: false,
    isSignedUp: false,
  })
  const AIM_LoginUserHandler = () => {
    setModalStatus((prevModalStatus: any) => {
      return { ...prevModalStatus, loginOpen: true }
    })
  }
  return (
    <>
      {!modalStatus.isLoggedIn && !modalStatus.isSignedUp ? (
        <>
          {!userAttributesLocal?.userType && (
            <>
              <Button
                className="atms-landing-page-login-button"
                onClick={AIM_LoginUserHandler}
                type="primary"
              >
                Login
              </Button>
              <Button>Sign Up</Button>
            </>
          )}
          <Button>Raise Ticket</Button>
          <Button>View Ticket Details</Button>
          {modalStatus.loginOpen && (
            <ATMS_LoginModal
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
            />
          )}
        </>
      ) : (
        <ATMS_HomePage />
      )}
      {userAttributesLocal?.userType && !modalStatus.isLoggedIn && (
        <Button
          onClick={() =>
            setModalStatus((prevModalState: any) => {
              return { ...prevModalState, isLoggedIn: true }
            })
          }
          type="primary"
        >
          Take Back To Home
        </Button>
      )}
    </>
  )
}

export default ATMS_LandingPage
