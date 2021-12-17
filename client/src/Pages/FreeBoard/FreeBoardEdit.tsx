import React from "react";
import {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import Header2 from "../../components/common/Header2";
import DesktopTitle from "../../components/common/DesktopTitle";
import EditButton from "../../components/FreeBoard/EditButton";
import EditButton2 from "../../components/FreeBoard/EditButton2";
import Loading from "../../components/common/Loading";

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentsBox = styled.div`
  background-color: white;
  width: 80%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px 0px 20px 0px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  margin-top: 30px;

  @media screen and (min-width: 37.5rem) {
    width: 1080px;
  }
`;
const ContentsBoxTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentsBoxTitle = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  font-size: 14px;
  border: none;
  border-bottom: solid gray 1px;

  @media screen and (min-width: 37.5rem) {
    font-size: 20px;
  }
`;
const ContentsBoxWriterBox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0px 0px 0px;
`;

const ContentsBoxContents = styled.textarea`
  width: 80%;
  height: 10vh;
  margin: 15px auto 40px auto;
  border: none;

  @media screen and (min-width: 37.5rem) {
    font-size: 16px;

    ::placeholder {
      font-size: 16px;
    }
  }
`;
const ContentsBoxImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 15px 0 30px 0;
`;
const Img = styled.img`
  width: 80%;
  object-fit: cover;
  opacity: 0.5;
  border-radius: 10px;
`;

export default function FreeBoardEdit({
  currentFBcontent,
  GoToFreeBoardContent,
}: any) {
  let title = "",
    description = "";
  if (currentFBcontent.data !== undefined) {
    title = currentFBcontent.data.title;
    description = currentFBcontent.data.description;
  }
  const [isLoading, CheckLoading] = useState(false);
  const [fileImage, setFileImage] = useState("");
  const [previewFileImage, setpreviewFileImage] = useState("");
  const [previousFileImage, setpreviousFileImage] = useState("");
  const [editedTitle, setTitle] = useState(title);
  const [editedDescription, setDescription] = useState(description);

  const loadingHandler = () => {
    CheckLoading(true);
  };
  const editTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const editDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const editFreeBoard = () => {
    if (editedTitle === "" || editedDescription === "") {
      alert("제목이나 내용이 아무것도 없으면, 수정되지 않습니다.");
      return;
    }
    if (fileImage !== previousFileImage) {
      const formData = new FormData();

      formData.append("image", fileImage);

      axios
        .post(`${process.env.REACT_APP_API_URI}/board/fbimageEdit`, formData, {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("accessToken"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => {
          axios
            .patch(
              `${process.env.REACT_APP_API_URI}/board/fbedit`,
              {
                freeboard_id: currentFBcontent.data._id,
                title: editedTitle,
                description: editedDescription,
                images: res.data.images[0],
              },
              {
                headers: {
                  authorization:
                    `Bearer ` + localStorage.getItem("accessToken"),
                  "Content-Type": "application/json",
                },
              },
            )
            .then(res => {})
            .catch(err => console.log(err));
        })

        .catch(err => console.log(err, "Error!"));

      loadingHandler();

      setTimeout(() => {
        GoToFreeBoardContent(currentFBcontent.data._id);
      }, 500);
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API_URI}/board/fbedit`,
          {
            freeboard_id: currentFBcontent.data._id,
            title: editedTitle,
            description: editedDescription,
            images: fileImage,
          },
          {
            headers: {
              authorization: `Bearer ` + localStorage.getItem("accessToken"),
              "Content-Type": "application/json",
            },
          },
        )
        .then(res => {})
        .catch(err => console.log(err, "error!"));

      loadingHandler();

      setTimeout(() => {
        GoToFreeBoardContent(currentFBcontent.data._id);
      }, 500);
    }
  };

  useEffect(() => {
    if (
      currentFBcontent.data !== undefined &&
      currentFBcontent.data.images !== null &&
      currentFBcontent.data.images[0] !== null
    ) {
      setFileImage(currentFBcontent.data.images[0]);
      setpreviewFileImage(currentFBcontent.data.images[0]);
      setpreviousFileImage(currentFBcontent.data.images[0]);
    }
  }, []);

  return (
    <>
      {currentFBcontent.data !== undefined ? (
        <>
          <Wrapper>
            <Header2 componentName="글 수정하기" />
            <DesktopTitle title="글 수정하기" />
            <EditButton2
              create="/CrewBoardList"
              cancel="/CrewBoardList"
              setFileImage={setFileImage}
              setpreviewFileImage={setpreviewFileImage}
            />
            <ContentsBox>
              <ContentsBoxTitleBox>
                <ContentsBoxTitle
                  placeholder="수정할 글 제목"
                  defaultValue={currentFBcontent.data.title}
                  onChange={editTitle}
                ></ContentsBoxTitle>
              </ContentsBoxTitleBox>
              <ContentsBoxWriterBox></ContentsBoxWriterBox>
              <ContentsBoxContents
                placeholder="수정할 글 내용들"
                defaultValue={currentFBcontent.data.description}
                onChange={editDescription}
              ></ContentsBoxContents>
              {isLoading ? (
                <>
                  <Loading />
                </>
              ) : (
                <></>
              )}
              <ContentsBoxImgBox>
                <Img src={previewFileImage} alt="수정할 이미지 자리" />
              </ContentsBoxImgBox>
            </ContentsBox>
            <EditButton
              edit="/FreeBoardContents"
              cancel="/FreeBoardContents"
              setFileImage={setFileImage}
              setpreviewFileImage={setpreviewFileImage}
              editFreeBoard={editFreeBoard}
            />
          </Wrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
