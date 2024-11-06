import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    color: white;
    padding: 20px;
`;

const Navbar = styled.nav`
    display: flex;
    justify-content: space-between;
    background-color: #333;
    padding: 10px 20px;
    color: white;
`;

const Button = styled.button`
    background-color: #ff4081;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    
    &:hover {
        background-color: #ff1a6b;
    }
`;

const HomePage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // 로그인 상태 확인
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setIsLoggedIn(true);
            // 이메일 앞부분만 추출
            const email = localStorage.getItem("email");
            setUserEmail(email ? email.split('@')[0] : 'User');
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        // 로컬 스토리지에서 토큰 삭제
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("email");
        
        setIsLoggedIn(false);
        navigate("/login");  // 로그인 페이지로 리디렉션
    };

    return (
        <Container>
            

            <div>Home Page 야호~!</div>
        </Container>
    );
};

export default HomePage;
