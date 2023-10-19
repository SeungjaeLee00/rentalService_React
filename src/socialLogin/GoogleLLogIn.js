import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import googleIcon from '../assets/img/google.png';

const GoogleLogIn = () => {
  const clientId = '7029190476-csnl0o38a62r9hh0p8s50ujg62fqiuji$$';

  const handleSuccess = (credentialResponse) => {
    console.log('Login Successful:', credentialResponse);
    //
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <React.Fragment>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          render={(renderProps) => (
            <div className='social_login_box google' onClick={renderProps.onClick}>
              <div className='social_login_image_box'>
                <img src={googleIcon} alt='google_login' />
              </div>
              <div className='social_login_text_box'>구글로 시작하기</div>
              <div className='social_login_blank_box'> </div>
            </div>
          )}
        />
      </GoogleOAuthProvider>
    </React.Fragment>
  );
};

export default GoogleLogIn;
