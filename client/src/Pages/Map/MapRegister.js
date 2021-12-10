import React, {useEffect, useState} from "react";
import Header2 from "../../components/common/Header2";
import MapReg from "../../components/Map/MapReg";
import axios from "axios";

export default function MapRegister() {
  const [userInfo, setUserInfo] = useState({
    wnat_region: "",
    want_vol: "",
    company: "",
  });

  const getCompanyInfoHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/user/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        setUserInfo({
          want_region: res.data.want_region,
          want_vol: res.data.want_vol,
          company: res.data.company,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Header2 componentName={"지도"} />

      <MapReg />
    </>
  );
}
