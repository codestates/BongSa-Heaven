/* global kakao */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import styled from "styled-components";

const KakaoMap = styled.div`
  background-color: yellow;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;
const DummyInput = styled.input`
  display: none;
`;
export default function MapReg() {
  const [value, setValue] = useState("강남");
  const [btnValue, setBtnValue] = useState("");
  const [reRender, setRender] = useState(true);
  const history = useHistory();

  useEffect(() => {
    var markers = [];
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(
        37.49683356605109,
        127.02567025989426
      ),
      level: 2,
    };

    let map = new window.kakao.maps.Map(container, options);
    let mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    let selectedMarker = null;
    // 키워드로 장소를 검색합니다
    searchPlaces();

    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces() {
      var keyword = document.getElementById("keyword").value;
      console.log(keyword);
      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        // alert("키워드를 입력해주세요!");
        return false;
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        console.log(data, "data");

        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        return;
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      var listEl = document.getElementById("placesList"),
        menuEl = document.getElementById("menu_wrap"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = "";

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다

        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다

        (function (marker, title) {
          let content = document.createElement("div");
          content.className = "ContentOverlay";

          let contentTop = document.createElement("div");
          contentTop.className = "ContentTop";
          contentTop.innerHTML = `${title}`;

          let contentBottom = document.createElement("div");
          contentBottom.className = "ContentBottom";

          let contTentMiddleText = document.createElement("span");
          contTentMiddleText.className = "contTentMiddleText";
          contTentMiddleText.innerHTML = "위치를 등록하시겠습니까?";

          let regBtn = document.createElement("button");
          regBtn.innerHTML = "등록하기";
          regBtn.className = "RegBtn";
          //버튼 클릭시 데이터를 담아서 maker로 찍는다.
          //버튼 클릭시 좌표를 등록한다.
          regBtn.onclick = function () {
            console.log(selectedMarker.n);
            if (localStorage.getItem("accessToken")) {
              Axios.post(
                `${process.env.REACT_APP_API_URI}/map/register`,
                {
                  La: marker.getPosition().getLat(),
                  Ma: marker.getPosition().getLng(),
                },
                {
                  headers: {
                    authorization:
                      `Bearer ` + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((res) => {
                  console.log("res");
                  setRender(!reRender);
                })
                .catch((res) => {
                  console.log("err", res.message);
                });
            }
          };
          let cancleBtn = document.createElement("button");
          cancleBtn.innerHTML = "취소";
          cancleBtn.className = "CancleBtn";

          cancleBtn.onclick = function () {
            overlay.setMap(null);
          };
          content.appendChild(contentTop);
          content.appendChild(contTentMiddleText);
          content.appendChild(contentBottom);

          contentBottom.appendChild(regBtn);
          contentBottom.appendChild(cancleBtn);

          let overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            clickable: true,
            position: marker.getPosition(),
            yAnchor: -0.2,
            xAnchor: 0.5,
          });
          overlay.setMap(null);

          window.kakao.maps.event.addListener(
            marker,
            "click",
            function (mouseEvent) {
              overlay.setMap(map);
              console.log(
                document.getElementsByClassName("ContentOverlay").length
              );
              if (
                document.getElementsByClassName("ContentOverlay").length > 1
              ) {
                overlay.setMap(null);
                console.log(" IM A LOT !!!");
              }

              selectedMarker = marker;
              console.log("hi", selectedMarker);
              console.log("hi", title);

              console.log(marker.getPosition().getLat());
              console.log(marker.getPosition().getLng());
            }
          );

          window.kakao.maps.event.addListener(map, "click", function () {
            overlay.setMap(null);
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {
      var el = document.createElement("li"),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          "   <h5>" +
          places.place_name +
          "</h5>";

      if (places.road_address_name) {
        itemStr +=
          "    <span>" +
          places.road_address_name +
          "</span>" +
          '   <span class="jibun gray">' +
          places.address_name +
          "</span>";
      } else {
        itemStr += "    <span>" + places.address_name + "</span>";
      }

      itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

      el.innerHTML = itemStr;
      el.className = "item";

      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
          clickable: true,
        });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
      var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }

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
  }, [btnValue, reRender]);

  const ChangeValue = (e) => {
    setValue(e.target.value);
  };

  const ChangePage = () => {
    setBtnValue(value);
    console.log(btnValue);
  };
  const ChangeBtnValue = () => {};

  return (
    <div class="map_wrap">
      <KakaoMap id="map"></KakaoMap>
      <div id="menu_wrap" class="bg_white">
        <div class="option">
          <div>
            <form onSubmit="return false">
              키워드 :
              <DummyInput />
              <input
                type="text"
                value={value}
                id="keyword"
                size="15"
                onChange={ChangeValue}
              />
              <button type="button" onClick={ChangePage}>
                검색하기
              </button>
            </form>
          </div>
        </div>
        <hr />
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
    </div>
  );
}
