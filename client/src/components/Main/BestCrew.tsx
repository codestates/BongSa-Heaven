import {useEffect} from "react";
import {useHistory} from "react-router";
import styled from "styled-components";

const MainCrewBoardContainer = styled.div`
  @media screen and (max-width: 37.5rem) {
    width: 100%;
  }
  @media screen and (min-width: 37.5rem) {
    width: 1080px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
  }
`;

const CrewBoardBestTitle = styled.div`
  cursor: pointer;
  height: 24px;
  margin-top: 30px;
  margin-left: 18px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 35px;
  display: flex;
  align-items: center;
  letter-spacing: -0.495238px;
  color: #000000;
  @media screen and (min-width: 37.5rem) {
    font-size: 24px;
    margin-top: 64px;
  }
`;

const CrewBoardTop3Container = styled.div`
  margin-top: 21px;
  width: 100%;
  height: 138px;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 37.5rem) {
    width: 1080px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    height: 250px;
  }
`;
const CrewBoardTop3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin: auto;

  cursor: pointer;

  &:hover {
    width: 21%;
    transition: 0.3s;
  }
  @media screen and (min-width: 37.5rem) {
    width: 20%;
  }
`;
const CrewBoardTop3Image = styled.img`
  width: 100%;
  cursor: pointer;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
`;
const CrewBoardTop3Title = styled.div`
  width: 100%;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 37.5rem) {
    margin-top: 5px 0px 8px 0px;
    font-size: 20px;
  }
`;

const CrewBoardMoreBtnContainer = styled.div`
  width: 100%;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 37.5rem) {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CrewBoardMoreBtn = styled.button`
  width: 100%;
  height: 55px;
  background: #f7f7f7;
  border-radius: 4px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  cursor: pointer;
  border: 0;
  &:hover {
    background-color: #e8e8e8;
    transition: 0.3s;
  }
  @media screen and (min-width: 37.5rem) {
    width: 100%;
    font-size: 16px;
  }
`;
const BlankBox = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  opacity: 0.6;
  @media screen and (min-width: 37.5rem) {
    margin: auto;
    width: 30%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;
const BlankImg = styled.img`
  width: 50%;
  opacity: 0.3;
  object-fit: cover;
  margin-bottom: 20px;
`;

export default function BestCrew({
  crewBoardinfo,
  GoToCrewBoardContent,
  Top3crewBoardinfo,
}: any) {
  const history = useHistory();

  const GoCrewBoardList = () => {
    history.push("/CrewBoardList");
  };

  useEffect(() => {}, [crewBoardinfo]);
  return (
    <>
      <MainCrewBoardContainer>
        <CrewBoardBestTitle>Best Top 3 봉사단</CrewBoardBestTitle>
        <CrewBoardTop3Container>
          {Top3crewBoardinfo.length === 0 ? (
            <BlankBox>
              <BlankImg src={"./image/NoData.png"} />
              데이터가 존재하지 않습니다!
            </BlankBox>
          ) : (
            <>
              <CrewBoardTop3
                onClick={() => GoToCrewBoardContent(Top3crewBoardinfo[0]._id)}
              >
                <CrewBoardTop3Image src={Top3crewBoardinfo[0].images} />
                <CrewBoardTop3Title>
                  {Top3crewBoardinfo[0].title}
                </CrewBoardTop3Title>
              </CrewBoardTop3>

              <CrewBoardTop3
                onClick={() => GoToCrewBoardContent(Top3crewBoardinfo[1]._id)}
              >
                <CrewBoardTop3Image src={Top3crewBoardinfo[1].images} />
                <CrewBoardTop3Title>
                  {Top3crewBoardinfo[1].title}
                </CrewBoardTop3Title>
              </CrewBoardTop3>

              <CrewBoardTop3
                onClick={() => GoToCrewBoardContent(Top3crewBoardinfo[2]._id)}
              >
                <CrewBoardTop3Image src={Top3crewBoardinfo[2].images} />
                <CrewBoardTop3Title>
                  {Top3crewBoardinfo[2].title}
                </CrewBoardTop3Title>
              </CrewBoardTop3>
            </>
          )}
        </CrewBoardTop3Container>
        <CrewBoardMoreBtnContainer>
          <CrewBoardMoreBtn onClick={GoCrewBoardList}>
            더 많은 봉사단 보기
          </CrewBoardMoreBtn>
        </CrewBoardMoreBtnContainer>
      </MainCrewBoardContainer>
    </>
  );
}
