import React, { useState, useEffect } from 'react'
// import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isMobile } from 'react-device-detect'
// import socialLinks from './socialLinks';
// import { sendPhone } from '../../api/api';
import sendIcon from '../../assets/images/send.svg'
import { sendPhone, sendSMS } from '../../api/api'
import { Link } from 'react-router-dom'

export const LoginForm = ({
  type = '',
  logoSrc,
  goToAuthPage = () => console.log('Pass redirect method'),
  goToSumraIdPage = () => console.log('Pass redirect method'),
  // sendPhone = () => console.log("Pass api request method to send phone number"),
  socialLinks = [],
  colors,
  getPath,
}) => {
  const [countryCode, setCountryCode] = useState()
  const [number, setNumber] = useState('')
  const [phoneError, setPhoneError] = useState(false)

  const goToVeryfycationCodePage = (e) => {
    const messenger = e.target.alt
    const href = e.target.parentElement.href
    localStorage.setItem('messenger', messenger)
    localStorage.setItem('href', href)
    const referral = localStorage.getItem('referral_code_primary')
    localStorage.setItem('referral_code', referral)
    /*  getPath('/verify') */
  }

  const submitPhoneNumber = async (event) => {
    event.preventDefault()
    if (!number) return
    let code = countryCode
    let phoneNumber = code + number
    localStorage.setItem('messenger', phoneNumber)
    localStorage.setItem('href', phoneNumber)
    // phoneNumber = phoneNumber.replace("+", "");

    //     "exist": false,
    //     "type": "success"

    let response = await sendPhone({
      phone_number: phoneNumber,
    })
      .then((res) => res?.data)
      .catch((err) => {
        setPhoneError(true)
        return err
      })

    const { type, phone_exist, user_status } = response

    if (type === 'success') {
      localStorage.setItem('isExist', JSON.stringify(phone_exist))
      if (phone_exist === true) {
        goToAuthPage()
      } else {
        const res = await sendSMS({
          phone_number: phoneNumber,
        })
          .then((res) => res?.data)
          .catch((err) => {
            setPhoneError(true)
            return err
          })
        if (res?.type === 'success') {
          goToAuthPage()
        }
        goToAuthPage()
      }
    } else {
      setPhoneError(true)
    }
    // localStorage.setItem("isExist", JSON.stringify(true));

    // goToAuthPage();
  }

  useEffect(() => {
    localStorage.removeItem('confirm-refresh')
    localStorage.removeItem('create-refresh')
    localStorage.removeItem('isExist')
    const referral = window.location.pathname.slice(1)
    localStorage.setItem('referral_code_primary', referral)
  }, [])

  return (
    <>
      {type === 'app' ? (
        <form className='login-form' onSubmit={submitPhoneNumber}>
          <div className='login-form__logo'>
            <img src={logoSrc} alt='logo' />
          </div>

          <div className='login-form__wrap'>
            <h3 className='login-form__title-app'>Sign Up or Login</h3>
            <h4 className='login-form__text login-form__text-app'>
              Start by using your <span>Messenger</span>
            </h4>
            <ul className='login-form__list-messangers'>
              {socialLinks.map((v, index) => {
                let href = ''

                if (isMobile) {
                  href = v.hrefMobile
                } else {
                  href = v.href
                }

                return (
                  <Link to='/verify'>
                    <li
                      className={
                        socialLinks.length > 7
                          ? 'login-form__li-app'
                          : 'login-form__li'
                      }
                      key={index}
                      onClick={goToVeryfycationCodePage}>
                      <a href={href} target='_blank' rel='noreferrer'>
                        <img
                          src={v.image}
                          onClick={() => goToAuthPage()}
                          width={46}
                          alt={v.title}
                        />
                      </a>
                    </li>
                  </Link>
                )
              })}
            </ul>
            <div className='sumra-line'>or</div>

            <h4 className='login-form__text login-form__text-app'>
              Start by using your <span>Mobile phone</span>
            </h4>
            <div className='login-form__input-wrapper'>
              <PhoneInput
                readOnly
                international
                countryCallingCodeEditable={false}
                defaultCountry='UA'
                value={countryCode}
                onChange={(e) => {
                  setCountryCode(e)
                }}
              />

              <span></span>
              <input
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                className='login-form__input'
                placeholder={'Enter phone number'}
              />
              <button type='submit' onClick={(e) => submitPhoneNumber(e)}>
                <img alt='icon' src={sendIcon} />
              </button>
            </div>
            {phoneError && (
              <div className='login-form__phone-error'>
                Wrong a phone number
              </div>
            )}
          </div>
          <div className='sumra-line'>or</div>
          <div
            onClick={() => getPath('/login')}
            style={{
              background: colors
                ? colors?.buttonBackground
                : 'linear-gradient(90deg, rgba(2, 194, 255, 0.5) 0%, rgba(14, 106, 227, 0.5) 101.97%), linear-gradient(0deg, #0376DA, #0376DA)',
            }}
            className='login-form__button-id'>
            Login with Sumra ID
          </div>

          <div className='login-form__terms-privacy'>
            By using either Sign Up or Login you agree to our
            <br />
            <a href='#'>Terms & Privacy Policy.</a>
          </div>
        </form>
      ) : (
        <form
          className='login-form'
          onSubmit={submitPhoneNumber}
          style={{ background: '#2341A1' }}>
          <div className='login-form__wrap'>
            <h3 className='login-form__title'>Join the Waiting List</h3>
            <h4 className='login-form__text'>
              Join by using your <span>Messenger</span>
            </h4>
            <ul className='login-form__list-messangers'>
              {socialLinks.map((v, index) => {
                let href = ''

                if (isMobile) {
                  href = v.hrefMobile
                } else {
                  href = v.href
                }

                return (
                  <li
                    className={
                      socialLinks.length > 7
                        ? 'login-form__li-app'
                        : 'login-form__li'
                    }
                    key={index}
                    onClick={goToVeryfycationCodePage}>
                    <a href={href} target='_blank' rel='noreferrer'>
                      <img
                        onClick={() => goToAuthPage()}
                        src={v.image}
                        width={46}
                        alt={v.title}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
            <h4 className='login-form__text'>
              Join by using your <span>Mobile phone</span>
            </h4>
            <div className='login-form__input-wrapper'>
              <PhoneInput
                readOnly
                international
                countryCallingCodeEditable={false}
                defaultCountry='RU'
                value={countryCode}
                onChange={(e) => {
                  setCountryCode(e)
                }}
              />

              <span></span>
              <input
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                className='login-form__input'
                placeholder={'Enter phone number'}
              />
              <button type='submit'>
                <img alt='icon' src={sendIcon} />
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}
