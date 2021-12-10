import React from "react";
import {useState, useEffect} from "react";
import styled from "styled-components";
import {useHistory} from "react-router";
import Header3 from "../../components/common/Header3";
import axios from "axios";
import {faWindowRestore} from "@fortawesome/free-solid-svg-icons";

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

const SignInWhiteBox = styled.div`
  background-color: white;
  width: 90%;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  padding: 15px 0px 15px 0px;
  margin: 8px 0px 8px 0px;
`;
const SignInWhiteInput = styled.input`
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

export default function SignIn({setIsLogin, setIsUserLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  //로그인 버튼을 클릭햇을때 메인으로 이동하고 로그인 상태여야하고,

  const handleEmail = e => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    e.preventDefault();
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const onKeyPress = () => {
    if (window.event.keyCode == 13) {
      console.log("enter키로 로그인");
      handleLoginRequest();
    }
  };
  const handleLoginRequest = async e => {
    //유효성 검사
    //이메일 인증 거쳐야함 status=true일때만 로그인 되도록함
    //status충족하지 못하면 인증 하라고 띄움
    if (!email) {
      setErrorMessage("이메일을 입력해주세요");
    } else if (!password) {
      setErrorMessage("비밀번호 입력해주세요");
    } else if (!email && !password) {
      setErrorMessage("이메일과 비밀번호를 입력하세요.");
    } else if (email && password) {
      axios

        .post(
          `${process.env.REACT_APP_API_URI}/auth/signin`,
          {email: email, password: password},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        )
        .then(res =>
          //로컬스토리지에 저장, 메인으로 복귀
          localStorage.setItem("accessToken", res.data.accessToken),
        )
        .then(res =>
          axios
            .get(`${process.env.REACT_APP_API_URI}/user/info`, {
              headers: {
                authorization: `Bearer ` + localStorage.getItem("accessToken"),
                "Content-Type": "application/json",
                withCredentials: true,
              },
            })
            .then(res => {
              console.log(res);
              console.log("res.data.data.iscompany", res.data.data.iscompany);
              if (res.data.data.iscompany !== undefined) {
                setIsUserLogin("recruiter");
                setIsLogin(true);
                history.push("/");
              } else {
                setIsLogin(true);
                history.push("/");
              }
            }),
        )
        .catch(err => {
          console.log(err);
          setErrorMessage("아이디 혹은 비밀번호가 일치하지 않습니다.");
        });
    }
  };
  //로그인창에서 이동
  const moveToSignUP = () => {
    history.push("/signup");
  };

  const authEmaill = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/auth/confirmemail`,
        {
          authCode: window.location.search.split("=")[1],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then(data => {
        history.push("/Signin");
      });
  };
  console.log();
  //window.location.se

  useEffect(() => {
    authEmaill();
    // authEmaill();
  }, []);
  const Oauth = `https://accounts.google.com/o/oauth2/v2/auth?client_id=288722608551-n6ktb74p9fbe0871dikkoul506eedkgq.apps.googleusercontent.com&response_type=code&redirect_uri=http://localhost:3000/callback&scope=https://www.googleapis.com/auth/userinfo.email`;

  const googleControl = () => {
    window.location.assign(Oauth);
  };

  return (
    <>
      <Header3 />
      <Wrapper>
        <MainContainer>
          <LogoBox>
            <Logo src="./image/logo2.png"></Logo>
          </LogoBox>

          <SignInWhiteBox>
            <SignInWhiteInput
              type="email"
              placeholder="아이디(이메일)"
              onChange={handleEmail}
            ></SignInWhiteInput>
          </SignInWhiteBox>

          <SignInWhiteBox>
            <SignInWhiteInput
              type="password"
              placeholder="비밀번호"
              onChange={handlePassword}
              onKeyUp={onKeyPress}
            ></SignInWhiteInput>
          </SignInWhiteBox>

          {errorMessage}

          <CompleteBox>
            <CompleteButton onClick={handleLoginRequest}>로그인</CompleteButton>
            <CompleteButton onClick={googleControl}>구글</CompleteButton>
            <CompleteButton onClick={moveToSignUP}>카카오</CompleteButton>
            <CompleteButton onClick={moveToSignUP}>회원가입</CompleteButton>
          </CompleteBox>
        </MainContainer>
      </Wrapper>
    </>
  );
}
