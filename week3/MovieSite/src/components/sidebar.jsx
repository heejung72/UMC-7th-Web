//sidebar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';
import { MdMovieCreation } from 'react-icons/md';

const SidebarContainer = styled.div`
  background-color: #222;
  color: white;
  width: 250px;
  padding: 20px;
`;

const SidebarButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #444;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #666;
  }
`;

const CategoryList = styled.div`
  padding-left: 20px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
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

      <SidebarButton onClick={() => setMovieCategoriesVisible(!movieCategoriesVisible)}>
        <MdMovieCreation style={{ marginRight: '10px' }} />
        영화
      </SidebarButton>

      <CategoryList visible={movieCategoriesVisible}>
        <Link to="/movies/now-playing"><SidebarButton>현재 상영중인</SidebarButton></Link>
        <Link to="/movies/popular"><SidebarButton>인기있는</SidebarButton></Link>
        <Link to="/movies/top-rated"><SidebarButton>높은 평가를 받은</SidebarButton></Link>
        <Link to="/movies/up-coming"><SidebarButton>개봉 예정중인</SidebarButton></Link>
      </CategoryList>
    </SidebarContainer>
  );
};

export default Sidebar;
