import React, {useEffect, useState} from "react";
import axios from "axios";
import Header2 from "../../components/common/Header2";
import Loading from "../../components/common/Loading";
import styled from "styled-components";
import Users from "../../components/Mypages/Users";

const TopSpace = styled.div`
  height: 43px;
`;
const SeeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
export default function SeeUsers() {
  const [isLoading, CheckLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  const loadingHandler = () => {
    CheckLoading(false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/user/list`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "applicaton/json",
        },
      })
      .then(res => {
        setUserList(res.data);
        loadingHandler();
      });

    setTimeout(() => loadingHandler(), 5000); // 무한 로딩 방지
  }, []);
  // console.log(userList);

  return (
    <>
      <Header2 componentName={"봉사자 보기"} />
      <TopSpace></TopSpace>
      <SeeContainer>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : userList.length === 0 ? (
          <BlankBox>
            <BlankImg src={"./image/NoData.png"} />
            데이터가 존재하지 않습니다!
          </BlankBox>
        ) : (
          userList.map(list => <Users list={list} />)
        )}
      </SeeContainer>
    </>
  );
}
