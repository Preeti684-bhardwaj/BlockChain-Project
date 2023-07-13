const express =require('express')
const mongoose=require('mongoose')
const app=express()
const routes=require('../src/routes/route')
const dotenv =require('dotenv').config()
const {PORT,MONGOOSE_STRING}=process.env;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(MONGOOSE_STRING,{usenewurlparser:true})
.then(()=>console.log('connected to mongoose'))
.catch((err)=>console.log(err.message));

app.use('/',routes);

app.listen(PORT, ()=>{
    console.log('express running on port',PORT)
})