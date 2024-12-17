import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// 로그인 상태를 관리할 Context 생성
const AuthContext = createContext();

// 인증 상태에 접근하는 커스텀 훅
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider 컴포넌트: 인증 상태와 관련된 로직을 관리
export const AuthProvider = ({ children }) => {
  // 초기 상태 설정 (localStorage에서 값 불러오기)
  const [authState, setAuthState] = useState(() => {
    const accessToken = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');
    return {
      accessToken,
      isAuthenticated: !!accessToken,
      email,
    };
  });

  // 로그인 함수
  const login = useCallback((email, accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('email', email);
    setAuthState({
      accessToken,
      isAuthenticated: true,
      email,
    });
  }, []);

  // 로그아웃 함수
  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    setAuthState({
      accessToken: null,
      isAuthenticated: false,
      email: null,
    });
  }, []);

  // 로그인 상태 변화 감지하여 업데이트 (useEffect는 더 이상 필요 없음)
  useEffect(() => {
    // `authState`는 이제 `useState`로 설정되어 자동으로 반영됩니다.
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
