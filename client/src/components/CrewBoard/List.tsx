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
  &:hover {
    background-color: #ff3030;
    transition: 0.3s;
  }

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

  font-size: 12px;
  @media screen and (min-width: 37.5rem) {
    width: 60%;
    height: 100%;
    font-size: 20px;
  }
`;

const LikeImg = styled.img`
  width: 20%;
  object-fit: cover;
  cursor: pointer;
  @media screen and (min-width: 37.5rem) {
    width: 7%;
  }
`;
const NotLikeImg = styled.img`
  width: 20%;
  object-fit: cover;
  cursor: pointer;
  @media screen and (min-width: 37.5rem) {
    width: 7%;
  }
`;

export default function List(props: any) {
  const history = useHistory();
  const BacktoList = (url: any) => history.push(url);
  const GotoLogIn = () => history.push("/SignIn");

  const likeThisContent = () => {
    if (props.isLogin) {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/board/crewlike`,
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
    } else {
      alert("로그인이 필요합니다.");
      GotoLogIn();
    }
  };
  const dislikeThisContent = () => {
    if (props.isLogin) {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/board/crewdislike`,
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
    } else {
      alert("로그인이 필요합니다.");
      GotoLogIn();
    }
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
          {props.currentCBcontent.data === undefined ||
          props.currentCBcontent.data.like === null ||
          undefined ? (
            <></>
          ) : (
            <>
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
            </>
          )}
        </LikeBox>
      </ListBox>
    </>
  );
}
