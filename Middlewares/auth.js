import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            // ETRACT TOKEN FROM HEADERS
            const token= req.headers.authorization.split(' ')[1];
            // VERIFY THE TOKEN TO GET USER AND APPEND USER TO THE REQUEST
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

            
            // CALL NEXT FUNCTION
            next()
        }
        res.status(401).json({error: 'Token Expired'})
    } catch (error) {
       next(error) 
    }
}