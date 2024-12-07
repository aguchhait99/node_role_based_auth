const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY



const Auth=async(req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token){
        return res.status(400).json({
            message:'Token is required for access this page'
        });
    }
    try{
        const decoded=jwt.verify(token, SECRET_KEY)
        req.user=decoded;
       console.log('afetr login data',req.user);
    }catch(err){
       return res.status(400).json({
            message:'Invalid token'
        });
    }
    return next();

}

const AuthWeb=async(req,res,next)=>{
    // const token = req.cookies.adminToken;    
    try{
        if(req.cookies && req.cookies.adminToken){
            const decoded=jwt.verify(req.cookies.adminToken, SECRET_KEY, (err, data)=>{
                req.admin = data
                return next()
            })
            // req.user=decoded;
            // return next()
        }
    }catch(err){
       console.log(err)
    }
    return next();

}

module.exports = {Auth, AuthWeb}