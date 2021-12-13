import React from "react";
import Header from "../../components/common/Header";
import BestCrew from "../../components/Main/BestCrew";
import FreeBoard from "../../components/Main/FreeBoard";

export default function MainPage() {
  return (
    <>
      <Header />
      <BestCrew />
      <FreeBoard />
    </>
  );
}