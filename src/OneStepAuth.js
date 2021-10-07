import React, { useState, useEffect } from 'react'
import ConfirmCode from './components/ConfirmCode.jsx'
import CreateUser from './components/CreateUser.jsx'
import './assets/scss/index.scss'

export const OneStepAuth = ({
  logoSrc,
  goBack = () =>
    console.log('Pass goBack method to return back when page is refreshed'),
  goSuccess = () =>
    console.log('Pass goSuccess method to login after valid data'),
  colors,
  setIsLogIn,
  getPath,
}) => {
  const [authStage, setAuthStage] = useState(1)
  const [verificationCode, setVerificationCode] = useState('')
  const [status, setStatus] = useState(null)
  const [sid, setSid] = useState(null)

  const redirectWhenRefresh = () => {
    let onestepRefresh = localStorage.getItem('onestep-auth-refresh')

    if (!onestepRefresh) {
      localStorage.setItem('onestep-auth-refresh', JSON.stringify(true))
    }

    if (onestepRefresh) {
      localStorage.removeItem('onestep-auth-refresh')
      goBack()
    }
  }
  useEffect(() => {
    redirectWhenRefresh()
  }, [])
  return (
    <div className='confirm-page'>
      <div className='confirm-page-cont'>
        {authStage === 1 ? (
          <ConfirmCode
            colors={colors}
            logoSrc={logoSrc}
            setAuthStage={setAuthStage}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            setStatus={setStatus}
            setSid={setSid}
          />
        ) : (
          <CreateUser
            colors={colors}
            logoSrc={logoSrc}
            setAuthStage={setAuthStage}
            verificationCode={verificationCode}
            goSuccess={goSuccess}
            setIsLogIn={setIsLogIn}
            status={status}
            sid={sid}
            getPath={getPath}
          />
        )}
      </div>
    </div>
  )
}

// export default Auth;
