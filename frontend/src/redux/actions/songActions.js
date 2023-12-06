import { REMOVE_SELECTED_SONG, SELECTED_SONG, SET_SELECTED_SONG_INDEX, REMOVE_SELECTED_SONG_INDEX, SET_ALL_SONGS, REMOVE_ALL_SONGS, SET_SELECTED_PLAYLIST, REMOVE_SELECTED_PLAYLIST, SET_SELECTED_PLAYLIST_FOR_EDIT, REMOVE_SELECTED_PLAYLIST_FOR_EDIT, IS_PLAYING, IS_NOT_PLAYING, SET_CURRENT_TIME, REMOVE_CURRENT_TIME } from "../constants/songConstants";

export const selectedSong = (song) => (dispatch) => {
    dispatch({
        type: SELECTED_SONG,
        payload: song
    })
}

export const removeSelectedSong = () => (dispatch) => {
    dispatch({
        type: REMOVE_SELECTED_SONG
    })
}

export const selectedSongIndex = (index) => (dispatch) => {
    dispatch({
        type: SET_SELECTED_SONG_INDEX,
        payload: index
    })
}

export const removeSelectedSongIndex = () => (dispatch) => {
    dispatch({
        type: REMOVE_SELECTED_SONG_INDEX,
    })
}

export const setAllSongs = (songs) => (dispatch) => {
    dispatch({
        type: SET_ALL_SONGS,
        payload: songs
    })
}

export const removeAllSongs = () => (dispatch) => {
    dispatch({
        type: REMOVE_ALL_SONGS
    })
}

export const setSelectedPlaylist = (playlist) => (dispatch) => {
    dispatch({
        type: SET_SELECTED_PLAYLIST,
        payload: playlist
    })
}

export const removeSelectedPlaylist = () => (dispatch) => {
    dispatch({
        type: REMOVE_SELECTED_PLAYLIST
    })
}

export const setSelectedPlaylistForEdit = (playlist) => (dispatch) => {
    dispatch({
        type: SET_SELECTED_PLAYLIST_FOR_EDIT,
        payload: playlist
    })
}

export const removeSelectedPlaylistForEdit = () => (dispatch) => {
    dispatch({
        type: REMOVE_SELECTED_PLAYLIST_FOR_EDIT
    })
}

export const setIsPlaying = () => (dispatch) => {
    dispatch({
        type: IS_PLAYING,
        payload: true
    })
}

export const setIsNotPlaying = () => (dispatch) => {
    dispatch({
        type: IS_NOT_PLAYING,
        payload: false
    })
}

export const setCurrentTime = (currentTime) => (dispatch) => {
    dispatch({
        type: SET_CURRENT_TIME,
        payload: currentTime
    })
}

export const removeCurrentTime = () => (dispatch) => {
    dispatch({
        type: REMOVE_CURRENT_TIME,
    })
}