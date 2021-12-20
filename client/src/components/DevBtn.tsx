import React from "react";
import axios from "axios";

export default function DevBtn() {
  const TestRefresh = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/auth/refreshtoken`, {
        withCredentials: true,
      })
      .then(res => {
        localStorage.setItem("accessToken", res.data.accessToken);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="DevBtn_btn">
        <button onClick={TestRefresh}>리프레쉬토큰</button>
      </div>
    </>
  );
}
