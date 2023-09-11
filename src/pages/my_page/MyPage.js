import '../../style/MyPage.css'
import HorizonLine from '../../components/HorizonLine'

export default function MyPage()
{
    return(
        <div className="content">
            <div className="mypagetop">
                <div className="toptitle">
                    <h1>My Page</h1>
                </div>
                <div className="topinfo">
                    <div className="infoleft">
                        <div className="name">유저닉네임</div>
                        <p style={{marginTop:"10px"}}>회원정보수정</p>
                    </div>
                    <div className="inforight">
                        <div className="userpost">
                            <div style={{fontSize:"30px"}} className="posttitle">게시물</div>
                            <div className="postquantity">5개</div>
                        </div>
                        <div className="usertrade">
                            <div style={{fontSize:"30px"}} className="tradetitle">내거래</div>
                            <div className="tradequantity">5개</div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <hr/>
            <div className="mypagebottom"></div>
        </div>
    )
}