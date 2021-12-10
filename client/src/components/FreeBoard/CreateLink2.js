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
  margin-right: 8vw;

  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;

export default function CreateLink(props) {
  const history = useHistory();
  const LinkToCreate = url => history.push(url);

  return <>{props.isLogin ? <LinkButton onClick={() => LinkToCreate(props.create)}>글쓰기</LinkButton> : <></>}</>;
}
