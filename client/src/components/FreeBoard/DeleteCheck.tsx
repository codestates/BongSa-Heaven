import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router";
import axios from "axios";

const DeleteBoxTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  color: red;

  @media screen and (min-width: 37.5rem) {
    font-size: 20px;
  }
`;
const SelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 15px 0px 15px 0px;
`;
const DeleteButton = styled.div`
  cursor: pointer;
  background-color: #ff7676;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 20px 0px 20px 0px;
  margin-right: 20px;
  margin-bottom: 300px;
  border-radius: 20px;
  &:hover {
    background-color: #ff3030;
    transition: 0.3s;
  }

  @media screen and (min-width: 37.5rem) {
    width: 150px;
    font-size: 20px;
  }
`;
const CancelButton = styled.div`
  cursor: pointer;
  background-color: white;
  color: black;
  border: solid black 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 20px 0px 20px 0px;
  margin-left: 20px;
  margin-bottom: 300px;
  border-radius: 20px;

  @media screen and (min-width: 37.5rem) {
    width: 150px;
    font-size: 20px;
  }
`;

export default function DeleteCheck(props: any) {
  const history = useHistory();
  const Delete = (url: any) => history.push(url);
  const Cancel = (url: any) => history.push(url);

  const deleteFreeBoard = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URI}/board/fbdelete`, {
        data: {
          freeboard_id: props.currentFBcontent.data._id,
        },
        headers: {
          authorization: `Bearer ` + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        Delete(props.delete);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <DeleteBoxTitleBox>
        해당 {props.contents}을 삭제하시겠습니까?
      </DeleteBoxTitleBox>
      <SelectBox>
        <DeleteButton
          onClick={() => {
            deleteFreeBoard();
          }}
        >
          삭제
        </DeleteButton>
        <CancelButton onClick={() => Cancel(props.cancel)}>취소</CancelButton>
      </SelectBox>
    </>
  );
}
