import React from "react";
import styled from "styled-components";

const PaginationBox = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const PageNumber = styled.li``;

const PageButton = styled.button`
  cursor: pointer;
  font-size: 1.5rem;
  border: none;
  background: none;
  &:focus {
    font-weight: bold;
  }
`;

export default function Pagination({postPerPage, totalPosts, paginate}: any) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <PaginationBox>
        {pageNumbers.map(pageNumber => (
          <PageNumber key={pageNumber}>
            <PageButton onClick={() => paginate(pageNumber)}>
              {pageNumber}
            </PageButton>
          </PageNumber>
        ))}
      </PaginationBox>
    </>
  );
}
