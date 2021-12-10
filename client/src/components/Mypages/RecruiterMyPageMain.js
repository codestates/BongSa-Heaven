import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import {useHistory} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";

const MyNameContainer = styled.div`
  margin-left: 22px;
  margin-top: 36px;
  margin-bottom: 48px;
  width: 331px;
  height: 135px;
  background: #ffffff;
  box-shadow: 0px 2px 11px 4px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media screen and (min-width: 37.5rem) {
    width: 760px;
    height: 330px;
  }
`;
const MyNameText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  @media screen and (min-width: 37.5rem) {
    font-size: 36px;
  }
`;
const MynameMaill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const MynameMaillSpan = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  @media screen and (min-width: 37.5rem) {
    font-size: 24px;
  }
`;

export default function RecruiterMyPageMain() {
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [myname, setMyname] = useState("");

  const handleMaillBox = () => {
    console.log("hi");
    history.push("/UserMaill");
  };

  const getUserInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/user/info`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        // console.log("res.data.data.nickname",res.data.data.nickname)
        setMyname(res.data.data.nickname);
      })
      .catch(err => {
        console.log("응 안돼~", err);
      });
  };

  const isNotLogin = () => history.push("/");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getUserInfo();
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <>
      {isLogin ? (
        <>
          <MyNameContainer>
            <MyNameText>{myname}님 어서오세요.</MyNameText>
            <MynameMaill onClick={handleMaillBox}>
              <FontAwesomeIcon icon={faEnvelope} className="MyPageIcon" />
              <MynameMaillSpan>쪽지함</MynameMaillSpan>
            </MynameMaill>
          </MyNameContainer>
        </>
      ) : (
        isNotLogin()
      )}
    </>
  );
}
