import {createAction, handleActions} from "redux-actions";

const CHANGENAME = "mailWriteRedux/CHANGENAME";
const CHANGETEXT = "mailWriteRedux/CHANGETEXT";

export const changeName = createAction(CHANGENAME, value => value);
export const changeText = createAction(CHANGETEXT, text => text);

const initialState = {
  name: "하이맨",
  text: "하이바이하이맨맨~",
};

const mailWriteRedux = handleActions(
  {
    [CHANGENAME]: (state, {payload: value}) => ({name: value}),
    [CHANGETEXT]: (state, {payload: text}) => ({text: text}),
  },
  initialState,
);

export default mailWriteRedux;
