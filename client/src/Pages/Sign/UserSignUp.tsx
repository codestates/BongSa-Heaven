import styled from "styled-components";
import Header3 from "../../components/common/Header3";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

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
  margin: 10px 0px 30px 0px;
  background-color: #ffd4d4;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;
const Logo = styled.img`
  width: 10%;
  object-fit: cover;
`;
const SignUpImageBox = styled.div`
  display: none;
  @media screen and (min-width: 37.5rem) {
    width: 500px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 0px 50px 0px;
  }
`;
const SignUpImage = styled.img`
  width: 12%;
  object-fit: cover;
`;
const HeaderName = styled.span`
  color: #ff7676;
  margin-left: 5%;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;
  @media screen and (min-width: 37.5rem) {
    margin-left: 4%;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 36px;
    line-height: 27px;
    display: flex;
    align-items: center;
    color: #ff7676;
    cursor: pointer;
  }
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
  font-size: 12px;
  @media screen and (min-width: 37.5rem) {
    margin: 0;
    font-size: 16px;
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
    width: 60%;
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
  @media screen and (min-width: 37.5rem) {
    margin: 40px 0px 30px 0px;
  }
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
    useState("???????????? 2~8 ??? ??????????????????");

  const [signUp, setIsSignUp] = useState(false);

  //????????? ?????? ?????? ????????? ?????? ????????? ????????????.

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: any) => {
    // console.log(e.target.value, "pass");
    setPassword(e.target.value);
  };
  const handlePasswordCheck = (e: any) => {
    // console.log(e.target.value, "??????");
    setPasswordCheck(e.target.value);
  };

  const handleNickname = (e: any) => {
    //setName????????????
    // console.log(nickname);
    setNicname(e.target.value);

    // validateNickname(e.target.vlaue)
  };

  const handleWantReigon = (e: any) => {
    // console.log(e.target.value);
    setWant_region(e.target.value);
  };
  const handleWantVol = (e: any) => {
    // console.log(e.target.value);
    setWant_vol(e.target.value);
  };
  //????????? ?????????.
  const handleSex = (key: any) => (e: any) => {
    // console.log(key);
    if (key === "man") {
      setSex("??????");
    } else if (key === "woman") {
      setSex("??????");
    }
  };

  // ????????? ?????????.
  const handleAge = (key: any) => (e: any) => {
    // console.log(key, age);

    if (key === "teen") {
      setAge("?????????");
    } else if (key === "adult") {
      setAge("??????");
    } else if (key === "senior") {
      setAge("??????");
    }
  };

  //????????? ??????
  const validateEmail = (email: any) => {
    //????????? ??????????????????.
    const regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (!regEmail.test(email)) {
      setEmailErrorMessage("????????? ????????? ????????????");
      return false;
    } else {
      setEmailErrorMessage("");
      return true;
    }
  };
  // ???????????? ??????
  const validateCheckPassword = (password: any, passwordCheck: any) => {
    if (password !== passwordCheck) {
      setPassCheckErrorMessage("????????? ??????????????? ??????????????????");
      return false;
    } else {
      setPassCheckErrorMessage("");
      return true;
    }
  };
  const validatePassword = (password: any) => {
    // 8????????? 16????????? ??? ??????, ??????, ???????????? ??????

    const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    if (!regPassword.test(password)) {
      setPassErrorMessage(
        "??????????????? 8~16???, ??????, ????????????,????????? ??????????????????",
      );
      return false;
    } else {
      setPassErrorMessage("");

      return true;
    }
  };
  //????????? ??????
  const validateNickname = (nickname: any) => {
    //???????????? ????????? ????????? ????????? ??????.
    //????????? ?????? ??????
    const max = 8;
    const min = 2;
    // console.log("validate", nickname.length);

    if (nickname.length < min || nickname.length > max) {
      // console.log("1??????, 9??????");
      setNickCheckErrorMessage("???????????? 2~8 ??? ??????????????????");
      return false;
    } else {
      setNickCheckErrorMessage("");
      // console.log("2?????? 8??????");

      return true;
      //2->1 ????????? ??? ??????
      //9->7?????? ??????
      //1->0 ?????? ?????? x
    }
  };

  //????????? ??????????????? ????????????.
  const handleNicknameCheck = () => {
    // validateNickname(nickname);
    //????????? ???????????? ?????? ????????? handlenick???
    //db??? ?????? nick??? ??????????????? ??????
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
          //db????????? ???????????? , ?????? ????????? ???????????? ?????? ???

          setNickCheckErrorMessage("?????? ????????? ????????? ?????????.");
          setIsNick(true);
        })
        .catch(err => {
          setNickCheckErrorMessage("????????? ????????? ?????????.");
          setIsNick(false);
        });
    }
    setIsNick(false);
  };

  //?????? ??????????????? ????????????
  const handleSignUpRequest = () => {
    // console.log("????????????");

    const validPassword = validatePassword(password);
    const checkPassword = validateCheckPassword(password, passwordCheck);
    const valideEmail = validateEmail(email);
    // const validNickname = validateNickname(nickname);
    // console.log(
    // validNickname,
    //   isNick,
    //   validPassword,
    //   checkPassword,
    //   valideEmail,
    //   want_vol,
    //   want_region,
    //   age,
    //   sex,
    // );
    // validateEmail(email);
    //?????? ????????? ?????? ????????? ???????????? ???????????? ??????
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
          // console.log("??????");
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
          setEmailErrorMessage("????????? ???????????????.");
        });
      //??????????????? ??????????????? ?????????.
    }
  };

  return (
    <>
      <Header3 />
      <Wrapper>
        <MainContainer>
          <SignUpImageBox>
            <SignUpImage src="./image/logo2.png" />
            <HeaderName>????????? ????????????</HeaderName>
          </SignUpImageBox>
          <LogoBox>
            <Logo src="./image/logo2.png"></Logo>
            <HeaderName>????????? ????????????</HeaderName>
          </LogoBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handleEmail}
              placeholder="?????????(?????????)"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <CheckingPossibleOrNotBox>
            <PossibleOrNot>{emailErrorMessage}</PossibleOrNot>
          </CheckingPossibleOrNotBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handleNickname}
              placeholder="?????????"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <CheckingPossibleOrNotBox>
            <PossibleOrNot>{nickCheckErrorMessage}</PossibleOrNot>
            <CheckingPossibleOrNotButton onClick={handleNicknameCheck}>
              ?????? ??????
            </CheckingPossibleOrNotButton>
          </CheckingPossibleOrNotBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handlePassword}
              type="password"
              placeholder="????????????"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <CheckingPossibleOrNotBox>
            <PossibleOrNot>{passErrorMessage}</PossibleOrNot>
          </CheckingPossibleOrNotBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handlePasswordCheck}
              type="password"
              placeholder="???????????? ??????"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <CheckingPossibleOrNotBox>
            <PossibleOrNot>{passCheckErrorMessage}</PossibleOrNot>
          </CheckingPossibleOrNotBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handleWantReigon}
              placeholder="?????? ?????? ??????"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handleWantVol}
              placeholder="?????? ?????? ??????"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          {sex ? (
            sex === "??????" ? (
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
            age === "?????????" ? (
              <SelectBox>
                <AgeButtonSelected onClick={handleAge("teen")}>
                  ?????????
                </AgeButtonSelected>
                <AgeButton onClick={handleAge("adult")}>??????</AgeButton>
                <AgeButton onClick={handleAge("senior")}>??????</AgeButton>
              </SelectBox>
            ) : age === "??????" ? (
              <SelectBox>
                <AgeButton onClick={handleAge("teen")}>?????????</AgeButton>
                <AgeButtonSelected onClick={handleAge("adult")}>
                  ??????
                </AgeButtonSelected>
                <AgeButton onClick={handleAge("senior")}>??????</AgeButton>
              </SelectBox>
            ) : (
              <SelectBox>
                <AgeButton onClick={handleAge("teen")}>?????????</AgeButton>
                <AgeButton onClick={handleAge("adult")}>??????</AgeButton>
                <AgeButtonSelected onClick={handleAge("senior")}>
                  ??????
                </AgeButtonSelected>
              </SelectBox>
            )
          ) : (
            <SelectBox>
              <AgeButton onClick={handleAge("teen")}>?????????</AgeButton>
              <AgeButton onClick={handleAge("adult")}>??????</AgeButton>
              <AgeButton onClick={handleAge("senior")}>??????</AgeButton>
            </SelectBox>
          )}

          <CompleteBox>
            <CompleteButton onClick={handleSignUpRequest}>
              ????????????
            </CompleteButton>
          </CompleteBox>
        </MainContainer>
      </Wrapper>
    </>
  );
}
