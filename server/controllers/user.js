require("dotenv").config();
const crypto = require("crypto");
const User = require("../models/User");
const {isAuthorized} = require("../middlewares/token");

module.exports = {
  infoControl: async (req, res) => {
    // 1. 토큰을 받아서 유저 아이디를 찾는다
    // 2. 유저 정보를 보내준다.
    const userData = isAuthorized(req, res);
    if (!userData) {
      return res.status(401).send({message: "싸장님 가입부터 해주세요!"});
    }
    if (userData) {
      const userInfo = await User.findById(userData.user_id);
      if (!userInfo) {
        return res.status(404).send({message: "싸장님 일치하는 정보 없어요!"});
      }
      if (userInfo) {
        return res.status(200).send({data: userInfo});
      }
    } else {
      return res.status(500).send({message: "싸장님 서버 이상해!"});
    }
  },

  editControl: async (req, res) => {
    // 1. 토큰으로 user_id 확인
    // 2. req.body로 받는 정보들?
    // 2-1. password가 30자리 이상=> 비번 변경 아님 pwassword: password + salt
    // 2-2. password 30자리 미만 => 비번 변경 맞음 password: newPassword + new salt
    // 3. 업데이트
    const {
      email,
      password,
      nickname,
      sex,
      want_region,
      want_vol,
      age,
      company,
      iscompany,
      isopen,
    } = req.body;

    if (password.length > 30) {
      const userData = isAuthorized(req, res);
      if (userData) {
        const userInfo = await User.findById(userData.user_id).exec();
        if (!userInfo) {
          res.status(401).send({message: "싸장님 정보 없어!"});
        }
        if (userInfo) {
          const editUser = {
            email: email,
            password: password,
            nickname: nickname,
            sex: sex,
            want_region: want_region,
            want_vol: want_vol,
            age: age,
            company: company,
            iscompany: iscompany,
            isopen: isopen,
          };
          await User.findById(userData.user_id).updateMany(editUser).exec();
          res.status(200).send({message: "싸장님 정보 변경 완료!"});
        }
      } else {
        res.status(500).send({message: "서버 이상해!"});
      }
    } else {
      crypto.randomBytes(64, (err, buf) => {
        if (err) {
          console.log(err);
          return;
        } else {
          const newSalt = buf.toString("base64");
          crypto.pbkdf2(
            password,
            newSalt,
            110011,
            64,
            "sha512",
            async (err, key) => {
              if (err) {
                console.log(err);
                return;
              } else {
                const newPassword = key.toString("base64");
                const userData = isAuthorized(req, res);
                if (userData) {
                  const userInfo = await User.findById(userData.user_id).exec();
                  if (!userInfo) {
                    res.status(401).send({message: "싸장님 정보 없어!"});
                  }
                  if (userInfo) {
                    const editUser = {
                      email: email,
                      password: newPassword,
                      nickname: nickname,
                      sex: sex,
                      want_region: want_region,
                      want_vol: want_vol,
                      age: age,
                      salt: newSalt,
                      company: company,
                      iscompany: iscompany,
                      isopen: isopen,
                    };
                    await User.findById(userData.user_id)
                      .updateMany(editUser)
                      .exec();
                    res.status(200).send({message: "싸장님 정보 변경 완료!"});
                  }
                } else {
                  res.status(500).send({message: "서버 이상해!"});
                }
              }
            },
          );
        }
      });
    }
  },
  passwordControl: async (req, res) => {
    // 1. 유저확인
    // 2. 맞으면 패스워드 체킹!
    const userData = isAuthorized(req, res);
    if (!userData) {
      res.status(401).send({message: "싸장님 가입부터 해주세요!"});
    }
    if (userData) {
      const checkPassword = req.body.password;
      const salt = await User.findById(userData.user_id).exec();
      if (salt === null) {
        return res.status(404).send({message: "회원정보 등록부터 해주세요!"});
      }
      crypto.pbkdf2(
        checkPassword,
        salt.salt,
        110011,
        64,
        "sha512",
        async (err, key) => {
          const checkedPass = key.toString("base64");
          const query = {user_id: req.body._id, password: checkedPass};
          const userInfo = await User.findOne(query);
          // 3. 없다면 404 돌려보냄
          if (!userInfo) {
            return res.status(404).send({message: "비밀번호가 다릅니다!!"});
          }
          if (userInfo) {
            return res.status(200).send({message: "비밀번호 정확합니다!"});
          } else {
            return res.status(500).send({message: "서버가 이상해요"});
          }
        },
      );
    }
  },
  withdrawalControl: async (req, res) => {
    // 1. 유저정보 확인
    // 2. 없으면 돌려보내고 있으면 삭제
    const userData = isAuthorized(req, res);
    if (!userData) {
      res.status(401).send({message: "싸장님 가입부터 해야 탈퇴가 가능해!"});
    }
    if (userData) {
      const userInfo = await User.findById(userData.user_id).remove().exec();
      if (!userInfo) {
        res.status(404).send({message: "탈퇴가 이루어지지 않았어요!"});
      } else {
        res.status(200).send({message: "봉사천국 안뇽~ 담에 또 봐요~"});
      }
    }
  },
  listControl: async (req, res) => {
    //봉사 모집자는 일반회원들의 리스트를 동의하는 사람들에 한해서 볼수 있어야합니다.(default =true)
    //동의하지 않은 사용자는 볼수 없습니다.
    // user는 iscompany로 분리됩니다.

    const tokenData = isAuthorized(req);

    if (!tokenData) {
      return res.status(401).send("인증 실패");
    }

    //isopen iscompany =false
    //comapny인 경우 user 한테서 보여준다.

    try {
      const userInfo = await User.findOne({email: tokenData.email});

      if (userInfo.iscompany === true) {
        const isOpenAndnotCompany = await User.find(
          {
            isopen: {$eq: true},
            iscompany: {$eq: false},
          },
          {nickname: 1, want_region: 1, want_vol: 1, sex: 1, age: 1},
        );
        return res.status(200).send(isOpenAndnotCompany);
      } else if (userInfo.iscompany !== true) {
        const isOpenAndCompany = await User.find(
          {
            isopen: {$eq: true},
            iscompany: {$eq: true},
          },
          {nickname: 1, want_region: 1, want_vol: 1, company: 1},
        );
        return res.status(200).send(isOpenAndCompany);
      } else {
        return res.status(500).send("서버 문제 있어요");
      }
    } catch (err) {
      console.log(err);
    }
  },


  
};
