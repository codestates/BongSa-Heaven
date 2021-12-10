import React from "react";
import styled from "styled-components";
import Header2 from "../../components/common/Header2";
import DesktopTitle from "../../components/common/DesktopTitle";
import Check from "../../components/Mypages/Check";

const ContentsBox = styled.div`
  @media screen and (min-width: 1024px) {
    margin: auto;
    background-color: white;
    width: 80%;
    display: flex;
    flex-direction: column;
    padding: 20px 0px 20px 0px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

export default function FreeBoardDelete({setIsLogin}) {
  return (
    <>
      <Header2 componentName="회원탈퇴" />
      <DesktopTitle title="회원탈퇴" />
      <ContentsBox>
        <Check
          contents="회원탈퇴를 하시겠습니까?"
          delete="/"
          cancel="/UserMyPage"
          leftBtn="회원탈퇴"
          setIsLogin={setIsLogin}
        />
      </ContentsBox>
    </>
  );
}
