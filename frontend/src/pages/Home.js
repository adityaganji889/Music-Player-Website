import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import SongsList from "../components/SongsList";
import Player from "../components/Player";
import Playlists from "../components/Playlists";

function Home() {
  const selected = useSelector(
    (state) => state.getSelectedSongReducer.selectedSong
  );

  return (
    <DefaultLayout>
      <Row>
        <Col md={6} sm={12}>
          <SongsList />
        </Col>
        <Col md={6} sm={12}>
          <Playlists />
        </Col>
      </Row>
      {selected != null && (
        <Row data-aos="fade-up">
          <Player />
        </Row>
      )}
    </DefaultLayout>
  );
}

export default Home;
