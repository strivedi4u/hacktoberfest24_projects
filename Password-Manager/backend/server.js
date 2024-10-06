import express from "express";
import cors from "cors"
import { MongoClient } from "mongodb";
import 'dotenv/config'
import bodyParser from "body-parser";

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);


// Database Name
const dbName = 'passMan';
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())
client.connect();

//getting all passwords
app.get('/', async (req,res)=>{
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})

//saving passwords
app.post('/', async (req,res)=>{
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true, result:findResult});
})

//deleting a password
app.delete('/', async (req,res)=>{
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true, result:findResult});
})
app.listen(port,()=>{
    console.log(`Server listening on port  ${port}`)
})