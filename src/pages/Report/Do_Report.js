import React, { useState, useEffect } from 'react';
import '../../style/modal.css';
import '../../App.css';
import { Button, Form, FormGroup } from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NativeSelect, InputLabel } from '@mui/material';

import { useAuth } from '../../components/AuthContext';


const Do_Report = (props) => {
    let navigate = useNavigate();
    const { accessToken } = useAuth();
    const { open, close } = props;

    const [reportType, setReportType] = useState("");
    const [content, setContent] = useState("");

    const onReportTypeHandler = (event) => {
        setReportType(event.currentTarget.value);
    }
    const onContentHandler = (event) => {
        setContent(event.currentTarget.value);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const dataToSend = {
            reportType: reportType,
            content: content
        };
        try {
            const response = await axios.post('http://13.125.98.26:8080/reports', dataToSend, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('신고 성공: ', response.data);
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
                                    <option value="">선택</option>
                                    <option value="무엇을">무엇을</option>
                                    <option value="신고하지">신고하지</option>
                                    <option value="아이디어 좀;">아이디어 좀;</option>
                                    <option value="기타">기타</option>
                                </NativeSelect>
                                <textarea type='input' class="inputField" style={{ marginTop: "20px", height:"100px" }}
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