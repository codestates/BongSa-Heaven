import {useState, useEffect} from "react";
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

export default function CrewBoardContents({
  isLogin,
  currentCBcontent,
  userId,
  GoToCrewBoardContent,
}: any) {
  const [isLoading, CheckLoading] = useState(true);
  const loadingHandler = () => {
    CheckLoading(false);
  };
  useEffect(() => {
    setTimeout(() => loadingHandler(), 1000);
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <Loading />
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
