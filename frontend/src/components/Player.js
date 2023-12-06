import React, { createRef, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedSong,
  selectedSongIndex,
  setCurrentTime,
  setIsNotPlaying,
  setIsPlaying
} from "../redux/actions/songActions";

function Player(_props) {
  const [volume, setVolume] = useState(0.5);
  const [shuffleOn, setShuffleOn] = useState(false);
  const audioRef = createRef();
  const songs = useSelector((state) => state.getAllSongsReducer.allSongs);
  const { isPlaying } = useSelector((state) => state.getIsPlayingReducer);
  const { currentTime } = useSelector((state) => state.getCurrentTimeReducer);
  const song = useSelector(
    (state) => state.getSelectedSongReducer.selectedSong
  );
  const songIndex = useSelector(
    (state) => state.getSelectedSongIndexReducer.selectedSongIndex
  );
  const dispatch = useDispatch();
  const onPlay = () => {
    audioRef.current.play();
    dispatch(setIsPlaying());
  };
  const onPause = () => {
    audioRef.current.pause();
    dispatch(setIsNotPlaying());
  };
  const onPrev = () => {
    console.log(songIndex !== 0 && shuffleOn===false);
    if (songIndex !== -1 && shuffleOn===false) {
      console.log("Prev without shuffle:",songIndex);
      if(songIndex>0){
        dispatch(selectedSongIndex(songIndex - 1));
        dispatch(selectedSong(songs[songIndex - 1]));
      }
    } else {
      const randomIndex = Math.floor(Math.random() * songs.length);
      console.log("Prev after shuffle:",randomIndex);
      dispatch(selectedSongIndex(randomIndex));
      dispatch(selectedSong(songs[randomIndex]));
    }
  };
  const onNext = () => {
    if (songIndex !== songs.length && shuffleOn===false) {
      console.log("Next without shuffle:",songIndex);
      if(songIndex<songs.length-1){
       dispatch(selectedSongIndex(songIndex + 1));
       dispatch(selectedSong(songs[songIndex + 1]));
      }
    } else {
      const randomIndex = Math.floor(Math.random() * songs.length);
      console.log("Next after shuffle:",randomIndex);
      dispatch(selectedSongIndex(randomIndex));
      dispatch(selectedSong(songs[randomIndex]));
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [song]);

  useEffect(() => {
    if (currentTime) {
      audioRef.current.currentTime = currentTime;
    }
  }, []);
  return (
    <Container className="p-3 m-2 shade">
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={4} sm={12} className="p-4">
          <img className="img-fluid" src={song?.image} alt="" />
        </Col>
        <Col md={4} sm={12} className="p-4">
          <div>
            <h5>{song?.title}</h5>
            <h5>
              {song?.artist}, {song?.album}, {song?.year}
            </h5>
            <div className="mt-4">
              <audio
                src={song?.src}
                ref={audioRef}
                onTimeUpdate={(e) => {
                  dispatch(setCurrentTime(e.target.currentTime));
                }}
              ></audio>
              <br />
              <h3 className="d-flex justify-content-center gap-4">
                <i
                  className="ri-skip-back-line"
                  onClick={() => {
                    onPrev();
                  }}
                ></i>
                {!isPlaying ? (
                  <i
                    className="ri-play-line"
                    onClick={() => {
                      onPlay();
                    }}
                  ></i>
                ) : (
                  <i
                    className="ri-pause-line"
                    onClick={() => {
                      onPause();
                    }}
                  ></i>
                )}
                <i
                  className="ri-skip-forward-line"
                  onClick={() => {
                    onNext();
                  }}
                ></i>
              </h3>
              <h4 className="d-flex justify-content-center gap-1">
                <div>
                  <i
                    className={`ri-shuffle-line pointer ${
                      shuffleOn===true && "text-danger"
                    }`}
                    onClick={() => {
                      setShuffleOn(!shuffleOn);
                    }}
                  ></i>
                </div>
                {Math.floor(currentTime / 60)} :{" "}
                {Math.floor(currentTime % 60) < 10
                  ? Math.floor(currentTime % 60)
                  : Math.floor(currentTime % 60)}
                <input
                  type="range"
                  className="w-50"
                  min={0}
                  max={Number(song?.duration) * 60}
                  value={currentTime}
                  onChange={(e) => {
                    audioRef.current.currentTime = e.target.value;
                    dispatch(setCurrentTime(e.target.value));
                  }}
                />
                {song?.duration}
              </h4>
            </div>
          </div>
        </Col>
        <Col md={4} sm={12} className="p-4">
          <h4 className="d-flex justify-content-center gap-2">
            <i
              className="ri-volume-mute-line"
              onClick={() => {
                audioRef.current.volume = 0;
                setVolume(0);
              }}
            ></i>
            <input
              type="range"
              className="p-1"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(e) => {
                audioRef.current.volume = e.target.value;
                setVolume(e.target.value);
              }}
            />
            <i
              className="ri-volume-down-line"
              onClick={() => {
                if(audioRef.current.volume<=0.9){
                  audioRef.current.volume = audioRef.current.volume + 0.1;
                  setVolume(audioRef.current.volume);
                }
              }}
            ></i>
          </h4>
        </Col>
      </Row>
    </Container>
  );
}

export default Player;
