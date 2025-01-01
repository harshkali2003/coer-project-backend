const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')


const app = express()
app.use(express.json())
app.use(cors())
const jwtKey = "private"

const userData = require('../Models/Users')
const userQuery = require('../Models/Query')
const userSubscribe = require('../Models/Subscribe')

const verifyToken = (req , resp , next)=>{
    let token = req.headers['authorization']
    if(token){
        token = token.split(' ')[1]
        jwt.verify(token , jwtKey , (err,valid)=>{
            if(!err){
                next()
            }else{
                resp.status(404).send("Please provide a valid header")
            }
        })
    }else{
        resp.status(400).send("Please provide a valid header")
    }
}

app.post('/user/register' , async (req , resp)=>{
    let data = await userData(req.body)
    let result = await data.save()
    jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
        if (!err) {
          if (result) {
            resp.send({ result, auth: token });
            console.log("User has been added");
          } else {
            resp.status(400).send("Error");
          }
        } else {
          resp.status(400).send("Invalid token");
        }
      });
})

app.post('/user/log' ,async (req , resp)=>{
    if (req.body.email && req.body.password) {
        let data = await userData.findOne(req.body);
        jwt.sign({ data }, jwtKey, { expiresIn: "1h" }, (err, token) => {
          if (!err) {
            if (data) {
              resp.send({ data, auth: token });
              console.log("Logged In");
              
            } else {
              resp.status(400).send("User not found");
            }
          } else {
            resp.status(400).send("Invalid token");
          }
        });
      } else {
        resp.status(404).send("please provide both the input");
      }
  
})

app.post('/user/subscribe' , async (req , resp) =>{
  let data = await userSubscribe(req.body)
  let result = await data.save()
  if(result){
    resp.send(result)
    console.log("Subscribed Successfully");
    
  }else{
    resp.status(400).send("error")
  }
})

app.get('/user/detail/:id' , async (req , resp)=>{
    let data = await userData.find({_id:req.params.id})
    if(data){
        resp.send(data)
        console.log("record fetched");
        
    }else{
        resp.status(400).send("error")
    }
})

app.put('/user/update/:id' , async (req , resp)=>{
    let data = await userData.updateOne({_id:req.params.id},{$set:req.body})
    if(data){
        resp.send(data)
        console.log("record updated");
        
    }else{
        resp.status(400).send("error")
    }
})

app.post('/user/query' , async (req , resp) =>{
    let data = await userQuery(req.body)
    let result = await data.save()
    if(result){
        resp.send(result)
        console.log("Query has been raised successfully");
        
    }else{
        resp.status(400).send("error")
    }
})

app.listen(5000)