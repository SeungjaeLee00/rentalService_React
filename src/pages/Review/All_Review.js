import { useState } from "react";

function All_Review() {

    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value)
    }
    return (
        <div>
            {/* <p>특정 회원에 대한 리뷰 조회</p> */}
            <div className='Search-Bar'>
                <form>
                    <input type="text" maxLength='20' placeholder="  닉네임을 입력하세요"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }} />
                </form>
            </div>
        </div>
    )
}

export default All_Review;