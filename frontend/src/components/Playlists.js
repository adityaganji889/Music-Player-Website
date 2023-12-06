import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPlaylist,
  setSelectedPlaylistForEdit,
} from "../redux/actions/songActions";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/actions/loadingActions";
import { message } from "antd";
import { deleteExistingPlaylist } from "../apicalls/songs";
import { getUserDetails } from "../redux/actions/userActions";
import { useEffect } from "react";

function Playlists() {
  const { user } = useSelector((state) => state.getUserInfoReducer);
  const { allSongs } = useSelector((state) => state.getAllSongsReducer);
  const { selectedPlaylist } = useSelector(
    (state) => state.getSelectedPlaylistReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allPlaylists = [
    {
      name: "All Songs",
      songs: allSongs,
    },
    ...(user?.playlists ? user.playlists : []),
  ];
  const onDelete = async (name) => {
    try {
      dispatch(showLoading());
      const payload = {
        name,
      };
      const response = await deleteExistingPlaylist(payload);
      if (response.success) {
        setTimeout(() => {
          dispatch(hideLoading());
          message.success(response.message);
          dispatch(
            setSelectedPlaylist({
              name: "All Songs",
              songs: allSongs,
            })
          );
          dispatch(getUserDetails(response.data));
        }, 500);
      } else {
        setTimeout(() => {
          dispatch(hideLoading());
          message.info(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        dispatch(hideLoading());
        message.error(error.message);
      }, 500);
    }
  };
  useEffect(() => {
    if (!selectedPlaylist && allSongs.length > 0) {
      dispatch(setSelectedPlaylist(allPlaylists[0]));
    }
  }, [selectedPlaylist, allSongs]);
  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-between">
          <h4>Your Playlists</h4>
          <button
            className="btn btn-danger d-flex gap-2"
            onClick={() => {
              navigate("/createEditPlaylist");
            }}
          >
            <i className="ri-add-line"></i>Create Playlists
          </button>
        </div>
        <Row className="d-flex mt-4 gap-3">
          {allPlaylists &&
            allPlaylists.map((playlist, index) => {
              const isSelected = playlist.name === selectedPlaylist?.name;
              return (
                <Col
                  md={4}
                  sm={12}
                  key={index}
                  className={`d-flex justify-content-center flex-column p-4 border border-2 rounded ${
                    isSelected ? "border-danger shadow-lg" : "border-warning"
                  } pointer`}
                  onClick={() => {
                    dispatch(setSelectedPlaylist(playlist));
                  }}
                >
                  <h3>{playlist?.name}</h3>
                  <h5>{playlist?.songs?.length} Songs</h5>
                  <div className="d-flex justify-content-end gap-2">
                    <div
                      onClick={() => {
                        dispatch(setSelectedPlaylistForEdit(playlist));
                        navigate(`/createEditPlaylist`);
                      }}
                    >
                      📝
                    </div>
                    <div
                      onClick={() => {
                        onDelete(playlist.name);
                      }}
                    >
                      ❌
                    </div>
                  </div>
                </Col>
              );
            })}
        </Row>
      </Row>
    </Container>
  );
}

export default Playlists;
