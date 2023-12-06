import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";

function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.getUserInfoReducer);
  useEffect(() => {
    if (!localStorage.getItem("token") || user === null) {
      navigate("/");
    } else {
      if (!user.isAdmin) {
        navigate("/home");
      } else {
        navigate("/admin/usersList");
      }
    }
  }, []);
  return (
    <DefaultLayout>
      <Container>
        <Row className="justify-content-center p-3">
          <Col md={10} sm={12}>
            <h1 className="f-40 text-center">Admin Panel</h1>
            <ul className="adminFunctions text-center">
              <li className={`${location.pathname === "/admin/usersList"}`}>
                <Link to="/admin/usersList">Users List</Link>
              </li>
              <li>
                <Link to="/admin/songsList">Songs List</Link>
              </li>
              <li>
                <Link to="/admin/addSong">Add Song</Link>
              </li>
            </ul>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default AdminPage;
