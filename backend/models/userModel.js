const mongoose = require("mongoose");
const Token = require("./tokenModel");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default:
        "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=612x612&w=0&h=8J3VgOZab_OiYoIuZfiMIvucFYB8vWYlKnSjKuKeYQM=",
    },
    description: {
      type: String,
      default: "Student Description",
    },
    playlists: {
      type: Array,
      required: false
    }
  },
  {
    timestamps: true,
  }
);

// remove all the tokens associated with the user for auth if that user is deleted
userSchema.post('remove',async function(res, next){
  await Token.deleteMany({ userid: this._id});
  next();
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;