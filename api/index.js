import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import multer from 'multer';
import { MongoClient, ObjectId } from 'mongodb';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import jwt from 'jsonwebtoken'; 
const secret = process.env.SECRET;


const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
const CONNECTION_STRING=process.env.MONGOOSE_CONNECT;
const DATABASENAME=process.env.DATABASE_USERNAME;

// user
MongoClient.connect(CONNECTION_STRING)
.then(client=>{
    console.log("Connected to MongoDB")
    app.listen(3000, ()=>{
        console.log("Listning!")
    })

    const database = client.db(DATABASENAME);
    const usercollection = database.collection(process.env.USER_COLLECTION)
    const carscollection = database.collection(process.env.CARS_COLLECTION)
    const dealercollection = database.collection(process.env.DEALER_COLLECTION)

    app.post('/usersignup', async(req,res)=>{
        const {username, password} = req.body
        
        try{const userDoc = await usercollection.insertOne({
            username, password : bcrypt.hashSync(password, salt), cars:[]
        })
        jwt.sign({username, id: userDoc._id},
            secret,
            {},
            (err, token)=>{
                if(err) throw err
                res.cookie('token', token,{
                    secure: true, // Cookie sent over HTTPS only
                    sameSite: 'None' // Allow cross-site cookies
                }).json({
                    id: userDoc._id,
                    username
                })
            })
        // res.json(userDoc)
        }catch(e){
                res.status(400).json(e)
        }
    })

    app.post('/userlogin', async(req,res)=>{
        const {username, password} = req.body
        try{
        const userDoc = await usercollection.findOne({username})
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if(passOk){
        jwt.sign(
            {username, id:userDoc._id}, //payload
            secret, 
            {},   
            (err, token)=>{ 
            if(err) throw err;
            res.cookie('token', token,{
                secure: true, // Cookie sent over HTTPS only
                sameSite: 'None' // Allow cross-site cookies
            }).json({
                id:userDoc._id,
                username,
            })
        })
        }
        // res.json(userDoc)
        }catch(e){
            res.status(500).json(e)
        }
    })
    
    app.get('/profile', (req,res)=>{
        const {token} = req.cookies
        jwt.verify(token, secret, {}, (err, info)=>{ //it will verfy our token
            if(err) throw err
            res.json(info)
        })
        res.json(req.cookies)
    })

    app.post('/logout', async(req,res)=>{
        res.cookie('token', '',{
            secure: true, // Cookie sent over HTTPS only
            sameSite: 'None' // Allow cross-site cookies
        }).json("ok")
    })
    app.get('/user/:username', async(req,res)=>{
        const {username} = req.params
        const userDoc = await usercollection.findOne({username})
        res.json(userDoc)
    })
    app.post('/cars/:carid/buy/:userid', async(req,res)=>{
        const {carid, userid} = req.params
        const carId = new ObjectId(carid)
        const userId = new ObjectId(userid)
        const carDoc = await carscollection.findOneAndUpdate(
            {_id: carId},
            { $set: { available: false } },
            {new: true});
        const userDoc = await usercollection.findOneAndUpdate(
            {_id: userId},
            {$push: {cars: carDoc}},
            {new: true});
        const dealerDoc = await dealercollection.findOneAndUpdate(
            {username: carDoc.username},
            {
            $push: { soldcars: carDoc }, 
            $pull: { "cars": {"insertedId": carDoc._id}}    
            },
            {new: true})
        
        res.json(carDoc)
    })
})

// dealer 
MongoClient.connect(CONNECTION_STRING)
.then(client=>{
    console.log("Connected Dealer")
    const database = client.db(DATABASENAME)
    const dealercollection = database.collection(process.env.DEALER_COLLECTION)

    app.post('/dealersignup', async(req,res)=>{
        const {username, password} = req.body
        
        try{const userDoc = await dealercollection.insertOne({
            username, password : bcrypt.hashSync(password, salt), cars:[], soldcars:[]
        })
        jwt.sign({username, id: userDoc._id},
            secret,
            {},
            (err, token)=>{
                if(err) throw err
                res.cookie('token', token,{
                    secure: true, // Cookie sent over HTTPS only
                    sameSite: 'None' // Allow cross-site cookies
                }).json({
                    id: userDoc._id,
                    username
                })
            })
        // res.json(userDoc)
        }catch(e){
                res.status(400).json(e)
        }
    })
    app.post('/dealerlogin', async(req,res)=>{
        const {username, password} = req.body
        try{
        const userDoc = await dealercollection.findOne({username})
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if(passOk){
        jwt.sign(
            {username, id:userDoc._id}, //payload
            secret, 
            {},   
            (err, token)=>{ 
            if(err) throw err;
            res.cookie('token', token,{
                secure: true, // Cookie sent over HTTPS only
                sameSite: 'None' // Allow cross-site cookies
            }).json({
                id:userDoc._id,
                username,
            })
        })
        }
        // res.json(userDoc)
        }catch(e){
            res.status(500).json(e)
        }
    })
    app.get('/alldealers', async(req,res)=>{
        const response = await dealercollection.find({}).toArray();
        res.json(response)
    })
    app.get('/dealer/:dealername', async(req,res)=>{
        const {dealername} = req.params
        try{
            const dealerDoc = await dealercollection.findOne({username: dealername})
            res.json(dealerDoc)
        }catch{
            res.status(500).json(e)
        }
    })
})
// cars 
MongoClient.connect(CONNECTION_STRING)
.then(client=>{
    console.log("Connected Cars")
    const database = client.db(DATABASENAME)
    const carscollection = database.collection(process.env.CARS_COLLECTION)
    const dealercollection = database.collection(process.env.DEALER_COLLECTION)
    app.get('/carsavailable', async(req,res)=>{
        const carDoc = await carscollection.find({available: true}).toArray();
        res.json(carDoc)
    })
    app.post('/dealer/addcar/:username', async(req,res)=>{
        const {username} = req.params
        const {Type, name, model} = req.body
        const carDoc = await carscollection.insertOne({
            Type, name, model, username, available: true
        })
        const dealerDoc = await dealercollection.findOneAndUpdate(
            {username},
            {$push: {cars: carDoc}},
            {new: true}
        )
        res.json(carDoc)
    })
    app.get('/cars/:id', async(req,res)=>{
        const {id} = req.params
        const objectId = new ObjectId(id)
        const carDoc = await carscollection.findOne({_id: objectId})
        res.json(carDoc)
    })
})
