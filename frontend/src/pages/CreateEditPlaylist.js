import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { createNewPlaylist, editExistingPlaylist } from "../apicalls/songs";
import { hideLoading, showLoading } from "../redux/actions/loadingActions";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../redux/actions/userActions";
import {
  setSelectedPlaylist,
  setSelectedPlaylistForEdit,
} from "../redux/actions/songActions";
import Player from "../components/Player";

function CreateEditPlaylist() {
  const [name, setName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);
  const selected = useSelector(
    (state) => state.getSelectedSongReducer.selectedSong
  );
  const { allSongs } = useSelector((state) => state.getAllSongsReducer);
  const { selectedPlaylistForEdit } = useSelector(
    (state) => state.getSelectedPlaylistForEditReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectUnselectSong = (song) => {
    if (selectedSongs.find((s) => s._id.toString() === song._id.toString())) {
      setSelectedSongs(
        selectedSongs.filter((s) => s._id.toString() !== song._id.toString())
      );
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };
  const onSave = async () => {
    dispatch(showLoading());
    if (name.trim().length === 0 || selectedSongs.length === 0) {
      dispatch(hideLoading());
      message.error("Please Fill All the Fields");
    } else {
      try {
        const payload = {
          name,
          songs: selectedSongs,
        };
        const response = await createNewPlaylist(payload);
        if (response.success) {
          dispatch(getUserDetails(response.data));
          setTimeout(() => {
            dispatch(hideLoading());
            message.success(response.message);
            setName("");
            setSelectedSongs([]);
            navigate("/home");
          }, 500);
        }
      } catch (error) {
        setTimeout(() => {
          dispatch(hideLoading());
          message.error(error.message);
        }, 500);
      }
    }
  };
  const onEdit = async () => {
    dispatch(showLoading());
    if (name.trim().length === 0 || selectedSongs.length === 0) {
      dispatch(hideLoading());
      message.error("Please Fill All the Fields");
    } else {
      try {
        const payload = {
          name,
          songs: selectedSongs,
        };
        const response = await editExistingPlaylist(payload);
        if (response.success) {
          dispatch(getUserDetails(response.data));
          setTimeout(() => {
            dispatch(hideLoading());
            message.success(response.message);
            dispatch(setSelectedPlaylistForEdit(null));
            dispatch(
              setSelectedPlaylist({
                name: "All Songs",
                songs: allSongs,
              })
            );
            setName("");
            setSelectedSongs([]);
            navigate("/home");
          }, 500);
        }
      } catch (error) {
        setTimeout(() => {
          dispatch(hideLoading());
          message.error(error.message);
        }, 500);
      }
    }
  };
  useEffect(() => {
    if (selectedPlaylistForEdit) {
      setName(selectedPlaylistForEdit.name);
      setSelectedSongs(selectedPlaylistForEdit.songs);
    }
  }, []);
  return (
    <DefaultLayout>
      <Container>
        <Row>
          <h3 className="d-flex gap-3 text-danger">
            <i
              className="ri-arrow-left-line pointer"
              onClick={() => {
                dispatch(setSelectedPlaylistForEdit(null));
                navigate(-1);
              }}
            ></i>
            {selectedPlaylistForEdit ? "Update" : "Create"} Playlist
          </h3>
        </Row>
        <Row>
          <div className="d-flex justify-content-between">
            <input
              type="text"
              placeholder="Playlist Name"
              value={name}
              disabled={selectedPlaylistForEdit}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-50"
            />
            <button
              className="btn btn-danger"
              disabled={selectedSongs.length === 0}
              onClick={() => {
                if (selectedPlaylistForEdit) {
                  onEdit();
                } else {
                  onSave();
                }
              }}
            >
              Save
            </button>
          </div>
        </Row>
        <Row className="mt-3">
          <h3>Selected Songs - {selectedSongs.length}</h3>
          <hr />
          <Row>
            {allSongs &&
              allSongs.map((song, index) => {
                const isSelected = selectedSongs?.find(
                  (s) => s._id.toString() === song._id.toString()
                );
                return (
                  <Col
                    md={4}
                    sm={12}
                    className={`d-flex align-items-center justify-content-between border border-warning border-2 p-2 rounded pointer my-2 ${
                      isSelected ? "border-danger shadow-lg" : "border-warning"
                    }`}
                    key={index}
                    onClick={() => {
                      selectUnselectSong(song);
                    }}
                  >
                    <div>
                      <h5>{song.title}</h5>
                      <h5>
                        {song.artist}, {song.album}, {song.year}
                      </h5>
                    </div>
                    <div>
                      <h5>{song.duration}</h5>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Row>
        {selected != null && (
          <Row data-aos="fade-up">
            <Player />
          </Row>
        )}
      </Container>
    </DefaultLayout>
  );
}

export default CreateEditPlaylist;
