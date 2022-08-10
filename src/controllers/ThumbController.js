const fs = require("fs");
const https = require("https");
const sharp = require("sharp");

const thumbnail = async (req, res, next) => {
  try {
    var imgName = Date.now() + ".png";

    var localPath = fs.createWriteStream("./thumbs/t" + imgName);
    var thumbPath = "./thumbs/";
    fs.access("./thumbs", (err) => {
      if (err) {
        fs.mkdirSync("./thumbs");
      }
    });
    var request = https.get(req.body.url, async (response) => {
      console.log(response);
      response.pipe(localPath);
      await sharp("./thumbs/t" + imgName)
        .resize({ width: 50, height: 50 })
        .toFile("./thumbs/" + imgName);
    });
    res.status(200).json({ path: thumbPath + imgName, success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { thumbnail };
