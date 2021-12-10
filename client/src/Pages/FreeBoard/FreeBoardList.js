import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import Header2 from "../../components/common/Header2";
import Loading from "../../components/common/Loading";
import CreateLink from "../../components/FreeBoard/CreateLink";
import CreateLink2 from "../../components/FreeBoard/CreateLink2";
import Contents from "../../components/FreeBoard/Contents";
import Pagination from "../../components/common/Pagination";

const Headerspace = styled.div`
  background-color: #ffb1b1;
  width: 100%;
  padding: 20px 0px 20px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;

const TitleBox = styled.div`
  width: 1080px;
  margin: auto;
  display: flex;
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

const ContentsBox = styled.div`
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

export default function FreeBoardList({GoToFreeBoardContent, isLogin}) {
  const [isLoading, CheckLoading] = useState(true);

  const [freeBoardinfo, setFreeBoardinfo] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const currentPosts = freeBoardinfo.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const loadingHandler = () => {
    CheckLoading(false);
  };

  const getFreeBoardList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/board/fblist`)
      .then(res => {
        setFreeBoardinfo(res.data.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setTimeout(() => loadingHandler(), 1000);
    getFreeBoardList();
  }, []);

  return (
    <>
      <Header2 componentName="자유 게시판" />
      <Headerspace>
        <CreateLink2 create="/FreeBoardCreate" isLogin={isLogin} />
      </Headerspace>

      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <TitleBox>
            <Title>자유 게시판</Title>
            <CreateLink create="/FreeBoardCreate" isLogin={isLogin} />
          </TitleBox>
          <ContentsBox>
            {currentPosts &&
              currentPosts.length > 0 &&
              currentPosts.map(board =>
                board.user_id.nickname == null ? (
                  <Contents
                    key={board._id}
                    freeboard_id={board._id}
                    title={board.title}
                    writer="탈퇴자"
                    date={board.createdAt.slice(0, 10) + "  " + board.createdAt.slice(11, 19)}
                    GoToFreeBoardContent={GoToFreeBoardContent}
                  />
                ) : (
                  <Contents
                    key={board._id}
                    freeboard_id={board._id}
                    title={board.title}
                    writer={board.user_id.nickname}
                    date={board.createdAt.slice(0, 10) + "  " + board.createdAt.slice(11, 19)}
                    GoToFreeBoardContent={GoToFreeBoardContent}
                  />
                ),
              )}
          </ContentsBox>
        </>
      )}
      <Pagination postPerPage={postPerPage} totalPosts={freeBoardinfo.length} paginate={paginate} />
    </>
  );
}
