// src/apis/auth/auth.js
import axios from 'axios';

// 회원가입 API 요청
export const registerUser = (userData) => {
  return axios.post('/auth/register', userData);
};

// 로그인 API 요청
export const loginUser = (userData) => {
  return axios.post('/auth/login', userData);
};

// 유저 정보 불러오기 API 요청
export const getUserInfo = (accessToken) => {
  return axios.get('/auth/user', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
