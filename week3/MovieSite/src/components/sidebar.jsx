//sidebar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';
import { MdMovieCreation } from 'react-icons/md';

const SidebarContainer = styled.div`
background-color: black;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    margin-top: 70px;
    width: 200px;
    display: flex;
    flex-direction: column;

    a {
        color: white;
        text-decoration: none;
        margin-left: 10px;
    }
`;

const SidebarButton = styled.button`
background-color: black;   border: none;   padding: 10px;text-align: left; 
cursor: pointer;
    justify-content: space-between;
    color: white;
    margin: 20px 0 20px 10px;
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

      <Link to="/movies">
      <SidebarButton onClick={() => setMovieCategoriesVisible(!movieCategoriesVisible)}>
        <MdMovieCreation style={{ marginRight: '10px' }} />
        영화
      </SidebarButton>
      </Link>
      </SidebarContainer>

  );
};

export default Sidebar;
