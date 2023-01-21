//server creation


//1 import express
const express = require('express')

//Import data service
const dataservice = require('./services/data.service')

// import cors
const cors = require('cors')


//2 creating an application for express
const app= express()

//to parse json from req body
app.use(express.json())//type conversion

// give commands to share a data via cors
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:8080/']
    
  }))

//3 create port number (for backend)
app.listen(3000,()=>{
    console.log('ok')
})

//application specific middle ware
const appMiddleware = (req,res,next)=>{
    console.log('application specific middle ware')
    next();
}
app.use(appMiddleware);

//application specific middleware
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('Router specific middleware');
   // const token = req.body.token;
   const token = req.headers['x-access']

    //verify token - verify()
    const data = jwt.verify(token,'superkey2022')
    console.log(data);
    next();
}

//4 Resaving http request
//get http request

// app.get('/',(req,res)=>{
//     res.send('get http request');
// })

// app.post('/',(req,res)=>{
//     res.send('Post Request')
// })

// app.patch('/',(req,res)=>{
//     res.send('Patch Request')
// })


//API Call
//Registration request
app.post('/register',(req,res)=>{
    console.log(req.body);
dataservice.register(req.body.acno,req.body.username,req.body.password)
.then(result=>{
    res.status(result.statusCode).json(result)
})
})

//Login request
app.post('/login',(req,res)=>{
    console.log(req.body);
 dataservice.login(req.body.acno,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
    })

//Deposit Request
app.post('/deposite',jwtMiddleware,(req,res)=>{
    console.log(req.body);
     dataservice.deposite(req.body.acno,req.body.password,req.body.amount)
     .then(result=>{
        res.status(result.statusCode).json(result)
     })
   })

//Withdraw Request
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
 dataservice.withdraw(req.body.acno,req.body.password,req.body.amount)
 .then(result=>{
    res.status(result.statusCode).json(result)
    
 })
   
})

//Transaction Request
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
     dataservice.getTransaction(req.body.acno)
     .then(result=>{
        res.status(result.statusCode).json(result)
     })
})

//delete Request
app.delete('/deleteAcc/:acno',(req,res)=>{
    console.log(req.body);
     dataservice.deleteAcc(req.params.acno)
     .then(result=>{
        res.status(result.statusCode).json(result)
     })
})
