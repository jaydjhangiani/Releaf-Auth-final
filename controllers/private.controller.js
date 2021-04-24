const jwt = require("jsonwebtoken");
const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');

exports.getPrivateData = (req,res,next) => {
    res.status(200).json({
        success: true,
        data: "you've got access"
    })
}

exports.getUser = async (req, res,next) => {
    let token ;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET)

    let _id = decoded.id

    try {
        const user = await User.findOne({_id});

        const userDetails = {
            username: user.username,
            typeOfUser: user.typeOfUser ? (typeOfUser) : ('user')
        }

        if(user){
            res.status(200).json({
                success: true,
                data: userDetails
            })
        }else{
            return next(new ErrorResponse("Something went wrong!",500))
        }

    } catch (error) {
        next(error);
    }

}