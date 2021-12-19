import styled from "styled-components";

const ContentsList = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
`;

const ContentsBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 80%;
  border-bottom: dashed gray 1px;
  padding: 10px 0px;
  @media screen and (min-width: 37.5rem) {
    padding: 20px 0px;
  }
`;
const ContentsWriter = styled.span`
  margin-left: 25px;
  opacity: 0.5;
  font-size: 12px;
  @media screen and (min-width: 37.5rem) {
    font-size: 14px;
  }
`;

const ContentsDate = styled.span`
  margin-left: 30px;
  font-size: 12px;
`;

const ContentsTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 0px 10px 20px;
  font-size: 12px;
  @media screen and (min-width: 37.5rem) {
    font-size: 14px;
  }
`;
const LikeBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  font-size: 12px;
  border-bottom: dashed gray 1px;
`;

const LikeImg = styled.img`
  width: 35%;
  object-fit: cover;
  @media screen and (min-width: 37.5rem) {
    width: 15%;
  }
`;
const NotLikeImg = styled.img`
  width: 35%;
  object-fit: cover;
  @media screen and (min-width: 37.5rem) {
    width: 15%;
  }
`;
export default function FreeBoardList({
  like,
  like_count,
  user_id,
  freeboard_id,
  title,
  writer,
  date,
  GoToFreeBoardContent,
}: any) {
  return (
    <>
      <ContentsList onClick={() => GoToFreeBoardContent(freeboard_id)}>
        <ContentsBox>
          <ContentsTitle>{title}</ContentsTitle>
          <ContentsWriter>
            {writer}
            <ContentsDate>{date.slice(0, 10)}</ContentsDate>
          </ContentsWriter>
        </ContentsBox>
        <LikeBox>
          {like.indexOf(user_id) === -1 ? (
            <NotLikeImg src={"./image/NotLike.png"} />
          ) : (
            <LikeImg src={"./image/Like.png"} />
          )}
          좋아요&nbsp;{like_count}&nbsp;
        </LikeBox>
      </ContentsList>
    </>
  );
}
