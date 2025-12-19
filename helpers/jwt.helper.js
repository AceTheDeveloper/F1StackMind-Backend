import jwt from 'jsonwebtoken'
const SECRET = "SALTEDROOT";

export function generateToken(data){
    if(typeof(data) !== 'object' || data == null){
        return false;
    }

    const token = jwt.sign(data, SECRET, {expiresIn : '24h'});
    return token;
}

export function decodeToken(token){
    try {
        const decoded = jwt.verify(token, SECRET);
        return decoded;        
    } catch (error) {
        console.log("Invalid Token");
        
    }

}