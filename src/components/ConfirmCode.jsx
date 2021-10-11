import React, { useState, useEffect, useRef } from 'react'
import ReactCodeInput from 'react-verification-code-input'
import { sendCode, sendSMS } from '../api/api'

const ConfirmCode = ({
  type = 'text',
  fieldWidth = 38,
  fieldHeight = 44,
  fields = 6,
  autoFocus = true,
  setAuthStage,
  verificationCode,
  setVerificationCode,
  logoSrc,
  colors,
  setStatus,
  setSid,
}) => {
  const [form, setForm] = useState('code')
  const [error, setError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  // const [resendSeconds, ] = useState(10);
  const [isResend, setIsResend] = useState(false)
  const input = useRef()
  const href = localStorage.getItem('href')
  let isExist = JSON.parse(localStorage.getItem('isExist'))
  const isPhoneNumber = href?.[0] === '+' ? true : false

  let messenger = localStorage.getItem('messenger')

  const handleChange = (vals) => {
    setVerificationCode(vals)
  }

  const handleComplete = () => {
    setVerificationCode((prev) => prev.toUpperCase())
  }

  const setResetPhoneTime = () => {
    setIsResend(false)
    setTimeout(() => {
      setIsResend(true)
    }, 30000)
  }

  const resendCodeOnPhone = async () => {
    const response = await sendSMS({
      phone_number: messenger,
    })
      .then((res) => res?.data)
      .catch((err) => {
        setPhoneError(true)
        return err
      })
    const { type } = response
    if (type && type === 'success') {
      setResetPhoneTime()
      setPhoneError(false)
    }
  }

  const submitVerificationCode = async (event) => {
    event.preventDefault()
    let isComplete = verificationCode.length === fields
    if (isComplete) {
      let response = await sendCode({ auth_code_from_user: verificationCode })
        .then((res) => res?.data)
        .catch((err) => err)

      const { type, user_status, sid } = response

      if (type === 'success') {
        setError(false)

        if (user_status === 0) {
          // a new user
          setStatus(user_status)
          setSid(sid)
          setAuthStage(2)
        } else if (user_status === 1) {
          // already has an account
          setStatus(user_status)
          setSid(sid)
          setAuthStage(2)
        } else if (user_status === 2) {
          // is blocked
          setError(
            'You cannot use this service. Go to sumraid.com for identification and get Sumra ID.'
          )
        }
        // setSid(response.data.sid)
        // setAuthStage(2);
      } else {
        setError('Code is not valid')
      }
    }
  }

  const handleNo = () => {
    window.location.reload()
    localStorage.removeItem('isExist')
  }

  const handleYes = async () => {
    const response = await sendSMS({
      phone_number: messenger,
    })
      .then((res) => res?.data)
      .catch((err) => {
        setPhoneError(true)
        return err
      })
    const { type } = response
    if (type && type === 'success') {
      setForm('code')
    }
  }

  useEffect(() => {
    if (isExist === true) setForm('phone')

    if (isPhoneNumber) {
      setResetPhoneTime()
    }
  }, [])

  return (
    <>
      {form === 'code' ? (
        <div className='confirm-form'>
          {logoSrc && (
            <div className='confirm-form__logo'>
              <img src={logoSrc} alt='logo' />
            </div>
          )}
          <div className='confirm-form__verify-box'>
            <h1 className='confirm-form__verify-title '>Verify Account!</h1>

            <form>
              <div className='confirm-form__verify-text '>
                Enter 6 digit verification code we have sent to &nbsp;
                {isPhoneNumber ? (
                  <div>{messenger}</div>
                ) : (
                  <a target='_blank' rel='noreferrer' href={href}>
                    {messenger}
                  </a>
                )}
              </div>

              <ReactCodeInput
                className='sumra-react-code-input'
                ref={input}
                type={type}
                fieldWidth={fieldWidth}
                fieldHeight={fieldHeight}
                onChange={handleChange}
                onComplete={handleComplete}
              />
              {isPhoneNumber && (
                <div>
                  <span className='confirm-form__verify-didntreceive'>
                    Didn't receive our code?
                  </span>
                  <div>
                    <span
                      onClick={
                        !isResend
                          ? () => console.log('RESEND CODE DISABLED')
                          : () => resendCodeOnPhone()
                      }
                      style={{ color: !isResend ? 'black' : '#377DFF' }}
                      className='confirm-form__verify-resend'>
                      Resend Code
                    </span>
                  </div>
                </div>
              )}

              <button
                style={{
                  background: colors
                    ? colors?.buttonBackground
                    : 'linear-gradient(270deg, #EDA416 0%, #E97819 100%)',
                }}
                className={`sumra-Button ${
                  verificationCode.length === fields
                    ? 'sumra-Button-valid'
                    : 'sumra-Button-notvalid'
                }`}
                onClick={(e) => submitVerificationCode(e)}>
                <span>Continue</span>
              </button>
            </form>
            {error && <div className='confirm-form__error'>{error}</div>}
          </div>
          <div className='confirm-form__terms-privacy'>
            By using either Sign Up or Login you agree to our <br />
            <a href='#'>Terms & Privacy Policy.</a>
          </div>
        </div>
      ) : (
        <div className='confirm-form'>
          {logoSrc && (
            <div className='confirm-form__logo'>
              <img src={logoSrc} alt='logo' />
            </div>
          )}
          <div className='confirm-form__verify-box'>
            <h1 className='confirm-form__verify-title '>Confirmation</h1>

            <div>
              <div className='confirm-form__verify-text'>
                Confirm your phone number &nbsp;
                <div className='confirm-form__phone-confirm'>{messenger}</div>
              </div>
              {phoneError && (
                <div className='login-form__phone-error'>
                  Wrong a phone number
                </div>
              )}
              <div className='confirm-form__buttons-phone'>
                <button
                  className={`confirm-form__btn-phone confirm-form__btn-phone--no`}
                  onClick={() => handleNo()}>
                  No
                </button>
                <button
                  style={{
                    background: colors
                      ? colors?.buttonBackground
                      : 'linear-gradient(90deg, rgba(2, 194, 255, 0.5) 0%, rgba(14, 106, 227, 0.5) 101.97%), linear-gradient(0deg, #0376DA, #0376DA)',
                  }}
                  className={`confirm-form__btn-phone confirm-form__btn-phone--yes`}
                  onClick={() => handleYes()}>
                  Yes
                </button>
              </div>
            </div>
          </div>
          <div className='confirm-form__terms-privacy'>
            By using either Sign Up or Login you agree to our <br />
            <a href='#'>Terms & Privacy Policy.</a>
          </div>
        </div>
      )}
    </>
  )
}

export default ConfirmCode
