import React from "react";
import {useState, useEffect} from "react";
import {useHistory} from "react-router";
import styled from "styled-components";
import axios from "axios";
import Header2 from "../../components/common/Header2";
import DesktopTitle from "../../components/common/DesktopTitle";
import EditButton from "../../components/CrewBoard/EditButton";
import EditButton2 from "../../components/CrewBoard/EditButton2";
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
  width: 80%;
  margin: 15px 0 30px 0;

  @media screen and (min-width: 37.5rem) {
    align-items: flex-start;
    margin-left: 8vw;
  }
`;
const Img = styled.img`
  width: 80%;
  object-fit: cover;
  border-radius: 10px;

  @media screen and (min-width: 37.5rem) {
    max-width: 40%;
    max-height: 40%;
  }
`;
const LinkButton2 = styled.div`
  cursor: pointer;
  background-color: #448b76;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 10px 0px 10px 0px;
  border-radius: 20px;
  margin-top 50px;
  margin-left: 30px;
  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;
const BlankBox = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  opacity: 0.6;
  @media screen and (min-width: 37.5rem) {
    margin: auto;
    width: 30%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;
const BlankImg = styled.img`
  width: 50%;
  opacity: 0.3;
  object-fit: cover;
  margin-bottom: 20px;
`;

export default function CrewBoardEdit({
  currentCBcontent,
  GoToCrewBoardContent,
}: any) {
  let title = "",
    description = "",
    hello = "";
  if (currentCBcontent.data !== undefined) {
    title = currentCBcontent.data.title;
    hello = currentCBcontent.data.shorts_description;
    description = currentCBcontent.data.description;
  }
  let temporaryData: any = localStorage.getItem("currentCBcontent");
  if (currentCBcontent.data === undefined && temporaryData !== undefined) {
    title = JSON.parse(temporaryData).data.title;
    hello = JSON.parse(temporaryData).data.shorts_description;
    description = JSON.parse(temporaryData).data.description;
  }
  const [isLoading, CheckLoading] = useState(false);
  const [fileImage, setFileImage] = useState("");
  const [previewFileImage, setpreviewFileImage] = useState("");
  const [previousFileImage, setpreviousFileImage] = useState("");
  const [editedTitle, setTitle] = useState(title);
  const [editedHello, setHello] = useState(hello);
  const [editedDescription, setDescription] = useState(description);
  const history = useHistory();

  const loadingHandler = () => {
    CheckLoading(true);
  };
  const editTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const editHello = (e: any) => {
    setHello(e.target.value);
  };
  const editDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const editCrewBoard = () => {
    if (editedTitle === "" || editedHello === "" || editedDescription === "") {
      alert("제목이나 내용이 아무것도 없으면, 수정되지 않습니다.");
      return;
    }
    if (currentCBcontent.data === undefined && temporaryData !== undefined) {
      setFileImage(JSON.parse(temporaryData).data.images[0]);
      setpreviousFileImage(String(JSON.parse(temporaryData).data.images[0]));
    } else if (fileImage === "") {
      alert("대표 이미지 파일이 없으면, 수정되지 않습니다.");
      return;
    }
    if (fileImage !== previousFileImage) {
      const formData = new FormData();

      formData.append("image", fileImage);

      axios
        .post(`${process.env.REACT_APP_API_URI}/board/cbimageEdit`, formData, {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("accessToken"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => {
          axios
            .patch(
              `${process.env.REACT_APP_API_URI}/board/cbedit`,
              {
                crewboard_id: currentCBcontent.data._id,
                title: editedTitle,
                shorts_description: editedHello,
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
            .catch(err => {});
        })

        .catch(err => console.log(err));

      loadingHandler();

      setTimeout(() => {
        GoToCrewBoardContent(currentCBcontent.data._id);
      }, 500);
    } else if (
      currentCBcontent.data === undefined &&
      temporaryData !== undefined
    ) {
      axios
        .patch(
          `${process.env.REACT_APP_API_URI}/board/cbedit`,
          {
            crewboard_id: JSON.parse(temporaryData).data._id,
            title: editedTitle,
            shorts_description: editedHello,
            description: editedDescription,
            images: JSON.parse(temporaryData).data.images[0],
          },
          {
            headers: {
              authorization: `Bearer ` + localStorage.getItem("accessToken"),
              "Content-Type": "application/json",
            },
          },
        )
        .then(res => {})
        .catch(err => console.log(err));

      loadingHandler();

      setTimeout(() => {
        GoToCrewBoardContent(JSON.parse(temporaryData).data._id);
      }, 500);
    } else {
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
        .then(res => {})
        .catch(err => console.log(err));

      loadingHandler();

      setTimeout(() => {
        GoToCrewBoardContent(currentCBcontent.data._id);
      }, 500);
    }
  };

  useEffect(() => {
    if (
      currentCBcontent.data !== undefined &&
      currentCBcontent.data.images !== null
    ) {
      setFileImage(currentCBcontent.data.images[0]);
      setpreviewFileImage(currentCBcontent.data.images[0]);
      setpreviousFileImage(currentCBcontent.data.images[0]);
    }
  }, []);
  useEffect(() => {
    if (currentCBcontent.data === undefined && temporaryData !== undefined) {
      GoToCrewBoardContent(JSON.parse(temporaryData).data._id);
    }
  });
  return (
    <>
      {currentCBcontent.data === undefined && temporaryData === undefined ? (
        <>
          <LinkButton2 onClick={() => history.push("/")}>메인으로</LinkButton2>
          <BlankBox>
            <BlankImg src={"./image/NoData.png"} />
            데이터가 존재하지 않습니다!
          </BlankBox>
        </>
      ) : currentCBcontent.data === undefined && temporaryData !== undefined ? (
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
                  placeholder="수정할 봉사단 이름"
                  defaultValue={JSON.parse(temporaryData).data.title}
                  onChange={editTitle}
                ></ContentsBoxTitle>
              </ContentsBoxTitleBox>
              <ContentsBoxWriterBox></ContentsBoxWriterBox>
              <ContentsBoxBorder>한줄 인사말</ContentsBoxBorder>
              <ContentsBoxHello
                placeholder="수정할 인사말"
                defaultValue={JSON.parse(temporaryData).data.shorts_description}
                onChange={editHello}
              ></ContentsBoxHello>
              <ContentsBoxBorder>글 내용</ContentsBoxBorder>
              <ContentsBoxContents
                placeholder="수정할 글 내용"
                defaultValue={JSON.parse(temporaryData).data.description}
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
                <Img
                  src={String(JSON.parse(temporaryData).data.images[0])}
                  alt=""
                />
              </ContentsBoxImgBox>
            </ContentsBox>
            <EditButton
              edit="/CrewBoardContents"
              cancel="/CrewBoardContents"
              setFileImage={setFileImage}
              setpreviewFileImage={setpreviewFileImage}
              editCrewBoard={editCrewBoard}
            />
          </Wrapper>
        </>
      ) : (
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
              {isLoading ? (
                <>
                  <Loading />
                </>
              ) : (
                <></>
              )}
              <ContentsBoxImgBox>
                <Img src={previewFileImage} alt="" />
              </ContentsBoxImgBox>
            </ContentsBox>
            <EditButton
              edit="/CrewBoardContents"
              cancel="/CrewBoardContents"
              setFileImage={setFileImage}
              setpreviewFileImage={setpreviewFileImage}
              editCrewBoard={editCrewBoard}
            />
          </Wrapper>
        </>
      )}
    </>
  );
}
