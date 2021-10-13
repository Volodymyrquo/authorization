import React, { useState, useEffect } from 'react'
import {
  loginByCodeAndUsername,
  createInviteCode,
  sendUsername,
  getAuthorizationData,
  se,
} from '../api/api'
import Url from 'url-parse'
import checkIcon from '../assets/images/check.svg'

const CreateUser = ({
  verificationCode,
  goSuccess,
  logoSrc,
  colors,
  status,
  sid,
  getPath,
  setIsLogIn = () => console.log('SET IS LOGIN'),
}) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')

  const timerID = null
  let urlObj = Url(window.location.href)

  const changeInput = (e) => {
    const value = e.currentTarget.value

    setUsername(value)

    if (timerID) {
      clearTimeout(timerID)
    }
  }

  useEffect(() => {}, [urlObj])

  const submitUserForm = async (event) => {
    event.preventDefault()

    if (username.length < 5) return

    let oneStepResponse = await sendUsername({
      username,
      sid,
    })
      .then((res) => res?.data)
      .catch((err) => err)

    const { type, token_chat, user_status, token_api, user_id } =
      oneStepResponse
    const oneStepUserId = user_id

    if (type === 'success') {
      /*  localStorage.setItem("access_token", token);
            // localStorage.setItem("access_token", response.data?.data['access_token']);
            localStorage.setItem("username", username);
            // sending REF-CODE AND REF-LINK to localStorage

            if(urlObj?.query !== "" || urlObj?.hash !== "" ){
                // request for a user that has referrer link
                await createInviteCode(111, 'DF4DSA').then(({data}) => {
                    localStorage.setItem('referrals', JSON.stringify({code:data.data.code, link:data.data.link}))
                }).catch(error => console.log(error.response));
            } else {
                // request for a user that hasn't referrer link
                await createInviteCode(111).then(({data}) => {
                    localStorage.setItem('referrals', JSON.stringify({code:data.data.code, link:data.data.link}))
                }).catch(error => console.log(error.response))
            }
            // redirect after successs
            setIsLogIn(true)
            // location.href = `/`;
            goSuccess();
            localStorage.removeItem("onestep-auth-refresh"); */
      const response = await getAuthorizationData(token_chat)
      const { user_id, access_token, device_id } = response
      localStorage.setItem('mx_hs_url', 'https://syn.sumrachat.com/')
      localStorage.setItem('mx_is_url', 'https://syn.sumrachat.com/')
      localStorage.setItem('mx_device_id', device_id)
      localStorage.setItem('mx_user_id', user_id)
      localStorage.setItem('mx_access_token', access_token)
      localStorage.setItem('mx_crypto_initialised', true)
      localStorage.setItem('sumra_token', token_chat)
      localStorage.setItem('user_id', oneStepUserId)
      localStorage.setItem('token_api', token_api)

      localStorage.setItem('username', username)
      console.log(`####token_api####   ${token_api}`)
      console.log(`####user_id####   ${user_id}`)
      console.log(`####user_status####   ${user_status}`)
      getPath('/home')
      setTimeout(() => window.location.reload(), 100)
      localStorage.removeItem('onestep-auth-refresh')
    } else {
      if (user_status === 0) {
        // a new user
        setErrorMessage('This username already exists')
      } else {
        // already has an account
        setErrorMessage('Enter your username')
      }
    }
  }

  return (
    <div className='createuser-form'>
      {logoSrc && (
        <div className='sumra-auth-form-logo'>
          <img src={logoSrc} alt='logo' />
        </div>
      )}
      <div className='createuser-form__username-box'>
        <h1 className='createuser-form__username-title'>
          {status === 0 ? `Create Username` : `Enter your Username`}
        </h1>
        <div className='createuser-form__username-text'>
          {status === 0
            ? `Please provide the following details for your new account`
            : `Please provide the following details for your account`}
        </div>
        <form>
          <fieldset className={'sumra-input-fieldset'}>
            <input
              type='text'
              placeholder='Enter username'
              onChange={(e) => changeInput(e)}
            />

            {username.length > 4 && !errorMessage && (
              <img
                className='sumra-input-icon-wrap'
                src={checkIcon}
                width='22'
              />
            )}
          </fieldset>

          {errorMessage && (
            <div className='sumra-input-message error'>{errorMessage}</div>
          )}
          <button
            style={{
              background: colors
                ? colors?.buttonBackground
                : 'linear-gradient(270deg, #EDA416 0%, #E97819 100%)',
            }}
            className={`sumra-Button ${
              !errorMessage && username.length > 4
                ? 'sumra-Button-valid'
                : 'sumra-Button-notvalid'
            }`}
            onClick={(e) => submitUserForm(e)}>
            <span>Log In</span>
          </button>
        </form>
      </div>
      <div className='createuser-form__terms-privacy'>
        By using either Sign Up or Login you agree to our <br />
        <a href='#'>Terms & Privacy Policy.</a>
      </div>
    </div>
  )
}

export default CreateUser
