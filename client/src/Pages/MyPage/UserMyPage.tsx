import {useState, useEffect} from "react";
import styled from "styled-components";
import {useHistory} from "react-router";
import Header2 from "../../components/common/Header2";
import UserMyPageMain from "../../components/Mypages/UserMyPageMain";
import axios from "axios";

const SeeRecruiterBtn = styled.button`
  margin-bottom: 14px;
  width: 97%;
  max-width: 327px;
  height: 29px;
  background: #ff7676;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
  border: 0;
  @media screen and (min-width: 37.5rem) {
    max-width: 760px;
    height: 71px;
    cursor: pointer;
  }
`;
const InfoEditBtn = styled.button`
  margin-bottom: 24px;
  width: 97%;
  max-width: 327px;
  height: 29px;
  background: #ff7676;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
  border: 0;
  @media screen and (min-width: 37.5rem) {
    max-width: 760px;
    height: 71px;
    cursor: pointer;
  }
`;

const HiddenVolContainer = styled.div`
  margin-bottom: 30px;
  width: 325px;
  height: 29px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (min-width: 37.5rem) {
    width: 760px;
    height: 71px;
    align-items: flex-start;
    justify-content: flex-end;
  }
`;

const HiddenVolToogleInput = styled.input``;
const HiddenVolToogleLabel = styled.label``;
const HiddenVolToogleBall = styled.span``;
const WebContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HiddenVolSpan = styled.span`
  @media screen and (min-width: 37.5rem) {
    margin-right: 30px;
    margin-top: 5px;
    font-size: 20px;
  }
`;

export default function UserMyPage() {
  const history = useHistory();
  const [isChecked, setIsChecked] = useState(true);

  const GetOauth = sessionStorage.getItem("oauth");

  const handleSwitch = () => {
    setIsChecked(!isChecked);
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

          iscompany: false,
          isopen: !isChecked,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      )
      .then(res => {})
      .catch(err => {});
  };
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

  const GoSeeRecruiter = () => {
    history.push("/SeeRecruiter");
  };
  const GoUserEditPasswordCheck = () => {
    if (GetOauth) {
      history.push("/OauthUserEdit");
    } else {
      history.push("/UserEditPasswordCheck");
    }
  };

  const getUserInfoHandler = () => {
    //비밀번호, 닉네임, 등등 바꾸는 경우

    axios
      .get(`${process.env.REACT_APP_API_URI}/user/info`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "applicaton/json",
        },
      })

      .then(res => {
        setUserInfo({
          email: res.data.data.email,
          nickname: res.data.data.nickname,
          password: res.data.data.password,

          want_region: res.data.data.want_region,
          want_vol: res.data.data.want_vol,
          sex: res.data.data.sex,
          age: res.data.data.age,
        });
        setIsChecked(res.data.data.isopen);
      })

      .catch(err => {});
  };

  useEffect(() => {
    getUserInfoHandler();
  }, []);

  return (
    <>
      <Header2 componentName={"마이페이지"} />
      <WebContainer>
        <UserMyPageMain userInfo={userInfo} />
        <SeeRecruiterBtn onClick={GoSeeRecruiter}>
          봉사모집자 보기
        </SeeRecruiterBtn>
        <InfoEditBtn onClick={GoUserEditPasswordCheck}>
          회원정보 수정하기
        </InfoEditBtn>
        <HiddenVolContainer>
          <HiddenVolSpan>봉사희망정보 숨기기</HiddenVolSpan>
          {/* 개인정보숨기기를 닫으면 개인정보가 recruiter한테 안보여짐 
          on =true, off = false*/}
          <div>
            <HiddenVolToogleLabel className="switch-button">
              <HiddenVolToogleInput
                type="checkbox"
                checked={isChecked}
                onChange={handleSwitch}
              />
              <HiddenVolToogleBall className="onoff-switch" />
            </HiddenVolToogleLabel>
          </div>
        </HiddenVolContainer>
      </WebContainer>
    </>
  );
}
