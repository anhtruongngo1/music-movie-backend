var jwt = require('jsonwebtoken');


  let   verify = (req, res, next) => {
        const token = req.headers.token;
      if (token) {
          const accessToken = token.split(" ")[1];
          jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
              if (err) {
                return  res.status(403).json("token is not valid")
              }
              req.user = user;
              next();
          })
      }
      else {
         return res.status(401).json("you're not  authenticated")
      }
}
let verifyTokenAndAdminAuth = (req, res, next) => {
    const token = req.headers.token;
      if (token) {
          const accessToken = token.split(" ")[1];
          jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
              if (err) {
                return res.status(403).json({
                  errCode: 1,
                  errMessage : " token is not valid",
                 })
              }
              req.user = user;
              if (req.user.roleId === "R1") { // 
                  next()
              } else {
                return res.status(403).json({
                  errCode: 2,
                  errMessage: "you are not allowed "
                })
              }
          })
      }
      else {
         return res.status(401).json("you're not  authenticated")
      }
    }
    let verifyTokenUser = (req, res, next) => {
      const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                  return res.status(403).json({
                    errCode: 1,
                    errMessage : " token is not valid",
                   })
                }
                req.user = user;
                if ( req.user.id == req.body.id||req.user.roleId === "R1") { // 
                    next()
                } else {
                  return res.status(403).json({
                    errCode: 2,
                    errMessage: "you are not allowed "
                  })
                }
            })
        }
        else {
           return res.status(401).json("you're not  authenticated")
        }
      }
 
module.exports = {
    verify , verifyTokenAndAdminAuth , verifyTokenUser
}