const jwt = require('jsonwebtoken')

exports.verifyJWT = (req, res, next) => {
    const token = req.query.Authorization || req.get('Authorization')

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