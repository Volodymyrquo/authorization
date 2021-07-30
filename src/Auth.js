import React, {useState, useEffect} from 'react';
import ConfirmCode from './components/ConfirmCode.jsx';
import CreateUser from './components/CreateUser.jsx';
import './assets/scss/index.scss';
export const Auth = ({
    goBack = () => console.log('Pass goBack method to return back when page is refreshed'),
    goSuccess = () => console.log("Pass goSuccess method to login after valid data")
}) => {
    const [authStage, setAuthStage] = useState(1)
    const [verificationCode, setVerificationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState(null)


    const redirectWhenRefresh = () => {
        let onestepRefresh = localStorage.getItem("onestep-auth-refresh");

        if(!onestepRefresh) {
            localStorage.setItem("onestep-auth-refresh", JSON.stringify(true));
        }

        if(onestepRefresh){
            localStorage.removeItem("onestep-auth-refresh");
            goBack();
        }
    }
    useEffect(() => {
        redirectWhenRefresh()
    }, [])
    return (
            <div className="confirm-page">
                <div className="confirm-page-cont">
                    {authStage === 1 ? (
                        <ConfirmCode 
                            setAuthStage={setAuthStage}
                            verificationCode={verificationCode}
                            setVerificationCode={setVerificationCode}
                        />
                    ) : (
                        <CreateUser 
                            setAuthStage={setAuthStage}
                            verificationCode={verificationCode}
                            goSuccess={goSuccess}
                            errorMessage={errorMessage}
                            setErrorMessage={setErrorMessage}
                        />
                    )}
                </div>
            </div>
    )
}

// export default Auth;
