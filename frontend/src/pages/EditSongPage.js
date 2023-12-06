import { message } from "antd";
import React from "react";
import { Modal, Row } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch } from "react-redux";
import { setAllSongs } from "../redux/actions/songActions";
import { editSong } from "../apicalls/songs";

const EditSongPage = (props) => {
  const {
    show,
    handleClose,
    selectedSong,
    getSongs,
    setSelectedSong,
    setShowSpinner,
  } = props;
  const dispatch = useDispatch();
  const [song, setSong] = React.useState({
    _id: selectedSong._id,
    title: selectedSong.title,
    artist: selectedSong.artist,
    album: selectedSong.album,
    year: selectedSong.year,
    image: selectedSong.image,
    duration: selectedSong.duration,
    file: selectedSong.src,
  });
  const fileTypes = ["MP3"];
  const handleChange = (file) => {
    setSong({ ...song, file: file });
    console.log(file);
  };
  const onFileSelect = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setSong({ ...song, image: reader.result });
    };
  };
  const editExistingSong = async () => {
    //   e.preventDefault();
    let artistpattern = /^[A-Za-z\s'-]+$/;
    let yearpattern = /^\d{4}$/;
    let durationpattern = /^\d+(\.\d{1,2})?$/;
    if(song.title.trim().length===0||song.artist.trim().length===0||song.album.trim().length===0){
      alert("Names can't be empty."); 
    }
    if(artistpattern.test(song.artist)===false){
      alert("Invalid Artist Name.Please enter a valid name.");
    }
    else if(yearpattern.test(song.year)===false){
      alert("Enter the correct year 4 digits.");
    }
    else if (durationpattern.test(song.duration) === false) {
      alert("Enter the correct duration in mins, sec {mm.ss}.");
    } else {
    const formData = new FormData();
    Object.keys(song).forEach((key) => {
      formData.append(key, song[key]);
    });
    try {
      message.loading("Editing Song...", 0.5);
      const response = await editSong(formData);
      handleClose();
      setShowSpinner(true);
      if (response.success) {
        setTimeout(() => {
          setShowSpinner(false);
          // dispatch(setAllSongs(response.data));
          getSongs();
          message.success("Song Updated Successfully.");
          setSelectedSong({});
        }, 500);
      } else {
        setTimeout(() => {
          handleClose();
          setShowSpinner(false);
          message.info(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        handleClose();
        setShowSpinner(false);
        message.error(error.message);
      }, 500);
    }
   }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <center>
            <h2>Edit Existing Song</h2>
          </center>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-control p-5 d-flex flex-column gap-2">
          <input
            type="text"
            placeholder="Title"
            value={song.title}
            onChange={(e) => {
              setSong({ ...song, title: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Artist"
            value={song.artist}
            onChange={(e) => {
              setSong({ ...song, artist: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Album"
            value={song.album}
            onChange={(e) => {
              setSong({ ...song, album: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Year"
            value={song.year}
            onChange={(e) => {
              setSong({ ...song, year: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Duration"
            value={song.duration}
            onChange={(e) => {
              setSong({ ...song, duration: e.target.value });
            }}
          />
          {song.image && <img src={song.image}  alt="" width="30%" height="10%"/>}
          <input
            type="file"
            accept="image/*"
            placeholder="Enter album pic"
            onChange={onFileSelect}
          />
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
          {selectedSong.src && (
            <h5 className="text-danger">
              {selectedSong.src.substr(selectedSong.src.length - 20)}
            </h5>
          )}
          {song.file && <h3 className="text-success">{song.file.name}</h3>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Row className="d-flex justify-content-center">
          <button
            className="btn btn-danger px-2 w-100"
            onClick={editExistingSong}
          >
            Update Song
          </button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSongPage;
