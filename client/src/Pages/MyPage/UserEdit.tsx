import {useState, useEffect} from "react";
import styled from "styled-components";
import {useHistory} from "react-router";
import Header3 from "../../components/common/Header3";
import axios from "axios";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffd4d4;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
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
const EditEmaill = styled.div`
  @media screen and (min-width: 37.5rem) {
    font-size: 36px;
    margin-bottom: 5%;
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
    margin: 1px 0px 1px 0px;
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
  cursor: pointer;

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
  cursor: pointer;

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

export default function UserEdit() {
  const [userInfo, setUserInfo] = useState<any>({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    imgUrl: "",
    want_region: "",
    want_vol: "",
    age: "",
    sex: "",
  });
  const [dbNickName, setDbNickName] = useState("");
  const [dbPassword, setdbPassword] = useState("");
  const [newPass, setNewPass] = useState<any>({
    password: "",
    asswordCheck: "",
  });

  //errorMessage
  const [passErrorMessage, setPassErrorMessage] = useState("");
  const [passCheckErrorMessage, setPassCheckErrorMessage] = useState("");
  const [nickCheckErrorMessage, setNickCheckErrorMessage] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  // setUserInfo({ ...userInfo, [key]: e.target.value });
  const [isNick, setIsNick] = useState(false);

  const history = useHistory();

  const GoUserDelete = () => {
    history.push("/UserDelete");
  };
  //새로운 성별

  const handleChange = (key: any) => (e: any) => {
    // 비밀번호, 닉네임은 새로 만들고 , 나머지는 기존 userInfo 변경?
    //유저 정보 변경시 새로운 데이터가 들어옴

    //userinfo에서 성별을 바꾸는 방법

    setUserInfo({...userInfo, [key]: e.target.value});

    // console.log(userInfo);
    // console.log(userInfo.age);
    if (key === "man") {
      setUserInfo({...userInfo, sex: "남자"});
      setSex("남자");
    } else if (key === "woman") {
      setUserInfo({...userInfo, sex: "여자"});
      setSex("여자");
    }

    if (key === "teen") {
      setUserInfo({...userInfo, age: "청소년 "});
      setAge("청소년");
    } else if (key === "adult") {
      setUserInfo({...userInfo, age: "청년"});
      setAge("청년");
    } else if (key === "senior") {
      setUserInfo({...userInfo, age: "장년"});
      setAge("장년");
    }
    // console.log(userInfo.age, "age");

    if (key === "password") {
      setNewPass({...newPass, [key]: e.target.value});
    } else if (key === "passwordCheck") {
      setNewPass({...newPass, [key]: e.target.value});
    }

    // if (key === "newnickname") {
    //   console.log(newUserInfo);
    //   setNewUserInfo({ ...newUserInfo, [key]: e.target.value });
    // }

    // if (key === "newSex") {
    //   console.log(newUserInfo);
    //   setNewUserInfo({ ...newUserInfo, [key]: "남자" });
    // } else if (key === "newSex") {
    //   console.log(newUserInfo);
    //   setNewUserInfo({ ...newUserInfo, [key]: "여자" });
    // }
  };
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

  const validateNickname = (nickname: any) => {
    //닉네임은 자릿수 제한만 두기로 한다.
    //닉네임 중복 체크
    const max = 8;
    const min = 2;
    // console.log("validate", nickname.length);

    if (nickname.length < min || nickname.length > max) {
      // console.log("1이하, 9이상");
      setNickCheckErrorMessage("닉네임은 2~8 자 입력해주세요");
      return false;
    } else {
      setNickCheckErrorMessage("");
      // console.log("2이상 8이하");

      return true;
      //2->1 로갈때 가 문제
      //9->7까지 문제
      //1->0 일때 문제 x
    }
  };

  const handleNicknameCheck = () => {
    //userInfo 는 주어진 값
    //handleChange에 의해 변한값 따로
    // validateNickname(nickname);
    //버튼을 눌럿을시 내가 입력한 handlenick과
    //db에 있는 nick과 일치하는지 확인
    const valideNickname = validateNickname(userInfo.nickname);

    // console.log(s);
    if (userInfo.nickname && valideNickname) {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/auth/nickcheck`,
          {
            nickname: userInfo.nickname,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then(res => {
          // console.log("통과");
          if (userInfo.nickname !== res.data.data) {
            setNickCheckErrorMessage("사용 가능한 닉네임 입니다.");
            setIsNick(true);
          }
        })
        .catch(() => {
          // console.log("일치하는값 들어옴");
          if (dbNickName === userInfo.nickname) {
            setNickCheckErrorMessage("현재 닉네임 입니다.");
          } else {
            setNickCheckErrorMessage("중복된 닉네임 입니다.");
          }
          setIsNick(false);
        });
    }
    setIsNick(false);
  };
  const userInfoEditHandler = () => {
    const validPassword = validatePassword(newPass.password);
    const validNickname = validateNickname(userInfo.nickname);
    const validCheckPassword: any = validateCheckPassword(
      newPass.password,
      newPass.passwordCheck,
    );

    const isDbNickname = dbNickName === userInfo.nickname;

    // console.log(validNickname, validPassword, validCheckPassword, isNick);
    //유저정보 변경은 어떻게 이루어지는가?
    //닉네임만 바꾸는 경우  userinfo를 onchange로 변화시키면 값읃 얻을수 있다.

    // console.log(userInfo);
    //비밀번호랑 닉네임 같이 바꾸는 경우
    //비밀번호만 바꾸는경우
    //닉네임만 바꾸는 경우
    //그외 나머지를 바꾸는 경우

    //비밀번호를 바꾸는 경우 비밀번호 유효성검사, 비밀번호가 같아야지 비밀번호를 바꿀수 있다.
    if (isDbNickname) {
      if (isDbNickname && userInfo.password === "") {
        axios
          .patch(
            `${process.env.REACT_APP_API_URI}/user/edit`,
            {
              email: userInfo.email,
              nickname: userInfo.nickname,
              password: dbPassword,
              want_region: userInfo.want_region,
              want_vol: userInfo.want_vol,
              sex: userInfo.sex,
              age: age,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            },
          )
          .then(res => {
            // console.log(res.data.data);
            history.push("/UserMyPage");
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (validPassword && validCheckPassword) {
        axios
          .patch(
            `${process.env.REACT_APP_API_URI}/user/edit`,
            {
              email: userInfo.email,
              nickname: userInfo.nickname,
              password: newPass.password,

              want_region: userInfo.want_region,
              want_vol: userInfo.want_vol,
              sex: userInfo.sex,
              age: userInfo.age,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            },
          )
          .then(res => {
            // console.log(res.data.data);
            history.push("/UserMyPage");
          })
          .catch(err => {
            console.log(err);
          });
      }
    } else {
      if (validNickname && isNick) {
        // console.log("닉네임 변경");
        axios
          .patch(
            `${process.env.REACT_APP_API_URI}/user/edit`,
            {
              email: userInfo.email,
              nickname: userInfo.nickname,
              password: userInfo.password,

              want_region: userInfo.want_region,
              want_vol: userInfo.want_vol,
              sex: userInfo.sex,
              age: userInfo.age,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            },
          )
          .then(res => {
            // console.log(res.data.data);
            history.push("/UserMyPage");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        setNickCheckErrorMessage("닉네임 중복을 확인해주세요.");
      }
    }

    //닉유효성검사 + 중복체크 통과

    //비번 닉네임 동시에 바꾸는 경우

    //비번 제외 닉네임 제외하고 바꾸는 경우

    //닉네임 비번 외에는 유효성 검증 필요 없고 그냥 바꿀수 있음.

    //password를 바꾸고 싶다면, 유효성검증,이 통과되어야함
    // if(va)
  };

  const getUserInfoHandler = () => {
    // console.log(localStorage.getItem("accessToken"));
    //비밀번호, 닉네임, 등등 바꾸는 경우

    axios
      .get(`${process.env.REACT_APP_API_URI}/user/info`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "applicaton/json",
        },
      })

      .then(res => {
        // console.log(res.data.data.email);
        // console.log(res.data.data);

        setUserInfo({
          email: res.data.data.email,
          nickname: res.data.data.nickname,
          password: res.data.data.password,
          want_region: res.data.data.want_region,
          want_vol: res.data.data.want_vol,
          sex: res.data.data.sex,
          age: res.data.data.age,
        });
        setDbNickName(res.data.data.nickname);
        setdbPassword(res.data.data.password);
        setAge(res.data.data.age);
      })

      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserInfoHandler();
  }, []);
  return (
    <>
      <Header3 />
      <Wrapper>
        <MainContainer>
          <LogoBox>
            <Logo src="./image/logo2.png"></Logo>
          </LogoBox>
          <EditEmaill>현재 이메일 : {userInfo.email}</EditEmaill>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handleChange("nickname")}
              defaultValue={userInfo.nickname}
              placeholder="닉네임"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <CheckingPossibleOrNotBox>
            <PossibleOrNot> {nickCheckErrorMessage}</PossibleOrNot>
            <CheckingPossibleOrNotButton onClick={handleNicknameCheck}>
              중복 확인
            </CheckingPossibleOrNotButton>
          </CheckingPossibleOrNotBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handleChange("password")}
              placeholder="비밀번호"
              type="password"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handleChange("passwordCheck")}
              placeholder="비밀번호 확인"
              type="password"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <CheckingPossibleOrNotBox>
            <PossibleOrNot>
              {passErrorMessage}
              {passCheckErrorMessage}
            </PossibleOrNot>
          </CheckingPossibleOrNotBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handleChange("want_region")}
              defaultValue={userInfo.want_region}
              placeholder="희망 봉사 지역"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              onChange={handleChange("want_vol")}
              defaultValue={userInfo.want_vol}
              placeholder="희망 봉사 활동"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          {userInfo.sex ? (
            userInfo.sex === "남자" ? (
              <SelectSexBox>
                <SelectedSexButton onClick={handleChange("man")}>
                  <SexImageBox src="./image/young-man.png"></SexImageBox>
                </SelectedSexButton>
                <SelectSexButton onClick={handleChange("woman")}>
                  <SexImageBox src="./image/young-woman.png"></SexImageBox>
                </SelectSexButton>
              </SelectSexBox>
            ) : (
              <SelectSexBox>
                <SelectSexButton onClick={handleChange("man")}>
                  <SexImageBox src="./image/young-man.png"></SexImageBox>
                </SelectSexButton>
                <SelectedSexButton onClick={handleChange("woman")}>
                  <SexImageBox src="./image/young-woman.png"></SexImageBox>
                </SelectedSexButton>
              </SelectSexBox>
            )
          ) : (
            <SelectSexBox>
              <SelectSexButton onClick={handleChange("man")}>
                <SexImageBox src="./image/young-man.png"></SexImageBox>
              </SelectSexButton>
              <SelectSexButton onClick={handleChange("woman")}>
                <SexImageBox src="./image/young-woman.png"></SexImageBox>
              </SelectSexButton>
            </SelectSexBox>
          )}
          {userInfo.age ? (
            age === "청소년" ? (
              <SelectBox>
                <AgeButtonSelected onClick={handleChange("teen")}>
                  청소년
                </AgeButtonSelected>
                <AgeButton onClick={handleChange("adult")}>청년</AgeButton>
                <AgeButton onClick={handleChange("senior")}>장년</AgeButton>
                {/* {console.log(userInfo.age)} */}
              </SelectBox>
            ) : age === "청년" ? (
              <SelectBox>
                <AgeButton onClick={handleChange("teen")}>청소년</AgeButton>
                <AgeButtonSelected onClick={handleChange("adult")}>
                  청년
                </AgeButtonSelected>
                <AgeButton onClick={handleChange("senior")}>장년</AgeButton>
              </SelectBox>
            ) : (
              <SelectBox>
                <AgeButton onClick={handleChange("teen")}>청소년</AgeButton>
                <AgeButton onClick={handleChange("adult")}>청년</AgeButton>
                <AgeButtonSelected onClick={handleChange("senior")}>
                  장년
                </AgeButtonSelected>
              </SelectBox>
            )
          ) : (
            <SelectBox>
              <AgeButton onClick={handleChange("teen")}>청소년</AgeButton>
              <AgeButton onClick={handleChange("adult")}>청년</AgeButton>
              <AgeButton onClick={handleChange("senior")}>장년</AgeButton>
            </SelectBox>
          )}
          <CompleteBox>
            <CompleteButton onClick={userInfoEditHandler}>
              수정완료
            </CompleteButton>
            <CompleteButton onClick={GoUserDelete}>회원탈퇴</CompleteButton>
          </CompleteBox>
        </MainContainer>
      </Wrapper>
    </>
  );
}

/*
1.
현재 db 닉네임 = 인풋에 닉네임 true
else false

(password = null || checkpassword null) true

2.
현재 db 닉네임 = 인풋에 닉네임 true
else false

(유효password === 유효checkpassword) true

3. 
현재 db 닉네임 != 인풋에 유효닉네임 true

(password = null || checkpassword null) true

4.
현재 db 닉네임 != 인풋에 유효닉네임 true

(유효password === 유효checkpassword) true
*/
