import React from "react";
import styled from "styled-components";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationContainer>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        이전
      </button>
      <span>{currentPage} 페이지</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        다음
      </button>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;

  button {
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
    background-color: #cc0033;
    color: white;
    border: none;
    border-radius: 5px;

    &:disabled {
      background-color: #aaa;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 16px;
    color: white;
  }
`;
