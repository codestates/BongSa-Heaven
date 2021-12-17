import React from "react";
import styled from "styled-components";
import Header2 from "../../components/common/Header2";
import MaillWriteTop from "../../components/Mypages/MaillWriteTop";
import MaillWriteMain from "../../components/Mypages/MaillWriteMain";
import MaillWriteBottom from "../../components/Mypages/MaillWriteBottom";

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function UserMaill() {
  return (
    <>
      <Header2 componentName={"쪽지"} />
      <Wrapper>
        <MaillWriteTop />
        <MaillWriteMain />
        <MaillWriteBottom />
      </Wrapper>
    </>
  );
}
