import {combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { getUserInfoReducer } from './reducers/userReducers'
import { loadingReducer } from './reducers/loadingReducer';
import { getAllSongsReducer, getCurrentTimeReducer, getIsPlayingReducer, getSelectedPlaylistForEditReducer, getSelectedPlaylistReducer, getSelectedSongIndexReducer, getSelectedSongReducer } from './reducers/songReducers';

const finalReducer = combineReducers({
    getUserInfoReducer: getUserInfoReducer,
    loadingReducer: loadingReducer,
    getSelectedSongReducer: getSelectedSongReducer,
    getSelectedSongIndexReducer: getSelectedSongIndexReducer,
    getAllSongsReducer: getAllSongsReducer,
    getSelectedPlaylistReducer: getSelectedPlaylistReducer,
    getSelectedPlaylistForEditReducer: getSelectedPlaylistForEditReducer,
    getIsPlayingReducer: getIsPlayingReducer,
    getCurrentTimeReducer: getCurrentTimeReducer
})


const initialState = {
    loading: false,
}

const composeEnhancers = composeWithDevTools({})


const store = createStore(finalReducer,initialState, composeEnhancers(applyMiddleware(thunk)))

export default store;