import React from "react";
import styled from "styled-components";

import Header3 from "../../components/common/Header3";
import {useState, useRef, useEffect} from "react";
import {Route, useHistory} from "react-router-dom";
import axios from "axios";
import {faLastfmSquare} from "@fortawesome/free-brands-svg-icons";
const Wrapper = styled.div`
  width: 100%;
  background-color: #ffd4d4;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 37.5rem) {
    background-color: white;
  }
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media screen and (min-width: 37.5rem) {
    margin-top: 65px;
    width: 1080px;
  }
`;

const LogoBox = styled.div`
  width: 80%;
  margin: 10px 0px 50px 0px;
  background-color: #ffd4d4;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;
const Logo = styled.img`
  width: 60%;
  object-fit: cover;
`;

const SignUpWhiteBox = styled.div`
  background-color: white;
  width: 90%;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  padding: 15px 0px 15px 0px;
  margin: 8px 0px 8px 0px;
  @media screen and (min-width: 37.5rem) {
    padding: 1px 0px 1px 0;
  }
`;
const SignUpWhiteInput = styled.input`
  width: 90%;
  border: none;
  @media screen and (min-width: 37.5rem) {
    border: solid 1px black;
    width: 40%;
    height: 40px;
  }

  ::placeholder {
  }
`;
const CheckingPossibleOrNotBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 37.5rem) {
    width: 35%;
  }
`;
const PossibleOrNot = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.5;
  margin-left: 5vw;
  @media screen and (min-width: 37.5rem) {
    margin: 0;
  }
`;

const CheckingPossibleOrNotButton = styled.div`
  background-color: #ff7676;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 10px;
  border-radius: 20px;
  cursor: pointer;
`;

const SelectSexBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 30px 0px 15px 0px;
  @media screen and (min-width: 37.5rem) {
    width: 40%;
    justify-content: space-between;
    /* background-color: yellow; */
  }
`;
const SelectSexButton = styled.div`
  background-color: #ffb1b1;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;
  height: 17vh;
  border-radius: 50%;
  @media screen and (min-width: 37.5rem) {
    width: 140px;
    height: 140px;
    justify-content: space-between;
    cursor: pointer;
  }
`;
const SelectedSexButton = styled.div`
  background-color: #ff7676;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;
  height: 17vh;
  border-radius: 50%;
  @media screen and (min-width: 37.5rem) {
    width: 140px;
    height: 140px;
    justify-content: space-between;
    cursor: pointer;
  }
`;
const SexImageBox = styled.img`
  margin: 1vh 0vh 0.5vh 0vh;
  width: 70%;
  height: 70%;
  object-fit: cover;
  @media screen and (min-width: 37.5rem) {
    margin: 10;

    /* background-color: yellow; */
  }
`;

const SelectBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 15px 0px 15px 0px;
  @media screen and (min-width: 37.5rem) {
    justify-content: center;
  }
`;
const AgeButton = styled.div`
  background-color: #ffb1b1;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 8vh;
  margin-right: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  @media screen and (min-width: 37.5rem) {
    margin: 0px 15px;
    width: 20%;
    height: 45px;
    cursor: pointer;
  }
`;

const AgeButtonSelected = styled.div`
  background-color: #ff7676;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 8vh;
  margin-right: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  @media screen and (min-width: 37.5rem) {
    margin: 0px 15px;
    width: 20%;
    height: 45px;
    cursor: pointer;
    /* transition: background-color 2s; */
  }
`;

const CompleteBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 10px 0px 30px 0px;
`;
const CompleteButton = styled.div`
  margin-bottom: 15px;
  background-color: #ff7676;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 80px 20px 80px;
  border-radius: 5px;
  width: 110px;
  cursor: pointer;
`;

