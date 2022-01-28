"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var tempSchema = new mongoose_1.Schema({ timestamp: { type: Date },
    temperature: { type: Number },
    metadata: { type: Object } }, {
    //Time Series Schema
    timeseries: {
        timeField: 'timestamp',
        metaField: 'metadata',
        granularity: 'hours'
    },
});
var TemperatureModel = (0, mongoose_1.model)('Temperature', tempSchema);
exports.default = TemperatureModel;
