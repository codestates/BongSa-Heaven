import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router";

const TitleBox = styled.div`
  display: none;

  @media screen and (min-width: 37.5rem) {
    width: 1080px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 24px;
  }
`;
const Title = styled.div`
  cursor: pointer;
`;

export default function DesktopTitle(props) {
  const history = useHistory();

  const GoToURL = () => {
    history.push(props.url);
  };
  return (
    <>
      <TitleBox>
        <Title onClick={() => GoToURL()}>{props.title}</Title>
      </TitleBox>
    </>
  );
}
