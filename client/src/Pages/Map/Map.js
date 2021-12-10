/* global kakao */
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Header2 from "../../components/common/Header2";

const KakaoMapContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 80%;
`;

const MapKakao = styled.div`
  width: 100%;
  height: 100%;
`;
export default function KakaoMap() {
  const history = useHistory();

  useEffect(() => {
    let container = document.getElementById("map");

    let options = {
      center: new window.kakao.maps.LatLng(
        37.49683356605109,
        127.02567025989426
      ),
      level: 6,
    };

    let map = new window.kakao.maps.Map(container, options);
    let mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    let positions = [{}];

    Axios.get(`${process.env.REACT_APP_API_URI}/map/info`)
      .then((res) => {
        // console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          positions.push({
            title: res.data[i].user_id.nickname,
            latlng: new kakao.maps.LatLng(res.data[i].La, res.data[i].Ma),
            region: res.data[i].user_id.want_region,
            vol_type: res.data[i].user_id.want_vol,
            company_name: res.data[i].user_id.company,
          });
        }
      })
      .then((res) => {
        for (let i = 1; i < positions.length; i++) {
          console.log(positions[i], i);
          let imageSrc = "https://ifh.cc/g/u788hh.png", // 마커이미지의 주소입니다
            imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          let markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );
          //마커를 찍는다.
          let marker = new kakao.maps.Marker({
            position: positions[i].latlng,
            title: positions[i].title,
            image: markerImage,
            clickable: true,
          });
          marker.setMap(map);

          let content = document.createElement("div");
          content.className = "contentMain";

          let contentTitle = document.createElement("span");
          contentTitle.className = "contentTitle";
          contentTitle.innerHTML = `${positions[i].title}`;

          let contentRegion = document.createElement("div");
          contentRegion.className = "contentRegion";
          contentRegion.innerHTML = `지역: ${positions[i].region}`;

          let contentVolType = document.createElement("div");
          contentVolType.className = "contentVolType";
          contentVolType.innerHTML = `봉사활동: ${positions[i].vol_type}`;

          let contentName = document.createElement("div");
          contentName.className = "contentName";
          contentName.innerHTML = `기관명: ${positions[i].company_name}`;

          let contentBtn = document.createElement("button");
          contentBtn.className = "contentBtn";
          contentBtn.innerHTML = "쪽지 보내기";
          contentBtn.onclick = function () {
            history.push({
              pathname: "/maillwrite",
              state: { positions: positions[i] },
            });
          };

          content.appendChild(contentTitle);
          content.appendChild(contentRegion);
          content.appendChild(contentVolType);
          content.appendChild(contentName);
          content.appendChild(contentBtn);

          let customOverlay = new window.kakao.maps.CustomOverlay({
            position: marker.getPosition(),
            content: content,
            map: map,
            clickable: true,
            yAnchor: 0,
            xAnchor: 0.5,
          });
          customOverlay.setMap(map);
        }
      });
  }, []);

  return (
    <>
      <Header2 componentName={"지도"} />
      <KakaoMapContainer>
        <MapKakao id="map"></MapKakao>
      </KakaoMapContainer>
    </>
  );
}
