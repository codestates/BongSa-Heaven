import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import Header2 from "../../components/common/Header2";
import MaillList from "../../components/Mypages/MaillList";
import {resetList} from "../../modules/mailDeleteList";

const MaillTitleContainer = styled.div`
  margin-top: 27px;
  height: 21px;
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 37.5rem) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
const MaillTitleContainerDiv = styled.div`
  @media screen and (min-width: 37.5rem) {
    width: 1080px;
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 37.5rem) {
    display: flex;
    width: 100%;
  }
`;

const MaillTitleSpace = styled.div`
  width: 20%;
  height: 22px;
  @media screen and (min-width: 37.5rem) {
    width: 10%;
  }
`;

const MaillTitleText = styled.div`
  width: 50%;
  height: 22px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */
  text-align: center;
  color: #448b76;
  @media screen and (min-width: 37.5rem) {
    font-size: 24px;
  }
`;
const MaillTitleBtn = styled.button`
  width: 20%;
  max-width: 80px;
  height: 22px;
  background: #f7f7f7;
  border-radius: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #000000;
  border: 0;
  cursor: pointer;
  @media screen and (min-width: 37.5rem) {
    font-size: 16px;
  }
`;

const MaillDeleteContainer = styled.div`
  margin-top: 27px;
  width: 375px;
  height: 40px;
  display: flex;
  align-items: center;
  @media screen and (min-width: 37.5rem) {
    margin-left: 25%;
    width: 1080px;
    display: flex;
    justify-content: center;
  }
`;
const MaillDeleteContainerDiv = styled.div`
  @media screen and (min-width: 37.5rem) {
    width: 100%;
  }
`;
const MaillDeleteInput = styled.input`
  margin-left: 24px;
  width: 14px;
  height: 14px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 4px;
`;
const MaillDeleteBtn = styled.button`
  margin-left: 16px;
  width: 68px;
  height: 39px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 23px;
  /* identical to box height */

  letter-spacing: -0.495238px;

  color: #ffffff;
  background: #ff7676;
  border-radius: 44px;
  border: 0;
  cursor: pointer;
`;

const WebMaillContainer = styled.div`
  @media screen and (min-width: 37.5rem) {
    margin-left: 25%;
    width: 1080px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;
const WebMaillContainerDiv = styled.div`
  @media screen and (min-width: 37.5rem) {
    width: 100%;
  }
`;
const MaillListEmptyContainer = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MaillListEmptyDiv = styled.div`
  width: 80%;
  max-width: 720px;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 2px 11px 4px rgba(0, 0, 0, 0.05);
`;

export default function UserMaill() {
  const history = useHistory();
  const dispatch = useDispatch();
  // const cookies = new Cookies();

  const deleteList = useSelector((state: any) => state.mailDeleteList);
  const [mailList, setMailList] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [reload, setReload] = useState(false);
  // console.log(deleteList);

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetList());
    }, 100);
    axios
      .get(`${process.env.REACT_APP_API_URI}/mail/maillist`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "applicaton/json",
        },
      })
      .then(res => {
        setMailList(res.data.data);
      });
  }, [reload]);

  const GoMaillWrite = () => {
    history.push("/MaillWrite");
  };

  const handleAllChecked = () => {
    setIsAllChecked(!isAllChecked);
    setIsChecked(!isAllChecked);
  };

  const handleCheckList = (id: any) => {
    checkId(id);
  };

  const checkId = (id: any) => {};

  // const FilterCheckList = checkList.filter((element, index) => {
  //   return checkList.indexOf(element) === index;
  // });
  const handleUnCheckList = (id: any) => {
    unCheckId(id);
  };

  const unCheckId = (id: any) => {};

  const handleDelete = () => {
    deleteList.forEach((el: any) => {
      // console.log(el);

      axios
        .delete(`${process.env.REACT_APP_API_URI}/mail/maildelete`, {
          data: {
            mail_id: el,
          },

          headers: {
            authorization: `Bearer ` + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then(res => {
          // console.log(res.status);
          setReload(!reload);
        })
        .catch(res => {
          console.log(res);
        });
    });
  };

  return (
    <>
      <Header2 componentName={"쪽지"} />
      <MaillTitleContainer>
        <MaillTitleContainerDiv>
          <MaillTitleSpace />
          <MaillTitleText>받은 쪽지함</MaillTitleText>
          <MaillTitleBtn onClick={GoMaillWrite}>쪽지 쓰기</MaillTitleBtn>
        </MaillTitleContainerDiv>
      </MaillTitleContainer>
      <MaillDeleteContainer>
        <MaillDeleteContainerDiv>
          <MaillDeleteInput
            type="checkbox"
            checked={isAllChecked}
            onChange={handleAllChecked}
          />
          <MaillDeleteBtn onClick={handleDelete}>삭제</MaillDeleteBtn>
        </MaillDeleteContainerDiv>
      </MaillDeleteContainer>
      <WebMaillContainer>
        <WebMaillContainerDiv>
          {mailList.map((list, idx) => (
            <MaillList
              list={list}
              key={idx}
              isChecked={isChecked}
              handleCheckList={handleCheckList}
              handleUnCheckList={handleUnCheckList}
            />
          ))}
          {mailList.length === 0 ? (
            <MaillListEmptyContainer>
              <MaillListEmptyDiv>받은 쪽지가 없습니다</MaillListEmptyDiv>
            </MaillListEmptyContainer>
          ) : null}
        </WebMaillContainerDiv>
      </WebMaillContainer>
    </>
  );
}
