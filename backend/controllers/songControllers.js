const Song = require("../models/songModel");
const User = require("../models/userModel");
const cloudinary = require("../cloudinary");

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    if (songs.length != 0) {
      res.send({
        data: songs,
        message: "All Songs Fetched Successfully.",
        success: true,
      });
    } else {
      res.send({
        data: null,
        message: "No Songs To Display.",
        success: false,
      });
    }
  } catch (error) {
    res.send({
      data: error,
      message: error.message,
      success: false,
    });
  }
};

const addPlaylist = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userid });
    if (user) {
      const existingPlaylists = user.playlists;
      existingPlaylists.push({
        name: req.body.name,
        songs: req.body.songs,
      });
      user.playlists = existingPlaylists;
      const updatedUser = await user.save();
      res.status(200).send({
        message: "Playlist Created Successfully.",
        success: true,
        data: updatedUser,
      });
    } else {
      res.status(400).send({
        message: "User doesnot exists.",
        success: false,
        data: null,
      });
    }
  } catch (error) {
    res.send({
      data: error,
      message: error.message,
      success: false,
    });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const user = await User.findById(req.body.userid);
    let existingPlaylists = user.playlists;
    existingPlaylists = existingPlaylists.map((playlist) => {
      if (playlist.name === req.body.name) {
        playlist.songs = req.body.songs;
      }
      return playlist;
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.body.userid,
      {
        playlists: existingPlaylists,
      },
      { new: true }
    );
    res.status(200).send({
      message: "Playlist updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const user = await User.findById(req.body.userid);
    let existingPlaylists = user.playlists;
    existingPlaylists = existingPlaylists.filter((playlist) => {
      if (playlist.name === req.body.name) {
        return false;
      }
      return true;
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.body.userid,
      {
        playlists: existingPlaylists,
      },
      { new: true }
    );
    res.status(200).send({
      message: "Playlist deleted successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
};

const addSong = async (req, res) => {
  try {
    const image = req.body.image;
    let uploadedImage;
    let uploadedImageSecureURL = image;
    if (image !== "") {
      //upload image to cloudinary and get URL
      uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "music-album-photos",
      });
      uploadedImageSecureURL = uploadedImage.secure_url;
    }
    cloudinary.v2.uploader.upload(
      req.file.path,
      {
        folder: "music-player-website",
        use_filename: true,
        resource_type: "raw",
      },
      async (err, result) => {
        if (err) {
          res.status(500).json({ message: "Something went wrong" });
        } else {
          let newsong;
          if (image !== "") {
            newsong = new Song({
              title: req.body.title,
              artist: req.body.artist,
              src: result.url,
              image: uploadedImageSecureURL,
              album: req.body.album,
              duration: req.body.duration,
              year: req.body.year,
            });
          } else {
            newsong = new Song({
              title: req.body.title,
              artist: req.body.artist,
              src: result.url,
              album: req.body.album,
              duration: req.body.duration,
              year: req.body.year,
            });
          }
          await newsong.save();
          const allSongs = await Song.find();
          res.status(200).send({
            message: "Song added successfully",
            success: true,
            data: allSongs,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
};

const editSong = async (req, res) => {
  try {
    const song = await Song.findOne({ _id: req.body._id });
    const image = req.body.image;
    let uploadedImage;
    let uploadedImageSecureURL = image;
    if (req.body.image != song.image) {
      //upload image to cloudinary and get URL
      uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "music-album-photos",
      });
      uploadedImageSecureURL = uploadedImage.secure_url;
    }
    let response = {
      url: req.body.file,
    };
    if (req.body.file != song.src) {
      if (req.file) {
        response = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "music-player-website",
          use_filename: true,
          resource_type: "raw",
        });
      }
    }
    song.title = req.body.title;
    song.artist = req.body.artist;
    song.src = response.url;
    song.image = uploadedImageSecureURL;
    song.album = req.body.album;
    song.duration = req.body.duration;
    song.year = req.body.year;
    await song.save();
    const songs = await Song.find();
    res.status(200).send({
      message: "Song edited successfully",
      success: true,
      data: songs,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
};

const deleteSong = async (req, res) => {
  try {
    const song = await Song.findOne({ _id: req.body.id });
    if (song) {
      let users = await User.find();
      if (users) {
        usersList = users;
        for (var i = 0; i < users.length; i++) {
          let user = await User.findOne({ _id: usersList[i]._id });
          if (user) {
            user.playlists = [];
            await user.save();
          }
        }
      } else {
        return res.status(200).send({
          message: "No Users to display",
          success: false,
          data: null,
        });
      }
      await Song.deleteOne({ _id: req.body.id });
      const songs = await Song.find();
      res.status(200).send({
        message: "Song Deleted Successfully.",
        success: true,
        data: songs,
      });
    } else {
      res.status(200).send({
        message: "Song not found to delete",
        success: false,
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
};

module.exports = {
  getAllSongs,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSong,
  editSong,
  deleteSong,
};
