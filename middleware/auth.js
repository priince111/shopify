const config = require('config');
const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const token = req.header('x-auth-token');

    if(!token)
        return res.status(401).json({msg : 'No token, authorization required'});
    
    try{
        const decoded = jwt.verify(token, config.get('jwtsecret'));
        req.user = decoded;
        next();
    } catch(e){
        console.error('Token verification failed:', e.message);
        res.status(400).json({ msg:'Token is not valid'});
    }
}

module.exports = auth;