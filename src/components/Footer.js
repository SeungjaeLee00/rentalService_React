export default function Footer() {
    return (
        <>
            <footer className='foot'>
                <div style={{ fontSize: "25px", fontWeight: "bold" }}>뭐든빌리개</div>
                <div className='footer-right'>
                    <div style={{ fontSize: "15px" }}>뭐든빌리개를 만든 사람들</div>
                    <div style={{ marginTop: "10px" }}>
                        Back-End : <a>김동웅</a> <a>박영재</a>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        Front-End : <a href='https://github.com/leejaejae'>이승재</a> <a href='https://github.com/choimyeongsu'>최명수</a>
                    </div>
                </div>
            </footer>
        </>
    )
}