import { axiosInstance } from ".";

export const getAllSongs = async() => {
   try{
     const response = await axiosInstance.get("/api/songs/getAllSongs");
     return response.data;
   }
   catch(error){
     return error.response.data;
   }
}

export const createNewPlaylist = async(payload) => {
   try{
     const response = await axiosInstance.post("/api/songs/createNewPlaylist",payload);
     return response.data;
   }
   catch(error){
     return error.response.data;
   }
}

export const editExistingPlaylist = async(payload) => {
  try{
    const response = await axiosInstance.put("/api/songs/editExistingPlaylist",payload);
    return response.data;
  }
  catch(error){
    return error.response.data;
  }
}


export const deleteExistingPlaylist = async(payload) => {
  try{
    const response = await axiosInstance.post("/api/songs/deleteExistingPlaylist",payload);
    return response.data;
  }
  catch(error){
    return error.response.data;
  }
}

export const addSong = async(payload) => {
  try{
    const response = await axiosInstance.post("/api/songs/addNewSong",payload);
    return response.data;
  }
  catch(error){
    return error.response.data;
  }
}

export const editSong = async(payload) => {
  try{
    const response = await axiosInstance.post("/api/songs/editExistingSong",payload);
    return response.data;
  }
  catch(error){
    return error.response.data;
  }
}

export const deleteSong = async(payload) => {
  try{
    const response = await axiosInstance.post("/api/songs/deleteExistingSong",payload);
    return response.data;
  }
  catch(error){
    return error.response.data;
  }
}

