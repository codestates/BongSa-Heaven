import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons";
import {useHistory} from "react-router";

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
const ContentsBoxTitle = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  border-bottom: solid gray 1px;
  font-size: 12px;
  padding-bottom: 10px;
  border-bottom: solid gray 1px;

  @media screen and (min-width: 37.5rem) {
    font-size: 20px;
    margin-top: 20px;
  }
`;
const ContentsBoxWriterBox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0px 0px 0px;
`;
const ContentsBoxWriter = styled.div`
  color: #448b76;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  margin: 0px 5px 0px 18px;

  @media screen and (min-width: 37.5rem) {
    font-size: 20px;
    padding-left: 8vw;
    justify-content: flex-start;
    width: 15%;
    margin: 5px 0px 5px 0px;
  }
`;
const IconBox = styled.div`
  cursor: pointer;
`;

const ContentsBoxAdjustBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 60%;

  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;

const ContentsBoxAdjust = styled.div`
  cursor: pointer;
  background-color: #ff7676;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
`;

const ContentsBoxAdjust2 = styled.div`
  display: none;

  @media screen and (min-width: 37.5rem) {
    cursor: pointer;
    color: #ff7676;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8vw;
  }
`;

const ContentsBoxContents = styled.div`
  width: 80%;
  margin: 15px auto 40px auto;
  font-size: 12px;

  @media screen and (min-width: 37.5rem) {
    font-size: 16px;
    margin-left: 8vw;
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
  opacity: 0.5;
  border-radius: 10px;

  @media screen and (min-width: 37.5rem) {
    max-width: 60%;
    max-height: 60%;
  }
`;

const ContentsBoxDeleteBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (min-width: 37.5rem) {
    justify-content: flex-start;
    margin: 20px 0px 20px 0px;
  }
`;
const ContentsBoxDeleteButton = styled.div`
  cursor: pointer;
  color: #d80000;
  opacity: 0.5;
  padding-right: 8vw;

  @media screen and (min-width: 37.5rem) {
    margin-left: 1vw;
    color: gray;
  }
`;

export default function Writing({currentFBcontent, userId}) {
  const history = useHistory();

  const Gotoedit = () => history.push("/FreeBoardEdit");
  const Gotodelete = () => history.push("/FreeBoardDelete");
  const GotoMailWrite = () => history.push("/MaillWrite");

  return (
    <>
      {currentFBcontent.data === undefined ? (
        history.push("/")
      ) : (
        <>
          <ContentsBox>
            <ContentsBoxTitleBox>
              <ContentsBoxTitle>{currentFBcontent.data.title}</ContentsBoxTitle>
            </ContentsBoxTitleBox>
            <ContentsBoxWriterBox>
              <ContentsBoxWriter>{currentFBcontent.data.user_id.nickname}</ContentsBoxWriter>
              <IconBox>
                <FontAwesomeIcon icon={faPaperPlane} onClick={GotoMailWrite} />
              </IconBox>
              <ContentsBoxAdjustBox>
                {userId === currentFBcontent.data.user_id._id ? (
                  <ContentsBoxAdjust onClick={Gotoedit}>수정하기</ContentsBoxAdjust>
                ) : null}
              </ContentsBoxAdjustBox>
            </ContentsBoxWriterBox>
            <ContentsBoxContents>{currentFBcontent.data.description}</ContentsBoxContents>
            <ContentsBoxImgBox>
              {currentFBcontent.data.images === undefined ? <></> : <Img src={currentFBcontent.data.images} />}
            </ContentsBoxImgBox>
            <ContentsBoxDeleteBox>
              {userId === currentFBcontent.data.user_id._id ? (
                <>
                  <ContentsBoxAdjust2 onClick={Gotoedit}>수정</ContentsBoxAdjust2>
                  <ContentsBoxDeleteButton onClick={Gotodelete}>삭제</ContentsBoxDeleteButton>
                </>
              ) : null}
            </ContentsBoxDeleteBox>
          </ContentsBox>
        </>
      )}
    </>
  );
}
