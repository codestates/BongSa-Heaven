import React, {useCallback, useState} from "react";
import Header2 from "../../components/common/Header2";
import MaillWriteTop from "../../components/Mypages/MaillWriteTop";
import MaillWriteMain from "../../components/Mypages/MaillWriteMain";
import MaillWriteBottom from "../../components/Mypages/MaillWriteBottom";
import {changeText} from "../../modules/maillWriteRedux";
import {useDispatch} from "react-redux";

export default function UserMaill() {
  const dispath = useDispatch();
  const [text, setText] = useState("HOHOHO");

  const handleText = e => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const onChangeText = text => {
    dispath(changeText(text));
    console.log(text);
  };
  return (
    <>
      <Header2 componentName={"쪽지"} />
      <MaillWriteTop />
      <MaillWriteMain />
      <MaillWriteBottom />
      <input type="text" value={text} onChange={handleText} />
      <button onClick={() => onChangeText(text)}>HHHH</button>
    </>
  );
}
