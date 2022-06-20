import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import userRoute from "./routes/user"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute)

mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("Database connected Successfully"))
        .catch((err) => console.log(err))

        
app.listen(process.env.PORT || 5000, () => {
    console.log("Server running")
}) 