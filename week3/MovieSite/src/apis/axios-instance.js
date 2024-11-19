// axios-instance.js
import axios from 'axios';

// API 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MOVIE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

// 사용자 인증을 위한 API 인스턴스 생성
const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
});

// accessToken과 refreshToken 관리 함수
const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setAccessToken = (token) => localStorage.setItem('accessToken', token);
const setRefreshToken = (token) => localStorage.setItem('refreshToken', token);

// 요청 인터셉터: 사용자 인증 토큰 추가
authApi.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 토큰 만료 처리
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken이 만료된 경우
    if (error.response?.status === 401 && getRefreshToken()) {
      try {
        // refreshToken으로 새로운 accessToken 발급
        const { data } = await axios.post(`${import.meta.env.VITE_AUTH_API_URL}/auth/refresh`, {
          refreshToken: getRefreshToken(),
        });

        // 새로운 accessToken 저장
        setAccessToken(data.accessToken);

        // 기존 요청에 새로운 accessToken 추가 후 재시도
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return authApi(originalRequest);
      } catch (refreshError) {
        // refreshToken이 만료된 경우, 로그아웃 처리
        console.error('Refresh token expired. Logging out.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosInstance, authApi };
