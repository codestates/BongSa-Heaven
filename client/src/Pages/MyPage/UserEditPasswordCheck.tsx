import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router";
import styled from "styled-components";
import Header4 from "../../components/common/Header4";

const PasswordCheckContainer = styled.div`
  @media screen and (min-width: 37.5rem) {
    width: 100%;
    display: flex;
    justify-content: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

const PassCheckTitle = styled.div`
  width: 80%;
  max-width: 290px;
  margin-left: 40px;
  margin-top: 26px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 35px;
  color: #000000;
  @media screen and (min-width: 37.5rem) {
    margin-left: 0px;
  }
`;
const PassCheckText = styled.div`
  margin-top: 30px;
  margin-left: 35px;
  width: 80%;
  max-width: 290px;
  height: 42px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;

  color: #000000;
  @media screen and (min-width: 37.5rem) {
    margin-left: 0px;
  }
`;

const PassCheckIsNotRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-left: 43px;
  width: 80%;
  max-width: 290px;
  height: 40px;
  color: red;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;

  @media screen and (min-width: 37.5rem) {
    margin-left: 0px;
  }
`;

const PasswordCheckInput = styled.input`
  margin-top: 100px;
  margin-left: 28px;
  width: 80%;
  max-width: 320px;
  height: 45px;
  background: #ffffff;
  border: 1px solid #000000;
  @media screen and (min-width: 37.5rem) {
    margin-left: 0px;
  }
`;
const CheckBtn = styled.button`
  margin-left: 27px;
  margin-top: 45px;
  margin-bottom: 140px;
  width: 80%;
  max-width: 327px;
  height: 55px;
  background: #f7f7f7;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  @media screen and (min-width: 37.5rem) {
    margin-left: 0px;
  }
`;

export default function UserEditPasswordCheck() {
  const history = useHistory();
  const GoUserEdit = () => {
    history.push("/UserEdit");
  };

  const [passwordToCheck, setPasswordToCheck] = useState("");
  const [passwordIsNotRight, setPasswordIsNotRight] = useState("");

  const handlePassword = (e: any) => {
    console.log(e.target.value);
    setPasswordToCheck(e.target.value);
  };

  const passwordChecking = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/user/password`,
        {password: passwordToCheck},
        {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        },
      )
      .then(res => {
        GoUserEdit();
        console.log(res.data.message);
      })
      .catch(err => {
        console.log(err.response.status);

        if (err.response.status === 404) {
          setPasswordIsNotRight("비밀번호가 일치하지 않습니다.");
        } else if (err.response.status === 401) {
          setPasswordIsNotRight(
            "회원정보가 등록되어 있지 않습니다. 먼저 등록부터 해주세요.",
          );
        }
      });
  };

  return (
    <>
      <Header4 />
      <PasswordCheckContainer>
        {/* <PasswordCheckContainerDiv> */}
        <PassCheckTitle>비밀번호 재확인</PassCheckTitle>
        <PassCheckText>
          회원의 정보를 안전하게 보호하기 위해,
          <br /> 비밀번호를 다시 한번 입력해 주시기 바랍니다.
        </PassCheckText>

        <PasswordCheckInput
          type="password"
          placeholder="password"
          onChange={handlePassword}
        />
        <PassCheckIsNotRight>{passwordIsNotRight}</PassCheckIsNotRight>

        <CheckBtn onClick={passwordChecking}>확인</CheckBtn>
        {/* </PasswordCheckContainerDiv> */}
      </PasswordCheckContainer>
    </>
  );
}
