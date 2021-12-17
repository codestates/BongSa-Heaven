import {useState, useEffect} from "react";
import styled from "styled-components";
import Header2 from "../../components/common/Header2";
import DesktopTitle from "../../components/common/DesktopTitle";
import Writing from "../../components/FreeBoard/Writing";
import List from "../../components/FreeBoard/List";
import Comment from "../../components/FreeBoard/Comment";
import Loading from "../../components/common/Loading";

const Wrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function FreeBoardContents({
  isLogin,
  currentFBcontent,
  userId,
  GoToFreeBoardContent,
}: any) {
  console.log(currentFBcontent);

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
            <Header2 componentName="게시글 보기" />
            <DesktopTitle title="게시글 보기" url="/FreeBoardList" />
            <Writing
              currentFBcontent={currentFBcontent}
              userId={userId}
              isLogin={isLogin}
            />
            <List
              backtoList="/FreeBoardList"
              isLogin={isLogin}
              currentFBcontent={currentFBcontent}
              userId={userId}
              GoToFreeBoardContent={GoToFreeBoardContent}
            />
            <Comment
              isLogin={isLogin}
              currentFBcontent={currentFBcontent}
              GoToFreeBoardContent={GoToFreeBoardContent}
            />
          </Wrapper>
        </>
      )}
    </>
  );
}
