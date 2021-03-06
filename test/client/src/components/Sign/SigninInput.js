import React from 'react';
import styled from 'styled-components';

import {useState, useRef, useEffect} from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';

export default function SignInInput() {
  //이벤트 클릭햇을시 반응하도록
  //이메일 입력 , 패스워드 입력
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //로그인 버튼을 클릭햇을때
  const handleLogin = () => {};
  const handleEmail = e => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    e.preventDefault();
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const handleLoginRequest = e => {
    console.log('로그인 리퀘스트');
    //유효성 검사
    if (!email) {
      console.log('이메일을 입력해주세요');
    }
  };

  return (
    <>
      <InputBox>
        <SignInWhiteBox>
          <SignInWhiteInput type="email" placeholder="아이디(이메일)" onChange={handleEmail}></SignInWhiteInput>
        </SignInWhiteBox>
        <SignInWhiteBox>
          <SignInWhiteInput type="password" placeholder="비밀번호" onChange={handlePassword}></SignInWhiteInput>
        </SignInWhiteBox>
      </InputBox>
      <CheckingPossibleOrNotBox>
        <PossibleOrNot>로그인에 실패하였습니다.</PossibleOrNot>
      </CheckingPossibleOrNotBox>
    </>
  );
}
