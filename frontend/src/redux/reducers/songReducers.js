import { IS_NOT_PLAYING, IS_PLAYING, REMOVE_ALL_SONGS, REMOVE_CURRENT_TIME, REMOVE_SELECTED_PLAYLIST, REMOVE_SELECTED_SONG, REMOVE_SELECTED_SONG_INDEX, SELECTED_SONG, SET_ALL_SONGS, SET_CURRENT_TIME, SET_SELECTED_PLAYLIST, SET_SELECTED_PLAYLIST_FOR_EDIT, SET_SELECTED_SONG_INDEX } from "../constants/songConstants";

export const getSelectedSongReducer = (state={selectedSong: null},action) => {
    switch(action.type){
        case SELECTED_SONG:
             return {
                selectedSong: action.payload
             }
        case REMOVE_SELECTED_SONG:
             return {
                selectedSong: null
             }
        default:
             return state
    }
}

export const getSelectedSongIndexReducer = (state={selectedSongIndex: 0},action) => {
    switch(action.type){
        case SET_SELECTED_SONG_INDEX:
             return {
                selectedSongIndex: action.payload
             }
        case REMOVE_SELECTED_SONG_INDEX:
             return {
                selectedSongIndex: 0
             }
        default:
             return state
    }
}

export const getAllSongsReducer = (state={allSongs: []},action) => {
    switch(action.type){
        case SET_ALL_SONGS:
             return {
                allSongs: action.payload
             }
        case REMOVE_ALL_SONGS:
             return {
                allSongs: []
             }
        default:
             return state
    }
}


export const getSelectedPlaylistReducer = (state={selectedPlaylist: null},action) => {
     switch(action.type){
         case SET_SELECTED_PLAYLIST:
              return {
               selectedPlaylist: action.payload
              }
         case REMOVE_SELECTED_PLAYLIST:
              return {
               selectedPlaylist: null
              }
         default:
              return state
     }
 }

 export const getSelectedPlaylistForEditReducer = (state={selectedPlaylistForEdit: null},action) => {
     switch(action.type){
         case SET_SELECTED_PLAYLIST_FOR_EDIT:
              return {
               selectedPlaylistForEdit: action.payload
              }
         case REMOVE_SELECTED_PLAYLIST:
              return {
               selectedPlaylistForEdit: null
              }
         default:
              return state
     }
 }

 export const getIsPlayingReducer = (state={isPlaying: false},action) => {
     switch(action.type){
         case IS_PLAYING:
              return {
               isPlaying: action.payload
              }
         case IS_NOT_PLAYING:
              return {
               isPlaying: false
              }
         default:
              return state
     }
 }


 export const getCurrentTimeReducer = (state={currentTime: 0},action) => {
     switch(action.type){
         case SET_CURRENT_TIME:
              return {
               currentTime: action.payload
              }
         case REMOVE_CURRENT_TIME:
              return {
               currentTime: 0
              }
         default:
              return state
     }
 }