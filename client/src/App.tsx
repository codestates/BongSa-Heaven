import {useState, useEffect} from "react";
import {Route} from "react-router-dom";
import axios from "axios";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import "./App.css";
import "./css/Reset.css";
import Footer from "./components/common/Footer";
import MainPage from "./Pages/Main/MainPage";

import RecruiterSignUp from "./Pages/Sign/RecruiterSignUp";
import SignUp from "./Pages/Sign/SignUp";
import SignIn from "./Pages/Sign/Sign";
import UserSignUp from "./Pages/Sign/UserSignUp";

import MaillWrite from "./Pages/MyPage/MaillWrite";
import MaillWriteCheck from "./Pages/MyPage/MaillWriteCheck";
import RecruiterDelete from "./Pages/MyPage/RecruiterDelete";
import RecruiterEdit from "./Pages/MyPage/RecruiterEdit";
import RecruiterMyPage from "./Pages/MyPage/RecruiterMyPage";
import RecruiterPasswordCheck from "./Pages/MyPage/RecruiterPasswordCheck";
import SeeRecruiter from "./Pages/MyPage/SeeRecruiter";
import SeeUser from "./Pages/MyPage/SeeUser";
import UserDelete from "./Pages/MyPage/UserDelete";
import UserEdit from "./Pages/MyPage/UserEdit";
import UserEditPasswordCheck from "./Pages/MyPage/UserEditPasswordCheck";
import UserMaill from "./Pages/MyPage/UserMaill";
import UserMyPage from "./Pages/MyPage/UserMyPage";

import FreeBoardContents from "./Pages/FreeBoard/FreeBoardContents";
import FreeBoardCreate from "./Pages/FreeBoard/FreeBoardCreate";
import FreeBoardDelete from "./Pages/FreeBoard/FreeBoardDelete";
import FreeBoardEdit from "./Pages/FreeBoard/FreeBoardEdit";
import FreeBoardList from "./Pages/FreeBoard/FreeBoardList";

import CrewBoardContents from "./Pages/CrewBoard/CrewBoardContents";
import CrewBoardCreate from "./Pages/CrewBoard/CrewBoardCreate";
import CrewBoardDelete from "./Pages/CrewBoard/CrewBoardDelete";
import CrewBoardEdit from "./Pages/CrewBoard/CrewBoardEdit";
import CrewBoardList from "./Pages/CrewBoard/CrewBoardList";
import Header5 from "./components/common/Header5";

import Map from "./Pages/Map/Map";
import MapRegister from "./Pages/Map/MapRegister";

import OauthUserReg from "./Pages/Oauth/OauthUserReg";
import OauthUserEdit from "./Pages/Oauth/OauthUserEdit";

import {issignin} from "./modules/isSignIn";

