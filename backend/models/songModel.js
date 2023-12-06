const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default:"https://2.bp.blogspot.com/-Nc9YO_-F8yI/TcSIAB-nR-I/AAAAAAAAAGI/hPkuxqkqVcU/s1600/music-clipartMUSIC1.jpg",
    }
},{
    timestamps: true
})

const songModel = mongoose.model("songs",songSchema);
module.exports = songModel;