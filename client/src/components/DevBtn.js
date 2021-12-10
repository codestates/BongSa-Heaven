import React from "react";
import axios from "axios";

export default function DevBtn() {
  const TestRefresh = () => {
    console.log("hi");
    axios
      .get(`${process.env.REACT_APP_API_URI}/auth/refreshtoken`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.data.accessToken);
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
