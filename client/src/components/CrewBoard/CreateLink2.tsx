import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router";

const LinkButton = styled.div`
  cursor: pointer;
  background-color: #ff7676;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 10px 0px 10px 0px;
  border-radius: 20px;

  @media screen and (min-width: 37.5rem) {
    display: none;
  }
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

  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;

export default function CreateLink(props: any) {
  const history = useHistory();
  const LinkToCreate = (url: any) => history.push(url);

  return (
    <>
      <LinkButton2 onClick={() => history.push("/")}>메인으로</LinkButton2>
      {props.isLogin ? (
        <LinkButton onClick={() => LinkToCreate(props.create)}>
          글쓰기
        </LinkButton>
      ) : (
        <></>
      )}
    </>
  );
}
