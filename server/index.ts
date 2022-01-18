import express from 'express'
import mongoose from 'mongoose'
import Temperature from  '../models/temperatureSchema'

const app = express()

const  connectDB = async () => {

    try {
        const conn= await mongoose.connect("mongodb://root:example@127.0.0.1:27017/Temperature",)

        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error} connecting to: ${'mongodb://root:example@127.0.0.1:27017'}`)
        process.exit(1)
    }

}


const createMeasure = async(req: express.Request,res: express.Response) => {
    console.log(req.body)
    const measure = new Temperature (
        {
            "temperature": req.body.temperature,
            "timestamp": req.body.timestamp,
            "metadata": req.body.metadata
         }
    )               
    console.log("MO")
    console.log(measure)
    const createdTemp = await measure.save()
    res.status(201).json(createdTemp)
    
}

const getAverage = async(req: express.Request,res: express.Response) => {
    console.log('read')
    const temps = await Temperature.aggregate(   [
        {
       $match:{temperature:{$gte:0,$lte:24}}
       },
        {
          $group:
            {
              _id: {year:{$year:"$timestamp"},month:{$month:"$timestamp"},day:{$dayOfMonth:"$timestamp"},hour:{$hour:"$timestamp"}},
              avgTemperature: { $avg: "$temperature" }
            }
        },
       {$sort:{"_id.year,_id.month":1,"_id.day":1,"_id.hour":1}}
      ])
    
    
    res.json(temps)
}
const getMin = async(req: express.Request,res: express.Response) => {
    console.log('read')
    const temps = await Temperature.aggregate([
        {
       $match:{temperature:{$gte:0,$lte:24}}
       },
        {
          $group:
            {
              _id: {year:{$year:"$timestamp"},day:{$dayOfMonth:"$timestamp"},hour:{$hour:"$timestamp"}},
              minTemperature:{ $min: "$temperature" }
            }
        }
      ])
    
    
    res.json(temps)
}

const getMax = async(req: express.Request,res: express.Response) => {
    console.log('read')
    const temps = await Temperature.aggregate([
        {
       $match:{temperature:{$gte:0,$lte:24}}
       },
        {
          $group:
            {
              _id: {year:{$year:"$timestamp"},day:{$dayOfMonth:"$timestamp"},hour:{$hour:"$timestamp"}},
              maxTemperature:{ $max: "$temperature" }
            }
        }
      ])
    
    
    res.json(temps)
}
const router = express.Router()
const port = 3000
app.use(express.json()) 
connectDB()

router.route('/')      
      .post(createMeasure)
router.route('/average')
        .get(getAverage)
router.route('/min')
        .get(getMin)
app.use('/',router)



app.use(express.json()) 

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
