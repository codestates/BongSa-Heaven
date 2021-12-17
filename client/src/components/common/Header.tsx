import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {faUserCircle as LoginIcon} from "@fortawesome/free-solid-svg-icons";

import {issignin} from "../../modules/isSignIn";

const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 37.5rem) {
    background: #ffd5d5;
  }
  @media screen and (min-width: 37.5rem) {
    display: none;
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
`;
const HeaderSignIn = styled.button`
  margin-right: 3%;
  border: 0;
  background-color: white;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  line-height: 27px;
  display: flex;
  align-items: center;

  color: #448b76;
`;
const HeaderSignUp = styled.button`
  margin-right: 3%;
  border: 0;

  background-color: white;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  line-height: 27px;
  display: flex;
  align-items: center;

  color: #448b76;
`;

export default function Header() {
  const history = useHistory();
  const isRecruiter = false;

  const isSignIn = useSelector((state: any) => state.issignin.isSign);
  console.log(isSignIn, "im king");

  const GoMyPage = () => {
    console.log("hi");
    isRecruiter
      ? history.push("/RecruiterMyPage")
      : history.push("/UserMyPage");
  };
  const GoMap = () => {
    history.push("/Map");
  };
  const GoSignIn = () => {
    history.push("/SignIn");
  };

  return (
    <>
      <HeaderContainer>
        <HeaderLogIconLeft>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="HeaderIcon"
            onClick={GoMap}
          />
        </HeaderLogIconLeft>
        <LogoImg src="/image/logo2.png" />
        <HeaderLogIconRight>
          {isSignIn ? (
            <FontAwesomeIcon
              icon={LoginIcon}
              className="HeaderIcon"
              onClick={GoMyPage}
            />
          ) : (
            <FontAwesomeIcon
              icon={faUserCircle}
              className="HeaderIcon"
              onClick={GoSignIn}
            />
          )}
        </HeaderLogIconRight>
        <WebHeaderContainer>
          <WebHeaderLeft>
            <WebLogoImg src="/image/logo2.png" />
            <HeaderName>봉사천국</HeaderName>
          </WebHeaderLeft>
          <WebHeaderRight>
            <HeaderSignIn>로그인</HeaderSignIn>
            <HeaderSignUp>회원가입</HeaderSignUp>
          </WebHeaderRight>
        </WebHeaderContainer>
      </HeaderContainer>
    </>
  );
}
