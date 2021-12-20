import {useState, useEffect} from "react";
import {useHistory} from "react-router";
import styled from "styled-components";
import Header2 from "../../components/common/Header2";
import DesktopTitle from "../../components/common/DesktopTitle";
import Writing from "../../components/CrewBoard/Writing";
import List from "../../components/CrewBoard/List";
import Comment from "../../components/CrewBoard/Comment";
import Loading from "../../components/common/Loading";

const Wrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LinkButton2 = styled.div`
  cursor: pointer;
  background-color: #448b76;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 10px 0px 10px 0px;
  border-radius: 20px;
  margin-top 50px;
  margin-left: 30px;
  @media screen and (min-width: 37.5rem) {
    display: none;
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

export default function CrewBoardContents({
  isLogin,
  currentCBcontent,
  userId,
  GoToCrewBoardContent,
}: any) {
  const [isLoading, CheckLoading] = useState(true);
  const history = useHistory();
  const loadingHandler = () => {
    CheckLoading(false);
  };
  useEffect(() => {
    if (currentCBcontent.data !== undefined) {
      loadingHandler();
      localStorage.setItem(
        "currentCBcontent",
        JSON.stringify(currentCBcontent),
      );
    }
    setTimeout(() => loadingHandler(), 5000); // 무한 로딩 방지
  }, []);
  let temporaryData: any = localStorage.getItem("currentCBcontent");
  useEffect(() => {
    if (currentCBcontent.data === undefined && temporaryData !== undefined) {
      GoToCrewBoardContent(JSON.parse(temporaryData).data._id);
    }
    if (temporaryData !== undefined) {
      loadingHandler();
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : currentCBcontent.data === undefined && temporaryData === undefined ? (
        <>
          <LinkButton2 onClick={() => history.push("/")}>메인으로</LinkButton2>
          <BlankBox>
            <BlankImg src={"./image/NoData.png"} />
            데이터가 존재하지 않습니다!
          </BlankBox>
        </>
      ) : currentCBcontent.data === undefined && temporaryData !== undefined ? (
        <>
          <Wrapper>
            <Header2 componentName="모집글 보기" />
            <DesktopTitle title="모집글 보기" url="/CrewBoardList" />
            <Writing
              currentCBcontent={JSON.parse(temporaryData)}
              userId={userId}
              isLogin={isLogin}
            />
            <List
              backtoList="/CrewBoardList"
              isLogin={isLogin}
              currentCBcontent={JSON.parse(temporaryData)}
              userId={userId}
              GoToCrewBoardContent={GoToCrewBoardContent}
            />
            <Comment
              isLogin={isLogin}
              currentCBcontent={JSON.parse(temporaryData)}
              GoToCrewBoardContent={GoToCrewBoardContent}
            />
          </Wrapper>
        </>
      ) : (
        <>
          <Wrapper>
            <Header2 componentName="모집글 보기" />
            <DesktopTitle title="모집글 보기" url="/CrewBoardList" />
            <Writing
              currentCBcontent={currentCBcontent}
              userId={userId}
              isLogin={isLogin}
            />
            <List
              backtoList="/CrewBoardList"
              isLogin={isLogin}
              currentCBcontent={currentCBcontent}
              userId={userId}
              GoToCrewBoardContent={GoToCrewBoardContent}
            />
            <Comment
              isLogin={isLogin}
              currentCBcontent={currentCBcontent}
              GoToCrewBoardContent={GoToCrewBoardContent}
            />
          </Wrapper>
        </>
      )}
    </>
  );
}
