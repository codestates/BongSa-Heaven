import React from "react";
import styled from "styled-components";
import Header2 from "../../components/common/Header2";
import DesktopTitle from "../../components/common/DesktopTitle";
import DeleteCheck from "../../components/CrewBoard/DeleteCheck";

const Wrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentsBox = styled.div`
  @media screen and (min-width: 37.5rem) {
    margin: auto;
    background-color: white;
    width: 1080px;
    display: flex;
    flex-direction: column;
    padding: 20px 0px 20px 0px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

export default function CrewBoardDelete({currentCBcontent}: any) {
  let temporaryData: any = localStorage.getItem("currentCBcontent");
  return (
    <>
      {currentCBcontent.data === undefined && temporaryData !== undefined ? (
        <>
          <Wrapper>
            <Header2 componentName="삭제" />
            <DesktopTitle title="삭제" />
            <ContentsBox>
              <DeleteCheck
                contents="모집글"
                delete="/CrewBoardList"
                cancel="/CrewBoardContents"
                currentCBcontent={JSON.parse(temporaryData)}
              />
            </ContentsBox>
          </Wrapper>
        </>
      ) : (
        <>
          <Wrapper>
            <Header2 componentName="삭제" />
            <DesktopTitle title="삭제" />
            <ContentsBox>
              <DeleteCheck
                contents="모집글"
                delete="/CrewBoardList"
                cancel="/CrewBoardContents"
                currentCBcontent={currentCBcontent}
              />
            </ContentsBox>
          </Wrapper>
        </>
      )}
    </>
  );
}
