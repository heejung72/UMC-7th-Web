// src/apis/auth/auth.ts
import axios, { AxiosResponse } from 'axios';

// 기본 API 인스턴스 설정
const api = axios.create({
  baseURL: 'https://your-api-url.com', // API 베이스 URL 설정
});

// accessToken과 refreshToken 관리 함수
const getAccessToken = (): string | null => localStorage.getItem('accessToken');
const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');
const setAccessToken = (token: string): void => localStorage.setItem('accessToken', token);
const setRefreshToken = (token: string): void => localStorage.setItem('refreshToken', token);

// 회원가입 API 요청
export const registerUser = (userData: { username: string; password: string }): Promise<AxiosResponse> => {
  return api.post('/auth/register', userData);
};

// 로그인 API 요청
export const loginUser = async (userData: { username: string; password: string }): Promise<AxiosResponse> => {
  const response = await api.post('/auth/login', userData);
  const { accessToken, refreshToken } = response.data;

  // 토큰 저장
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);

  return response;
};

// 유저 정보 불러오기 API 요청
export const getUserInfo = async (): Promise<any> => {
  try {
    const response = await api.get('/auth/user', {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401 && getRefreshToken()) {
      // 토큰 갱신 시도
      await refreshToken();
      // 갱신 후 다시 요청 시도
      return api.get('/auth/user', {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      });
    }
    throw error;
  }
};

// 토큰 갱신 API 요청
const refreshToken = async (): Promise<any> => {
  try {
    const response = await api.post('/auth/refresh', {
      refreshToken: getRefreshToken(),
    });

    // 새로운 accessToken 저장
    setAccessToken(response.data.accessToken);

    return response.data;
  } catch (error) {
    console.error('Refresh token expired. Logging out.');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    throw error;
  }
};