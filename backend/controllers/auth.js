import express from "express"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config();

export const signup = async (req,res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        const existingUsername = await User.findOne({ username }) 
        if(existingUsername) return res.status(400).json({ message: "User already exists with this username"})

        const existingEmail = await User.findOne({ email }) 
        if(existingEmail) return res.status(400).json({ message: "User already exists with this email"})

        if(password !== confirmPassword) return res.status(400).json({message: "Password do not match"})

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({ username, email, password:hashedPassword })

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const signin = async (req,res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username })
        if(!existingUser) return res.status(404).json({message: "User does not exists"})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials"})

        const token = jwt.sign({email:existingUser.username, id:existingUser._id}, process.env.SECRET_KEY, { expiresIn: "5hr"})
        
        res.status(200).json({user:existingUser, token})

    } catch (error) {
        res.status(500).json({message: "Something went wrong"}) 
    }
}