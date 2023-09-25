import { LOGIN_USER, REGISTER_USER, VERIFY_PASSWORD } from './types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loginSuccess: action.payload.request,
                password: action.payload.password,
            };
        case REGISTER_USER:
            return { ...state, register: action.payload };
        case VERIFY_PASSWORD:
            return { ...state, isPasswordVerified: action.payload };
        default:
            return state;
    }
}
