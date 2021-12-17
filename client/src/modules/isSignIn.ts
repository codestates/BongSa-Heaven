import {createAction, handleActions} from "redux-actions";

const ISSIGNIN = "mailWriteText/ISSIGNIN";
const ISSIGNOUT = "mailWriteText/ISSIGNOUT";

export const issignin = createAction(ISSIGNIN);
export const issignout = createAction(ISSIGNOUT);

const initialState = {
  isSign: false,
};

const mailWriteText = handleActions(
  {
    [ISSIGNIN]: (state: any, isSign: any) => ({isSign: true}),
    [ISSIGNOUT]: (state: any, isSign: any) => ({isSign: false}),
  },
  initialState,
);

export default mailWriteText;
