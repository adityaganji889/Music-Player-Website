import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedSong,
  selectedSongIndex,
  setSelectedPlaylist,
} from "../redux/actions/songActions";

function SongsList() {
  const dispatch = useDispatch();
  const { allSongs } = useSelector((state) => state.getAllSongsReducer);
  const selected = useSelector(
    (state) => state.getSelectedSongReducer.selectedSong
  );
  const { selectedPlaylist } = useSelector(
    (state) => state.getSelectedPlaylistReducer
  );
  // const playlistSongs = selectedPlaylist?.songs;
  const [searchKey, setSearchKey] = useState("");
  const [songsToPlay, setSongsToPlay] = useState([]);
  useEffect(() => {
    if (selectedPlaylist) {
      if (
        selectedPlaylist &&
        selectedPlaylist.name === "All Songs" &&
        searchKey !== ""
      ) {
        const tempSongs = [];

        selectedPlaylist.songs.forEach((song) => {
          if (JSON.stringify(song).toLowerCase().includes(searchKey)) {
            tempSongs.push(song);
          }
        });
        console.log(tempSongs);
        setSongsToPlay(tempSongs);
      } else {
        setSongsToPlay(selectedPlaylist?.songs);
      }
    }
  }, [selectedPlaylist, searchKey, allSongs]);
  return (
    <Container className="overflow-y-scroll h-75">
      <Row className="m-1">
        <input
          type="text"
          placeholder="Song, Album, Artist"
          onFocus={() =>
            dispatch(
              setSelectedPlaylist({
                name: "All Songs",
                songs: allSongs,
              })
            )
          }
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </Row>
      {songsToPlay.map((song, index) => {
        const isPlaying = selected?._id.toString() === song._id.toString();
        return (
          <div
            className={`d-flex align-items-center justify-content-between border border-warning border-2  p-3 rounded pointer my-2 ${
              isPlaying ? "shade" : ""
            }`}
            key={index}
            onClick={() => {
              dispatch(selectedSong(song));
              dispatch(selectedSongIndex(index));
              localStorage.setItem("selectedSong", JSON.stringify(song));
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
          </div>
        );
      })}
    </Container>
  );
}

export default SongsList;
