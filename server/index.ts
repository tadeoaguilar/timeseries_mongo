import express from 'express'
import mongoose from 'mongoose'
import Temperature from  '../models/temperatureSchema'

const app = express()

const  connectDB = async () => {

    try {
        const conn= await mongoose.connect("mongodb://root:example@127.0.0.1:27017/temp",)

        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error} connecting to: ${'mongodb://root:example@127.0.0.1:27017'}`)
        process.exit(1)
    }

}
connectDB()

app.listen(3000, ()=> {
    console.log('saludos')
})
