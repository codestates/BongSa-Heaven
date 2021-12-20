const Map = require("../models/Map");
const User = require("../models/User");
const {isAuthorized} = require("../middlewares/token");

module.exports = {
  //맵좌표를 등록하면 자연 적으로 유저 정보가 나온다.
  mapRegisterControl: async (req, res) => {
    const {Ma, La} = req.body;

    const token = req.headers["authorization"] || req.headers["Authorization"];
    if (!token) {
      res.status(401).send("인증이 필요합니다.");
    }
    const accessTokenData = isAuthorized(req);
    //user_id를 받아온다.

    try {
      const userInfo = await User.findOne({
        email: accessTokenData.email,
      }).exec();
      console.log(userInfo._id);
      //맵 좌표를 가진 유저를 가져온다.
      const getMapCoordinate = await Map.findOne({
        user_id: userInfo._id,
      }).exec();

      // Query를 이용할 때 프로미스를 리턴받고 싶다면 exec()
      console.log(getMapCoordinate);
      //맵 좌표를 가진 유저가 한번더 등록을 실행하면 받아주지 않는다.
      if (getMapCoordinate) {
        return res.status(400).send("더이상 등록 할수 없습니다.");
      } else {
        const mapCoordinate = await Map.insertMany({
          user_id: userInfo._id,
          La: La,
          Ma: Ma,
        });

        //userInfo가 두번들어올수 없다.
        //같은 userInfo가 들어오는 경우 거절되어야함

        return res.status(201).send(mapCoordinate);
      }
    } catch (err) {
      console.log(err);
    }
  },
  mapInfoControl: (req, res) => {
    // const token = req.headers["authorization"] || req.headers["Authorization"];
    // if (!token) {
    //   res.status(401).send("인증이 필요합니다.");
    // }

    Map.find()
      .populate("user_id")
      .exec()
      .then(data => {
        return res.status(200).send(data);
      });
  },
};
