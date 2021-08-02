import React, { useState, useEffect } from "react";
import { loginById } from "../api/api";
import jwt_decode from "jwt-decode";
import showIcon from '../assets/images/show.svg'
import checkIcon from '../assets/images/check.svg'


 const LoginSumraIdForm = ({
    goSuccess,
    logoSrc,
    colors,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const changeUsername = (e) => setUsername(e.currentTarget.value);
    const changePassword = (e) => setPassword(e.currentTarget.value);
   
    const submitUserForm = async (event) => {
        event.preventDefault();
        
        // if(username.length <= 4) return;
        // if(password.length <= 4) return;

        let response = await loginById({ username, password })
            .then((response) => {
                return response.data;
                // if(response.ok){
                //     return response.json();
                // }
            })
            .then((result) => {

                const {
                    access_token,
                    meet_token,
                    expires_in,
                    refresh_token,
                    token_type,
                } = result;
                const { location, localStorage } = window;

                const decoded = jwt_decode(meet_token);

                if (
                    decoded &&
                    decoded.context &&
                    decoded.context.user &&
                    decoded.context.user.name
                ) {
                    localStorage.setItem(
                        "user_name",
                        decoded.context.user.name
                    );
                }
                localStorage.setItem("access_token", access_token);
                goSuccess();
            })
            .catch((error) => {
                // setError(error);
                console.log(error)
            })
        };

        return (
            <div>
                {logoSrc && (
                    <div className="sumra-auth-form-logo">
                        <img src={logoSrc} alt="logo" />
                    </div>
                )}
                <div className="sumvra-create-username-box">
                    <h1 className="sumra-create-username-title">
                        Login with Sumra ID
                    </h1>
                    <div className="sumra-create-username-text">
                        Please provide following details to login into your account
                    </div>
                    <form className="sumra-form-create-user">
                        <fieldset className={'sumra-input-fieldset'}>
                            <input
                                type="text"
                                placeholder="Enter username"
                                onChange={(e) => changeUsername(e)}
                                value={username}
                            />
                                {username.length > 2 && (
                                    <img className="sumra-input-icon-wrap" src={checkIcon} width="22" />
                                )}

                            {/* <img
                                className="sumra-input-fieldset-icon-right"
                                src={validIconSrc}
                                width="22"
                            /> */}
                        </fieldset>

                        <fieldset className={'sumra-input-fieldset'}>
                            <input
                                type={`${showPassword ? 'text' : 'password'}`}
                                placeholder="Enter password"
                                onChange={(e) => changePassword(e)}
                                value={password}
                            />
                            {/* <div className="sumra-input-icon-wrap"> */}
                                 <img onClick={() => setShowPassword(prev => !prev)} className="sumra-input-icon-wrap" src={showIcon} width="22" />
                            {/* </div> */}
                            {/* <img
                                className="sumra-input-fieldset-icon-right"
                                src={validIconSrc}
                                width="22"
                            /> */}
                        </fieldset>

                        {error && (
                            <div className="sumra-input-message error">
                                The entered data is incorrect
                            </div>
                        )}
                        <button
                            style={{background: colors ? colors?.buttonBackground: 'linear-gradient(90deg, rgba(2, 194, 255, 0.5) 0%, rgba(14, 106, 227, 0.5) 101.97%), linear-gradient(0deg, #0376DA, #0376DA)'}}
                            className={`sumra-Button ${!error && username.length > 2 && password.length > 2 ? 'sumra-Button-valid' : 'sumra-Button-notvalid'}`}
                            onClick={(e) => submitUserForm(e)}
                        >
                            <span>Sign Up</span>
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

export default LoginSumraIdForm;