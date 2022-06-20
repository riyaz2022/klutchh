import mongoose from "mongoose";
import User from "../models/User";
import Movies from "../models/Movies";

export const rateMovie = async (req, res) => {
    const userID = req.header.id;
    const rating = req.body;
    const movieID = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Invalid Id for updation");

    try {
        const movie = await Movies.findById(movieID)
        const user = await User.findById(userID)
        if(!user.moviesRated.includes(movieID)){
            await user.update({_id:userID, "moviesRated.name":movie.title},{$set: {"moviesRated.$.rating":rating}})
            res.status(200).json("Movie rated Saved Successfully")
        }else{
            res.status(200).json("You have already rated the movie")
        }
    } catch (error) {
        res.status(409).json({message: error.message})
    }
} 

export const getAvgRating = async (req,res) => {
    const movieID = req.params.id;
    try {
        const movie = await Movies.findById(movieID)
        res.status(200).json(movie.averageRating)

    } catch (error) {
        res.status(409).json({message: error.message})
    }
}