import React from "react";
import {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import Header2 from "../../components/common/Header2";
import DesktopTitle from "../../components/common/DesktopTitle";
import EditButton from "../../components/CrewBoard/EditButton";
import EditButton2 from "../../components/CrewBoard/EditButton2";

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

const ContentsBoxBorder = styled.div`
  width: 80%;
  height: 5vh;
  margin: auto;
  border: none;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;

  @media screen and (min-width: 37.5rem) {
    font-size: 16px;

    ::placeholder {
      font-size: 16px;
    }
  }
`;

const ContentsBoxHello = styled.input`
  width: 80%;
  height: 5vh;
  margin: auto;
  border: none;
  font-size: 12px;

  @media screen and (min-width: 37.5rem) {
    font-size: 16px;

    ::placeholder {
      font-size: 16px;
    }
  }
`;

const ContentsBoxContents = styled.textarea`
  width: 80%;
  height: 10vh;
  margin: 15px auto 40px auto;
  border: none;
  font-size: 12px;

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

export default function CrewBoardEdit({currentCBcontent}) {
  let title = "",
    description = "",
    hello = "";
  if (currentCBcontent.data !== undefined) {
    title = currentCBcontent.data.title;
    hello = currentCBcontent.data.shorts_description;
    description = currentCBcontent.data.description;
  }

  const [fileImage, setFileImage] = useState("");
  const [editedTitle, setTitle] = useState(title);
  const [editedHello, setHello] = useState(hello);
  const [editedDescription, setDescription] = useState(description);

  const editTitle = e => {
    setTitle(e.target.value);
    console.log(editedTitle);
  };
  const editHello = e => {
    setHello(e.target.value);
    console.log(editedHello);
  };
  const editDescription = e => {
    setDescription(e.target.value);
    console.log(editedDescription);
  };

  const editCrewBoard = () => {
    console.log(
      "crewboard_id",
      currentCBcontent.data._id,
      "title",
      editedTitle,
      "shorts_description",
      editedHello,
      "description",
      editedDescription,
      "images",
      fileImage,
    );

    if (editedTitle === "" || editedHello === "" || editedDescription === "") {
      alert("제목이나 내용이 아무것도 없으면, 수정되지 않습니다.");
      return;
    }

    // if ( fileImage === "") {
    //   alert("대표 이미지 파일이 없으면, 수정되지 않습니다.");
    //   return;
    // }

    axios
      .patch(
        `${process.env.REACT_APP_API_URI}/board/cbedit`,
        {
          crewboard_id: currentCBcontent.data._id,
          title: editedTitle,
          shorts_description: editedHello,
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
      .then(res => {
        console.log(res.data.message);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (currentCBcontent.data !== undefined) setFileImage(currentCBcontent.data.image);
    // console.log(currentCBcontent.data._id, editedTitle, editedDescription, fileImage);
  }, []);

  return (
    <>
      {currentCBcontent.data !== undefined ? (
        <>
          <Wrapper>
            <Header2 componentName="글 수정하기" />
            <DesktopTitle title="글 수정하기" />
            <EditButton2 create="/CrewBoardList" cancel="/CrewBoardList" setFileImage={setFileImage} />
            <ContentsBox>
              <ContentsBoxTitleBox>
                <ContentsBoxTitle
                  placeholder="수정할 봉사단 이름"
                  defaultValue={currentCBcontent.data.title}
                  onChange={editTitle}
                ></ContentsBoxTitle>
              </ContentsBoxTitleBox>
              <ContentsBoxWriterBox></ContentsBoxWriterBox>
              <ContentsBoxBorder>한줄 인사말</ContentsBoxBorder>
              <ContentsBoxHello
                placeholder="수정할 인사말"
                defaultValue={currentCBcontent.data.shorts_description}
                onChange={editHello}
              ></ContentsBoxHello>
              <ContentsBoxBorder>글 내용</ContentsBoxBorder>
              <ContentsBoxContents
                placeholder="수정할 글 내용"
                defaultValue={currentCBcontent.data.description}
                onChange={editDescription}
              ></ContentsBoxContents>
              <ContentsBoxImgBox>
                <Img src={fileImage} alt="수정할 이미지 자리" />
              </ContentsBoxImgBox>
            </ContentsBox>
            <EditButton
              edit="/CrewBoardContents"
              cancel="/CrewBoardContents"
              setFileImage={setFileImage}
              editCrewBoard={editCrewBoard}
            />
          </Wrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
