import React from "react";
import styled from "styled-components";
import axios from "axios";
import {useState, useEffect} from "react";

const CommentList = styled.div`
  flex-direction: column;
  align-items: center;
  width: 80%;
  border-radius: 20px;
  background-color: white;
  padding: 10px 0px 15px 0px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;

  @media screen and (min-width: 37.5rem) {
    width: 1080px;
  }
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: dashed gray 1px;
  padding: 20px 0px;

  @media screen and (min-width: 37.5rem) {
    padding: 30px 0px;
  }
`;
const CommentWriter = styled.span`
  margin-left: 25px;

  @media screen and (min-width: 37.5rem) {
    font-size: 24px;
  }
`;

const CommentDate = styled.span`
  margin-left: 30px;
  font-size: 14px;
  opacity: 0.5;

  @media screen and (min-width: 37.5rem) {
    font-size: 20px;
  }
`;

const CommentContents = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px 0px 25px;
  font-size: 12px;
  @media screen and (min-width: 37.5rem) {
    font-size: 16px;
    margin-top: 20px;
  }
`;

const CommentInputBox = styled.div`
  margin-top: 8px;
  width: 80%;
  height: 100px;
  display: flex;
  margin: 30px 0px 60px 0px;

  @media screen and (min-width: 37.5rem) {
    width: 1080px;
    flex-direction: column;
    align-items: flex-end;
    height: 300px;
  }
`;
const CommentInput = styled.div`
  width: 70%;
  height: 90%;
  margin: 30px 0px 30px 0px;
  @media screen and (min-width: 37.5rem) {
    width: 100%;
    height: 180px;
  }
`;
const CommentInputContents = styled.input`
  width: 100%;
  height: 90%;
  display: flex;

  @media screen and (min-width: 37.5rem) {
    ::placeholder {
      font-size: 16px;
      box-sizing: border-box;
    }
  }
`;

const CommentInputButton = styled.div`
  cursor: pointer;
  background-color: #ff7676;
  color: #ffffff;
  line-height: 23px;
  width: 22%;
  height: 90%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin: 30px 0px 30px 20px;

  @media screen and (min-width: 37.5rem) {
    margin: 0px 0px 30px 20px;
    width: 15%;
    font-size: 20px;
    height: 120px;
    line-height: 120%;
  }
`;

export default function Comment({currentCBcontent}) {
  const [commentValue, setCommentValue] = useState("");
  const [myId, setMyId] = useState("");
  const [refresh, SetRefresh] = useState(true);

  // console.log(currentFBcontent)

  // console.log(currentFBcontent.data.freecomments)

  // console.log("currentFBcontent.data._id",currentFBcontent.data._id)
  // console.log("user_id",myId)

  const getUserInfo = () => {
    axios
      .get("http://localhost:8080/user/info", {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        // console.log("res.data.data.nickname",res.data.data.nickname)
        setMyId(res.data.data._id);
      })
      .catch(err => {
        console.log("응 안돼~", err);
      });
  };

  const makeComment = e => {
    setCommentValue(e.target.value);
    console.log(commentValue);
  };

  const saveComment = () => {
    if (commentValue.length > 0) {
      axios
        .post(
          "http://localhost:8080/comment/cbcommentregister",
          {
            user_id: myId,
            crewboard_id: currentCBcontent.data._id,
            comment: commentValue,
          },
          {
            headers: {
              authorization: `Bearer ` + localStorage.getItem("accessToken"),
              "Content-Type": "application/json",
            },
          },
        )
        .then(res => {
          console.log(res.data.message);
          setCommentValue("");
          SetRefresh(!refresh);
          console.log(refresh);
        })
        // .then((res) => window.location.replace("/CrewBoardContents"))
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getUserInfo();
      // console.log("change change change~~");
    }
    // console.log(currentCBcontent.data);
  }, [refresh]);

  return (
    <>
      <CommentList>
        {currentCBcontent.data === undefined
          ? null
          : currentCBcontent.data.crewcomments.map((comment, idx) => (
              <CommentBox key={idx}>
                <CommentWriter>
                  {comment.user_id.nickname}
                  <CommentDate>{comment.createdAt.slice(0, 10)}</CommentDate>
                </CommentWriter>
                <CommentContents>{comment.comment}</CommentContents>
              </CommentBox>
            ))}
      </CommentList>

      <CommentInputBox>
        <CommentInput>
          <CommentInputContents
            placeholder="내용을 입력하세요."
            onChange={makeComment}
            value={commentValue}
          ></CommentInputContents>
        </CommentInput>
        <CommentInputButton onClick={saveComment}>
          댓 글<br />달 기
        </CommentInputButton>
      </CommentInputBox>
    </>
  );
}
