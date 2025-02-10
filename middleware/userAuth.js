import cookie from 'cookie';
import { userRepository } from '../database/schema.js';

const userAuth = async (req, res, next) => {

    // Parse cookies from the request header
    const cookies = cookie.parse(req.headers.cookie);
    
    const userId = cookies?.uid;

    // console.log("userId",userId);
    
    if(!userId){
        return res.status(401).json({message: "Unauthorized request"});
    }
    // 
    try {
        const user = await userRepository.count({
            where: {uid: userId}
        })

        if(user === 0){
            return res.status(400).json({message: "User not found"});
        }
        else if(user === 1){
        
            req.uid = userId;
            next();
        }
        else{
            return res.status(500).json({message: "Internal server error in auth"});    
        }

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
        
    }

}

export default userAuth;