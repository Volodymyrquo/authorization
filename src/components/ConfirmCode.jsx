import React, { useState, useRef } from "react";
import ReactCodeInput from "react-verification-code-input";

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
}) => {
    
    // const [verificationCode, setVerificationCode] = useState("");
    const input = useRef();
    const href = localStorage.getItem("href");
    const isPhoneNumber = href?.[0] === "+" ? true : false;
    let messenger = localStorage.getItem("messenger");
    
    const handleChange = (vals) => {
        setVerificationCode(vals)
    };

    const handleComplete = () => {
        setVerificationCode(prev => prev.toUpperCase());
    };

    const resendCodeOnPhone = () => {

    }

    const submitVerificationCode = (event) => {
        event.preventDefault();

        const isComplete = verificationCode.length === fields;

        if (isComplete) {
            setAuthStage(2)
        }
    };

    // window.addEventListener("popstate", () => {
    //     history.go(1);
    //   });

        return (
            <div className="sumra-auth-form">
                {logoSrc && (
                    <div className="sumra-auth-form-logo">
                        <img src={logoSrc} alt="logo" />
                    </div>
                )}
                <div className="sumra-verify-box">
                    <h1 className="sumra-verify-title ">Verify Account!</h1>

                    <form>
                        <div className="sumra-verify-text ">
                            Enter 6 digit verification code we have sent to
                            &nbsp;
                            {isPhoneNumber ? (
                                <a target="_blank" rel="noreferrer" href={href} onClick={resendCodeOnPhone()}>
                                    {messenger}
                                </a>
                            ) : (
                                <a target="_blank" rel="noreferrer" href={href}>{messenger}</a>
                            )}
                        </div>

                        <ReactCodeInput
                            className="sumra-react-code-input"
                            ref={input}
                            type={type}
                            fieldWidth={fieldWidth}
                            fieldHeight={fieldHeight}
                            onChange={handleChange}
                            onComplete={handleComplete}
                        />
                        <div>
                            <span className="sumra-verify-didntreceive">
                                Didn't receive our code?
                            </span>
                            {isPhoneNumber ? (
                                <a href={href} target="_blank" rel="noreferrer">
                                    <span className="sumra-verify-resend">
                                        Resend Code
                                    </span>
                                </a>
                            ) : (
                                <a href={href} target="_blank" rel="noreferrer" >
                                    <span className="sumra-verify-resend">
                                        Resend Code
                                    </span>
                                </a>
                            )}
                        </div>

                        <button
                            style={{background: colors ? colors?.buttonBackground: 'linear-gradient(90deg, rgba(2, 194, 255, 0.5) 0%, rgba(14, 106, 227, 0.5) 101.97%), linear-gradient(0deg, #0376DA, #0376DA)'}}
                            className={`sumra-Button ${verificationCode.length === fields ? 'sumra-Button-valid' : 'sumra-Button-notvalid'}`}
                            onClick={submitVerificationCode}
                        >
                            <span>Continue</span>
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

export default ConfirmCode;