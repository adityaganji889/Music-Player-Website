import React, { useState } from "react";
import "../resources/default-layout.css";
import { Dropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo } from "../redux/actions/userActions";
import { message } from "antd";
import Profile from "./Profile";
import { removeAllSongs, removeCurrentTime, removeSelectedPlaylist, removeSelectedPlaylistForEdit, removeSelectedSong, removeSelectedSongIndex, setIsNotPlaying } from "../redux/actions/songActions";
import { hideLoading } from "../redux/actions/loadingActions";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.getUserInfoReducer);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between">
        <div
          onClick={() => {
            window.location.href="/home";
          }}
        >
          <h1 className="logo">
            <i className="ri-music-fill"></i> Music Player
          </h1>
        </div>
        <div className="d-flex align-items-center text-white">
          <Dropdown>
            <Dropdown.Toggle className="btn btn-warning">
              <i className="ri-user-3-line"></i> {user?.name}
              {/* <img src={user?.profilePicture} width="2%" height="2%" alt="..." /> */}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {user?.isAdmin && (
                <Dropdown.Item onClick={() => navigate("/admin/usersList")}>
                  Admin Panel
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={() => setShow(true)}>
                Edit Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/updateEmail")}>
                Update Email
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/updatePassword")}>
                Update Password
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  message.loading("Logging out...", 0.5);
                  setTimeout(() => {
                    dispatch(removeUserInfo());
                    dispatch(removeSelectedSongIndex());
                    dispatch(removeSelectedSong());
                    dispatch(removeAllSongs());
                    dispatch(removeSelectedPlaylist());
                    dispatch(removeSelectedPlaylistForEdit());
                    dispatch(removeCurrentTime());
                    dispatch(setIsNotPlaying());
                    dispatch(hideLoading());
                    message.success("Your Logged Out Successfully");
                    localStorage.removeItem("token");
                    localStorage.removeItem("selectedSong");
                    navigate("/");
                  }, 500);
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {show && (
        <Profile
          show={show}
          setShow={setShow}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      )}
      <Container className="shadow-lg p-5 bg-body-tertiary rounded">
        {children}
      </Container>
    </div>
  );
}

export default DefaultLayout;
