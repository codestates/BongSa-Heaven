import React from "react";
import {useHistory} from "react-router";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons";

const MaillTitleContainer = styled.div`
  margin: 20px 0px 20px 0px;
  height: 33px;
  width: 100%;
  max-width: 375px;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 37.5rem) {
    width: 42%;
    max-width: none;
    justify-content: center;
  }
`;
const MaillTitleContainerDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MaillTitleCancleBox = styled.div`
  width: 20%;
`;
const MaillTitleCancle = styled.button`
  background: #f7f7f7;
  min-width: 65px;
  width: 100px;
  height: 22px;
  border-radius: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #000000;
  border: 0;
  cursor: pointer;
  &:hover {
    background-color: #e8e8e8;
    transition: 0.3s;
  }
  @media screen and (min-width: 37.5rem) {
  }
`;
const MaillTitleText = styled.div`
  width: 50%;
  height: 21px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */
  text-align: center;
  color: #448b76;
  @media screen and (min-width: 37.5rem) {
    width: 50%;
  }
`;
const MaillTitleBtn = styled.button`
  width: 30%;
  max-width: 90px;
  height: 22px;
  background: #ff7676;
  border-radius: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #000000;
  border: 0;
`;
const MaillTitleBtnSpan = styled.span`
  color: #ffffff;
  margin-left: 7px;
`;

export default function MaillWriteBottom() {
  const history = useHistory();
  const GoBack = () => {
    history.goBack();
  };

  const GoMaillWriteCheck = () => {
    history.push("/MaillWriteCheck");
  };

  return (
    <>
      <MaillTitleContainer>
        <MaillTitleContainerDiv>
          <MaillTitleCancleBox>
            <MaillTitleCancle onClick={GoBack}>취소</MaillTitleCancle>
          </MaillTitleCancleBox>
          <MaillTitleText></MaillTitleText>
          <MaillTitleBtn onClick={GoMaillWriteCheck}>
            <FontAwesomeIcon icon={faPaperPlane} />
            <MaillTitleBtnSpan>쪽지 보내기</MaillTitleBtnSpan>
          </MaillTitleBtn>
        </MaillTitleContainerDiv>
      </MaillTitleContainer>
    </>
  );
}
