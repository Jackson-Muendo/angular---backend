const jwt =  require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        const realtoken = req.headers.authorization
        //console.log(realtoken)
        const token = realtoken.split(' ')[1];
        //console.log(token)
        const decodedToken =jwt.verify(token,"A_very_long_string_for_our_secret");
        var userData = {email:decodedToken.email,userid:decodedToken.userid}
        
        //console.log(userData)
        next();
        }
    catch(err){
    res.status(401).json({
        message : 'authentication failed from jwt'
    })
    // console.log(err)
}
}