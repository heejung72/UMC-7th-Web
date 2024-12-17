import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

// Type for RootLayout props (if needed in the future)
interface RootLayoutProps {}

const RootLayout: React.FC<RootLayoutProps> = () => {
  return (
    <>
      <Navbar />
      <MainContentWrapper>
        <Sidebar />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContentWrapper>
    </>
  );
};

export default RootLayout;

// Styled components
const MainContentWrapper = styled.div`
  display: flex;
  margin-top: 70px; /* Navbar height */
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  min-height: 100vh; /* Minimum height */
  overflow-y: auto; /* Allow vertical scrolling */
  padding: 20px;
  margin-left: 200px; /* Sidebar width */
  background-color: black;
`;
