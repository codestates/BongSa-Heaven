import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Header2 from "../../components/common/Header2";
import DesktopTitle from "../../components/common/DesktopTitle";
import Check from "../../components/common/Check";

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

export default function FreeBoardDelete({ userWithdrawalHandler }) {
  const history = useHistory();

  // 회원탈퇴시 모든 정보 삭제, 쿠키, 토큰 삭제
  return (
    <>
      <Header2 componentName="회원탈퇴" />
      <DesktopTitle title="회원탈퇴" />
      <ContentsBox>
        <Check
          onClick={userWithdrawalHandler}
          contents="회원탈퇴를 하시겠습니까?"
          cancel="/RecruiterEdit"
          leftBtn="회원탈퇴"
        />
      </ContentsBox>
    </>
  );
}