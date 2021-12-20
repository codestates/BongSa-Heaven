require("dotenv").config();
const Freeboard = require("../models/Freeboard");
const Crewboard = require("../models/Crewboard");
const Mongoose = require("mongoose");
const {isAuthorized} = require("../middlewares/token");

module.exports = {
  // free board commnt
  fbcommentregisterControl: async (req, res) => {
    // 1. token userData 인증
    // 2. post_id => req.body로 받아와 => freecomment 배열 안에 넣자
    // 3. 보낼땐 다줘야하나? 뭘 뭐야하지
    try {
      const userData = await isAuthorized(req, res);
      if (!userData) {
        return res.send({message: "싸장님 회원 맞아?? 빨리 가입 해"});
      }
      if (userData) {
        // console.log("===userData===", userData);
        await Freeboard.findById(req.body.freeboard_id).then(doc => {
          // console.log("===doc===", doc);
          if (doc === null) {
            return res.status(404).send({message: "싸장님 잘못된 경로야!"});
          } else {
            const fbcomment = {
              user_id: userData.user_id,
              freeboard_id: req.body.freeboard_id,
              comment: req.body.comment,
            };
            doc.freecomments.push(fbcomment);
            doc.save();
            res.status(200).send({message: "싸장님 댓글 등록 완료!"});
          }
        });
      }
    } catch (err) {
      return res.send("err");
    }
  },

  fbcommenteditControl: async (req, res) => {
    // 1. 토큰 본인인증 // freeboard_id, freecomment_id, comment //
    // 2. 게시글의 번호 찾고 freecomments 유저 아이디랑 비교
    // 3. 내용 업데이트
    const userData = await isAuthorized(req, res);
    if (!userData) {
      return res.send({message: "싸장님~ 댓글 수정 권한 없어!"});
    }
    try {
      if (userData) {
        const fbcontent = await Freeboard.findOneAndUpdate(
          {
            _id: req.body.freeboard_id,
            freecomments: {
              $elemMatch: {
                _id: req.body.freecomment_id,
                user_id: userData.user_id,
              },
            },
          },
          {
            $set: {"freecomments.$.comment": req.body.comment},
          },
        ).exec();
        if (fbcontent) {
          return res
            .status(200)
            .send({data: fbcontent, message: "싸장님 댓글 수정 완료"});
        } else {
          return res
            .status(400)
            .send({data: fbcontent, message: "싸장님~ 댓글이 없어"});
        }
      }
    } catch (err) {
      return res.send("err");
    }
  },

  fbcommentdeleteControl: async (req, res) => {
    // 1. 토큰 본인인증 // freeboard_id, freecomment_id
    // 2. 게시글의 번호 찾고 freecomments 유저 아이디랑 비교
    // 3. 내용 삭제
    try {
      const userData = await isAuthorized(req, res);
      if (!userData) {
        return res.status(401).send({message: "싸장님~ 댓글 수정 권한 없어!"});
      }
      if (userData) {
        const fbcontent = await Freeboard.findOneAndUpdate(
          {
            _id: req.body.freeboard_id,
            freecomments: {
              $elemMatch: {
                _id: req.body.freecomment_id,
                user_id: userData.user_id,
              },
            },
          },
          {
            $pull: {
              freecomments: {_id: req.body.freecomment_id},
            },
          },
        ).exec();
        console.log("===fbcontent===", fbcontent);
        if (fbcontent) {
          return res
            .status(200)
            .send({data: fbcontent, message: "싸장님~ 댓글 삭제 완료!"});
        } else {
          return res
            .status(400)
            .send({data: fbcontent, message: "싸장님~ 댓글 삭제 실패야!!"});
        }
      }
    } catch (err) {
      return res.send(err);
    }
  },

  // crew board comment
  cbcommentregisterControl: async (req, res) => {
    // 1. token userData 인증
    // 2. post_id => req.body로 받아와 => crewcomment 배열 안에 넣자
    // 3. 보낼땐 다줘야하나? 뭘 뭐야하지
    try {
      const userData = await isAuthorized(req, res);
      if (!userData) {
        return res.send({message: "싸장님 회원 맞아?? 빨리 가입 해"});
      }
      if (userData) {
        // console.log("===userData===", userData);
        await Crewboard.findById(req.body.crewboard_id).then(doc => {
          // console.log("===doc===", doc);
          if (doc === null) {
            return res.status(404).send({message: "싸장님 잘못된 경로야!"});
          } else {
            const cbcomment = {
              user_id: userData.user_id,
              crewboard_id: req.body.crewboard_id,
              comment: req.body.comment,
            };
            doc.crewcomments.push(cbcomment);
            doc.save();
            res.status(200).send({message: "싸장님 댓글 등록 완료!"});
          }
        });
      }
    } catch (err) {
      return res.send("err");
    }
  },

  cbcommenteditControl: async (req, res) => {
    // 1. 토큰 본인인증
    // 2. 게시글의 번호 찾고 crewcomments 유저 아이디랑 비교
    // 3. 내용 업데이트

    try {
      const userData = await isAuthorized(req, res);
      if (!userData) {
        return res.send({message: "싸장님~ 댓글 수정 권한 없어!"});
      }

      if (userData) {
        const cbcontent = await Crewboard.findOneAndUpdate(
          {
            _id: req.body.crewboard_id,
            crewcomments: {
              $elemMatch: {
                _id: req.body.crewcomment_id,
                user_id: userData.user_id,
              },
            },
          },
          {
            $set: {"crewcomments.$.comment": req.body.comment},
          },
        ).exec();
        if (cbcontent) {
          return res
            .status(200)
            .send({data: cbcontent, message: "싸장님 댓글 수정 완료"});
        } else {
          return res
            .status(400)
            .send({data: cbcontent, message: "싸장님~ 댓글이 없어"});
        }
      }
    } catch (err) {
      return res.send("err");
    }
  },

  cbcommentdeleteControl: async (req, res) => {
    // 1. 토큰 본인인증
    // 2. 게시글의 번호 찾고 crewcomments 유저 아이디랑 비교
    // 3. 내용 삭제
    try {
      const userData = await isAuthorized(req, res);
      if (!userData) {
        return res.status(401).send({message: "싸장님~ 댓글 수정 권한 없어!"});
      }

      if (userData) {
        const cbcontent = await Crewboard.findOneAndUpdate(
          {
            _id: req.body.crewboard_id,
            crewcomments: {
              $elemMatch: {
                _id: req.body.crewcomment_id,
                user_id: userData.user_id,
              },
            },
          },
          {
            $pull: {
              crewcomments: {_id: req.body.crewcomment_id},
            },
          },
        ).exec();
        console.log("===cbcontent===", cbcontent);
        if (cbcontent) {
          return res
            .status(200)
            .send({data: cbcontent, message: "싸장님~ 댓글 삭제 완료!"});
        } else {
          return res
            .status(400)
            .send({data: cbcontent, message: "싸장님~ 댓글 삭제 실패야!!"});
        }
      }
    } catch (err) {
      return res.send("err");
    }
  },

  // freeboard child comment control
  fbchildregisterControl: async (req, res) => {
    // 1. token userData 인증
    // 2. findOndAndUpdate 가능하지않나?? + $set $addToSet인가
    // 3. 해보자
    try {
      const userData = await isAuthorized(req, res);
      if (!userData) {
        return res.send({message: "싸장님 회원 맞아?? 빨리 가입 해"});
      }
      if (userData) {
        const fbchild = await Freeboard.findOneAndUpdate(
          {
            _id: req.body.freeboard_id,
            freecomments: {
              $elemMatch: {
                _id: req.body.freecomment_id,
              },
            },
          },
          {
            $addToSet: {
              "freecomments.$[el].freechildcomments": {
                user_id: userData.user_id,
                freeboard_id: req.body.freeboard_id,
                freecomment_id: req.body.freecomment_id,
                child_comment: req.body.comment,
              },
            },
          },
          {
            arrayFilters: [{"el._id": req.body.freecomment_id}],
          },
        ).exec();
        if (fbchild) {
          console.log("===fbchild===", fbchild);
          return res
            .status(200)
            .send({data: fbchild, message: "싸장님 대댓글 등록 완료"});
        } else {
          console.log("===fbchild===", fbchild);
          return res
            .status(400)
            .send({data: fbchild, message: "싸장님 대댓글 등록 실패"});
        }
      }
    } catch (err) {
      return res.send("err");
    }
  },
  fbchildeditControl: async (req, res) => {
    // 1. token userData 인증
    // 2. findOndAndUpdate 가능하지않나?? + $set?? 으로 가능합니까
    try {
      const userData = await isAuthorized(req, res);
      if (!userData) {
        return res.send({message: "싸장님 회원 맞아?? 빨리 가입 해"});
      }
      if (userData) {
        const fbchild = await Freeboard.findOneAndUpdate(
          {
            _id: req.body.freeboard_id,
            freecomments: {
              $elemMatch: {
                _id: req.body.freecomment_id,
                freechildcomments: {
                  $elemMatch: {
                    _id: req.body.freechild_id,
                    user_id: userData.user_id,
                  },
                },
              },
            },
          },
          {
            $set: {
              "freecomments.$[].freechildcomments.$[el].child_comment":
                req.body.comment,
            },
          },
          {
            arrayFilters: [
              {
                "el._id": {$eq: req.body.freechild_id},
              },
            ],
          },
        ).exec();
        if (fbchild) {
          console.log("===fbchild===", fbchild);
          return res
            .status(200)
            .send({data: fbchild, message: "싸장님 대댓글 수정 완료"});
        } else {
          console.log("===fbchild===", fbchild);
          return res
            .status(400)
            .send({data: fbchild, message: "싸장님 대댓글 수정 실패"});
        }
      }
    } catch (err) {
      return res.send("err");
    }
  },
  fbchilddeleteControl: async (req, res) => {
    // 1. token userData 인증
    // 2. findOndAndUpdate 가능하지않나?? + $set $addToSet인가
    // 3. 해보자
    try {
      const userData = await isAuthorized(req, res);
      if (!userData) {
        return res.send({message: "싸장님 회원 맞아?? 빨리 가입 해"});
      }
      if (userData) {
        const fbchild = await Freeboard.findOneAndUpdate(
          {
            _id: req.body.freeboard_id,
            freecomments: {
              $elemMatch: {
                _id: req.body.freecomment_id,
                freechildcomments: {
                  $elemMatch: {
                    _id: req.body.freechild_id,
                    user_id: userData.user_id,
                  },
                },
              },
            },
          },
          {
            $pull: {
              "freecomments.$[el].freechildcomments": {
                _id: req.body.freechild_id,
              },
            },
          },
          {
            arrayFilters: [
              {
                "el._id": {$eq: req.body.freecomment_id},
              },
            ],
          },
        ).exec();
        if (fbchild) {
          console.log("===fbchild===", fbchild);
          return res
            .status(200)
            .send({data: fbchild, message: "싸장님 대댓글 삭제 완료"});
        } else {
          console.log("===fbchild===", fbchild);
          return res
            .status(400)
            .send({data: fbchild, message: "싸장님 대댓글 삭제 실패"});
        }
      }
    } catch (err) {
      return res.send("err");
    }
  },

  // crewboard child comment control
  cbchildregisterControl: async (req, res) => {
    // 1. token userData 인증
    // 2. findOndAndUpdate 가능하지않나?? + $set $addToSet인가
    // 3. 해보자
    try {
      const userData = await isAuthorized(req, res);
      if (!userData) {
        return res.send({message: "싸장님 회원 맞아?? 빨리 가입 해"});
      }
      if (userData) {
        const cbchild = await Crewboard.findOneAndUpdate(
          {
            _id: req.body.crewboard_id,
            crewcomments: {
              $elemMatch: {
                _id: req.body.crewcomment_id,
              },
            },
          },
          {
            $addToSet: {
              "crewcomments.$[el].crewchildcomments": {
                user_id: userData.user_id,
                crewboard_id: req.body.crewboard_id,
                crewcomment_id: req.body.crewcomment_id,
                child_comment: req.body.comment,
              },
            },
          },
          {
            arrayFilters: [{"el._id": req.body.crewcomment_id}],
          },
        ).exec();
        if (cbchild) {
          console.log("===cbchild===", cbchild);
          return res.status(200).send({message: "싸장님 대댓글 등록 완료"});
        } else {
          console.log("===cbchild===", cbchild);
          return res.status(400).send({message: "싸장님 대댓글 등록 실패"});
        }
      }
    } catch (err) {
      return res.send("err");
    }
  },
  cbchildeditControl: async (req, res) => {
    // 1. token userData 인증
    // 2. findOndAndUpdate 가능하지않나?? + $set?? 으로 가능합니까
    try {
      const userData = await isAuthorized(req, res);
      if (!userData) {
        return res.send({message: "싸장님 회원 맞아?? 빨리 가입 해"});
      }
      if (userData) {
        const cbchild = await Crewboard.findOneAndUpdate(
          {
            _id: req.body.crewboard_id,
            crewcomments: {
              $elemMatch: {
                _id: req.body.crewcomment_id,
                crewchildcomments: {
                  $elemMatch: {
                    _id: req.body.crewchild_id,
                    user_id: userData.user_id,
                  },
                },
              },
            },
          },
          {
            $set: {
              "crewcomments.$[].crewchildcomments.$[el].child_comment":
                req.body.comment,
            },
          },
          {
            arrayFilters: [
              {
                "el._id": {$eq: req.body.crewchild_id},
              },
            ],
          },
        ).exec();
        if (cbchild) {
          console.log("===cbchild===", cbchild);
          return res.status(200).send({message: "싸장님 대댓글 수정 완료"});
        } else {
          console.log("===cbchild===", cbchild);
          return res.status(400).send({message: "싸장님 대댓글 수정 실패"});
        }
      }
    } catch (err) {
      return res.send("err");
    }
  },
  cbchilddeleteControl: async (req, res) => {
    // 1. token userData 인증
    // 2. findOndAndUpdate 가능하지않나?? + $set $addToSet인가
    // 3. 해보자
    try {
      const userData = await isAuthorized(req, res);
      if (!userData) {
        return res.send({message: "싸장님 회원 맞아?? 빨리 가입 해"});
      }
      if (userData) {
        const cbchild = await Crewboard.findOneAndUpdate(
          {
            _id: req.body.crewboard_id,
            crewcomments: {
              $elemMatch: {
                _id: req.body.crewcomment_id,
                crewchildcomments: {
                  $elemMatch: {
                    _id: req.body.crewchild_id,
                    user_id: userData.user_id,
                  },
                },
              },
            },
          },
          {
            $pull: {
              "crewcomments.$[el].crewchildcomments": {
                _id: req.body.crewchild_id,
              },
            },
          },
          {
            arrayFilters: [
              {
                "el._id": {$eq: req.body.crewcomment_id},
              },
            ],
          },
        ).exec();
        if (cbchild) {
          console.log("===cbchild===", cbchild);
          return res.status(200).send({message: "싸장님 대댓글 삭제 완료"});
        } else {
          console.log("===cbchild===", cbchild);
          return res.status(400).send({message: "싸장님 대댓글 삭제 실패"});
        }
      }
    } catch (err) {
      return res.send("err");
    }
  },
};
