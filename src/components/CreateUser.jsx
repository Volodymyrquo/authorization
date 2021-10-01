import React, { useState, useEffect } from "react";
import { loginByCodeAndUsername, createInviteCode, sendUsername } from "../api/api";
import Url from 'url-parse';
import checkIcon from '../assets/images/check.svg'

 const CreateUser = ({
    verificationCode,
    goSuccess,
    logoSrc,
    colors,
    status,
    sid,
    setIsLogIn = () => console.log("SET IS LOGIN")
}) => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState("")

    const timerID = null;
    let urlObj = Url(window.location.href);

    const changeInput = (e) => {
        const value = e.currentTarget.value;

        setUsername(value);

        if (timerID) {
            clearTimeout(timerID);
        }
    };

    useEffect(() => {
    }, [urlObj])

    const submitUserForm = async (event) => {
        event.preventDefault();
        
        if(username.length < 5) return;
        
        let response =  await sendUsername({
            username,
            sid 
        }).then(res => res?.data)
          .catch(err => err);

        const { type, token, user_status } = response;

        if (type === 'success') {
            localStorage.setItem("access_token", token);
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
            localStorage.removeItem("onestep-auth-refresh");
        } else{
            if(user_status === 0){
                // a new user
                setErrorMessage('This username already exists');
            } 
            else{
                // already has an account
                setErrorMessage('Enter your username');
            }
        }
    };

    // const submitUserForm = async (event) => {
    //     event.preventDefault();
        
    //     if(username.length <= 4) return;
        
    //     let response = await loginByCodeAndUsername({
    //         code: verificationCode,
    //         username: username,
    //         app_uid: "meet.sumra.web",
    //     }).catch(error => {
    //         console.log(error.response)
    //         setErrorMessage(error.response.data.error_message)
    //     })

    //     if (response?.data?.success) {
    //         localStorage.setItem("access_token", response.data.data['access_token']);
    //         localStorage.setItem("username", username);
    //         // sending REF-CODE AND REF-LINK to localStorage
    //         if(urlObj?.query !== "" || urlObj?.hash !== "" ){
    //             // request for a user that has referrer link
    //             await createInviteCode(111, 'DF4DSA').then(({data}) => {
    //                 localStorage.setItem('referrals', JSON.stringify({code:data.data.code, link:data.data.link}))
    //             }).catch(error => console.log(error.response));
    //         } else {
    //             // request for a user that hasn't referrer link
    //             await createInviteCode(111).then(({data}) => {
    //                 localStorage.setItem('referrals', JSON.stringify({code:data.data.code, link:data.data.link}))
    //             }).catch(error => console.log(error.response))
    //         }
    //         // redirect after successs
    //         setIsLogIn(true)
    //         // location.href = `/`;
    //         goSuccess();
    //         localStorage.removeItem("onestep-auth-refresh");
    //     }
    // };

        return (
            <div className="createuser-form">
                {logoSrc && (
                    <div className="sumra-auth-form-logo">
                        <img src={logoSrc} alt="logo" />
                    </div>
                )}
                <div className="createuser-form__username-box">
                    <h1 className="createuser-form__username-title">
                        {status === 0 ? (`Create Username`) : (`Enter your Username`)}
                    </h1>
                    <div className="createuser-form__username-text">
                        {status === 0 ? 
                        (`Please provide the following details for your new account`) : 
                        (`Please provide the following details for your account`)}
                    </div>
                    <form>
                        <fieldset className={'sumra-input-fieldset'}>
                            <input
                                type="text"
                                placeholder="Enter username"
                                onChange={(e) => changeInput(e)}
                            />

                            {username.length > 4 && !errorMessage && (
                                <img className="sumra-input-icon-wrap" src={checkIcon} width="22" />
                            )}
                        </fieldset>

                        {errorMessage && (
                            <div className="sumra-input-message error">
                                {errorMessage}
                            </div>
                        )}
                        <button
                            style={{background: colors ? colors?.buttonBackground: 'linear-gradient(90deg, rgba(2, 194, 255, 0.5) 0%, rgba(14, 106, 227, 0.5) 101.97%), linear-gradient(0deg, #0376DA, #0376DA)'}}
                            className={`sumra-Button ${!errorMessage && username.length > 4 ? 'sumra-Button-valid' : 'sumra-Button-notvalid'}`}
                            onClick={(e) => submitUserForm(e)}
                        >
                            <span>Log In</span>
                        </button>
                    </form>
                </div>
                <div className="createuser-form__terms-privacy">
                    By using either Sign Up or Login you agree to our <br />
                    <a href="#">Terms & Privacy Policy.</a>
                </div>
            </div>
      
        );
    }

export default CreateUser;