const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/uploads");
  },
  filename: (req, file, cd) => {
    cd(
      null,
      file.fieldname + "_" + Date.new() + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cd) => {
    const types = /jpeg|jpg|png|gif/;
    const extname = types.test(path.extname(file.originalname).toLowerCase());
    const mimetype = types.test(file.mimetype);

    if (mimetype && extname) {
      return cd(null, true);
    } else {
      cd(null, new Error("Error: Images Only!"));
    }
  },
});
