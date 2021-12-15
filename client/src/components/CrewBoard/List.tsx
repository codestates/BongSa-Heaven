import styled from "styled-components";
import {useHistory} from "react-router";
import axios from "axios";

const ListBox = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  display: flex;
  padding: 10px;

  @media screen and (min-width: 37.5rem) {
    width: 1080px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  @media screen and (min-width: 37.5rem) {
    width: 30%;
  }
`;

const ListButton = styled.div`
  cursor: pointer;
  background-color: #ff7676;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 10px 0 10px 0;
  margin: 10px;
  border-radius: 20px;

  @media screen and (min-width: 37.5rem) {
    background-color: #ff7676;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    padding: 10px 0 10px 0;
    margin: 10px;
    border-radius: 20px;
    font-size: 24px;
  }
`;
const LikeBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 70%;

  font-size: 16px;
  @media screen and (min-width: 37.5rem) {
    width: 80%;
    height: 100%;
    font-size: 24px;
  }
`;

const LikeImg = styled.img`
  width: 30%;
  object-fit: cover;
  cursor: pointer;
  @media screen and (min-width: 37.5rem) {
    width: 10%;
    padding-right: 20px;
  }
`;
const NotLikeImg = styled.img`
  width: 30%;
  object-fit: cover;
  cursor: pointer;
  @media screen and (min-width: 37.5rem) {
    width: 10%;
    padding-right: 20px;
  }
`;

export default function List(props: any) {
  const history = useHistory();
  const BacktoList = (url: any) => history.push(url);
  console.log("wow", props.currentCBcontent, props.userId);

  const likeThisContent = () => {
    axios
      .post(
        "http://localhost:8080/board/crewlike",
        {
          crewboard_id: props.currentCBcontent.data._id,
        },
        {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        },
      )
      .then(res => {
        console.log("like good");
        props.GoToCrewBoardContent(props.currentCBcontent.data._id);
      })
      .catch(err => console.log(err));
  };
  const dislikeThisContent = () => {
    axios
      .post(
        "http://localhost:8080/board/crewdislike",
        {
          crewboard_id: props.currentCBcontent.data._id,
        },
        {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        },
      )
      .then(res => {
        console.log("dislike good");
        props.GoToCrewBoardContent(props.currentCBcontent.data._id);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <ListBox>
        <ButtonBox>
          <ListButton onClick={() => BacktoList(props.backtoList)}>
            목록
          </ListButton>
        </ButtonBox>
        <LikeBox>
          좋아요 &nbsp; {props.currentCBcontent.data.like.length} &nbsp;
          {props.currentCBcontent.data.like.indexOf(props.userId) === -1 ? (
            <NotLikeImg
              src={"./image/NotLike.png"}
              onClick={() => likeThisContent()}
            />
          ) : (
            <LikeImg
              src={"./image/Like.png"}
              onClick={() => dislikeThisContent()}
            />
          )}
        </LikeBox>
      </ListBox>
    </>
  );
}