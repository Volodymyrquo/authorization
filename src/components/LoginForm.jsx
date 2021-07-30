import React, {useState, useEffect } from 'react';
import  '../assets/scss/index.scss';
// import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isMobile } from "react-device-detect";
// import socialLinks from '../../common/data/socialLinks';
// import { sendPhone } from '../../api/api';
import sendIcon from '../assets/images/send.svg';

export const LoginForm = ({
    goToAuthPage = () => console.log("Pass redirect method"),
    sendPhone = () => console.log("Pass api request method to send phone number"), 
    title = 'Join',
    socialLinks = [],
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
            <form className="join__form" onSubmit={submitPhoneNumber}>
                <div className="join__form-wrap">
                <h3 className="join__form-title">{title}</h3>
                <h4 className="join__form-text">Join by using your Messenger</h4>
                <ul className="join__form__list-messangers">
                    {socialLinks.map((v, index) => {
                        let href = "";

                        if(isMobile) {
                            href = v.hrefMobile;
                        }
                        else {
                            href = v.href;
                        }

                        return (
                            <li key={index} onClick={goToVeryfycationCodePage}>
                                <a href={href} target="_blank" rel="noreferrer">
                                    <img onClick={() => goToAuthPage()}  src={v.image} width={46} alt={v.title}/>
                                </a>
                            </li>
                        )
                    })}
                </ul>
                <h4 className="join__form__form-text">Join by using your Mobile phone</h4>
                <div className="join__form__input-wrapper">
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
                    <input onChange={(e) => setNumber(e.target.value)} value={number} className="join__form__input" placeholder={'Enter phone number'} />
                    <button type="submit">
                        <img alt="icon" src={sendIcon} />
                    </button>
                </div>
                </div>
            </form>)
        </>
    )
}
