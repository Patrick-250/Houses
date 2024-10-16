//import multer and path
const multer = require("multer");
const path = require("path");

//storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

//upload and route config
const upload = multer({
  storage: storage,
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded successfuly");
});

//serving static files from the images folder
const root = express.static(path.join(__dirname, "/images"));
app.use("/images", root);

//uploading the files to the server
const updateUser = async (req, res) => {
  if (file) {
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("name", filename);
    data.append("file", file);
    newPost.photo = filename;
    try {
      await axios.post("http://localhost/api/uploads", data);
    } catch (error) {}
  }
};
