import axios from 'axios';
import { LOGIN_USER, REGISTER_USER } from './types';

// 로그인 액션
export function loginUser(dataToSubmit, password) {
    const request = axios.post('/itemmain', dataToSubmit).then((response) => response.data);

    return {
        type: LOGIN_USER,
        payload: {
            request,
            password
        }

    };
}

// 회원가입 액션
export function registerUser(dataToSubmit) {
    const request = axios.post('/itemmain', dataToSubmit).then((response) => response.data);

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

// 비밀번호 확인 액션
export function verifyPassword(isPasswordVerified) {
    return {
        type: 'VERIFY_PASSWORD',
        payload: isPasswordVerified,
    };
}
