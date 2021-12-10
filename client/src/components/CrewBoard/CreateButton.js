import React from "react";
import axios from "axios";
import styled from "styled-components";
import {useHistory} from "react-router";

const ImgUploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 30px 0px 15px 0px;

  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;
const ImgUploadButton = styled.div`
  cursor: pointer;
  background-color: #ff7676;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 80px 20px 80px;
  border-radius: 20px;
`;
const ImgUpload = styled.input`
  display: none;
`;

const SelectBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 15px 0px 15px 0px;

  @media screen and (min-width: 37.5rem) {
    justify-content: flex-end;
    width: 1080px;
  }
`;
const CancelButton = styled.div`
  cursor: pointer;
  background-color: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 20px 0px 20px 0px;
  margin-right: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  border: 1px solid #000000;

  @media screen and (min-width: 37.5rem) {
  }
`;
const CompleteButton = styled.div`
  cursor: pointer;
  background-color: #ff7676;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 20px 0px 20px 0px;
  margin-left: 10px;
  margin-bottom: 20px;
  border-radius: 20px;

  @media screen and (min-width: 37.5rem) {
  }
`;

export default function CreateButton(props) {
  const saveFileImage = e => {
    props.setFileImage(e.target.files[0]);
    props.setpreviewFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const history = useHistory();
  const Create = url => history.push(url);
  const Cancel = url => history.push(url);

  const createFreeBoard = () => {
    console.log("images", props.fileImage);
    const formData = new FormData();

    formData.append("img", props.fileImage);
    console.log("img", props.fileImage);

    if (props.description === "" || props.title === "" || props.hello === "") {
      alert("제목이나 인사말, 내용이 아무것도 없으면, 작성되지 않습니다.");
      return;
    }
    if (props.fileImage === "") {
      alert("봉사단 글 작성시, 대표하는 이미지 파일은 필수입니다!");
      return;
    }
    axios
      .post(
        "http://localhost:8080/board/cbregister",
        {
          title: props.title,
          shorts_description: props.hello,
          description: props.description,
          images: props.fileImage,
        },
        {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        },
      )
      .then(res => {
        console.log(res.data.message, "성공!");
        Create("/CrewBoardList");
      })
      .catch(err => console.log(err, "응안가"));
  };

  return (
    <>
      <ImgUploadBox>
        <label htmlFor="imgUpload">
          <ImgUploadButton>이미지 업로드</ImgUploadButton>
        </label>
      </ImgUploadBox>
      <SelectBox>
        <CancelButton onClick={() => Cancel("/CrewBoardList")}>취소</CancelButton>
        <CompleteButton
          onClick={() => {
            createFreeBoard();
          }}
        >
          작성 완료
        </CompleteButton>
      </SelectBox>
      {/* display:none 상태 */}
      <ImgUpload id="imgUpload" onChange={saveFileImage} type="file" aceept="image/*" />
      {/* display:none 상태 */}
    </>
  );
}
