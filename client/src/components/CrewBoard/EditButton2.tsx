import React from "react";
import styled from "styled-components";

const ImgUploadBox = styled.div`
  display: none;
  @media screen and (min-width: 37.5rem) {
    width: 1080px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 15px 0px 15px 0px;
  }
`;

const ImgUploadButton = styled.div`
  background-color: #ff7676;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 80px 20px 80px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #ff3030;
    transition: 0.3s;
  }
`;
const ImgUpload = styled.input`
  display: none;
`;

export default function EditButton(props: any) {
  const saveFileImage = (e: any) => {
    props.setFileImage(e.target.files[0]);
    props.setpreviewFileImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <ImgUploadBox>
        <label htmlFor="imgUpload">
          <ImgUploadButton>이미지 업로드</ImgUploadButton>
        </label>
      </ImgUploadBox>
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
