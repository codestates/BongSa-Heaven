import {useHistory} from "react-router";
import styled from "styled-components";
import {useState, useEffect} from "react";
import Pagination from "../../components/common/Pagination";
import Loading from "../../components/common/Loading";
import FreeBoardList from "./FreeBoardList";

const MainFreeBoardContianer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 37.5rem) {
    width: 1080px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const FreeBoardTitleContainer = styled.div`
  margin-top: 47px;
  margin-left: 18px;
  width: 100%;
  height: 24px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 35px;
  display: flex;
  align-items: center;
  letter-spacing: -0.495238px;
`;

const FreeBoardTittle = styled.span`
  cursor: pointer;
`;
const ContentsBox = styled.div`
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  margin: 15px 0px 15px 0px;
  padding: 0px 0px 10px 0px;

  @media screen and (min-width: 37.5rem) {
    margin: auto;
    background-color: white;
    width: 1080px;
    display: flex;
    flex-direction: column;
    padding: 20px 0px 20px 0px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;
export default function FreeBoard({
  GoToFreeBoardContent,
  userId,
  freeBoardinfo,
}: any) {
  const history = useHistory();
  const GoFreeBoradList = () => {
    history.push("/FreeBoardList");
  };

  const [isLoading, CheckLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = freeBoardinfo.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

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
          <MainFreeBoardContianer>
            <FreeBoardTitleContainer>
              <FreeBoardTittle onClick={() => GoFreeBoradList()}>
                자유게시판
              </FreeBoardTittle>
            </FreeBoardTitleContainer>
            <ContentsBox>
              {currentPosts &&
                currentPosts.length > 0 &&
                currentPosts.map((board: any) =>
                  board.user_id == null ? (
                    <FreeBoardList
                      key={board._id}
                      like={board.like}
                      like_count={board.like_count}
                      user_id={userId}
                      freeboard_id={board._id}
                      title={board.title}
                      writer="회원탈퇴자"
                      date={board.createdAt.slice(0, 10)}
                      GoToFreeBoardContent={GoToFreeBoardContent}
                    />
                  ) : (
                    <FreeBoardList
                      key={board._id}
                      like={board.like}
                      like_count={board.like_count}
                      user_id={userId}
                      freeboard_id={board._id}
                      title={board.title}
                      writer={board.user_id.nickname}
                      date={board.createdAt.slice(0, 10)}
                      GoToFreeBoardContent={GoToFreeBoardContent}
                    />
                  ),
                )}
            </ContentsBox>
            <Pagination
              postPerPage={postPerPage}
              totalPosts={freeBoardinfo.length}
              paginate={paginate}
            />
          </MainFreeBoardContianer>
        </>
      )}
    </>
  );
}
