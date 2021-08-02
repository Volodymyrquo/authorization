import React, { useState, useEffect } from "react";
import { loginByCodeAndUsername, createInviteCode } from "../api/api";
import Url from 'url-parse';
// import {createInviteReferals} from '../../redux/session/operations';
import checkIcon from '../assets/images/check.svg'

 const CreateUser = ({
    verificationCode,
    goSuccess,
    errorMessage,
    setErrorMessage,
    logoSrc,
    colors,
}) => {
    // let errorMessage = false;

    const [username, setUsername] = useState("")
    // let verificationCode = location?.state?.verificationCode;
    const timerID = null;
    let urlObj = Url(window.location.href);

    const changeInput = (e) => {
        const value = e.currentTarget.value;

        setUsername(value);

        if (timerID) {
            clearTimeout(timerID);
        }
    };
   
    // useEffect(() => {
    //     // dispatch(loginError(null))
    //     // if(verificationCode === undefined) goToMain();
    // }, [errorMessage])


    useEffect(() => {

    }, [urlObj])

    
    const submitUserForm = async (event) => {
        event.preventDefault();
        
        if(username.length <= 4) return;
        
        let response = await loginByCodeAndUsername({
            code: verificationCode,
            username: username,
            app_uid: "meet.sumra.web",
        }).catch(error => {
            console.log(error.response)
            // errorMessage = error.response.data.error_message;
            setErrorMessage(error.response.data.error_message)
        })

        if (response?.data?.success) {
            // dispatch(loginSuccess())

            // sending TOKEN to store
            // dispatch(getToken(response.data.data["access_ token"]))
            // const json = await response.json();
            // const access_token = json.data["access_ token"];
            localStorage.setItem("access_token", response.data.data["access_ token"]);
            // console.log(response.data[])
            // sending REF-CODE AND REF-LINK to store
            if(urlObj?.query !== "" || urlObj?.hash !== "" ){
                // request for a user that has referrer link
                // dispatch(createInviteReferals(111, 'DF4DSA'))
                console.log("BOOM 1")
                await createInviteCode(111, 'DF4DSA').then((res) => {
                    console.log(res, ' DATA')
                }).catch(error => console.log(error.response));
            } else {
                // request for a user that hasn't referrer link
                // dispatch(createInviteReferals(111))
                console.log("BOOM 2")
                let res = await createInviteCode(111).then(res => console.log(res, " res")).catch(error => console.log(error.response))

                console.log(res)
            }
            // setWithExpiry("myKey", "THIS FOR TEST", 30000)
            goSuccess();
            localStorage.removeItem("onestep-auth-refresh");
        }
    };

        return (
            <div>
                {logoSrc && (
                    <div className="sumra-auth-form-logo">
                        <img src={logoSrc} alt="logo" />
                    </div>
                )}
                <div className="sumra-create-username-box">
                    <h1 className="sumra-create-username-title">
                        Create Username
                    </h1>
                    <div className="sumra-create-username-text">
                        Please provide following details for your new account
                    </div>
                    <form className="sumra-form-create-user">
                        <fieldset className={'sumra-input-fieldset'}>
                            <input
                                type="text"
                                placeholder="Enter username"
                                onChange={(e) => changeInput(e)}
                            />

                                {username.length > 4 && (
                                    <img className="sumra-input-icon-wrap" src={checkIcon} width="22" />
                                )}
                            {/* <img
                                className="sumra-input-fieldset-icon-right"
                                src={validIconSrc}
                                width="22"
                            /> */}
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
                <div className="sumra-terms-privacy">
                    By using either Sign Up or Login you agree to our <br />
                    <a href="#">Terms & Privacy Policy.</a>
                </div>
            </div>
      
        );
    }

export default CreateUser;