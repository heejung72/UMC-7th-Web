//rootlayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <LayoutContainer>
        <Sidebar />
        <Outlet />
      </LayoutContainer>
    </>
  );
};

export default RootLayout;
