import React from "react";
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
    width: 1080px;
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
  &:hover {
    background-color: #ff3030;
    transition: 0.3s;
  }
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
  &:hover {
    background-color: #ff3030;
    transition: 0.3s;
  }
  @media screen and (min-width: 37.5rem) {
  }
`;

export default function EditButton(props: any) {
  const saveFileImage = (e: any) => {
    props.setFileImage(e.target.files[0]);
    props.setpreviewFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const history = useHistory();
  const Edit = (url: any) => history.push(url);
  const Cancel = (url: any) => history.push(url);

  return (
    <>
      <ImgUploadBox>
        <label htmlFor="imgUpload">
          <ImgUploadButton>이미지 업로드</ImgUploadButton>
        </label>
      </ImgUploadBox>
      <SelectBox>
        <CancelButton onClick={() => Cancel(props.cancel)}>취소</CancelButton>
        <CompleteButton
          onClick={() => {
            props.editCrewBoard();
            setTimeout(() => Edit(props.edit), 1000);
          }}
        >
          수정 완료
        </CompleteButton>
      </SelectBox>
      {/* display:none 상태 */}
      <ImgUpload
        id="imgUpload"
        onChange={saveFileImage}
        type="file"
        accept="multipart/form-data"
      />
      {/* display:none 상태 */}
    </>
  );
}
