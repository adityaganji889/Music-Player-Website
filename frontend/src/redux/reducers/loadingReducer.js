import { SHOW_LOADING, HIDE_LOADING } from "../constants/loadingConstants";

export const loadingReducer = (state={loading: false},action)=>{
    switch(action.type){
        case SHOW_LOADING:
            return {
                loading: true
            }
        case HIDE_LOADING:
            return {
                loading: false
            }
        default:
            return state
    }
}