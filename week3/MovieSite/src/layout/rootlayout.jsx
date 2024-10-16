//rootlayout.jsx
import { Outlet } from 'react-router-dom';
import styled from "styled-components";
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';



const RootLayout = () => {
  return (
    <> <Navbar />
        <MainContentWrapper>
                <SideBar />
                <ContentWrapper>
                    <Outlet />
                </ContentWrapper>
        </MainContentWrapper>
    </>
  );
};

export default RootLayout;


const MainContentWrapper = styled.div`
    display: flex;
    margin-top: 70px; /* Navbar height */
`;

const ContentWrapper = styled.div`
    flex-grow: 1;
    min-height: 100vh; /* 최소 높이 설정 */
    overflow-y: auto; /* 세로 스크롤 허용 */
    padding: 20px;
    margin-left: 200px; /* Sidebar width */
    background-color: black;
`;
