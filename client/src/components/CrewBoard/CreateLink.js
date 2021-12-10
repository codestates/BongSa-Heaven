import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router";

const LinkBox = styled.div`
  display: none;

  @media screen and (min-width: 37.5rem) {
    width: 256px;
    margin: auto;
    margin-top: 50px;
    display: flex;
    justify-content: flex-end;
    font-weight: bold;
    font-size: 16px;
  }
`;

const LinkButton = styled.div`
  display: none;

  @media screen and (min-width: 37.5rem) {
    cursor: pointer;
    background-color: #ff7676;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    padding: 20px 0px 20px 0px;
    border-radius: 20px;
  }
`;

export default function CreateLink(props) {
  const history = useHistory();
  const LinkToCreate = url => history.push(url);

  return (
    <>
      <LinkBox>
        {props.isLogin ? <LinkButton onClick={() => LinkToCreate(props.create)}>글쓰기</LinkButton> : <></>}
      </LinkBox>
    </>
  );
}
