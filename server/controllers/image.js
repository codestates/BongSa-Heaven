const freeBoard = require("../models/Freeboard");
const crewBoard = require("../models/Crewboard");
const user = require("../models/User");
module.exports = {
  registerControl: async (req, res) => {
    //db에 img url을 넣는다.

    // const token = req.headers['authorizaiton']||req.headers['Authorizaiton']

    // if(!token){
    //   res.status(401).send('토큰이 없습니다.')
    // }
    // console.log(req.files);
    const image = req.files;
    console.log(image);
    const path = image.map(img => img.location);
    console.log(path, "path");

    if (image === undefined) {
      return res.status(400).send("이미지가 존재하지 않습니다.");
    }

    //게시물을 만들때 함께 적용한다.board가

    const createImages = new freeBoard({
      images: path,
    });
    createImages
      .save()
      .then(data => {
        if (!res) {
          return res.status(500).send("서버 문제");
        }
        return res.status(200).send(data);
      })
      .catch(err => {
        console.log(err);
      });
    //crewboard에 어떻게 추가?
    // const createImage = new crewBoard({
    //   images: path,
    // });
    // createImage
    //   .save()
    //   .then((data) => {
    //     if (!res) {
    //       return res.status(500).send("서버 문제");
    //     }
    //     return res.status(200).send(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // }
  },
};
