import rateLimit from "../config/upstash.js";



const rateLimiter = async (req, res, next) => {
    try{
        const {success} = await rateLimit.limit('my-limit-key') // If you have authentication you will put user ID instead of 'my-limit-key'. It will rateLimit each user uniquely
        if(!success){
            return res.status(429).json({message: "Too many Requests"})
        }

        next()
    }

    catch(error){
        console.log('Error in the rateLimitor', error.message)
        next(error)
    }
}

export default rateLimiter;