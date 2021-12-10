import React from "react";
import styled from "styled-components";

const ContentsList = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentsBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: dashed gray 1px;
  padding: 20px 0px;
`;
const ContentsWriter = styled.span`
  margin-left: 25px;
  opacity: 0.5;
`;

const ContentsDate = styled.span`
  margin-left: 30px;
  font-size: 12px;
`;

const ContentsTitle = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
  margin: 0px 0px 10px 20px;
`;
export default function Contents({freeboard_id, title, writer, date, GoToFreeBoardContent}) {
  return (
    <>
      <ContentsList onClick={() => GoToFreeBoardContent(freeboard_id)}>
        <ContentsBox>
          <ContentsTitle>{title}</ContentsTitle>
          <ContentsWriter>
            {writer}
            <ContentsDate>{date}</ContentsDate>
          </ContentsWriter>
        </ContentsBox>
      </ContentsList>
    </>
  );
}
