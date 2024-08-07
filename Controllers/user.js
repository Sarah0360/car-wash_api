import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../Models/user.js";
import { userSchema } from "../Schema/user.js";

export const signup = async (req, res, next) => {
    try {
        const {error, value} = userSchema.validate(req.body);
        if (error){
            return res.status(400).send(error.details[0],message);
        }

        const email = value.email;

        const findIfUserExist = await UserModel.findOne({email});
        if(findIfUserExist) {
            return res.status(401).send('User Has Already SignedUp');
        } else{
            const hashedPassword = await bcrypt.hash(value.password, 6);
            value.password = hashedPassword;
            // ADD USER
            await UserModel.create(value);
            return res.status(201).json({message: 'Registration Successful'});
        }
    } catch (error) {
       next (error) 
    }
}


// LOGIN TOKEN
export const token = async (req, res, next) => {
    try {
        const {userName, email, password} = req.body;
        // FIND USER USING THEIR EMAIL/USERNAME TO VALIDATE THE REQUEST
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(401).json("User Does Not Exist");
        } else {
            // VERIFY PASSWORD
            const correctPassword = bcrypt.compareSync(password, user.password);
            if(!correctPassword){
                return res.status(401).json("Invalid Credentials");
            }
            // CREATE A TOKEN
            const token = jwt.sign(
                {id: user.id},
                process.env.JWT_PRIVATE_KEY,
                {expiresIn: '72h'}
            );

            // SET THE TOKEN IN THE COOKIE
            res.cookie('token', token, { httpOnly: true });

            req.user = {id: user.id}
            // RETURN RESPONSE
            res.status(200).json({
                message: 'User Logged In',
                accessToken: token,
            
            })
        }
    } catch (error) {
     next(error) ;
    }
}

// export const logout = async () => {
//     try {
//         const userId = req.user.user_id;

//         await User.findByIdAndUpdate(userId, { isLoggedOut: true });

//         res.status(200).send({ message: 'Logged out successfully' });

//     } catch (error) {
        
//     }
// }




export const logout = async(req, res, next) => {
    try { 
     // Check if session exists
     if (!req.token) {
      return res.sendStatus(404); // Not Found if session does not exist
    }  
  res.clearCookie('token')
  res.status(201).json({
  status: 'Success',
  message: 'Logged Out Successfully'
})
    } catch (error) {
      next(error);
    }
  }
  