const JWT = require('jsonwebtoken');


const createJWT = (userId,key)=>{

    const jwttoken = JWT.sign({userId},key);
    return jwttoken;
}

const verifyJwt =()=>{



}

module.exports = {createJWT,verifyJwt};