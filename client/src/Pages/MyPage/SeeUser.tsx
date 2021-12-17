import React, {useEffect, useState} from "react";
import axios from "axios";
import Header2 from "../../components/common/Header2";
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
export default function SeeUsers() {
  const [userList, setUserList] = useState([]);
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
      });
  }, []);
  // console.log(userList);

  return (
    <>
      <Header2 componentName={"봉사자 보기"} />
      <TopSpace></TopSpace>
      <SeeContainer>
        {userList.map(list => (
          <Users list={list} />
        ))}
      </SeeContainer>
    </>
  );
}