export default function App() {
  const [isDevHeader, setIsDevHeader] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState("user");
  const [userId, setUserId] = useState("");
  const [currentFBcontent, setFBcontent] = useState({});
  const [currentCBcontent, setCBcontent] = useState({});

  const GetLife = sessionStorage.getItem("life");

  const dispatch = useDispatch();

  const handleDevHeader = () => {
    setIsDevHeader(!isDevHeader);
  };
  const history = useHistory();
  const GotoContents = () => history.push("/FreeBoardContents");

  const GoToFreeBoardContent = (freeboard_id: any) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/board/fbinfo`,
        {
          freeboard_id: freeboard_id,
        },
        {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        },
      )
      .then(res => {
        setFBcontent(res.data);
        GotoContents();
      })
      .catch(err => console.log(err));
  };

  const GotoCard = () => history.push("/CrewBoardContents");

  const GoToCrewBoardContent = (crewboard_id: any) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/board/cbinfo`,
        {
          crewboard_id: crewboard_id,
        },
        {
          headers: {
            authorization: `Bearer ` + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        },
      )
      .then(res => {
        setCBcontent(res.data);
        GotoCard();
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    googleAuthCode();
    kakaoAuthCode();
  }, []);

  useEffect(() => {
    // console.log(isLogin, "login");
    setTimeout(() => {
      if (GetLife === "have") {
        axios
          .get(`${process.env.REACT_APP_API_URI}/auth/refreshtoken`, {
            withCredentials: true,
          })
          .then(res => {
            // console.log("res");
            localStorage.setItem("accessToken", res.data.accessToken);
          });

        axios
          .get(`${process.env.REACT_APP_API_URI}/user/info`, {
            headers: {
              authorization: `Bearer ` + localStorage.getItem("accessToken"),
              "Content-Type": "application/json",
            },
            withCredentials: true,
          })
          .then(res => {
            const isNick = res.data.data.nickname;
            if (isNick) {
            } else {
              history.push("/OauthUserReg");
            }

            setUserId(res.data.data._id);
            if (res.data.data.iscompany) {
              setIsUserLogin("recruiter");
              setIsLogin(true);
              dispatch(issignin());
            } else {
              setIsUserLogin("user");
              setIsLogin(true);
              dispatch(issignin());
            }
          })
          .catch(err => {
            console.log(err);
            setIsLogin(false);
          });
      } else {
        console.log("No Life");
      }
    }, 100);
  }, [isUserLogin, isLogin]);

  const googleAuthCode = () => {
    const url = new URL(window.location.href);
    const searchs = url.search;

    if (url.pathname === "/callback") {
      const code = searchs.split("=")[1].split("&")[0];
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/auth/google`,
          {code: code},

          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then(data => {
          history.push("/");
          setIsLogin(true);
          dispatch(issignin());
        })
        .catch(err => {
          console.log(err);
          setIsLogin(false);
        });
    }
  };
  //카카오와 구글을 구분하는 방법이 있을까?
  const kakaoAuthCode = () => {
    const url = new URL(window.location.href);
    const searchs = url.search;

    if (url.pathname === "/kakao/callback") {
      const code = searchs.split("=")[1].split("&")[0];
      axios
        .post(
          `${process.env.REACT_APP_API_URI}/auth/kakao`,
          {code: code},

          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then(data => {
          history.push("/");
          setIsLogin(true);
          dispatch(issignin());
        })
        .catch(err => {
          console.log(err);
          setIsLogin(false);
          dispatch(issignin(false));
        });
    }
  };

  return (
    <div id="app_div">
      <Header5
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        isUserLogin={isUserLogin}
        setIsUserLogin={setIsUserLogin}
        setUserId={setUserId}
      />

      <Route
        exact
        path="/"
        render={() => (
          <MainPage
            GoToFreeBoardContent={GoToFreeBoardContent}
            GoToCrewBoardContent={GoToCrewBoardContent}
            userId={userId}
          />
        )}
      />
      {/* Sign */}

      <Route exact path="/RecruiterSignUp" component={RecruiterSignUp} />
      <Route exact path="/SignUp" component={SignUp} />
      <Route
        exact
        path="/SignIn"
        render={() => (
          <SignIn setIsLogin={setIsLogin} setIsUserLogin={setIsUserLogin} />
        )}
      />
      <Route exact path="/UserSignUp" component={UserSignUp} />
      {/* MyPage */}
      <Route exact path="/MaillWrite" component={MaillWrite} />
      <Route exact path="/MaillWriteCheck" component={MaillWriteCheck} />
      <Route exact path="/RecruiterDelete" component={RecruiterDelete} />
      <Route exact path="/RecruiterEdit" component={RecruiterEdit} />
      <Route exact path="/RecruiterMyPage" component={RecruiterMyPage} />
      <Route
        exact
        path="/RecruiterPasswordCheck"
        component={RecruiterPasswordCheck}
      />
      <Route exact path="/SeeRecruiter" component={SeeRecruiter} />
      <Route exact path="/SeeUser" component={SeeUser} />
      <Route
        exact
        path="/UserDelete"
        render={() => <UserDelete setIsLogin={setIsLogin} />}
      />
      <Route
        exact
        path="/UserEdit"
        render={() => (
          <UserEdit

          // handlelogout={handleLogout}
          />
        )}
      />
      <Route
        exact
        path="/UserEditPasswordCheck"
        component={UserEditPasswordCheck}
      />
      <Route exact path="/UserMaill" component={UserMaill} />
      <Route
        exact
        path="/UserMyPage"
        render={() => <UserMyPage isLogin={isLogin} />}
      />
      {/* FreeBoard */}

      <Route
        exact
        path="/FreeBoardContents"
        render={() => (
          <FreeBoardContents
            isLogin={isLogin}
            currentFBcontent={currentFBcontent}
            userId={userId}
            GoToFreeBoardContent={GoToFreeBoardContent}
          />
        )}
      />
      <Route exact path="/FreeBoardCreate" component={FreeBoardCreate} />
      <Route
        exact
        path="/FreeBoardDelete"
        render={() => <FreeBoardDelete currentFBcontent={currentFBcontent} />}
      />
      <Route
        exact
        path="/FreeBoardEdit"
        render={() => (
          <FreeBoardEdit
            currentFBcontent={currentFBcontent}
            GoToFreeBoardContent={GoToFreeBoardContent}
          />
        )}
      />

      <Route
        exact
        path="/FreeBoardList"
        render={() => (
          <FreeBoardList
            isLogin={isLogin}
            userId={userId}
            GoToFreeBoardContent={GoToFreeBoardContent}
          />
        )}
      />

      {/* CrewBoard */}
      <Route
        exact
        path="/CrewBoardContents"
        render={() => (
          <CrewBoardContents
            isLogin={isLogin}
            currentCBcontent={currentCBcontent}
            userId={userId}
            GoToCrewBoardContent={GoToCrewBoardContent}
          />
        )}
      />
      <Route
        exact
        path="/CrewBoardCreate"
        render={() => (
          <CrewBoardCreate GoToCrewBoardContent={GoToCrewBoardContent} />
        )}
      />
      <Route
        exact
        path="/CrewBoardDelete"
        render={() => <CrewBoardDelete currentCBcontent={currentCBcontent} />}
      />
      <Route
        exact
        path="/CrewBoardEdit"
        render={() => (
          <CrewBoardEdit
            currentCBcontent={currentCBcontent}
            GoToCrewBoardContent={GoToCrewBoardContent}
          />
        )}
      />
      <Route
        exact
        path="/CrewBoardList"
        render={() => (
          <CrewBoardList
            isLogin={isLogin}
            userId={userId}
            GoToCrewBoardContent={GoToCrewBoardContent}
          />
        )}
      />

      <Route exact path="/Map" component={Map} />
      <Route exact path="/MapRegister" component={MapRegister} />

      <Route exact path="/OauthUserReg" component={OauthUserReg} />
      <Route exact path="/OauthUserEdit" component={OauthUserEdit} />

      <Footer
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setIsUserLogin={setIsUserLogin}
      />
    </div>
  );
}
