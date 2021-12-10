import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {changeName, changeText} from "../../modules/maillWriteRedux";

const MaillNickCheckContainer = styled.div`
  margin-left: 39px;
  margin-top: 10px;
  width: 332px;
  height: 42px;
  @media screen and (min-width: 37.5rem) {
    width: 100%;
  }
  display: flex;
  justify-content: center;
`;
const MaillNickCheckContainerDiv = styled.div`
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
  display: flex;
  @media screen and (min-width: 37.5rem) {
    width: 100%;
  }
`;
const MaillNickCheckTopWho = styled.div`
  width: 60px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #000000;
`;
const MaillNickCheckTopNameInput = styled.input`
  width: 160px;
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
  margin-left: 14px;
  width: 90px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: center;

  color: #000000;
  border: 0;
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
  @media screen and (min-width: 37.5rem) {
    margin-left: 5%;
  }
`;
const MaillNickCheckBottomText = styled.div`
  margin-left: 60px;
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
  margin-left: 36px;
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
  @media screen and (min-width: 37.5rem) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
export default function MaillWriteMain(Title) {
  const dispath = useDispatch();

  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const [checkName, setCheckName] = useState(false);

  useEffect(() => {
    setValue(Title.Title);
  }, []);
  const valueChange = e => {
    setValue(e.target.value);
  };
  const textChange = e => {
    setText(e.target.value);
  };
  const handleNicknameCheck = () => {
    if (value) {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}auth/nickcheck`,
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
          if (res.status === 200) return setCheckName(false);
          if (res.status === 201) return setCheckName(true);

          setCheckName(false);
        })
        .catch(err => {
          console.log("fail");
        });
    }
  };

  const onChangeName = value => {
    dispath(changeName(value));
  };

  const onChangeText = text => {
    dispath(changeText(text));
  };
  return (
    <>
      <MaillNickCheckContainer>
        <MaillNickCheckContainerDiv>
          <MaillNickCheckTop>
            <MaillNickCheckTopDiv>
              <MaillNickCheckTopWho>받는 사람</MaillNickCheckTopWho>
              <MaillNickCheckTopNameInput type="text" value={value} onChange={valueChange} />
              <MaillNickCheckTopNameCheckBtn onClick={handleNicknameCheck}>닉네임 확인</MaillNickCheckTopNameCheckBtn>
            </MaillNickCheckTopDiv>
          </MaillNickCheckTop>
          <MaillNickCheckBottom>
            {checkName ? (
              <MaillNickCheckBottomText>닉네임이 확인 되었습니다.</MaillNickCheckBottomText>
            ) : (
              <MaillNickCheckBottomText>닉네임을 확인해 주세요.</MaillNickCheckBottomText>
            )}
          </MaillNickCheckBottom>
        </MaillNickCheckContainerDiv>
      </MaillNickCheckContainer>
      <MaillWriteInputContainer>
        <MaillWriteInput type="text" value={text} onChange={textChange} />
        <button onClick={() => onChangeName(value)}>Name</button>
        <button onClick={() => onChangeText(text)}>Text</button>
      </MaillWriteInputContainer>
    </>
  );
}
