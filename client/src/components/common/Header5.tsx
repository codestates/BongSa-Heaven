import React from "react";
import styled from "styled-components";
import axios from "axios";
import {useHistory} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {faUserCircle as LoginIcon} from "@fortawesome/free-solid-svg-icons";

axios.defaults.withCredentials = true;

const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 37.5rem) {
    display: none;
  }
  @media screen and (min-width: 37.5rem) {
    border-bottom: 1px solid #ffd4d4;
    justify-content: center;
  }
`;

const HeaderLogIconLeft = styled.div`
  @media screen and (max-width: 37.5rem) {
    margin-left: 15px;
    width: 24px;
    height: 24px;
  }
  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;

const HeaderLogIconRight = styled.div`
  @media screen and (max-width: 37.5rem) {
    margin-right: 15px;
    width: 24px;
    height: 24px;
  }
  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;

const LogoImg = styled.img`
  @media screen and (max-width: 37.5rem) {
    width: 34px;
    height: 23px;
  }
  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;
const WebHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 37.5rem) {
    display: none;
  }
  @media screen and (min-width: 37.5rem) {
    width: 1080px;
    height: 100%;
  }
`;
const WebHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
`;
const WebHeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50%;
  height: 100%;
`;
const WebLogoImg = styled.img`
  @media screen and (max-width: 37.5rem) {
    display: none;
  }
  @media screen and (min-width: 37.5rem) {
    width: 34px;
    height: 23px;
    margin-left: 2%;
    cursor: pointer;
  }
`;
const HeaderName = styled.span`
  margin-left: 2%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  line-height: 27px;
  display: flex;
  align-items: center;
  color: #ff7676;
  cursor: pointer;
`;

const HeaderMain = styled.button`
  margin-right: 3%;
  border: 0;
  background-color: white;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 27px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #448b76;
  border: solid 2px white;
  &:hover {
    border-bottom: solid 2px #448b76;
    transition: 0.5s;
  }
`;
const HeaderMap = styled.button`
  margin-right: 3%;
  border: 0;
  background-color: white;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 27px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #448b76;
  border: solid 2px white;
  &:hover {
    border-bottom: solid 2px #448b76;
    transition: 0.5s;
  }
`;
const HeaderSignInOut = styled.button`
  margin-right: 3%;
  border: 0;
  background-color: white;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 27px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #448b76;
  border: solid 2px white;
  &:hover {
    border-bottom: solid 2px #448b76;
    transition: 0.5s;
  }
`;

const HeaderSignUpMyPage = styled.button`
  margin-right: 3%;
  border: 0;
  background-color: white;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 27px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #448b76;
  border: solid 2px white;
  &:hover {
    border-bottom: solid 2px #448b76;
    transition: 0.5s;
  }
`;

export default function Header({
  isLogin,
  setIsLogin,
  isUserLogin,
  setIsUserLogin,
  setUserId,
}: any) {
  const history = useHistory();

  const GoMyPage = () => {
    isUserLogin === "user"
      ? history.push("/UserMyPage")
      : history.push("/RecruiterMyPage");
  };
  const GoHome = () => {
    history.push("/");
  };
  const GoSignIn = () => {
    history.push("/SignIn");
  };
  const GoSignUp = () => {
    history.push("/SignUp");
  };
  const GoUserMyPage = () => {
    history.push("/UserMyPage");
  };
  const GoRecruiterMyPage = () => {
    history.push("/RecruiterMyPage");
  };
  const GoMap = () => {
    history.push("/Map");
  };

  const LogOut = () => {
    axios.get(`${process.env.REACT_APP_API_URI}/auth/resetrftk`).then(res => {
      console.log(res);
    });
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("life");
    sessionStorage.removeItem("oauth");
    setIsLogin(false);
    setIsUserLogin("user");
    setUserId("");
    GoHome();
  };

  // useEffect(() => {}, [isLogin, isUserLogin]);

  return (
    <>
      <HeaderContainer>
        <HeaderLogIconLeft>
          <FontAwesomeIcon icon={faBars} className="HeaderIcon" />
        </HeaderLogIconLeft>
        <LogoImg src="/image/logo2.png" />
        <HeaderLogIconRight>
          {isLogin ? (
            <FontAwesomeIcon icon={LoginIcon} className="HeaderIcon" />
          ) : (
            <FontAwesomeIcon
              icon={faUserCircle}
              className="HeaderIcon"
              onClick={GoMyPage}
            />
          )}
        </HeaderLogIconRight>
        <WebHeaderContainer>
          <WebHeaderLeft>
            <WebLogoImg src="/image/logo2.png" onClick={GoHome} />
            <HeaderName onClick={GoHome}>봉사천국</HeaderName>
          </WebHeaderLeft>
          <WebHeaderRight>
            <HeaderMain onClick={GoHome}>메인으로</HeaderMain>
            <HeaderMap onClick={GoMap}>봉사지도</HeaderMap>

            {isLogin ? (
              <HeaderSignInOut onClick={() => LogOut()}>
                로그아웃
              </HeaderSignInOut>
            ) : (
              <HeaderSignInOut onClick={GoSignIn}>로그인</HeaderSignInOut>
            )}
            {isLogin ? (
              isUserLogin === "user" ? (
                <HeaderSignUpMyPage onClick={GoUserMyPage}>
                  마이 페이지
                </HeaderSignUpMyPage>
              ) : (
                <HeaderSignUpMyPage onClick={GoRecruiterMyPage}>
                  마이 페이지
                </HeaderSignUpMyPage>
              )
            ) : (
              <HeaderSignUpMyPage onClick={GoSignUp}>
                회원가입
              </HeaderSignUpMyPage>
            )}
          </WebHeaderRight>
        </WebHeaderContainer>
      </HeaderContainer>
    </>
  );
}
