import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import {useHistory} from "react-router";
import Header3 from "../../components/common/Header3";

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
  cursor: pointer;
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
const DeleteBtn = styled.div`
  margin-bottom: 15px;
  background-color: #448b76;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 80px 20px 80px;
  border-radius: 5px;
  width: 110px;
  opacity: 0.6;
  height: 5px;
  cursor: pointer;
`;

export default function RecruiterEdit() {
  const history = useHistory();
  const GoUserDelete = () => {
    history.push("/UserDelete");
  };

  const [userInfo, setUserInfo] = useState<any>({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    imgUrl: "",
    want_region: "",
    want_vol: "",
    company: "",
  });
  const [dbNickName, setDbNickName] = useState("");
  const [dbPassword, setdbPassword] = useState("");
  const [newPass, setNewPass] = useState<any>({
    password: "",
    passwordCheck: "",
  });

  //errorMessage

  const [passErrorMessage, setPassErrorMessage] = useState("");
  const [passCheckErrorMessage, setPassCheckErrorMessage] = useState("");
  const [nickCheckErrorMessage, setNickCheckErrorMessage] = useState("");
  // setUserInfo({ ...userInfo, [key]: e.target.value });
  const [isNick, setIsNick] = useState(false);

  //새로운 성별

  const handleChange = (key: any) => (e: any) => {
    // 비밀번호, 닉네임은 새로 만들고 , 나머지는 기존 userInfo 변경?
    //유저 정보 변경시 새로운 데이터가 들어옴

    //userinfo에서 성별을 바꾸는 방법

    setUserInfo({...userInfo, [key]: e.target.value});

    // console.log(userInfo);
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
          setNickCheckErrorMessage("중복된 닉네임 입니다.");
          setIsNick(false);
        });
    }
    setIsNick(false);
  };
  const userInfoEditHandler = () => {
    const validPassword = validatePassword(newPass.password);
    const validNickname = validateNickname(userInfo.nickname);
    const validCheckPassword = validateCheckPassword(
      newPass.password,
      newPass.passwordCheck,
    );
    const isDbNickname = dbNickName === userInfo.nickname;

    //유저정보 변경은 어떻게 이루어지는가?
    //닉네임만 바꾸는 경우  userinfo를 onchange로 변화시키면 값읃 얻을수 있다.

    //비밀번호랑 닉네임 같이 바꾸는 경우
    //비밀번호만 바꾸는경우
    //닉네임만 바꾸는 경우
    //그외 나머지를 바꾸는 경우
    // console.log(isDbNickname);

    //비밀번호를 바꾸는 경우 비밀번호 유효성검사, 비밀번호가 같아야지 비밀번호를 바꿀수 있다.
    if (isDbNickname) {
      if (isDbNickname && userInfo.password === "") {
        axios
          .patch(
            `${process.env.REACT_APP_API_URI}/user/edit`,
            {
              nickname: userInfo.nickname,
              email: userInfo.email,
              password: newPass.password,
              want_region: userInfo.want_region,
              want_vol: userInfo.want_vol,
              sex: userInfo.sex,
              age: userInfo.age,
              company: userInfo.company,
              iscompany: true,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            },
          )
          .then(res => {
            // console.log(res.data.data);
            history.push("/RecruiterMyPage");
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
              nickname: userInfo.nickname,
              email: userInfo.email,
              password: newPass.password,
              want_region: userInfo.want_region,
              want_vol: userInfo.want_vol,
              sex: userInfo.sex,
              age: userInfo.age,
              company: userInfo.company,
              iscompany: true,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            },
          )
          .then(res => {
            // console.log(res.data.data);
            history.push("/RecruiterMyPage");
          })
          .catch(err => {
            console.log(err);
          });
      }
    } else {
      //닉유효성검사 + 중복체크 통과
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
              company: userInfo.company,
              iscompany: true,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            },
          )
          .then(res => {
            // console.log(res.data.data);
            history.push("/RecruiterMyPage");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        setNickCheckErrorMessage("닉네임 중복을 확인해주세요.");
      }
    }

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
        // console.log(res.data.data);

        setUserInfo({
          email: res.data.data.email,
          nickname: res.data.data.nickname,
          password: res.data.data.password,
          want_region: res.data.data.want_region,
          want_vol: res.data.data.want_vol,

          company: res.data.data.company,
        });
        setDbNickName(res.data.data.nickname);
        setdbPassword(res.data.data.password);
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
          <EditEmaill>현재 이메일 : {userInfo.email} </EditEmaill>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              defaultValue={userInfo.nickname}
              onChange={handleChange("nickname")}
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
              type="password"
              onChange={handleChange("password")}
              placeholder="비밀번호"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              type="password"
              onChange={handleChange("passwordCheck")}
              placeholder="비밀번호 확인"
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
              defaultValue={userInfo.want_region}
              onChange={handleChange("want_region")}
              placeholder="봉사활동 지역"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              defaultValue={userInfo.want_vol}
              onChange={handleChange("want_vol")}
              placeholder="봉사활동"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <SignUpWhiteBox>
            <SignUpWhiteInput
              defaultValue={userInfo.company}
              onChange={handleChange("company")}
              placeholder="기관명/봉사모집단체이름"
            ></SignUpWhiteInput>
          </SignUpWhiteBox>
          <CompleteBox>
            <CompleteButton onClick={userInfoEditHandler}>
              수정완료
            </CompleteButton>
            <DeleteBtn onClick={GoUserDelete}>회원탈퇴</DeleteBtn>
          </CompleteBox>
        </MainContainer>
      </Wrapper>
    </>
  );
}
