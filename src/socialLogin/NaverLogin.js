import { useEffect } from 'react';

const { naver } = window;

function NaverLogin() {
    const initializeNaverLogin = () => {
      const naverLogin = new naver.LoginWithNaverId({
        clientId: "54J1OBXfGf6lSgCRr31r",
        callbackUrl: "http://localhost:3000", 
        isPopup: true,
        loginButton: { color: 'green', type: 3, height: '43' },
      });
      naverLogin.init();
    };
      
    useEffect(() => {
      initializeNaverLogin();
    }, []);
    
    return (
      <div id='naverIdLogin'/>
    )
  }

export default NaverLogin;