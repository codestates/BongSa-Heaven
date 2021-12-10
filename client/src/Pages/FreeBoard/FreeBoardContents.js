import React from "react";
import styled from "styled-components";
import Header2 from "../../components/common/Header2";
import DesktopTitle from "../../components/common/DesktopTitle";
import Writing from "../../components/FreeBoard/Writing";
import List from "../../components/common/List";
import Comment from "../../components/FreeBoard/Comment";

const Wrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function FreeBoardContents({currentFBcontent, userId}) {
  return (
    <>
      <Wrapper>
        <Header2 componentName="게시글 보기" />
        <DesktopTitle title="게시글 보기" url="/FreeBoardList" />
        <Writing currentFBcontent={currentFBcontent} userId={userId} />
        <List backtoList="/FreeBoardList" />
        <Comment currentFBcontent={currentFBcontent} />
      </Wrapper>
    </>
  );
}
