const JWT = require('jsonwebtoken');


const createJWT = (userId,key)=>{

    const jwttoken = JWT.sign({userId},key);
    return jwttoken;
}

const verifyJwt =(token)=>{

    const data = JWT.verify(token, 'shahrukhKhan');
    return data.userId;  // Replace with your secret



}

module.exports = {createJWT,verifyJwt};