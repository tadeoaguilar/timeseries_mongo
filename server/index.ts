import express from 'express'
import mongoose from 'mongoose'
import Temperature from  '../models/temperatureSchema'
import * as dotenv from 'dotenv'

dotenv.config()

//Use express to implement an HTTP service
const app = express()


const  connectDB = async () => {

    try {
        const conn= await mongoose.connect(process.env.DATABASE_URL ?? '',)

        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error} connecting to: ${process.env.DATABASE_URL ?? ''}`)
        process.exit(1)
    }

}


const createMeasure = async(req: express.Request,res: express.Response) => {
   
    const measure = new Temperature (
        {
            "temperature": req.body.temperature,
            "timestamp": req.body.timestamp,
            "metadata": req.body.metadata
         }
    )               
   
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
       {$sort:{"_id.year":1,"_id.month":1,"_id.day":1,"_id.hour":1}}
      ]
   )
    
    
    res.json(temps)
}

const getMax = async(req: express.Request,res: express.Response) => {
    
    const temps = await Temperature.aggregate([
        {
       $match:{temperature:{$gte:0,$lte:24}}
       },
        {
          $group:
            {
                _id: {year:{$year:"$timestamp"},month:{$month:"$timestamp"},day:{$dayOfMonth:"$timestamp"},hour:{$hour:"$timestamp"}},
              maxTemperature:{ $max: "$temperature" }
            }
        },
        {$sort:{"_id.year":1,"_id.month":1,"_id.day":1,"_id.hour":1}}
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
router.route('/max')
        .get(getMax)
app.use('/',router)



app.use(express.json()) 

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
