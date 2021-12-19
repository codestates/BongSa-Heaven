import styled from "styled-components";
import axios from "axios";
import {useState, useEffect} from "react";
import {useHistory} from "react-router";
import NestedComment from "./NestedComment";

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
const CommentBlankBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 12px;
  opacity: 0.5;
  @media screen and (min-width: 37.5rem) {
    font-size: 16px;
  }
`;
const CommentListBigBox = styled.div`
  display: flex;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  border-bottom: dashed gray 1px;
  padding: 10px 0px;

  @media screen and (min-width: 37.5rem) {
    padding: 15px 0px;
  }
`;

const CommentWriter = styled.span`
  margin-left: 16px;

  @media screen and (min-width: 37.5rem) {
    font-size: 20px;
  }
`;

const CommentDate = styled.span`
  margin-left: 10px;
  font-size: 12px;
  opacity: 0.5;

  @media screen and (min-width: 37.5rem) {
    margin-left: 20px;
    font-size: 16px;
  }
`;
const CommentNestedCommentButton = styled.span`
  cursor: pointer;
  color: blue;
  font-size: 10px;
  margin-left: 5px;
  @media screen and (min-width: 37.5rem) {
    font-size: 16px;
    margin-left: 20px;
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

const EditCommentContents = styled.input`
  display: flex;
  align-items: center;
  margin: 10px 0px 0px 25px;
  font-size: 12px;
  @media screen and (min-width: 37.5rem) {
    font-size: 16px;
    margin-top: 20px;
  }
`;

const CommentListSmallBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  border-bottom: dashed gray 1px;
  padding: 10px 0px;
  @media screen and (min-width: 37.5rem) {
    padding: 15px 0px;
  }
`;
const CommentDeleteBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
`;
const CommentDeleteButton = styled.img`
  width: 15px;
  cursor: pointer;
  object-fit: cover;
  @media screen and (min-width: 37.5rem) {
    width: 24px;
  }
`;
const CommentEditAndNestedCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 37.5rem) {
    flex-direction: row;
`;

const CommentEditButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  margin-right: 18px;
  color: #ff7676;
  font-size: 12px;
  margin-top: 10px;

  @media screen and (min-width: 37.5rem) {
    font-size: 16px;
    margin-top: 20px;
  }
`;

const CommentEditButtonCheck = styled.div`
  cursor: pointer;
  background-color: #ff7676;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 20px;
  border-radius: 20px;
  margin-left: 5px;
  margin-top: 12px;
  font-size: 12px;
  &:hover {
    background-color: #ff3030;
    transition: 0.3s;
  }

  @media screen and (min-width: 37.5rem) {
    width: 30%;
    height: 25px;
    margin-left: 30px;
    font-size: 20px;
    margin-top: 30px;
  }
`;
const CommentEditButtonCancel = styled.div`
  cursor: pointer;
  background-color: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 20px;
  border: solid black 1px;
  border-radius: 20px;
  margin-left: 5px;
  margin-top: 12px;
  font-size: 12px;

@media screen and (min-width: 37.5rem) {
  width: 30%;
  height: 25px;
  margin-left: 25px;
  font-size: 20px;
  margin-top: 30px;
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
  &:hover {
    background-color: #ff3030;
    transition: 0.3s;
  }

  @media screen and (min-width: 37.5rem) {
    margin: 0px 0px 30px 20px;
    width: 15%;
    font-size: 20px;
    height: 120px;
    line-height: 120%;
  }
`;
const NestCommentInputButton = styled.div`
  cursor: pointer;
  background-color: #ff7676;
  color: #ffffff;
  line-height: 20px;
  width: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin: 20px 0px 0px 20px;
  font-size: 12px;
  &:hover {
    background-color: #ff3030;
    transition: 0.3s;
  }

  @media screen and (min-width: 37.5rem) {
    margin: 0px 0px 30px 20px;
    width: 15%;
    font-size: 20px;
    height: 120px;
    line-height: 120%;
  }
`;
const CommentInputCancelButton = styled.div`
  cursor: pointer;
  background-color: white;
  color: black;
  line-height: 30px;
  width: 100%;
  border: 0.5px black solid;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 30px 0px 0px 20px;

  @media screen and (min-width: 37.5rem) {
    margin: 0px 0px 30px 20px;
    width: 15%;
    font-size: 20px;
    height: 120px;
    line-height: 120%;
  }
`;
const NestedCommentInputBox = styled.div`
  width: 25%;
  height: 45%;
  @media screen and (min-width: 37.5rem) {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const YouhavetoLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  border-radius: 20px;
  background-color: white;
  margin: 20px 0px 20px 0px;
  border-radius: 15px;

  @media screen and (min-width: 37.5rem) {
    width: 1080px;
    font-size: 24px;
  }
`;

const GoToLogin = styled.div`
  display: none;
  @media screen and (min-width: 37.5rem) {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: #ff7676;
    color: #ffffff;
    margin: 20px 0px 20px 0px;
    border-radius: 15px;
    padding: 10px 0px 15px 0px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    width: 900px;
    font-size: 24px;
    &:hover {
      background-color: #ff3030;
      transition: 0.3s;
    }
  }
`;

export default function Comment({
  isLogin,
  currentFBcontent,
  GoToFreeBoardContent,
}: any) {
  const [myId, setMyId] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [nestedCommentValue, setNestedCommentValue] = useState("");
  const [CommentIdxForNestedComment, setCommentIdxForNestedComment] =
    useState(Number);
  const [isNestedCommentMode, setNestedCommentMode] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isEditCommentIdx, chosenEditCommentIdx] = useState(Number);
  const history = useHistory();
  const GotoLogIn = () => history.push("/SignIn");

  const getUserInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/user/info`, {
        headers: {
          authorization: `Bearer ` + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        setMyId(res.data.data._id);
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  const makeComment = (e: any) => {
    setCommentValue(e.target.value);
    // console.log(commentValue);
  };
  const makeNestedComment = (e: any) => {
    setNestedCommentValue(e.target.value);
    // console.log(nestedCommentValue);
  };

  const GoNestCommentInputMode = (idx: any) => {
    setNestedCommentMode(!isNestedCommentMode);
    setCommentIdxForNestedComment(idx);
  };

  const saveComment = () => {
    if (commentValue.length > 0) {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/comment/fbcommentregister`,
          {
            freeboard_id: currentFBcontent.data._id,
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
          // console.log(res.data.message);
          setCommentValue("");
          GoToFreeBoardContent(currentFBcontent.data._id);
        })
        .catch(err => console.log(err));
    }
  };
  const saveNestedComment = () => {
    if (nestedCommentValue.length > 0) {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/comment/fbchildregister`,
          {
            freeboard_id: currentFBcontent.data._id,
            comment: nestedCommentValue,
            freecomment_id:
              currentFBcontent.data.freecomments[CommentIdxForNestedComment]
                ._id,
          },
          {
            headers: {
              authorization: `Bearer ` + localStorage.getItem("accessToken"),
              "Content-Type": "application/json",
            },
          },
        )
        .then(res => {
          // console.log(res.data.message);
          setCommentValue("");
          setNestedCommentValue("");
          setNestedCommentMode(false);
          GoToFreeBoardContent(currentFBcontent.data._id);
        })
        .catch(err => console.log(err));
    }
  };

  const editComment = (idx: any) => {
    if (commentValue.length > 0) {
      axios
        .patch(
          `${process.env.REACT_APP_API_URI}/comment/fbcommentedit`,
          {
            freeboard_id: currentFBcontent.data._id,
            freecomment_id: currentFBcontent.data.freecomments[idx]._id,
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
          // console.log(res.data.message);
          setEditMode(false);
          setCommentValue("");
          GoToFreeBoardContent(currentFBcontent.data._id);
        })
        .catch(err => console.log(err));
    }
  };

  const deleteComment = (idx: any) => {
    // console.log(idx);
    axios
      .delete(`${process.env.REACT_APP_API_URI}/comment/fbcommentdelete`, {
        data: {
          freeboard_id: currentFBcontent.data._id,
          freecomment_id: currentFBcontent.data.freecomments[idx]._id,
        },
        headers: {
          authorization: `Bearer ` + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        // console.log(res.data.message);
        setEditMode(false);
        setNestedCommentMode(false);
        GoToFreeBoardContent(currentFBcontent.data._id);
      })
      .catch(err => console.log(err));

    alert("댓글이 삭제되었습니다!");
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getUserInfo();
    }
  }, []);

  return (
    <>
      <CommentList>
        {currentFBcontent.data === undefined ? (
          <></>
        ) : currentFBcontent.data.freecomments.length === 0 ? (
          <CommentBlankBox>첫번째 댓글을 남겨주세요.</CommentBlankBox>
        ) : (
          currentFBcontent.data.freecomments.map((comment: any, idx: any) => (
            <>
              <CommentListBigBox key={idx}>
                <CommentBox>
                  <CommentWriter>
                    {comment.user_id == null
                      ? "회원탈퇴자"
                      : comment.user_id.nickname}
                    <CommentDate>
                      {comment.createdAt === undefined
                        ? null
                        : comment.createdAt.slice(0, 10)}
                    </CommentDate>
                    {comment.user_id == null || !isLogin ? (
                      <></>
                    ) : (
                      <>
                        <CommentNestedCommentButton
                          onClick={() => GoNestCommentInputMode(idx)}
                        >
                          대댓글
                        </CommentNestedCommentButton>
                      </>
                    )}
                  </CommentWriter>
                  {comment.user_id == null ? (
                    <>
                      <CommentContents>{comment.comment}</CommentContents>
                    </>
                  ) : comment.user_id._id === myId &&
                    isEditMode &&
                    idx === isEditCommentIdx ? (
                    <EditCommentContents
                      onChange={makeComment}
                      defaultValue={comment.comment}
                    />
                  ) : (
                    <>
                      <CommentContents>{comment.comment}</CommentContents>
                    </>
                  )}
                </CommentBox>
                <CommentListSmallBox>
                  {comment.user_id == null || comment.user_id._id !== myId ? (
                    <></>
                  ) : isEditMode && idx === isEditCommentIdx ? (
                    <>
                      <CommentEditAndNestedCommentBox>
                        <CommentEditButtonCheck
                          onClick={() => editComment(isEditCommentIdx)}
                        >
                          수정
                        </CommentEditButtonCheck>
                        <CommentEditButtonCancel
                          onClick={() => {
                            setEditMode(false);
                          }}
                        >
                          취소
                        </CommentEditButtonCancel>
                      </CommentEditAndNestedCommentBox>
                    </>
                  ) : (
                    <>
                      <CommentDeleteBox>
                        <CommentDeleteButton
                          src={"./image/delete-button.png"}
                          onClick={() => deleteComment(isEditCommentIdx)}
                        />
                      </CommentDeleteBox>
                      <CommentEditButton
                        onClick={() => {
                          setEditMode(true);
                          chosenEditCommentIdx(idx);
                        }}
                      >
                        수정
                      </CommentEditButton>
                    </>
                  )}
                </CommentListSmallBox>
              </CommentListBigBox>
              <NestedComment
                setEditMode={setEditMode}
                isEditCommentIdx={isEditCommentIdx}
                chosenEditCommentIdx={chosenEditCommentIdx}
                setNestedCommentMode={setNestedCommentMode}
                nestedCommentValue={nestedCommentValue}
                setNestedCommentValue={setNestedCommentValue}
                makeNestedComment={makeNestedComment}
                myId={myId}
                comment={comment}
                idx={idx}
                currentFBcontent={currentFBcontent}
                GoToFreeBoardContent={GoToFreeBoardContent}
              />
            </>
          ))
        )}
      </CommentList>
      {!isLogin ? (
        <>
          <YouhavetoLogin>로그인을 해야 댓글을 달 수 있습니다.</YouhavetoLogin>
          <GoToLogin onClick={() => GotoLogIn()}>로그인</GoToLogin>
        </>
      ) : (
        <>
          {isNestedCommentMode ? (
            <CommentInputBox>
              <CommentInput>
                <CommentInputContents
                  placeholder="내용을 입력하세요."
                  onChange={makeNestedComment}
                  value={nestedCommentValue}
                ></CommentInputContents>
              </CommentInput>
              <NestedCommentInputBox>
                <CommentInputCancelButton
                  onClick={() => setNestedCommentMode(false)}
                >
                  취소
                </CommentInputCancelButton>
                <NestCommentInputButton onClick={() => saveNestedComment()}>
                  대 댓 글<br />달 기
                </NestCommentInputButton>
              </NestedCommentInputBox>
            </CommentInputBox>
          ) : (
            <CommentInputBox>
              <CommentInput>
                <CommentInputContents
                  placeholder="내용을 입력하세요."
                  onChange={makeComment}
                  value={isEditMode ? "" : commentValue}
                ></CommentInputContents>
              </CommentInput>
              <CommentInputButton onClick={() => saveComment()}>
                댓 글<br />달 기
              </CommentInputButton>
            </CommentInputBox>
          )}
        </>
      )}
    </>
  );
}
