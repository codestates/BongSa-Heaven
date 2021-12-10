import React, {useEffect, useState} from 'react';
import axios from 'axios';

import styled from 'styled-components';
import Header2 from '../../components/common/Header2';
import Recruiters from '../../components/Mypages/Recruiters';

const TopSpace = styled.div`
  height: 43px;
`;
const SeeContainer = styled.div`
  @media screen and (min-width: 37.5rem) {
    width: 100%;
    display: flex;
    flex-direction: column;

    align-items: center;
  }
`;
export default function SeeRecruiter() {
  const [recruiterList, setRecruiterList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/user/list`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'applicaton/json',
        },
      })
      .then(res => {
        setRecruiterList(res.data);
      });
  }, []);

  return (
    <>
      <Header2 componentName={'봉사 모집자 보기'} />
      <TopSpace></TopSpace>
      <SeeContainer>
        {recruiterList.map((list, idx) => (
          <Recruiters list={list} idx={idx} />
        ))}
      </SeeContainer>
    </>
  );
}
