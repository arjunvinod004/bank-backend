//Server - mongodb integration

//import mongoose

const mongoose= require('mongoose');

//state connection string via mongoose 

mongoose.connect('mongodb://localhost:27017/BankServer',
{
    useNewurlparser:true // to avoid unwanted warnings
});

//Definre bank db model

const User=mongoose.model('User',
{
    //scheme creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
});

//collection export

module.exports={
    User
}