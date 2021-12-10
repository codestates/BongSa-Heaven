import React from "react";
import styled from "styled-components";
import Header2 from "../../components/common/Header2";
import DesktopTitle from "../../components/common/DesktopTitle";
import Writing from "../../components/CrewBoard/Writing";
import List from "../../components/common/List";
import Comment from "../../components/CrewBoard/Comment";

const Wrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function CrewBoardContents({currentCBcontent, userId}) {
  return (
    <>
      <Wrapper>
        <Header2 componentName="모집글 보기" />
        <DesktopTitle title="모집글 보기" url="/CrewBoardList" />
        <Writing currentCBcontent={currentCBcontent} userId={userId} />
        <List backtoList="/CrewBoardList" />
        <Comment currentCBcontent={currentCBcontent} />
      </Wrapper>
    </>
  );
}
