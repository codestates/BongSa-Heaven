import React from "react";
import styled from "styled-components";
import axios from "axios";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

import {issignout} from "../../modules/isSignIn";

const LogInOut = styled.div`
  background: #ffd5d5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  color: white;
  height: 64px;
  width: 100%;
  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;
const FooterImg = styled.img`
  width: 34px;
  height: 23px;
`;
const FooterTeam = styled.div`
  width: 100%;
  height: 12px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  margin-left: 17px;
  color: #171717;
  @media screen and (min-width: 37.5rem) {
    margin-left: 40%;
  }
`;

const FooterTeamName = styled.span`
  margin-left: 8px;
`;

const FooterGrid1Span = styled.span`
  margin-bottom: 9px;
  margin-left: 34px;
  @media screen and (min-width: 37.5rem) {
    margin-left: 40%;
  }
`;
const FooterGrid3Span = styled.span`
  margin-bottom: 9px;
  margin-left: 24px;
  @media screen and (min-width: 37.5rem) {
    font-size: 24px;
  }
`;

const FooterPosition = styled.div``;

const FooterContainer = styled.div`
  background: #f1f1f1;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function Footer({isLogin, setIsLogin, setIsUserLogin}: any) {
  const history = useHistory();
  const dispatch = useDispatch();

  const isSignIn = useSelector((state: any) => state.issignin.isSign);
  console.log(isSignIn, "im king of footer");

  const GoSignIn = () => {
    history.push("/SignIn");
  };

  const GoHome = () => {
    history.push("/");
  };

  const LogOut = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/auth/signout`,
        {},
        {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        },
      )
      .then(res => {
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("accessToken");
        setIsLogin(false);
        setIsUserLogin("user");
        dispatch(issignout());
        GoHome();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <FooterPosition>
        {isLogin ? (
          <LogInOut
            className="footer_signInOut"
            onClick={() => {
              GoHome();
              LogOut();
            }}
          >
            로그아웃
          </LogInOut>
        ) : (
          <LogInOut className="footer_signInOut" onClick={GoSignIn}>
            로그인
          </LogInOut>
        )}
        <FooterContainer>
          <div id="footer_div">
            <div id="footer_leftbox">
              <div className="footer_gitid1 footer_font">
                <FooterTeam>
                  <FooterImg src="/image/logo2.png" />
                  <FooterTeamName>봉사천국</FooterTeamName>
                </FooterTeam>
                <FooterGrid1Span>
                  <a href="https://github.com/changmoolee" className="GitIcon">
                    <FontAwesomeIcon icon={faGithub} /> - changmoolee
                  </a>
                </FooterGrid1Span>
              </div>
              <div className="footer_gitid2 footer_font">
                <a href="https://github.com/dpemdnjem23" className="GitIcon">
                  <FontAwesomeIcon icon={faGithub} /> - dpemdnjem23
                </a>
              </div>
            </div>
            <div id="footer_rightbox">
              <div className="footer_gitid3 footer_font">
                <FooterGrid3Span>
                  <a href="https://github.com/nkimtnt" className="GitIcon">
                    <FontAwesomeIcon icon={faGithub} /> - kimvayne
                  </a>
                </FooterGrid3Span>
              </div>
              <div className="footer_gitid4 footer_font">
                <a href="https://github.com/starguys" className="GitIcon">
                  <FontAwesomeIcon icon={faGithub} /> - starguys
                </a>
              </div>
            </div>
          </div>
        </FooterContainer>
      </FooterPosition>
    </>
  );
}
