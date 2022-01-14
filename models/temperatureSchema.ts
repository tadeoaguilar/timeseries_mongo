import {Schema, model} from "mongoose";

interface Temperature {
    timestamp: Date;
    metadata: {
        sensor: String
    }
}


const tempSchema = new Schema<Temperature>({timestamp:{type: Date}  ,metadata:{type: Object}}, {
    timeseries: {
      timeField: 'timestamp',
      metaField: 'metadata',
      granularity: 'hours'
    },
   
    
  });
  
  const TemperatureModel = model<Temperature>('Temperature',tempSchema)

  export default TemperatureModel;
  
  // `Test` collection will be a timeseries collection
  
  