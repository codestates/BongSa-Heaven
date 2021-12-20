import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {changeName} from "../../modules/mailWriteName";
import {changeText} from "../../modules/mailWriteText";

const MaillNickCheckContainer = styled.div`
  margin-top: 10px;
  max-width: 42%;
  min-width: 332px;
  height: 42px;
  @media screen and (min-width: 37.5rem) {
    width: 100%;
  }
  display: flex;
  justify-content: center;
`;
const MaillNickCheckContainerDiv = styled.div`
  width: 90%;
  @media screen and (min-width: 37.5rem) {
    width: 1080px;
    display: flex;
    flex-direction: column;
  }
`;
const MaillNickCheckTop = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
`;
const MaillNickCheckTopDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 37.5rem) {
    width: 100%;
  }
`;
const MaillNickCheckTopWho = styled.div`
  width: 20%;
  min-width: 60px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #000000;
`;
const MaillNickCheckTopNameInput = styled.input`
  width: 60%;
  min-width: 160px;
  height: 22px;
  background: #ffffff;
  box-shadow: 0px 2px 11px 4px rgba(0, 0, 0, 0.05);
  border: 0;
  @media screen and (min-width: 37.5rem) {
    margin-left: 5%;
    width: 70%;
  }
`;
const MaillNickCheckTopNameCheckBtn = styled.button`
  width: 20%;
  min-width: 90px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: center;

  color: #000000;
  border: 0;

  &:hover {
    background-color: #e8e8e8;
    transition: 0.3s;
  }

  @media screen and (min-width: 37.5rem) {
    margin-left: 5%;
    cursor: pointer;
  }
`;

const MaillNickCheckBottom = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  margin: 5px 0 5px 0;
  @media screen and (min-width: 37.5rem) {
  }
`;
const MaillNickCheckBottomSpace = styled.div`
  width: 20%;
`;
const MaillNickCheckBottomText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  margin-top: 1%;
  opacity: 0.6;
`;
const MaillWriteInput = styled.input`
  margin-top: 12px;
  background: #ffffff;
  box-shadow: 0px 2px 11px 4px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  width: 317px;
  height: 196px;
  border: 0;
  @media screen and (min-width: 37.5rem) {
    width: 42%;
  }
`;
const MaillWriteInputContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 37.5rem) {
    width: 100%;
  }
`;
export default function MaillWriteMain(Title: any) {
  const dispath = useDispatch();

  const [value, setValue] = useState<any>("");
  const [text, setText] = useState<any>("");
  const [checkName, setCheckName] = useState<any>(false);

  useEffect(() => {
    dispath(changeName(value));
    dispath(changeText(text));
  }, [dispath, text, value]);
  const valueChange = (e: any) => {
    setValue(e.target.value);
    onChangeName(e.target.value);
  };
  const textChange = (e: any) => {
    setText(e.target.value);
    onChangeText(e.target.value);
  };
  const handleNicknameCheck = () => {
    if (value) {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/auth/mailnickcheck`,
          {
            nickname: value,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then(res => {
          setCheckName(true);
        })
        .catch(err => {
          setCheckName(false);
          console.log(err);
        });
    }
  };

  const onChangeName = (value: any) => {
    dispath(changeName(value));
  };

  const onChangeText = (text: any) => {
    dispath(changeText(text));
  };
  return (
    <>
      <MaillNickCheckContainer>
        <MaillNickCheckContainerDiv>
          <MaillNickCheckTop>
            <MaillNickCheckTopDiv>
              <MaillNickCheckTopWho>받는 사람</MaillNickCheckTopWho>
              <MaillNickCheckTopNameInput
                type="text"
                value={value}
                onChange={valueChange}
              />
              <MaillNickCheckTopNameCheckBtn onClick={handleNicknameCheck}>
                닉네임 확인
              </MaillNickCheckTopNameCheckBtn>
            </MaillNickCheckTopDiv>
          </MaillNickCheckTop>
          <MaillNickCheckBottom>
            <MaillNickCheckBottomSpace />
            {checkName ? (
              <MaillNickCheckBottomText>
                닉네임이 확인 되었습니다.
              </MaillNickCheckBottomText>
            ) : (
              <MaillNickCheckBottomText>
                닉네임을 확인해 주세요.
              </MaillNickCheckBottomText>
            )}
          </MaillNickCheckBottom>
        </MaillNickCheckContainerDiv>
      </MaillNickCheckContainer>
      <MaillWriteInputContainer>
        <MaillWriteInput type="text" value={text} onChange={textChange} />
      </MaillWriteInputContainer>
    </>
  );
}
