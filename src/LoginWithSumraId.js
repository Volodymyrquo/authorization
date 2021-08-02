import React, {useState, useEffect} from 'react';
import LoginSumraIdForm from './components/LoginSumraIdForm.jsx';
import './assets/scss/index.scss';

export const LoginWithSumraId = ({
    logoSrc,
    goBack = () => console.log('Pass goBack method to return back when page is refreshed'),
    goSuccess = () => console.log("Pass goSuccess method to login after valid data"),
    colors,
}) => {
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
                    <LoginSumraIdForm 
                        colors={colors}
                        logoSrc={logoSrc}
                        goSuccess={goSuccess}
                    />
                </div>
            </div>
    )
}

// export default Auth;
