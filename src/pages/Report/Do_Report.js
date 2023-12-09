import React, { useState } from 'react';
import '../../style/modal.css';
import { Button, Form, FormGroup } from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NativeSelect, InputLabel } from '@mui/material';

const Do_Report = (props) => {
  let navigate = useNavigate();
  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;
  const { open, close, postId } = props;

  const [reportType, setReportType] = useState("POST_REPORT"); // 기본값으로 POST_REPORT 설정
  const [content, setContent] = useState("");
  const [reportSuccess, setReportSuccess] = useState(false);

  const onContentHandler = (event) => {
    setContent(event.target.value);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const dataToSend = {
      reportType: reportType,
      content: content,
    };

    if (reportType === "POST_REPORT") {
      dataToSend.postId = postId;
    }

    try {
      const response = await axios.post('/api/reports', dataToSend, {
        headers: { 'Authorization' : `Bearer ${actoken}`,
        'Auth' : retoken }
      });
      console.log('신고 전송 성공: ', response);
      if (response.status === 201) {
        console.log('신고: ', response.data);
        setReportSuccess(true); 
      }
    } catch (error) {
      console.error('신고 실패:', error);
      if (error.response.data.code == '511') {
        alert('로그인이 만료되어 로그인 페이지로 이동합니다');
        window.location.replace('/loginpage');
      }
    }
  }

  return (
    <div className={open ? 'openModal modal' : '신고하기'}>
      {open ? (
        <section>
          <header>
            <button className="close" onClick={close}> X </button>
          </header>

          <main>
            {reportSuccess ? (
              <div>
                <p>신고가 성공적으로 제출되었습니다.</p>
                <button onClick={close}>닫기</button>
              </div>
            ) : (
              <Form onSubmit={onSubmitHandler}>
                <FormGroup>
                  <h4>Billim</h4>
                  <p style={{ fontSize: "13px", color: "#4A4F5A" }}>신고 내용을 입력 해주세요.</p>
                  <InputLabel htmlFor="reportType">신고 종류</InputLabel>
                  <NativeSelect
                    value={reportType}
                    onChange={(event) => setReportType(event.target.value)}
                    inputProps={{
                      name: 'reportType',
                      id: 'reportType',
                    }}
                  >
                    <option value="POST_REPORT">게시물 신고</option>
                    <option value="BUG">버그</option>
                  </NativeSelect>
                  <textarea type='input' class="inputField" style={{ marginTop: "20px", height: "100px" }}
                    placeholder="  내용을 입력 해주세요." value={content} onChange={onContentHandler} />
                  <Button color="dark" type="submit" style={{ marginRight: "20px" }}>신고하기</Button>
                  <NavLink style={({ isActive }) => ({ color: isActive ? 'yellow' : 'gray' })} to="/my-page/reports">신고함 바로가기</NavLink>
                </FormGroup>
              </Form>
            )}
          </main>

          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Do_Report;
