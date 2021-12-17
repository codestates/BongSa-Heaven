import {useState} from "react";
import styled from "styled-components";
import Header2 from "../../components/common/Header2";
import DesktopTitle from "../../components/common/DesktopTitle";
import Input from "../../components/FreeBoard/Input";
import CreateButton from "../../components/FreeBoard/CreateButton";
import CreateButton2 from "../../components/FreeBoard/CreateButton2";

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreateBox = styled.div`
  background-color: white;
  width: 80%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px 0px 20px 0px;
  margin: 10px 0px 10px 0px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;

  @media screen and (min-width: 37.5rem) {
    width: 1080px;
  }
`;

const CreateBoxContentsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CreateBoxContents = styled.textarea`
  display: flex;
  justify-content: flex;
  align-items: center;
  width: 80%;
  height: 200px;
  font-size: 12px;
  border: 0px;
  opacity: 0.5;

  ::placeholder {
    font-size: 12px;
  }

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

export default function FreeBoardCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewFileImage, setpreviewFileImage] = useState("");
  const [fileImage, setFileImage] = useState("");

  const inputHandler = (e: any) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <Wrapper>
        <Header2 componentName="글 작성하기" />
        <DesktopTitle title="글 작성하기" />
        <CreateButton2
          create="/CrewBoardList"
          cancel="/CrewBoardList"
          setFileImage={setFileImage}
          setpreviewFileImage={setpreviewFileImage}
        />
        <Input text="제목" setTitle={setTitle} title={title} />
        <CreateBox>
          <CreateBoxContentsBox>
            <CreateBoxContents
              placeholder="내용을 입력하세요."
              onChange={inputHandler}
            />
          </CreateBoxContentsBox>
          <ContentsBoxImgBox>
            <Img src={previewFileImage} alt="수정할 이미지 자리" />
          </ContentsBoxImgBox>
        </CreateBox>
        <CreateButton
          fileImage={fileImage}
          title={title}
          description={description}
          setFileImage={setFileImage}
          setpreviewFileImage={setpreviewFileImage}
        />
      </Wrapper>
    </>
  );
}
