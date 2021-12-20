require("dotenv").config();
const crypto = require("crypto");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  isAuthorized,
  checkRefreshToken,
} = require("../middlewares/token");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const axios = require("axios");
const qs = require("qs");
module.exports = {
  signupControl: async (req, res) => {
    // 1. req.body 제대로 들어왔는지 확인 아니면 돌려보냄
    const {
      email,
      nickname,
      password,
      sex,
      want_region,
      want_vol,
      age,
      company,
      iscompany,
    } = req.body;

    console.log("req.body", req.body);
    // if (
    //   !email ||
    //   !nickname ||
    //   !password ||
    //   !sex ||
    //   !want_region ||
    //   !want_vol ||
    //   !age
    // ) {
    //   return res.status(400).send("모든 항목을 입력해주세요");
    // }

    // 2. 들어왔다면 db에 있는지 조회 있다면 돌려보냄
    const userDb = {email: email};
    const existUser = await User.findOne(userDb);

    if (existUser) {
      return res.status(409).send({message: "싸장님 이메일 이미 가입했어"});
    }

    // 3. db에 없다면 db에 등록
    // 크립토로 비밀번호 솔트해싱 db에 저장
    if (!existUser) {
      crypto.randomBytes(64, (err, buf) => {
        if (err) {
          console.log(err);
          return;
        } else {
          const salt = buf.toString("base64");
          crypto.pbkdf2(password, salt, 110011, 64, "sha512", (err, key) => {
            if (err) {
              console.log(err);
              return;
            } else {
              const hardPass = key.toString("base64");
              const newUser = {
                email: email,
                password: hardPass,
                nickname: nickname,
                sex: sex,
                want_region: want_region,
                want_vol: want_vol,
                age: age,
                salt: salt,
                company: company,
                iscompany: iscompany,
                isopen: true,
              };
              console.log(newUser);
              const insertDb = new User(newUser).save();
              if (!insertDb) {
                return res.status(500).send({message: "싸장님 서버 이상해"});
              } else {
                return res
                  .status(201)
                  .send({message: "싸장님 웰캄 투 봉사천국"});
              }
            }
          });
        }
      });
    }
  },

  signinControl: async (req, res) => {
    // 1. 이메일과 패스드가 담긴 바디를 받는다
    // 2. 암호에 소금쳐서 다시 찾아낸다
    const {email, password} = req.body;
    const salt = await User.findOne({email: email}).select({
      _id: 0,
      salt: 1,
    });
    if (salt === null) {
      return res.status(404).send({message: "이메일 및 비밀번호 다시 쳐봐"});
    }
    console.log("===salt.salt===", salt.salt);

    // 2. 유저db 에서 이메일이 있는지 확인한다;
    crypto.pbkdf2(
      password,
      salt.salt,
      110011,
      64,
      "sha512",
      async (err, key) => {
        const hardPass = key.toString("base64");
        const query = {email: email, password: hardPass};
        const userInfo = await User.findOne(query);
        // 3. 없다면 404 돌려보냄
        if (!userInfo) {
          return res
            .status(404)
            .send({message: "싸장님 이메일 및 비밀번호 확인해!"});
        }
        // 4. 있다면 뭐뭐 줄래? => token 전달!{ email, nickname, user_id }
        if (userInfo) {
          const {email, nickname} = userInfo;
          const user_id = userInfo._id;
          const accessToken = generateAccessToken({email, nickname, user_id});
          const refreshToken = generateRefreshToken({
            email,
            nickname,
            user_id,
          });
          // const issueDate = new Date();
          // const accessTokenExpiry = new Date(Date.parse(issueDate) + 1209600000); // +3h
          // const refreshTokenExpiry = new Date(Date.parse(issueDate) + 10800000); // +14d
          return res
            .cookie("refreshToken", refreshToken, {
              domain: "bongsa-heaven.com",
              path: "/",
              sameSite: "none",
              secure: true,
              httpOnly: true,
            })
            .status(200)
            .send({accessToken: accessToken});
        } else {
          return res.status(500).send("error");
        }
      },
    );
  },

  signoutControl: async (req, res) => {
    const accessTokenData = isAuthorized(req, res);
    if (!accessTokenData) {
      return res.status(401).send({message: "싸장님 토큰 망가졌어"});
    }
    if (accessTokenData) {
      return res
        .clearCookie("refreshToken")
        .status(200)
        .send({message: "싸장님 또 와"});
    } else {
      return res.status(500).send({message: "서버 이상해"});
    }
  },

  nickcheckControl: async (req, res) => {
    // 1. 닉네임을 받는다
    // 2. db에서 닉네임을 검색한다
    const query = {nickname: req.body.nickname};
    try {
      const existNick = await User.findOne(query);
      // 3. 있으면 돌려보낸다. 없으면 괜찮다고 메세지!
      if (existNick) {
        return res.status(400).send({message: "싸장님 다른 닉네임 부탁해!"});
      }
      if (!existNick) {
        return res.status(200).send({message: "싸장님 좋은 닉네임!"});
      }
    } catch (err) {
      return res.send(err);
    }
  },

  mailNickcheckControl: async (req, res) => {
    // 1. 닉네임을 받는다
    // 2. db에서 닉네임을 검색한다
    const query = {nickname: req.body.nickname};
    const existNick = await User.findOne(query);
    // 3. 있으면 돌려보낸다. 없으면 괜찮다고 메세지!
    if (existNick) {
      return res.status(200).send({message: "닉네임 존재확인 완료"});
    }
    if (!existNick) {
      return res.status(400).send({message: "닉네임 없음"});
    }
  },

  refreshtokenControl: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const refreshTokenData = checkRefreshToken(refreshToken);
    try {
      if (!refreshTokenData) {
        return res.status(401).send({message: "유효하지 않은 토큰~"});
      }

      if (refreshTokenData) {
        const userInfo = await User.findOne({email: refreshTokenData.email});
        if (!userInfo) {
          return res.status(500).send({message: "뭔가가 이상하다"});
        } else {
          const {email, nickname} = userInfo;
          const user_id = userInfo._id;
          const accessToken = generateAccessToken({email, nickname, user_id});

          // const issueDate = new Date();
          // const accessTokenExpiry = new Date(Date.parse(issueDate) + 1209600000); // +3h
          // const refreshTokenExpiry = new Date(Date.parse(issueDate) + 10800000); // +14d

          return res.status(200).send({accessToken: accessToken});
        }
      }
    } catch (err) {
      return res.send(err);
    }
  },

  resetrftkControl: async (req, res) => {
    const refreshToken = "";
    res
      .cookie("refreshToken", refreshToken, {httpOnly: true})
      .status(200)
      .send();
  },

  googleControl: async (req, res) => {
    // const Oauth =
    //   "https://accounts.google.com/o/oauth2/v2/auth?client_id=288722608551-n6ktb74p9fbe0871dikkoul506eedkgq.apps.googleusercontent.com&response_type=code&redirect_uri=http://localhost:3000/callback&scope=https://www.googleapis.com/auth/userinfo.email";

    // try {
    //   return res.redirect(Oauth);
    // } catch (err) {
    //   console.log(err);
    // }

    const code = req.body.code;
    console.log(code);

    const result = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT}&client_secret=${process.env.GOOGLE_SECRET}&redirect_uri=${process.env.REDIRECT_URI}&grant_type=authorization_code`,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Accept: "application/json",
        },
      },
    );

    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${result.data.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${result.data.access_token}`,
        },
      },
    );
    // 가입과 로그인을 동시에 한다.
    // 가입이 되어있는 상황이라면, db에서 꺼내어 맞춘다.
    //회원가입을 할때,
    //
    const {id, email} = userInfo.data;
    console.log(userInfo.data);
    const existUser = await User.findOne({email: email}).exec();
    //회원가입이 되어있지 않다면 회원가입을하고
    if (!existUser) {
      console.log(email);
      User.insertMany({
        email: email,
        nickname: null,
        status: true,
        isopen: true,
        iscompany: false,
        age: null,
        sex: null,
        want_region: null,
        want_vol: null,
      }) // 아이디가
        .then(data => {
          if (!data) {
            return res.status(500).send("서버가 이상합니다");
          }
          const {nickname, _id, email} = data[0];

          const accessToken = generateAccessToken({_id, nickname, email});
          const refreshToken = generateRefreshToken({_id, nickname, email});

          return res
            .status(200)
            .cookie("refreshToken", refreshToken, {
              domain: "bongsa-heaven.com",
              path: "/",
              sameSite: "none",
              secure: true,
              httpOnly: true,
            })
            .send({
              accessToken: accessToken,
              message: "Oauth인증 성공 다음 단계로",
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
    //회원가입을 한경우 라면

    try {
      const {email, _id, nickname} = existUser;
      console.log(email, _id, nickname, "하이 하이 하이뮨이야");
      const accessToken = generateAccessToken({_id, nickname, email});
      const refreshToken = generateRefreshToken({_id, nickname, email});

      return res
        .cookie("refreshToken", refreshToken, {
          domain: "bongsa-heaven.com",
          path: "/",
          sameSite: "none",
          secure: true,
          httpOnly: true,
        })
        .status(200)
        .send({acessToken: accessToken, message: "구글 로그인 되었습니다."});

      //git
    } catch (err) {
      console.log(err);
    }
    //토큰을 보내줘야한다.
    //id를 닉네임
  },

  kakaoControl: async (req, res) => {
    const code = req.body.code;
    console.log(code);
    try {
      const result = await axios.post(
        `https://kauth.kakao.com/oauth/token?code=${code}&client_id=${process.env.KAKAO_CLIENT}&client_secret=${process.env.KAKAO_SECRET}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&grant_type=authorization_code`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            Accept: "application/json",
          },
        },
      );
      const userInfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${result.data.access_token}`,
        },
      });

      console.log(userInfo);

      const userNick = userInfo.data.properties.nickname;
      const userKakao = userInfo.data.id;

      const query = {kakao_id: userKakao};
      const existUser = await User.findOne(query);
      console.log(existUser);

      if (existUser) {
        const {_id, kakao_id, nickname} = existUser;
        const accessToken = generateAccessToken({_id, kakao_id, nickname});
        const refreshToken = generateRefreshToken({_id, kakao_id, nickname});
        return res
          .cookie("refreshToken", refreshToken, {
            domain: "server.bongsa-heaven.com",
            path: "/",
            sameSite: "none",
            secure: true,
            httpOnly: true,
          })
          .status(200)
          .send({accessToken: accessToken, message: "kakao signin성공!"});
      }
      if (!existUser) {
        const newUser = {
          kakao_id: userKakao,
          nickname: null,
          status: true,
          isopen: true,
          iscompany: false,
          age: null,
          sex: null,
          want_region: null,
          want_vol: null,
        };
        const insertDb = new User(newUser).save();
        if (!insertDb) {
          return res.status(500).send({message: "싸장님 서버 이상해"});
        } else {
          const accessToken = generateAccessToken({userKakao, userNick});
          const refreshToken = generateRefreshToken({userKakao, userNick});
          return res
            .cookie("refreshToken", refreshToken, {
              domain: "server.bongsa-heaven.com",
              path: "/",
              sameSite: "none",
              secure: true,
              httpOnly: true,
            })
            .status(200)
            .send({
              accessToken: accessToken,
              message: "kakao인증, 다음 ",
            });
        }
      }
    } catch (err) {
      console.log(err);
    }
  },

  sendEmailControl: async (req, res) => {
    //회원가입 완료후 인증하라고 나온다.
    //회원가입 완료후 추가인증

    const {email} = req.body;

    const vaildCheck = email.indexOf("@");

    if (!email || email.length === 0 || vaildCheck === -1) {
      return res.status(400).json({message: "Need accurate informations"});
    }
    //2. 링크타고 들어오도록 authcode를 생성하여 db에 저장,
    //보안을위해 auth => crypto 로 생성
    //끝에 =이 생겨서 가운데 일부만 가져오고싶음
    const authCode = crypto.randomBytes(64).toString("base64").split("=")[0];
    // console.log(authCode, "authcode");
    let action = ""; //? 회원가입/ 로그인을 구분하기위한 변수
    let endPoint = ""; //? 상황에 따른 리다이렉트 엔드포인트
    let display = ""; //? 상황에 따른 이메일 인증 폼

    //인증 성공하면 status =1로 바꾼다.

    // 3. 회원 가입 유무 에 따른 차이를 둔다. 회원가입을 이미 했다면(2번 하지 못하도록)
    // code를 보내지 않고 이미 인증 or 가입 했다고 나와야함
    try {
      const userInfo = await User.findOne({email: email}).exec();
      //계정이 존재하는경우, status 가 false => 계정인증이 되어야 로그인 가능하다.
      //계정이 존재하는데, 회원가입을 한번더 요청하는경우
      if (userInfo) {
        if (userInfo.status === false) {
          //주어진 아이디를 찾아서 authcode를 넣는다. insertOne(authCode)
          User.updateOne({_id: userInfo._id}, {authcode: authCode}).exec();
          //1시간이 지나도 회원가입인증 안할시 자동으로 회원정보 파기
          setTimeout(async () => {
            if (userInfo.status === false) {
              userInfo.remove(authCode);
              return;
            }
          }, 60000);
        } else {
          //인증이 완료 되었거나
          return res.status(400).send("인증되었다");
        }
      }
    } catch (err) {
      return res.send(err);
    }
    //클릭했는데,

    //이메일을 통해 인증이 된다면 => status =1로 바꿔준다. 링크를 클릭했을때
    //auth 가 동일 하다면, status=1
    let authEmailForm;
    const clientAddr = process.env.CLIENT_ADDR || "http://localhost:3000";
    //? ejs 모듈을 이용해 ejs 파일을 불러온다.
    //? ejs 에 담기는 변수들은 위 코드에서 경우에 따라 설정 된 상태로 올 것이다.
    ejs.renderFile(
      __dirname + "/authForm/authMail.ejs", //filename
      {clientAddr, authCode, action, endPoint, display}, //data
      (err, data) => {
        //funcion
        if (err) console.log(err);
        console.log("파일불러오기");
        authEmailForm = data;
      },
    );
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",

      auth: {
        user: `${process.env.NODEMAILER_USER}`,
        pass: `${process.env.NODEMAILER_PASS}`,
      },
    });

    const mailOptions = {
      from: `${process.env.NODEMAILER_USER}`,
      to: userInfo.email,
      subject: "봉사 천국에 회원가입 해주셔서 감사합니다.",
      html: authEmailForm,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent success! : " + info.response);
      }
      transporter.close();
      return res.status(200).send("끝");
    });
  },

  confirmEmailControl: async (req, res) => {
    //가입후 클라이언트에서 주는 코드로 로그인
    //회원 가입후 로그인 화면에서 query 코드를 넘겨준다.
    console.log(req.body.authCode);
    //authcode가 일치하면 status가 true
    User.updateOne({authcode: req.body.authCode}, {$set: {status: true}})
      .then(data => {
        if (!data) {
          return res.status(400).send("인증 실패");
        }
        return res.status(200).send("이메일 확인 완료");
      })
      .catch(err => {
        console.log(err);
      });

    // return res.status(400).send("내용없음");
    //링크를 클릭했을시 인증하는 코드
  },
};
