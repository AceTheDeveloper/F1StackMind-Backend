import 'dotenv/config';

const validate_api_key = (req, res, next) => {
    const valid_api_key = process.env.SERVER_API_KEY
    const api_key = req.headers['x-api-key'];

    if(api_key === valid_api_key){        
        next();
    } else {
    res.status(401).json({ "error": "Access Denied" }
);

    }

}

export default validate_api_key;

