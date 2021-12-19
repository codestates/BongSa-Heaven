import {useState, useEffect} from "react";
import styled from "styled-components";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import Header3 from "../../components/common/Header3";
import axios from "axios";
import {issignin} from "../../modules/isSignIn";

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
  margin: 80px 0px 50px 0px;
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
  width: 15%;
  object-fit: cover;
`;
const LogInImageBox = styled.div`
  display: none;
  @media screen and (min-width: 37.5rem) {
    width: 500px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    margin: 0px 0px 50px 0px;
  }
`;
const LogInImage = styled.img`
  width: 12%;
  object-fit: cover;
`;
const HeaderName = styled.span`
  color: #ff7676;
  margin-left: 5%;
  font-family: Roboto;
  font-size: 36px;
  font-weight: bold;
  @media screen and (min-width: 37.5rem) {
    margin-left: 4%;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 27px;
    display: flex;
    align-items: center;
    color: #ff7676;
    cursor: pointer;
  }
`;
const SignInWhiteBox = styled.div`
  background-color: white;
  width: 90%;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  padding: 15px 0px 15px 0px;
  margin: 8px 0px 8px 0px;
  @media screen and (min-width: 37.5rem) {
    margin: 0;
  }
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
  margin: 30px 0px 30px 0px;
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
  height: 25px;
  width: 110px;

  cursor: pointer;
`;

const GoogleButton = styled.div`
  margin-bottom: 15px;
  background-image: url("https://ifh.cc/g/CVdhQw.png");

  background-size: 100% 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 80px 20px 80px;
  border-radius: 5px;
  height: 25px;
  width: 115px;
  cursor: pointer;
`;

const KakaoButton = styled.div`
  margin-bottom: 15px;
  background-image: url("https://ifh.cc/g/nuizZs.png");

  background-size: 100% 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 80px 20px 80px;
  border-radius: 5px;
  height: 25px;
  width: 115px;
  cursor: pointer;
`;

const SingUpButton = styled.div`
  margin-bottom: 15px;
  background-color: #448b76;

  background-size: 100% 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 80px 20px 80px;
  border-radius: 5px;
  height: 25px;
  width: 115px;
  cursor: pointer;
`;

const GotoMainByGuestButton = styled.div`
  margin-bottom: 15px;
  background-color: #bb7bfc;

  background-size: 100% 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 80px 20px 80px;
  border-radius: 5px;
  height: 25px;
  width: 115px;
  cursor: pointer;
`;

export default function SignIn({setIsLogin, setIsUserLogin}: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  //로그인 버튼을 클릭햇을때 메인으로 이동하고 로그인 상태여야하고,
  const GoogleOauth = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email&prompt=select_account`;

  const kakaoOauth = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

  const googleControl = () => {
    sessionStorage.setItem("life", "have");
    sessionStorage.setItem("oauth", "have");
    window.location.assign(GoogleOauth);
  };
  const kakaoControl = () => {
    sessionStorage.setItem("life", "have");
    sessionStorage.setItem("oauth", "have");
    window.location.assign(kakaoOauth);
  };

  const handleEmail = (e: any) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handlePassword = (e: any) => {
    e.preventDefault();
    // console.log(e.target.value);
    setPassword(e.target.value);
  };
  // const onKeyPress = () => {
  //   if (window.event.keyCode == 13) {
  //     console.log("enter키로 로그인");
  //     handleLoginRequest();
  //   }
  // };

  const handleLoginRequest = async (e: any) => {
    //유효성 검사
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
        .then((res: any) =>
          //로컬스토리지에 저장, 메인으로 복귀

          localStorage.setItem("accessToken", res.data.accessToken),
        )
        .then(res => {
          sessionStorage.setItem("life", "have");
        })
        .then(res =>
          axios
            .get(`${process.env.REACT_APP_API_URI}/user/info`, {
              headers: {
                authorization: `Bearer ` + localStorage.getItem("accessToken"),
                "Content-Type": "application/json",
              },
              withCredentials: true,
            })
            .then(res => {
              // console.log(res);
              console.log("res.data.data.iscompany", res.data.data.iscompany);
              if (res.data.data.iscompany !== undefined) {
                setIsUserLogin("recruiter");
                setIsLogin(true);
                dispatch(issignin());

                history.push("/");
              } else {
                setIsLogin(true);
                dispatch(issignin());

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
  const moveToMain = () => {
    history.push("/");
  };
  //회원가입후 이메일 인증을 받도록 한다.
  //authcode를 받아와야함,
  //이메일 인증을 받지않으면 로그인 불가 (인증을 10분 이상 안할시 계정파기)
  //인증 메일코드는 5분마다 파기, 5분마다 재발급 받아야함(구현예정)
  const emailAuthCodeHandler = () => {
    const url = new URL(window.location.href);

    const searchs = url.search;
    console.log(searchs.split("=")[0]);

    if (searchs.split("=")[0] === "?authCode") {
      const code = searchs.split("=")[1];

      console.log(code);
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/auth/confirmemail`,
          {code: code},

          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then(data => {
          console.log("성공");
          history.push("/SignIn");
          setIsLogin(true);
          dispatch(issignin());
        })
        .catch(err => {
          console.log(err, "erro");
        });
    }
  };
  useEffect(() => {
    emailAuthCodeHandler();
  }, []);

  // console.log(window.location.href);
  return (
    <>
      <Wrapper>
        <MainContainer>
          <LogInImageBox onClick={moveToMain}>
            <LogInImage src="./image/logo2.png" />
            <HeaderName>봉사천국</HeaderName>
          </LogInImageBox>
          <LogoBox>
            <Logo src="./image/logo2.png"></Logo>
            <HeaderName onClick={moveToMain}>봉사천국</HeaderName>
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
              // onKeyUp={onKeyPress}
            ></SignInWhiteInput>
          </SignInWhiteBox>

          {errorMessage}

          <CompleteBox>
            <CompleteButton onClick={handleLoginRequest}>로그인</CompleteButton>
            <GoogleButton onClick={googleControl}></GoogleButton>
            <KakaoButton onClick={kakaoControl}></KakaoButton>
            <SingUpButton onClick={moveToSignUP}>회원가입</SingUpButton>
            <GotoMainByGuestButton onClick={moveToMain}>
              구경하기
            </GotoMainByGuestButton>
          </CompleteBox>
        </MainContainer>
      </Wrapper>
    </>
  );
}
