import express from 'express'
import { verifyToken } from '../middleware/verifyToken'
import { rateMovie, getAvgRating } from '../controllers/movies'

const router = express.Router()

router.post("/movieID", verifyToken, rateMovie)
router.get("/movieID", getAvgRating)