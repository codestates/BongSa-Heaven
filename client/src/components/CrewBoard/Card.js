import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router";

const Cardbox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto;
  margin-top: 3vh;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Img = styled.img`
  width: 100%;
  border-radius: 10px 10px 0px 0px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  object-fit: cover;
`;

const Describe = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50px;
  background-color: white;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  @media screen and (min-width: 37.5rem) {
    height: 80px;
  }
`;

const SayHello = styled.div`
  height: 30%;
  display: flex;
  font-size: 10px;
  align-items: flex-end;
  margin-left: 2vw;

  @media screen and (min-width: 37.5rem) {
    font-size: 14px;
  }
`;
const VolunteersName = styled.div`
  height: 40%;
  display: flex;
  font-size: 12px;
  align-items: center;
  color: #448b76;
  margin-left: 2vw;

  @media screen and (min-width: 37.5rem) {
    font-size: 16px;
  }
`;
const PublishedDate = styled.div`
  height: 30%;
  display: flex;
  align-items: center;
  opacity: 0.5;
  font-size: 8px;
  margin-left: 2vw;

  @media screen and (min-width: 37.5rem) {
    font-size: 12px;
  }
`;

export default function Card({crewboard_id, img, helloMessage, writer, date, GoToCrewBoardContent}) {
  return (
    <>
      <Cardbox onClick={() => GoToCrewBoardContent(crewboard_id)}>
        <ImageBox>
          <Img src={img} />
        </ImageBox>
        <Describe>
          <SayHello>{helloMessage}</SayHello>
          <VolunteersName>{writer}</VolunteersName>
          <PublishedDate>{date}</PublishedDate>
        </Describe>
      </Cardbox>
    </>
  );
}
