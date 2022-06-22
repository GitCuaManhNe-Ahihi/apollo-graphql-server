const fs = require('fs')
const {uploadFile} = require("../service/cloudinary")

const handUploadimage = async (path) => {
  try {
    const data = await uploadFile(path);
    return data
  } catch {
     return false
  } finally {
    fs.unlink(path);
  }
};
module.exports ={
  handUploadimage
}
