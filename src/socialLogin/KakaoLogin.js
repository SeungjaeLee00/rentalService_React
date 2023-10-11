import { useEffect, useState } from "react";
import kakao from "../assets/img/kakao.png";
import '../style/modal.css';


function KaKaoLogin() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const { Kakao } = window;
  const initKakao = async () => {
    const jsKey = "09a20fe694f36680bc9baefcbc101b4d";
    if (Kakao && !Kakao.isInitialized()) {
      await Kakao.init(jsKey);
      //console.log(`kakao 초기화 ${Kakao.isInitialized()}`);
    }
  };
  const kakaoLogin = async () => {
    await Kakao.Auth.login({
      success: async (authObj) => {
        console.log(authObj);
        Kakao.Auth.setAccessToken(authObj.access_token);
        console.log("카카오 로그인 성공");
  
        try {
          const response = await Kakao.API.request({
            url: "/login",
            method: "POST", // 로그인 요청
            data: { accessToken: authObj.access_token },
          });
  
          console.log("카카오 인가 요청 성공");
          setIsLogin(true);
          const kakaoAccount = response.kakao_account;
          localStorage.setItem("email", kakaoAccount.email);
          localStorage.setItem("nickname", kakaoAccount.profile.nickname);
  
          // 성공하면 메인으로 
          window.location.href = "/";
        } catch (error) {
          console.error("카카오 인가 요청 실패:", error);
        }
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    initKakao();
    Kakao.Auth.getAccessToken() ? setIsLogin(true) : setIsLogin(false);
  }, []);

  useEffect(() => {
    if (isLogin) {
      setUser({
        email: localStorage.getItem("email"),
        nickname: localStorage.getItem("nickname"),
      });
    }
  }, [isLogin]);

  return (
    <div className="kakaologinbtn">
        <button onClick={kakaoLogin} 
                style={{border:"none", background:"none", margin:'10px'}}>
            <img
            src={kakao}
            width="200"
          />
        </button>
    </div>
  );
}

export default KaKaoLogin;