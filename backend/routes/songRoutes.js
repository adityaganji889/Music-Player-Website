const router = require("express").Router();
const {
  getAllSongs,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSong,
  editSong,
  deleteSong,
} = require("../controllers/songControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const multerMiddleware = require("../middlewares/multerMiddleware");

router.get("/getAllSongs", authMiddleware, getAllSongs);
router.post("/createNewPlaylist", authMiddleware, addPlaylist);
router.put("/editExistingPlaylist", authMiddleware, updatePlaylist);
router.post("/deleteExistingPlaylist", authMiddleware, deletePlaylist);
router.post("/addNewSong", authMiddleware, multerMiddleware, addSong);
router.post("/editExistingSong", authMiddleware, multerMiddleware, editSong);
router.post("/deleteExistingSong", authMiddleware, deleteSong);

module.exports = router;
