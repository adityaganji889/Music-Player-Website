import React, { useEffect, useState } from "react";
import { Container, Row, Table, Spinner } from "react-bootstrap";
import { message } from "antd";
import { deleteSong, getAllSongs } from "../apicalls/songs";
import EditSongPage from "./EditSongPage";
import { selectedSongIndex, selectedSong, setAllSongs } from "../redux/actions/songActions";
import { useDispatch } from "react-redux";

function SongsListAdmin() {
  const [songs, setSongs] = useState([]);
  const [selectSong, setSelectSong] = useState({});
  const [showSpinner, setShowSpinner] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const getSongs = async () => {
    try {
      message.loading("Fetching Songs...", 0.5);
      const response = await getAllSongs();
      if (response.success) {
        setTimeout(() => {
          setShowSpinner(false);
          dispatch(setAllSongs(response.data));
          message.success(response.message);
          setSongs(response.data);
        }, 500);
      } else {
        setTimeout(() => {
          setShowSpinner(false);
          message.info(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        setShowSpinner(false);
        message.error(error.message);
      }, 500);
    }
  };
  const deleteSelectedSong = async (song) => {
    try {
      const payload = {
        id: song._id,
      };
      message.loading("Deleting Songs...", 0.5);
      const response = await deleteSong(payload);
      if (response.success) {
        setTimeout(() => {
          setShowSpinner(false);
          // dispatch(setAllSongs(response.data));
          dispatch(selectedSong(null));
          dispatch(selectedSongIndex(0));
          message.success(response.message);
          getSongs();
          // setSongs(response.data);
        }, 500);
      } else {
        setTimeout(() => {
          setShowSpinner(false);
          message.info(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        setShowSpinner(false);
        message.error(error.message);
      }, 500);
    }
  };
  useEffect(() => {
    getSongs();
  }, []);
  return (
    <Container>
      <Row>
        <center>
          <h2>Songs List</h2>
        </center>
      </Row>
      {showSpinner && (
        <center>
          <Spinner
            animation="border"
            style={{ width: "5rem", height: "5rem" }}
          />
        </center>
      )}
      {songs.length > 0 && (
        <Table bordered responsive="sm">
          <thead className="thead-dark">
            <tr className="text-center">
              <th>Image</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Year</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">
                    <img
                      src={song.image}
                      alt="Image 1"
                      width="30%"
                      height="10%"
                    />
                  </td>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.album}</td>
                  <td>{song.year}</td>
                  <td>{song.duration}</td>
                  <td>
                    <span
                      className="pointer"
                      onClick={() => {
                        setShowSpinner(true);
                        deleteSelectedSong(song);
                      }}
                    >
                      🗑️
                    </span>
                    <span
                      className="pointer"
                      onClick={() => {
                        setSelectSong(song);
                        setShow(true);
                      }}
                    >
                      📝
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      {!showSpinner && songs.length === 0 && (
        <h4 className="text-center mt-4">No Songs to display</h4>
      )}
      {show && (
        <EditSongPage
          show={show}
          setShow={setShow}
          handleClose={handleClose}
          handleShow={handleShow}
          selectedSong={selectSong}
          getSongs={getSongs}
          setSelectedSong={setSelectSong}
          setShowSpinner={setShowSpinner}
        />
      )}
    </Container>
  );
}

export default SongsListAdmin;
