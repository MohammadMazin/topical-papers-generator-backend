const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token)
        res.send("No token Found")
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                res.json({ auth: false, message: "Authentication Failed" })
            else {
                req._id = decoded._id
                next()
            }
        })

    }
}