import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled components
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
    
    // TypeScript types for state variables
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>(''); // Email state

    useEffect(() => {
        // Check login status from local storage
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setIsLoggedIn(true);
            // Extract the part before the '@' symbol from the email
            const email = localStorage.getItem("email");
            setUserEmail(email ? email.split('@')[0] : 'User');
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        // Remove items from local storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("email");
        
        setIsLoggedIn(false);
        navigate("/login");  // Redirect to login page
    };

    return (
        <Container>
            <Navbar>
                <div>Home Page</div>
                {isLoggedIn ? (
                    <div>
                        <span>{userEmail}</span>
                        <Button onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <Button onClick={() => navigate("/login")}>Login</Button>
                )}
            </Navbar>
            <div>Home Page 야호~!</div>
        </Container>
    );
};

export default HomePage;
