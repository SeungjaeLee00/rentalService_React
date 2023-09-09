export default function ReNavBar()
{
    return(
        <div className="header">
            <div className="header-top">
                <div className="top-left"></div>
                <div className="top-right">
                    <div className="loginout">로그인/회원가입</div>
                    <div className="mypage">마이페이지</div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="category">카테고리</div>
                <div className="searchbar">검색바</div>
            </div>
        </div>
    )
}