export default function UserSignUp() {
  const history = useHistory();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNicname] = useState("");
  const [want_region, setWant_region] = useState("");
  const [want_vol, setWant_vol] = useState("");
  const [sex, setSex] = useState("");
  const [isNick, setIsNick] = useState(false);
  const [age, setAge] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passErrorMessage, setPassErrorMessage] = useState("");
  const [passCheckErrorMessage, setPassCheckErrorMessage] = useState("");
  const [nickCheckErrorMessage, setNickCheckErrorMessage] =
    useState("닉네임은 2~8 자 입력해주세요");

  const [signUp, setIsSignUp] = useState(false);

  //청소년 청년 장년 클릭시 해당 정보를 가져온다.

  const handleEmail = (e: any) => {
    console.log(e.target.value);
    console.log(process.env.REACT_APP_API_URI, "uri경로");
    setEmail(e.target.value);
  };
  const handlePassword = (e: any) => {
    console.log(e.target.value, "pass");
    setPassword(e.target.value);
  };
  const handlePasswordCheck = (e: any) => {
    console.log(e.target.value, "확인");
    setPasswordCheck(e.target.value);
  };

  const handleNickname = (e: any) => {
    //setName적용된후
    console.log(nickname);
    setNicname(e.target.value);

    // validateNickname(e.target.vlaue)
  };

  const handleWantReigon = (e: any) => {
    console.log(e.target.value);
    setWant_region(e.target.value);
  };
  const handleWantVol = (e: any) => {
    console.log(e.target.value);
    setWant_vol(e.target.value);
  };
  //성별을 다룬다.
  const handleSex = (key: any) => (e: any) => {
    console.log(key);
    if (key === "man") {
      setSex("남자");
    } else if (key === "woman") {
      setSex("여자");
    }
  };

  // 나이를 다룬다.
  const handleAge = (key: any) => (e: any) => {
    console.log(key, age);

    if (key === "teen") {
      setAge("청소년");
    } else if (key === "adult") {
      setAge("청년");
    } else if (key === "senior") {
      setAge("장년");
    }
  };

  //이메일 검증
  const validateEmail = (email: any) => {
    //이메일 형식어야한다.
    const regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (!regEmail.test(email)) {
      setEmailErrorMessage("이메일 형식이 아닙니다");
      return false;
    } else {
      setEmailErrorMessage("");
      return true;
    }
  };
  // 비밀번호 검증
  const validateCheckPassword = (password: any, passwordCheck: any) => {
    if (password !== passwordCheck) {
      setPassCheckErrorMessage("동일한 비밀번호를 입력해주세요");
      return false;
    } else {
      setPassCheckErrorMessage("");
      return true;
    }
  };
  const validatePassword = (password: any) => {
    // 8자이상 16자이하 의 숫자, 문자, 특수문자 조합

    const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    if (!regPassword.test(password)) {
      setPassErrorMessage(
        "비밀번호를 8~16자, 숫자, 특수문자,영어를 혼합해주세요",
      );
      return false;
    } else {
      setPassErrorMessage("");

      return true;
    }
  };
  //닉네임 검증
  const validateNickname = (nickname: any) => {
    //닉네임은 자릿수 제한만 두기로 한다.
    //닉네임 중복 체크
    const max = 8;
    const min = 2;
    console.log("validate", nickname.length);

    if (nickname.length < min || nickname.length > max) {
      console.log("1이하, 9이상");
      setNickCheckErrorMessage("닉네임은 2~8 자 입력해주세요");
      return false;
    } else {
      setNickCheckErrorMessage("");
      console.log("2이상 8이하");

      return true;
      //2->1 로갈때 가 문제
      //9->7까지 문제
      //1->0 일때 문제 x
    }
  };

  //닉네임 중복체크를 해야한다.
  const handleNicknameCheck = () => {
    // validateNickname(nickname);
    //버튼을 눌럿을시 내가 입력한 handlenick과
    //db에 있는 nick과 일치하는지 확인
    const valideNickname = validateNickname(nickname);
    // console.log(s);
    if (nickname && valideNickname) {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/auth/nickcheck`,
          {
            nickname: nickname,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then(res => {
          //db에있는 데이터와 , 현재 입력한 데이터가 일치 하

          setNickCheckErrorMessage("사용 가능한 닉네임 입니다.");
          setIsNick(true);
        })
        .catch(err => {
          setNickCheckErrorMessage("중복된 닉네임 입니다.");
          setIsNick(false);
        });
    }
    setIsNick(false);
  };

  //최종 회원가입을 눌렀을때
  const handleSignUpRequest = () => {
    console.log("클릭했어");

    const validPassword = validatePassword(password);
    const checkPassword = validateCheckPassword(password, passwordCheck);
    const valideEmail = validateEmail(email);
    // const validNickname = validateNickname(nickname);
    console.log(
      // validNickname,
      isNick,
      validPassword,
      checkPassword,
      valideEmail,
      want_vol,
      want_region,
      age,
      sex,
    );
    // validateEmail(email);
    //모든 유효성 검사 통과가 되었다면 회원가입 가능
    if (
      valideEmail &&
      isNick &&
      checkPassword &&
      validPassword &&
      want_vol &&
      want_region &&
      age &&
      sex
    ) {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/auth/signup`,
          {
            email: email,
            password: password,
            nickname: nickname,
            want_vol: want_vol,
            want_region: want_region,
            age: age,
            sex: sex,
            iscompany: false,
          },
          {headers: {"Content-Type": "application/json"}},
        )
        .then(res => {
          console.log("통과");
          setIsSignUp(true);
          history.push("/SignIn");

          axios
            .post(
              `${process.env.REACT_APP_API_URI}/auth/sendEmail`,
              {
                email: email,
              },
              {headers: {"Content-Type": "application/json"}},
            )
            .then(data => {})
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
          setIsSignUp(false);
          setEmailErrorMessage("이메일 중복됩니다.");
        });
      //가입했을시 인증메일을 보낸다.
    }
  };

  return (
    <>
      <Header3 />
      <Wrapper>
        <MainContainer>
          <LogoBox>
            <Logo src="./image/logo2.png"></Logo>
          </LogoBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handleEmail}
              placeholder="아이디(이메일)"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <CheckingPossibleOrNotBox>
            <PossibleOrNot>{emailErrorMessage}</PossibleOrNot>
          </CheckingPossibleOrNotBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handleNickname}
              placeholder="닉네임"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <CheckingPossibleOrNotBox>
            <PossibleOrNot>{nickCheckErrorMessage}</PossibleOrNot>
            <CheckingPossibleOrNotButton onClick={handleNicknameCheck}>
              중복 확인
            </CheckingPossibleOrNotButton>
          </CheckingPossibleOrNotBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handlePassword}
              type="password"
              placeholder="비밀번호"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <CheckingPossibleOrNotBox>
            <PossibleOrNot>{passErrorMessage}</PossibleOrNot>
          </CheckingPossibleOrNotBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handlePasswordCheck}
              type="password"
              placeholder="비밀번호 확인"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <CheckingPossibleOrNotBox>
            <PossibleOrNot>{passCheckErrorMessage}</PossibleOrNot>
          </CheckingPossibleOrNotBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handleWantReigon}
              placeholder="희망 봉사 지역"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handleWantVol}
              placeholder="희망 봉사 활동"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          {sex ? (
            sex === "남자" ? (
              <SelectSexBox>
                <SelectedSexButton onClick={handleSex("man")}>
                  <SexImageBox src="./image/young-man.png"></SexImageBox>
                </SelectedSexButton>
                <SelectSexButton onClick={handleSex("woman")}>
                  <SexImageBox src="./image/young-woman.png"></SexImageBox>
                </SelectSexButton>
              </SelectSexBox>
            ) : (
              <SelectSexBox>
                <SelectSexButton onClick={handleSex("man")}>
                  <SexImageBox src="./image/young-man.png"></SexImageBox>
                </SelectSexButton>
                <SelectedSexButton onClick={handleSex("woman")}>
                  <SexImageBox src="./image/young-woman.png"></SexImageBox>
                </SelectedSexButton>
              </SelectSexBox>
            )
          ) : (
            <SelectSexBox>
              <SelectSexButton onClick={handleSex("man")}>
                <SexImageBox src="./image/young-man.png"></SexImageBox>
              </SelectSexButton>
              <SelectSexButton onClick={handleSex("woman")}>
                <SexImageBox src="./image/young-woman.png"></SexImageBox>
              </SelectSexButton>
            </SelectSexBox>
          )}
          {age ? (
            age === "청소년" ? (
              <SelectBox>
                <AgeButtonSelected onClick={handleAge("teen")}>
                  청소년
                </AgeButtonSelected>
                <AgeButton onClick={handleAge("adult")}>청년</AgeButton>
                <AgeButton onClick={handleAge("senior")}>장년</AgeButton>
              </SelectBox>
            ) : age === "청년" ? (
              <SelectBox>
                <AgeButton onClick={handleAge("teen")}>청소년</AgeButton>
                <AgeButtonSelected onClick={handleAge("adult")}>
                  청년
                </AgeButtonSelected>
                <AgeButton onClick={handleAge("senior")}>장년</AgeButton>
              </SelectBox>
            ) : (
              <SelectBox>
                <AgeButton onClick={handleAge("teen")}>청소년</AgeButton>
                <AgeButton onClick={handleAge("adult")}>청년</AgeButton>
                <AgeButtonSelected onClick={handleAge("senior")}>
                  장년
                </AgeButtonSelected>
              </SelectBox>
            )
          ) : (
            <SelectBox>
              <AgeButton onClick={handleAge("teen")}>청소년</AgeButton>
              <AgeButton onClick={handleAge("adult")}>청년</AgeButton>
              <AgeButton onClick={handleAge("senior")}>장년</AgeButton>
            </SelectBox>
          )}

          <CompleteBox>
            <CompleteButton onClick={handleSignUpRequest}>
              회원가입
            </CompleteButton>
          </CompleteBox>
        </MainContainer>
      </Wrapper>
    </>
  );
}
