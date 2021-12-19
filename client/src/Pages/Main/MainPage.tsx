import {useState, useEffect} from "react";
import axios from "axios";
import Header from "../../components/common/Header";
import Loading from "../../components/common/Loading";
import BestCrew from "../../components/Main/BestCrew";
import FreeBoard from "../../components/Main/FreeBoard";

export default function MainPage({
  GoToFreeBoardContent,
  GoToCrewBoardContent,
  userId,
}: any) {
  const [isLoading, CheckLoading] = useState(true);
  const [Top3crewBoardinfo, setTop3CrewBoardinfo] = useState([]);
  const [crewBoardinfo, setCrewBoardinfo] = useState([]);
  const [freeBoardinfo, setFreeBoardinfo] = useState([]);

  const loadingHandler = () => {
    CheckLoading(false);
  };

  const getCrewBoardList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/board/cblist`)
      .then(res => {
        setCrewBoardinfo(res.data.data);
        setTop3CrewBoardinfo(res.data.cbTopThree);
      })
      .catch(err => console.log(err));
  };

  const getFreeBoardList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/board/fblist`)
      .then(res => {
        setFreeBoardinfo(res.data.data);
        loadingHandler();
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getCrewBoardList();
    getFreeBoardList();
    setTimeout(() => loadingHandler(), 5000); // 무한 로딩 방지
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Header />
          <BestCrew
            crewBoardinfo={crewBoardinfo}
            GoToCrewBoardContent={GoToCrewBoardContent}
            Top3crewBoardinfo={Top3crewBoardinfo}
          />
          <FreeBoard
            userId={userId}
            GoToFreeBoardContent={GoToFreeBoardContent}
            freeBoardinfo={freeBoardinfo}
          />
        </>
      )}
    </>
  );
}
