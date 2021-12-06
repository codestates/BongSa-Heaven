require("dotenv").config();
const Freeboard = require("../models/Freeboard");
// const Crewboard = require("../models/Crewboard");
const { isAuthorized } = require("../middlewares/token");

module.exports = {
  // free board control
  fbregisterControl: async (req, res) => {
    // 1. 가입된 유저인지 확인한다 => 토큰 검증
    // 2. 유저가 아니라면 돌려보냄
    // 3. 유저라면 free board에 모델 생성하고 req.body로 받은 데이터 등록
    const userData = isAuthorized(req, res);
    if (!userData) {
      return res.send({ message: "싸장님 회원 맞아?? 빨리 가입 해" });
    }
    if (userData) {
      const freeContent = {
        user_id: userData.user_id,
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,
      };
      const insertDb = new Freeboard(freeContent).save();
      if (!insertDb) {
        return res.status(500).send({ message: "싸장님 서버 이상해" });
      } else {
        return res.status(201).send({ message: "freeboard content 등록완료" });
      }
    }
  },

  fblistControl: async (req, res) => {
    // 1. db상에 존재하는 모든 free board 글들을 찾아서 보내줌 (모두 이용 가능)
    const fbcontents = await Freeboard.find({})
      .select({ like: 1, title: 1, createdAt: 1 })
      .populate({ path: "user_id", select: { nickname: 1 } })
      .sort({ createdAt: -1 });
    res.status(200).send({ data: fbcontents });
  },

  fbinfoControl: async (req, res) => {
    // 1.클릭한 freeboard_id 받아와서 검색해서 결과 뿌려주기

    const fbcontent = await Freeboard.findById(req.body.freeboard_id)
      .select({
        like: 1,
        title: 1,
        image: 1,
        description: 1,
        freecomments: 1,
        createdAt: 1,
      })
      .populate({ path: "user_id", select: { nickname: 1 } })
      .sort({ createdAt: -1 })
      .select({
        freecomments: {
          _id: 1,
          user_id: 1,
          comment: 1,
          nickname: 1,
          createdAt: 1,
        },
      })
      .populate({
        path: "freecomments.user_id",
        select: { nickname: 1 },
      });
    res.status(200).send({ data: fbcontent });
  },

  fbeditControl: async (req, res) => {
    // 1. 인증
    // 2. 유저 아이디(토큰) + 게시글 아이디(바디)
    // 3. 수정
    const { freeboard_id, title, description, image } = req.body;
    const userData = isAuthorized(req, res);
    if (!userData) {
      res.send({ message: "싸장님은 게시글 수정 권한 없어!" });
    }
    if (userData) {
      const edit = {
        title: title,
        description: description,
        image: image,
      };
      const editfbcontent = await Freeboard.findById(freeboard_id)
        .updateMany(edit)
        .exec();
      console.log("===editfbcontent===", editfbcontent);
      res.status(200).send({ message: "싸장님 게시글 변경 완료!" });
    }
  },

  fbdeleteControl: async (req, res) => {
    // 1. 토큰 사용자 인증
    // 2. 게시물 인증
    // 3. db삭제
    const userData = isAuthorized(req, res);
    if (!userData) {
      res.send({ message: "싸장님은 게시글 수정 권한 없어!" });
    }
    if (userData) {
      const deletefbcontent = await Freeboard.findById(req.body.freeboard_id);
      if (!deletefbcontent) {
        res.status(404).send({ message: "잘못된 게시글입니다" });
      }
      if (deletefbcontent) {
        deletefbcontent.remove();
        res.status(200).send({ message: "싸장님 게시글 삭제 완료!" });
      }
    }
  },

  // crew board control
  cbregisterControl: async (req, res) => {
    return res.send("cb register ok!");
  },
  cblistControl: async (req, res) => {
    return res.send("cb info ok!");
  },
  cbeditControl: async (req, res) => {
    return res.send("cb edit ok!");
  },
  cbdeleteControl: async (req, res) => {
    return res.send("cb delete ok!");
  },
};
