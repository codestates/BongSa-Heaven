import React, {useState} from "react";
import {useHistory} from "react-router";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons";

const MaillTitleContainer = styled.div`
  margin-top: 27px;
  height: 33px;
  width: 100%;
  max-width: 375px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #f2f2f2;
  @media screen and (min-width: 37.5rem) {
    width: 42%;
    max-width: none;
    justify-content: center;
    border: 0;
  }
`;
const MaillTitleContainerDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MaillTitleCancle = styled.button`
  background: #f7f7f7;
  width: 20%;
  min-width: 65px;
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
  @media screen and (min-width: 37.5rem) {
    background: none;
    color: none;
    opacity: 0;
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
  cursor: pointer;
`;
const NeedTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const NeedTextDiv = styled.div`
  width: 1080px;
  display: flex;
  justify-content: flex-end;
`;
const NeedTextSpan = styled.span`
  margin-right: 17px;
`;

const MaillTitleBtnSpan = styled.span`
  color: #ffffff;
  margin-left: 7px;
`;

export default function MaillWriteTop() {
  const history = useHistory();

  const name = useSelector((state: any) => state.mailWriteName.name);
  const text = useSelector((state: any) => state.mailWriteText.text);

  const [isEmpty, setIsEmpty] = useState(false);

  const GoBack = () => {
    history.goBack();
  };
  const GoMaillWriteCheck = () => {
    if (name && text) {
      history.push("/MaillWriteCheck");
    } else {
      setIsEmpty(true);
    }
  };

  return (
    <>
      <MaillTitleContainer>
        <MaillTitleContainerDiv>
          <MaillTitleCancle onClick={GoBack}>취소</MaillTitleCancle>
          <MaillTitleText>쪽지 쓰기</MaillTitleText>
          <MaillTitleBtn onClick={GoMaillWriteCheck}>
            <FontAwesomeIcon icon={faPaperPlane} />
            <MaillTitleBtnSpan>쪽지 보내기</MaillTitleBtnSpan>
          </MaillTitleBtn>
        </MaillTitleContainerDiv>
      </MaillTitleContainer>
      {isEmpty ? (
        <NeedTextContainer>
          <NeedTextDiv>
            <NeedTextSpan>내용을 입력해 주세요!</NeedTextSpan>
          </NeedTextDiv>
        </NeedTextContainer>
      ) : null}
    </>
  );
}
