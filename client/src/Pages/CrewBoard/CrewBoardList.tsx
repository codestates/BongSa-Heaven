import {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import Header2 from "../../components/common/Header2";
import Loading from "../../components/common/Loading";
import CreateLink from "../../components/CrewBoard/CreateLink";
import CreateLink2 from "../../components/CrewBoard/CreateLink2";
import Card from "../../components/CrewBoard/Card";
import Pagination from "../../components/common/Pagination";

const Wrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled.div`
  @media screen and (min-width: 37.5rem) {
    width: 1080px;
    margin: auto;
    display: flex;
  }
`;

const Title = styled.div`
  display: none;

  @media screen and (min-width: 37.5rem) {
    width: 768px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 24px;
  }
`;
const LinkBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;

const Cards = styled.div`
  @media screen and (min-width: 37.5rem) {
    width: 1110px;
    margin: auto;
    margin-bottom: 50px;
    display: flex;
  }
`;

const BigCard = styled.div`
  @media screen and (min-width: 37.5rem) {
    width: 60%;
    margin: auto;
    font-size: 20px;
  }
`;

const LeftCards = styled.div`
  @media screen and (min-width: 37.5rem) {
    width: 40%;
    margin: auto;
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

export default function CrewBoardList({
  GoToCrewBoardContent,
  userId,
  isLogin,
}: any) {
  const [isLoading, CheckLoading] = useState(true);

  const [crewBoardinfo, setCrewBoardinfo] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 3;

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const currentPosts: any = crewBoardinfo.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const loadingHandler = () => {
    CheckLoading(false);
  };

  const getCrewBoardList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/board/cblist`)
      .then(res => {
        setCrewBoardinfo(res.data.data);
        loadingHandler();
        // console.log(res.data.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getCrewBoardList();
    setTimeout(() => loadingHandler(), 5000); // 무한 로딩 방지
  }, []);

  return (
    <>
      <Wrapper>
        <Header2 componentName="봉사단 게시판" />
        <LinkBox>
          <CreateLink2 create="/CrewBoardCreate" isLogin={isLogin} />
        </LinkBox>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <TitleBox>
              <Title>봉사단 게시판</Title>
              <CreateLink create="/CrewBoardCreate" isLogin={isLogin} />
            </TitleBox>
            <Cards>
              {currentPosts && currentPosts.length === 0 ? (
                <BlankBox>
                  <BlankImg src={"./image/NoData.png"} />
                  데이터가 존재하지 않습니다!
                </BlankBox>
              ) : (
                <>
                  <BigCard>
                    <Card
                      key={0}
                      like={currentPosts[0].like}
                      like_count={currentPosts[0].like_count}
                      user_id={userId}
                      crewboard_id={currentPosts[0]._id}
                      img={currentPosts[0].images}
                      helloMessage={currentPosts[0].shorts_description}
                      writer={currentPosts[0].title}
                      date={currentPosts[0].createdAt}
                      GoToCrewBoardContent={GoToCrewBoardContent}
                    />
                  </BigCard>
                  <LeftCards>
                    {currentPosts.length === 2 ? (
                      <Card
                        key={1}
                        like={currentPosts[1].like}
                        like_count={currentPosts[1].like_count}
                        user_id={userId}
                        crewboard_id={currentPosts[1]._id}
                        img={currentPosts[1].images}
                        helloMessage={currentPosts[1].shorts_description}
                        writer={currentPosts[1].title}
                        date={currentPosts[1].createdAt}
                        GoToCrewBoardContent={GoToCrewBoardContent}
                      />
                    ) : null}
                    {currentPosts.length === 3 ? (
                      <>
                        <Card
                          key={1}
                          like={currentPosts[1].like}
                          like_count={currentPosts[1].like_count}
                          user_id={userId}
                          crewboard_id={currentPosts[1]._id}
                          img={currentPosts[1].images}
                          helloMessage={currentPosts[1].shorts_description}
                          writer={currentPosts[1].title}
                          date={currentPosts[1].createdAt}
                          GoToCrewBoardContent={GoToCrewBoardContent}
                        />
                        <Card
                          key={2}
                          like={currentPosts[2].like}
                          like_count={currentPosts[2].like_count}
                          user_id={userId}
                          crewboard_id={currentPosts[2]._id}
                          img={currentPosts[2].images}
                          helloMessage={currentPosts[2].shorts_description}
                          writer={currentPosts[2].title}
                          date={currentPosts[2].createdAt}
                          GoToCrewBoardContent={GoToCrewBoardContent}
                        />
                      </>
                    ) : null}
                  </LeftCards>
                </>
              )}
            </Cards>
          </>
        )}
        <Pagination
          postPerPage={postPerPage}
          totalPosts={crewBoardinfo.length}
          paginate={paginate}
        />
      </Wrapper>
    </>
  );
}
