import {useHistory} from "react-router";
import Header2 from "../../components/common/Header2";
import styled from "styled-components";
import RecruiterMyPageMain from "../../components/Mypages/RecruiterMyPageMain";

const SeeRecruiterBtn = styled.button`
  margin-bottom: 14px;
  width: 97%;
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
    width: 760px;
    height: 71px;
    cursor: pointer;
  }
`;
const InfoEditBtn = styled.button`
  margin-bottom: 14px;
  width: 97%;
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
    width: 760px;
    height: 71px;
    cursor: pointer;
  }
`;
const MapRegister = styled.button`
  margin-bottom: 24px;
  width: 97%;
  height: 29px;
  background: #448b76;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
  border: 0;
  @media screen and (min-width: 37.5rem) {
    width: 760px;
    height: 71px;
    cursor: pointer;
  }
`;
const WebContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default function UserMyPage() {
  const history = useHistory();
  const GoSeeUsers = () => {
    history.push("/SeeUser");
  };
  const GoUserEditPasswordCheck = () => {
    history.push("/RecruiterPasswordCheck");
  };
  const GoMapRegister = () => {
    history.push("/MapRegister");
  };

  return (
    <>
      <Header2 componentName={"마이페이지"} />
      <WebContainer>
        <RecruiterMyPageMain />
        <SeeRecruiterBtn onClick={GoSeeUsers}>봉사자 보기</SeeRecruiterBtn>
        <InfoEditBtn onClick={GoUserEditPasswordCheck}>
          회원정보 수정하기
        </InfoEditBtn>
        <MapRegister onClick={GoMapRegister}>지도등록 하기</MapRegister>
      </WebContainer>
    </>
  );
}
