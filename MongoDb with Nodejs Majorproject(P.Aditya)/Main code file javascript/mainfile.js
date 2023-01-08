//using express for localhost 
const express=require("express")
const app=express()


//to access ejs file
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('form')   
})


//middleware
var bodypaser =require('body-parser')
const collection = require("template/lib/mixins/collection")
app.use(bodypaser.urlencoded({extended:false} ))


//database mongodb
var mongoose =require("mongoose")
var db = mongoose.connection

//connect id to mongodb
mongoose.connect('mongodb://localhost:27017/adi')

//collecting data from form
app.post('/',(req,res)=>{
    var name = req.body.fname
    var course = req.body.course
    var age = req.body.age
    var email= req.body.email
    
//entering the collected data
    var data= {
        "name":name,
        "course":course,
        "age":age,
        "email":email

    }
db.collection('nodejs').insertOne(data,(err,collection)=>{
//if error it will throw err message
    if(err){
        throw err;
    }
    console.log("saved")
})

//after submit it will show successfully submitted
res.send("Successfully Submitted ")
 
})

//we are specifying port number with arrow function
app.listen(3000,()=>console.log("server started"))
