import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    moviesRated: {
        type: Array,
        default: [{
            name: String,
            rating: Number
        }]
    }
})

var User = mongoose.model("User", userSchema)
export default User