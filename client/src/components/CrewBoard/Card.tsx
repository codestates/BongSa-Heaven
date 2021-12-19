import styled from "styled-components";

const Cardbox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto;
  margin-top: 3vh;
  &:hover {
    width: 82%;
    transition: 0.3s;
  }
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

const DescribeBox = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background-color: white;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  @media screen and (min-width: 37.5rem) {
    height: 80px;
  }
`;

const Describe = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 100%;

  @media screen and (min-width: 37.5rem) {
  }
`;
const LikeBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  width: 20%;

  @media screen and (min-width: 37.5rem) {
    font-size: 14px;
  }
`;

const LikeImg = styled.img`
  width: 50%;
  object-fit: cover;

  @media screen and (min-width: 37.5rem) {
    width: 35%;
  }
`;
const NotLikeImg = styled.img`
  width: 50%;
  object-fit: cover;

  @media screen and (min-width: 37.5rem) {
    width: 35%;
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

export default function Card({
  like,
  like_count,
  user_id,
  crewboard_id,
  img,
  helloMessage,
  writer,
  date,
  GoToCrewBoardContent,
}: any) {
  return (
    <>
      <Cardbox onClick={() => GoToCrewBoardContent(crewboard_id)}>
        <ImageBox>
          <Img src={img} />
        </ImageBox>
        <DescribeBox>
          <Describe>
            <SayHello>{helloMessage}</SayHello>
            <VolunteersName>{writer}</VolunteersName>
            <PublishedDate>{date.slice(0, 10)}</PublishedDate>
          </Describe>
          <LikeBox>
            {like.indexOf(user_id) === -1 ? (
              <NotLikeImg src={"./image/NotLike.png"} />
            ) : (
              <LikeImg src={"./image/Like.png"} />
            )}
            좋아요&nbsp;{like_count}&nbsp;
          </LikeBox>
        </DescribeBox>
      </Cardbox>
    </>
  );
}
