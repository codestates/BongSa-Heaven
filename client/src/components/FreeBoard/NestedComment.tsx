import styled from "styled-components";
import axios from "axios";
import {useState} from "react";

const CommentListBigBox = styled.div`
  display: flex;
`;
const NestedCommentsImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9%;
  @media screen and (min-width: 37.5rem) {
    width: 3%;
  }
`;
const NestedCommentsImg = styled.img`
  width: 50%;
  heigth: 50%;
  object-fit: cover;
`;

const NestedCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
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

const NestedCommentListSmallBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 21%;
  border-bottom: dashed gray 1px;
  padding: 10px 0px;
  @media screen and (min-width: 37.5rem) {
    width: 27%;
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

export default function NestedComment({
  setEditMode,
  isEditCommentIdx,
  chosenEditCommentIdx,
  setNestedCommentMode,
  nestedCommentValue,
  setNestedCommentValue,
  makeNestedComment,
  myId,
  comment,
  idx,
  currentFBcontent,
  GoToFreeBoardContent,
}: any) {
  const [isNestedEditMode, setNestedEditMode] = useState(false);
  const [isEditNestedCommentIdx, chosenEditNestedCommentIdx] = useState(Number);

  const editNestedComment = () => {
    if (nestedCommentValue.length > 0) {
      axios
        .patch(
          `${process.env.REACT_APP_API_URI}/comment/fbchildedit`,
          {
            freeboard_id: currentFBcontent.data._id,
            freecomment_id:
              currentFBcontent.data.freecomments[isEditCommentIdx]._id,
            freechild_id:
              currentFBcontent.data.freecomments[isEditCommentIdx]
                .freechildcomments[isEditNestedCommentIdx]._id,
            comment: nestedCommentValue,
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
          setNestedEditMode(false);
          setNestedCommentValue("");
          GoToFreeBoardContent(currentFBcontent.data._id);
        })
        .catch(err => console.log(err));
    }
  };

  const deleteNestedComment = (idx: number, nestIdx: number) => {
    axios
      .delete(`${process.env.REACT_APP_API_URI}/comment/fbchilddelete`, {
        data: {
          freeboard_id: currentFBcontent.data._id,
          freecomment_id: currentFBcontent.data.freecomments[idx]._id,
          freechild_id:
            currentFBcontent.data.freecomments[idx].freechildcomments[nestIdx]
              ._id,
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
        setNestedEditMode(false);
        GoToFreeBoardContent(currentFBcontent.data._id);
      })
      .catch(err => console.log(err));

    alert("댓글이 삭제되었습니다!");
  };

  return (
    <>
      {currentFBcontent.data.freecomments[idx].freechildcomments.map(
        (childComment: any, nestIdx: any) => (
          <CommentListBigBox key={childComment._id}>
            <NestedCommentsImgBox>
              <NestedCommentsImg src={"./image/nestedComment.png"} />
            </NestedCommentsImgBox>
            <NestedCommentBox>
              <CommentWriter>
                {childComment.user_id === null
                  ? "회원탈퇴자"
                  : childComment.user_id.nickname}
                <CommentDate>
                  {childComment.createdAt === undefined
                    ? null
                    : childComment.createdAt.slice(0, 10)}
                </CommentDate>
              </CommentWriter>
              {childComment.user_id === null ? (
                <>
                  <CommentContents>
                    {childComment.child_comment}
                  </CommentContents>
                </>
              ) : childComment.user_id._id === myId &&
                isNestedEditMode &&
                nestIdx === isEditNestedCommentIdx &&
                idx === isEditCommentIdx ? (
                <EditCommentContents
                  onChange={makeNestedComment}
                  defaultValue={childComment.child_comment}
                />
              ) : (
                <>
                  <CommentContents>
                    {childComment.child_comment}
                  </CommentContents>
                </>
              )}
            </NestedCommentBox>
            <NestedCommentListSmallBox>
              {childComment.user_id === null ? (
                <></>
              ) : childComment.user_id._id !== myId ? null : isNestedEditMode &&
                comment._id === childComment.freecomment_id &&
                nestIdx === isEditNestedCommentIdx &&
                idx === isEditCommentIdx ? (
                <>
                  <CommentEditAndNestedCommentBox>
                    <CommentEditButtonCheck onClick={() => editNestedComment()}>
                      수정
                    </CommentEditButtonCheck>
                    <CommentEditButtonCancel
                      onClick={() => {
                        setNestedEditMode(false);
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
                      onClick={() => {
                        chosenEditCommentIdx(idx);
                        chosenEditNestedCommentIdx(nestIdx);
                        deleteNestedComment(idx, nestIdx);
                        // console.log(isEditCommentIdx);
                        // console.log(isEditNestedCommentIdx);
                      }}
                    />
                  </CommentDeleteBox>
                  <CommentEditButton
                    onClick={() => {
                      setNestedEditMode(true);
                      chosenEditCommentIdx(idx);
                      chosenEditNestedCommentIdx(nestIdx);
                      // console.log(isEditCommentIdx);
                      // console.log(isEditNestedCommentIdx);
                    }}
                  >
                    수정
                  </CommentEditButton>
                </>
              )}
            </NestedCommentListSmallBox>
          </CommentListBigBox>
        ),
      )}
    </>
  );
}
