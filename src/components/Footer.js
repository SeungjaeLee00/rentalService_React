export default function Footer() {
    return (
        <>
            <footer className='foot'>
                <div style={{ fontSize: "25px", fontWeight: "bold", color:"blue" }}>Billim</div>
                <div className='footer-right'>
                    <div style={{ fontSize: "15px" }}>Billim을 만든 사람들</div>
                    <div style={{ marginTop: "10px" }}>
                        Back-End : <a href="https://github.com/Dongwoongkim">김동웅</a> <a href="https://github.com/park0jae">박영재</a>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        Front-End : <a href='https://github.com/SeungjaeLee00'>이승재</a> <a href='https://github.com/choimyeongsu'>최명수</a>
                    </div>
                </div>
            </footer>
        </>
    )
}