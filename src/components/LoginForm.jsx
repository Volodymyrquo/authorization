import React, {useState, useEffect } from 'react';
import  '../assets/scss/index.scss';
// import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isMobile } from "react-device-detect";
// import socialLinks from './socialLinks';
// import { sendPhone } from '../../api/api';
import sendIcon from '../assets/images/send.svg';

export const LoginForm = ({
    type = '',
    logoSrc,
    goToAuthPage = () => console.log("Pass redirect method"),
    goToSumraIdPage = () => console.log("Pass redirect method"),
    sendPhone = () => console.log("Pass api request method to send phone number"), 
    socialLinks = [],
    colors,
}) => {
    const [countryCode, setCountryCode] = useState();
    const [number, setNumber] = useState('');
    
    const goToVeryfycationCodePage = (e) => {
        const messenger = e.target.alt;
        const href = e.target.parentElement.href;
        localStorage.setItem("messenger", messenger);
        localStorage.setItem("href", href);
    };

    const submitPhoneNumber = (event) => {
        event.preventDefault();

        if (!number) {
            return;
        }

        let code = countryCode;
        let phoneNumber = code + number;

        localStorage.setItem("messenger", phoneNumber);
        localStorage.setItem("href", phoneNumber);

        phoneNumber = phoneNumber.replace("+", "");

        sendPhone();
        // sendPhone({
        //     phone_number: phoneNumber,
        //     app_uid: "meet.sumra.web",
        // }).then(
        //     (response) => console.log(response),
        //     (error) => console.error
        // );

        goToAuthPage();
    };

    useEffect(() => {
        localStorage.removeItem("confirm-refresh");
        localStorage.removeItem("create-refresh");
    }, [])

    return (
           
        <>
            {type === 'app' ? (
                <form className="login-form" onSubmit={submitPhoneNumber}>
                    <div className="sumra-auth-form-logo">
                        <img src={logoSrc} alt="logo" />
                    </div>
                   
                    <div className="login-form__wrap">
                    <h3 className="login-form__title-app">Sign Up or Login</h3>
                    <h4 className="login-form__text login-form__text-app">Start by using your <span>Messenger</span></h4>
                    <ul className="login-form__list-messangers">
                        {socialLinks.map((v, index) => {
                            let href = "";

                            if(isMobile) {
                                href = v.hrefMobile;
                            }
                            else {
                                href = v.href;
                            }

                            return (
                                <li className={socialLinks.length > 7 ? "login-form__li-app" : 'login-form__li'} key={index} onClick={goToVeryfycationCodePage}>
                                    <a href={href} target="_blank" rel="noreferrer">
                                        <img src={v.image} onClick={() => goToAuthPage()} width={46} alt={v.title}/>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="sumra-line">or</div>

                    <h4 className="login-form__text login-form__text-app">Start by using your <span>Mobile phone</span></h4>
                    <div className="login-form__input-wrapper">
                        <PhoneInput
                            readOnly
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="RU"
                            value={countryCode}
                            onChange={(e) => {
                                setCountryCode(e)
                            }}
                        />
                        
                        <span></span>
                        <input onChange={(e) => setNumber(e.target.value)} value={number} className="login-form__input" placeholder={'Enter phone number'} />
                        <button type="submit">
                            <img alt="icon" src={sendIcon} />
                        </button>
                    </div>
                    </div>
                    <div className="sumra-line">or</div>
                    <div onClick={() => goToSumraIdPage()} style={{background: colors ? colors?.buttonBackground : 'linear-gradient(90deg, rgba(2, 194, 255, 0.5) 0%, rgba(14, 106, 227, 0.5) 101.97%), linear-gradient(0deg, #0376DA, #0376DA)'}} className="login-button-id">
                        Login with Sumra ID
                    </div>

                    <div className="login-form__terms-privacy">
                        By using either Sign Up or Login you agree to our
                        <br />
                        <a href="#">Terms & Privacy Policy.</a>
                    </div>
                </form>
            ) : (
                <form className="login-form" onSubmit={submitPhoneNumber} style={{background: '#2341A1'}}>
                    <div className="login-form__wrap">
                    <h3 className="login-form__title">Join the Waiting List</h3>
                    <h4 className="login-form__text">Join by using your <span>Messenger</span></h4>
                    <ul className="login-form__list-messangers">
                        {socialLinks.map((v, index) => {
                            let href = "";

                            if(isMobile) {
                                href = v.hrefMobile;
                            }
                            else {
                                href = v.href;
                            }

                            return (
                                <li className={socialLinks.length > 7 ? "login-form__li-app" : 'login-form__li'} key={index} onClick={goToVeryfycationCodePage}>
                                    <a href={href} target="_blank" rel="noreferrer">
                                        <img onClick={() => goToAuthPage()}  src={v.image} width={46} alt={v.title}/>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                    <h4 className="login-form__text">Join by using your <span>Mobile phone</span></h4>
                    <div className="login-form__input-wrapper">
                        <PhoneInput
                            readOnly
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="RU"
                            value={countryCode}
                            onChange={(e) => {
                                setCountryCode(e)
                            }}
                        />
                        
                        <span></span>
                        <input onChange={(e) => setNumber(e.target.value)} value={number} className="login-form__input" placeholder={'Enter phone number'} />
                        <button type="submit">
                            <img alt="icon" src={sendIcon} />
                        </button>
                    </div>
                    </div>
                </form>
            )}
            
        </>
    )
}
