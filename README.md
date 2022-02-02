
# Introduction

NoSQL databases offer a wide range of solutions for different purposes, In this article I will explore in detail the implementation of a Time Series database and show the aggregation benefits from it. We will implement a Temperature reading sensor on a PI Raspberry that will send timely measures to a remote API backed by a Time Series database.


## Objectives: 

- To create and implement a Time Series collection in MongoDB
- To implement an Express API endpoint to create new measures in our time series collection
- To implement an Express API  endpoint to get Minimum temperature, maximum temperature and average temperature



# 1  Time Series databases

## Quick introduction
Time series Databases allows to efficiently store sequences of measurements over a period of time.  Time series databases collect data from multiple sources such as sensors, mobile devices, servers, etc. This timestamped data is then processed and aggregated in an efficient way to optimize measuring change over time.

There are multiple applications for a Time series database such as:

- IoT - Read measure from multiple devices and sensors and produce smart insights and aggregation on timestamped data.
-Financial Applications - Capture Financial KPI's with high level of time granularity and then produce forecast and predictions with this data.
-Stock Market : Analyze fluctuations over time and get insight of the factors that impact financial indexes.

Database market has an extensive offer of Time Series databases such as InfluxDB, kDB and MongoDB. Being MongoDB one of the most popular NoSQL databases, I wanted to explore the capabilities of its time series collection since many existing application are using already this DB.

MongoDB offers  Time series collections that efficiently store sequences of measurements over a period of time, this approach abstracts and optimize the storing pattern. Previous versions of Mongo DB didn't have a Time Series collection so We had to implement other architectural patterns to improve Time Series readability, One of this patterns is the bucket pattern. For more information related to [bucket pattern](https://www.mongodb.com/developer/how-to/bucket-pattern/)
 

A Time Series database can be used in tandem with another generic purpose database and benefit from a micro services approach.

# 2 Installation.

1. Clone the repository
2. Change directory to timeseries_mongo.
3. Start a Docker instance of MongoDB. Run in the command line the following command.
```
docker compose -f docker/mongodb.yaml up
```
4. Run  the following command to install Node JS dependencies :
```
npm i
```
5. Define at OS or in the .env file an Environment variable
```
DATABASE_URL=mongodb://root:example@127.0.0.1:27017/Temperature
```
6. Run  the following command to transpile from TypeScript to JavaScript :
```
npm run compile
```
7. Run the following command to start the Express server

```
npm run start
```

8. You can use Postman or Curl to send a POST Request. Use the template to send ad-hoc measures.

URL: http://localhost:3000/measures

```
{
"temperature":21,
"timestamp": "2022-06-19T20:00:00.000Z",
"metadata": {"sensorid":123}
}
```
9. TO read statisitcs, You just need to send a GET action to our endpoint for statistics

curl http://localhost:3000/measures/stats

10. To know how to implement the Raspberry PI, please refer to the following article. [Time Series with Mongo DB] ()