import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../apicalls/users";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../redux/actions/userActions";
import { hideLoading, showLoading } from "../redux/actions/loadingActions";
import { getAllSongs } from "../apicalls/songs";
import { setAllSongs } from "../redux/actions/songActions";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useSelector((state) => state.getUserInfoReducer);
  const getData = async () => {
    try {
      message.loading("Getting Logged In User Info...", 0.5);
      const response = await getUserInfo();
      if (response.success) {
        setTimeout(() => {
          message.success(response.message);
          dispatch(getUserDetails(response.data));
          getSongsData();
        }, 500);
      } else {
        setTimeout(() => {
          message.error(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        message.error(error.message);
      }, 500);
    }
  };
  const getSongsData = async () => {
    try {
      dispatch(showLoading());
      message.loading("Getting Songs...", 0.5);
      const response = await getAllSongs();
      if (response.success) {
        setTimeout(() => {
          dispatch(hideLoading());
          dispatch(setAllSongs(response.data));
          message.success(response.message);
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
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getData();
    }
  }, []);

  return <div>{children}</div>;
}

export default ProtectedRoute;
