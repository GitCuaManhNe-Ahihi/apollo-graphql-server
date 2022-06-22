const {v2} = require("cloudinary")
v2.config({
  cloud_name: "manhdayahhihi",
  api_key: "557771485155511",
  api_secret: "iSQlZvJpwqAse1tuEr2V9ZFy2dA",
});
const uploadCloud = async (file) => {
  return new Promise((resolve, reject) => {
    v2.uploader.upload(
      file,
      { upload_preset: "ozvvaq6d" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
module.export = uploadCloud
