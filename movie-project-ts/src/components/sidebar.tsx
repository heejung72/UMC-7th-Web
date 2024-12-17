import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';
import { MdMovieCreation } from 'react-icons/md';

const SidebarContainer = styled.div`
  background-color: #131517;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  margin-top: 70px;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const SidebarButton = styled.button`
  background-color: #131517;
  border: none;
  padding: 10px 15px;
  text-align: left;
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 10px 0;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e83261;
  }

  svg {
    margin-right: 10px;
  }
`;

const MovieCategories = styled.div`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  margin-left: 20px;
`;

const Sidebar = () => {
  const [movieCategoriesVisible, setMovieCategoriesVisible] = useState(false);

  return (
    <SidebarContainer>
      <Link to="/search">
        <SidebarButton>
          <IoMdSearch style={{ marginRight: '10px' }} />
          찾기
        </SidebarButton>
      </Link>

      <div>
        <SidebarButton onClick={() => setMovieCategoriesVisible(!movieCategoriesVisible)}>
          <MdMovieCreation style={{ marginRight: '10px' }} />
          영화
        </SidebarButton>

        {/* Conditionally render movie categories */}
        <MovieCategories visible={movieCategoriesVisible}>
          <Link to="/category/action">
            <SidebarButton>액션</SidebarButton>
          </Link>
          <Link to="/category/drama">
            <SidebarButton>드라마</SidebarButton>
          </Link>
          <Link to="/category/comedy">
            <SidebarButton>코미디</SidebarButton>
          </Link>
        </MovieCategories>
      </div>

      <Link to="/subscribe">
        <SidebarButton>구독</SidebarButton>
      </Link>

      <Link to="/purchase">
        <SidebarButton>개별 구매</SidebarButton>
      </Link>
    </SidebarContainer>
  );
};

export default Sidebar;
