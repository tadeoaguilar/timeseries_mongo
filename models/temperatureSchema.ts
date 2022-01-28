import {Schema, model} from "mongoose";

//Type Script interface 
interface Temperature {
    temperature: Number;
    timestamp: Date;
    metadata: {
        sensor: String
    }
}


const tempSchema = new Schema<Temperature>({timestamp:{type: Date} , 
                                            temperature: {type: Number} ,
                                            metadata:{type: Object}}, {
    //Time Series Schema
    timeseries: {
      timeField: 'timestamp',
      metaField: 'metadata',
      granularity: 'hours'
    },
   
    
  });
  
  const TemperatureModel = model<Temperature>('Temperature',tempSchema)

  export default TemperatureModel;


  
  