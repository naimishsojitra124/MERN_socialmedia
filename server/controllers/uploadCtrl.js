const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

//S3 Bucket Connection
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const s3 = new AWS.S3();

// Upload to S3 Bucket
const uploadCtrl = {
  // @route   POST api/upload/uploadImg/:userId
  uploadFile: async (req, res) => {
    try {
      const { file } = req;
      const { userId } = req.params;

      //Validate
      if (!file) return res.status(400).json({ msg: "No file uploaded" });

      //S3 Bucket params
      const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: `profilePicture/${userId}/${Date.now()}${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      //Upload image to S3 Bucket
      s3.upload(params, (error, data) => {
        if (error) {
          return res.status(400).json({ msg: error.message });
        }
        return res.status(200).json({ imgUrl: data.Location });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // @route   DELETE api/upload/deleteImg/:filename
  deleteFile: async (req, res) => {},
  // @route   POST api/upload/uploadPostImgs/:userId
  uploadFiles: async (req, res) => {},
  // @route   DELETE api/upload/deletePostImgs/:filename
  deleteFiles: async (req, res) => {},
};

module.exports = uploadCtrl;
