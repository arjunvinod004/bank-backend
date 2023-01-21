//to import JWT token
const jwt = require('jsonwebtoken')

//import db

const db= require('./db')

//database

userDetails={
    1000:{acno:1000,username:'Rony',password:1000,balance:100000,transaction:[]},
    
    1001:{acno:1001,username:'Sijo',password:1001,balance:100000,transaction:[]}
  }

  
 const register=(acno,username,password)=>{ 
  return db.User.findOne({acno})//data
  .then(user=>{
    if(user){
        return {
          status: false,
          statusCode: 400,
          message: 'User already registered'
        }
      }
      else{
        const newUser=new db.User({
          acno:acno,
          username:username,
          password:password,
          balance:0,
          transaction:[]
        })
        newUser.save();
  
        return {
          status: true,
          statusCode: 200,
          message: 'Registeration successful'
        }
      }
  })
}

 const login=(acno,pswd)=>{
  return db.User.findOne({acno,pswd})//data
  .then(user=>{
    if(user){
      currentUser=user.username
      currentAcno=acno
      const token = jwt.sign({currentAcno:acno},'superkey2022')
      return{
        status: true,
        statusCode: 200,
        message: 'Login successful',
        token:token,
        currentUser:currentUser,
        currentAcno:acno
      }
    }
    else{
      return {
        status: false,
        statusCode: 400,
        message: 'invalid userdetails'
      }
    }
  })
}
    
    //   if(pswd == userDetails[acno]['password']){
    //     currentUser=userDetails[acno]['username']
    //     currentAcno=acno
    //   try{
    //       const token = jwt.sign({currentAcno:acno},'superkey2022')
    //       return{
    //         status: true,
    //         statusCode: 200,
    //         message: 'Login successful',
    //         token:token
    //       }
    //     }
    //     catch{
    //       res.status(422).json({
    //         statusCode:422,
    //         status:false,
    //         message:"login failed"
    //       })
    //     }

    //     //To generate token
       
    //   }
    //   else{
    //     return {
    //       status: false,
    //       statusCode: 400,
    //       message: 'Invalid Password'
    //     }
    //   }
    
    // else{
    //   return {
    //     status: false,
    //     statusCode: 400,
    //     message: 'invalid userdetails'
    //   }
    // }

  deposite=(acno,pswd,amt)=>{
    var amount = parseInt(amt);
    return db.User.findOne({acno,pswd})
    .then(user=>{
      if(user){
        user.balance +=amount;
        user.transaction.push({
          Type: 'Credit',
          Amount: amount
        })
        user.save();
        return {
          status: true,
          statusCode: 200,
          message:` ${amount} is credited and Balance: ${user.balance}`
        }  
      }
      else{
        return {
          status: false,
          statusCode: 400,
          message: 'Invalid userdetails'
        }
      }
    })
  }
    
    //   if(pswd == userDetails[acno]['password'])
    //   {
    //     userDetails[acno]['balance'] += amount;
    //     userDetails[acno]['transaction'].push({
    //       Type: 'Credit',
    //       Amount: amount
    //     })
    //     return {
    //       status: true,
    //       statusCode: 200,
    //       message:` ${amount} is credited and Balance: ${userDetails[acno]['balance']}`
    //     }  
    //       }
    //   else{
    //     //alert('password incorrect');
    //     return {
    //       status: false,
    //     statusCode: 400,
    //     message: 'Invalid password'
    //     }
    //   }

    
    // else{
    //   //alert('invalid userdetails');
    //   return {
    //     status: false,
    //     statusCode: 400,
    //     message: 'Invalid userdetails'
    //   }
    // }


  withdraw=(acno,pswd,amt)=>{
    var amount =parseInt(amt);
    
    return db.User.findOne({acno,pswd})
    .then(user=>{
      if(user){
        if(user.balance>amount){
          user.balance -=amount;
          user.transaction.push({
            Type: 'Debit',
            Amount: amount
          })
          user.save()
          return {
            status: true,
            statusCode: 200,
            message: `${amount} is debited and balance: ${user.balance}`
          }
        }
        else{
          return{
            status: false,
            statusCode: 400,
            message: 'Insufficient funds'
          }
        }

      }
    })
  }
    //   if(pswd==userDetails[acno]['password']){
    //     if(userDetails[acno]['balance']>=amount){
    //       userDetails[acno]['balance'] -=amount;
    //       userDetails[acno]['transaction'].push({
    //         Type: 'Debit',
    //         Amount: amount
    //       })

    //     return {
    //       status: true,
    //       statusCode: 200,
    //       message: `${amount} and Balance is ${userDetails[acno]['balance']}`
    //     }
    //     }
    //     else{
    //       //alert('Insuuficient funds')
    //       return{
    //         status: false,
    //         statusCode: 400,
    //         message: 'Insufficient funds'
    //       }
    //     }
        
    //   }
    //   else{
    //     //alert('Password incorrect');
    //     return {
    //       status: false,
    //         statusCode: 400,
    //         message: 'Password Incorrect'
    //     }
    //   }
    
    // else{
    //   //alert('Invalid username');
    //   return {
    //     status: false,
    //         statusCode: 400,
    //         message: 'Invalid username'
    //   }
    // }
 
    
   const getTransaction=(acno)=>{
    return db.User.findOne({acno})
    .then(user=>{
      if(user){
        return{
          status: true,
          statusCode:200,
          transaction:user.transaction
        }

      }
      else{
        return {
               status: false,
                 statusCode: 400,
                   message: 'user not found'
          }
      }
    })
    
 }

 // to delete an account
 const deleteAcc=(acno)=>{
  return db.User.deleteOne({acno})
  .then(user=>{
    if(user){
      return{
        status: true,
          statusCode:200,
          message:`user deleted successfully` 
      }
    }
    else{
      return{
        status: false,
        statusCode: 400,
        message: 'user not found'
      }
     
    }
  })
 }

  module.exports={
     register,
     login,
     deposite,
     withdraw,
     getTransaction,
     deleteAcc
  }