import { Row, message } from "antd";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSong } from "../apicalls/songs";
import { FileUploader } from "react-drag-drop-files";
import { setAllSongs } from "../redux/actions/songActions";

function AddSongPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [song, setSong] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    image: "",
    duration: "",
    file: "",
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
  const addNewSong = async () => {
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
    } else{
    const formData = new FormData();
    Object.keys(song).forEach((key) => {
      formData.append(key, song[key]);
    });
    try {
      message.loading("Adding Song...", 0.5);
      const response = await addSong(formData);
      if (response.success) {
        setTimeout(() => {
          message.success("New Song Added Successfully.");
          // dispatch(setAllSongs(response.data));
          navigate("/admin/songsList");
        }, 500);
      } else {
        setTimeout(() => {
          message.info(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        message.error(error.message);
      }, 500);
    }
   }
  };
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <div>
          <h2>Add New Song</h2>
        </div>
      </Row>
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
          //   placeholder="Enter album pic"
          //   value={song?.image}
          onChange={onFileSelect}
        />
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        {song.file && <h4 className="text-success">{song.file.name}</h4>}
        <Row className="d-flex justify-content-center">
          <button className="btn btn-danger px-2 w-100" onClick={addNewSong}>
            Add Song
          </button>
        </Row>
      </div>
    </Container>
  );
}

export default AddSongPage;
