import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String
    },
    description: {
        type: String
    },
    userRatings: {
        type: Array,
        default:[{
            user: Number,
            ratings: Number
        }]
    }
})

var Movies = mongoose.model("Movies", movieSchema)
export default Movies