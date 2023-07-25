import React, {useEffect} from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import googleIcon from '../img/google.png';

const GoogleLLogIn = () => {

    const clientId = '7029190476-csnl0o38a62r9hh0p8s50ujg62fqiuji$$'

    return(
        <React.Fragment>
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                
                onSuccess={(credentialResponse) => { console.log(credentialResponse);}}
                onError={() => { console.log('Login Failed'); }}
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

    )
}

export default GoogleLLogIn;