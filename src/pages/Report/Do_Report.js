import React, { useState } from 'react';
import '../../style/modal.css';
import '../../App.css';
import { Button, Form, FormGroup } from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NativeSelect, InputLabel } from '@mui/material';

const Do_Report = (props) => {
  let navigate = useNavigate();
  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;
  const { open, close } = props;

  const [reportType, setReportType] = useState("");
  const [content, setContent] = useState("");

  const onReportTypeHandler = (event) => {
    setReportType(event.target.value);
  }

  const onContentHandler = (event) => {
    setContent(event.target.value);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const dataToSend = {
      reportType: reportType,
      content: content,
    };
    
    try {
      const response = await axios.post('http://13.125.98.26:8080/reports', dataToSend, {
        headers: {
          Authorization: `Bearer ${actoken}`,
          Auth: retoken
        },
      });
      console.log('신고 전송 성공: ', response.data);
      if (response.status === 201) {
        console.log('신고: ', response.data);
        
      }
    } catch (error) {
      console.error('신고 실패:', error);
      if (error.response && error.response.status === 401) {
        console.error('AccessToken이 만료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/loginpage');
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
            <Form onSubmit={onSubmitHandler}>
              <FormGroup>
                <h4>뭐든빌리개</h4>
                <p style={{ fontSize: "13px", color: "#4A4F5A" }}>신고 내용을 입력 해주세요.</p>
                <InputLabel htmlFor="reportType">신고 종류</InputLabel>
                <NativeSelect
                  value={reportType}
                  onChange={onReportTypeHandler}
                  inputProps={{
                    name: 'reportType',
                    id: 'reportType',
                  }}
                >
                  <option value="POST_REPORT">게시물 신고</option>
                  {/* 게시물 ID */}
                  <option value="BUG">버그</option>
                </NativeSelect>
                <textarea type='input' class="inputField" style={{ marginTop: "20px", height: "100px" }}
                  placeholder="  내용을 입력 해주세요." value={content} onChange={onContentHandler} />
                <Button color="dark" type="submit" style={{ marginRight: "20px" }}>신고하기</Button>
                <NavLink style={({ isActive }) => ({ color: isActive ? 'yellow' : 'gray' })} to="/my-page/reports">신고함 바로가기</NavLink>
              </FormGroup>
            </Form>
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
