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
  font-size: 14px;
  border: none;
  background: none;
  &:focus {
    font-weight: bold;
  }
  @media screen and (min-width: 37.5rem) {
    font-size: 24px;
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
