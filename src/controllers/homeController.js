import { response } from "express";
import homeService from "../services/homeService"
var jwt = require('jsonwebtoken');
let refreshtokenData = [];


let registerUser = async (req, res, next) => {
    try {
        let info = await homeService.registerUser(req.body)
        return res.status(200).json(info)
        
        
    } catch (e) {
        console.log(e)
       return res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
        
    }
    
    
}
let loginUser = async (req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password
    
    
        // check email exist
        if(!email|| !password) {
            return res.status(500).json({
                errcode: '1' ,
                message: 'missing inputs  parameter'
            })
        }
        let userData = await homeService.loginUser(email, password)
        refreshtokenData.push( userData.refreshToken)
        res.cookie("refreshtoken", userData.refreshToken,{
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: 'strict'
         })
       return  res.status(200).json({
            errCode: userData.errCode,
            errMessage: userData.errMessage,
            user: userData.user ? userData.user : {},
            accessToken : userData.accessToken,
        })
 
        
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
        
    }
}
let getAllUser = async (req, res) => {
    try {
        let infor = await homeService.getAllUser()
        return res.status(200).json(infor)
        
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
    }
}
let getAllGender = async (req, res) => {
    try {
        let infor = await homeService.getAllGender()
        return res.status(200).json(infor)
        
     } catch (e) {
        console.log(e)
        return res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
     }
}
let handleDeleteUser = async (req, res) => {
     try {
        let infor = await homeService.handleDeleteUser(req.query.id)
        return res.status(200).json(infor)
     } catch (e) {
        console.log(e)
        return res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
        
     }
}
let handleEditUser = async (req, res) => {
    try {
        let infor = await homeService.handleEditUser(req.body)
        return res.status(200).json(infor)
        
     } catch (e) {
        console.log(e)
        return res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
     }
}
let handleCreateFilm = async (req, res) => {
    try {
        let infor = await homeService.handleCreateFilm(req.body)
        return res.status(200).json(infor)
        
     } catch (e) {
        console.log(e)
        return res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
     }
}
let getAllFilm = async (req, res) => {
      try {
        let infor = await homeService.getAllFilm()
        return res.status(200).json(infor)
      } catch (e) {
        console.log(e)
        return res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
      }
}
let getAllYear = async (req, res) => {
    try {
        let infor = await homeService.getAllYear()
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
    }
}
let getDetailFilm = async (req, res) => {
    try {
        let infor = await homeService.getDetailFilm(req.query.id)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
    }
}
let handleDeleteFilm = async (req, res) => {
    try {
        let infor = await homeService.handleDeleteFilm(req.query.id)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
    }
}
let handleEditFilm = async (req, res) => {
    try {
        let infor = await homeService.handleEditFilm(req.body)
        return res.status(200).json(infor)
        
     } catch (e) {
        console.log(e)
        return res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
     }
}
let requestRefreshtoken = async (req, res) => {
    // take token from user
 try {
     const refreshToken = req.cookies.refreshtoken
     console.log('check token', refreshtokenData);
     console.log('check 2', refreshToken);
     
     if (!refreshToken) return res.status(200).json("your are not  authenticated")
     if (refreshtokenData !== refreshToken) {
         return res.status(403).json("refreshtoken is not valid")
     }
     jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
         if (err) {
             console.log(err);
         }
         refreshtokenData = refreshtokenData.filter((token) => token !== refreshToken)
         console.log("check tip" , refreshtokenData);
         const newAccessToken = jwt.sign({
            id: req.body.id,
            roleId : req.body.roleId
         }, process.env.JWT_ACCESS_KEY, { expiresIn: 60 * 60 });
         const newfreshToken = jwt.sign({
            id: user.id,
            roleId : user.roleId
         }, process.env.JWT_REFRESH_KEY, { expiresIn: "365d" });
         refreshtokenData.token = newfreshToken
         res.cookie("newRefreshtoken", newfreshToken, {
             httpOnly: true,
             secure: false,
             path: "/",
             sameSite: 'strict'
         });
         res.status(200).json({
             accessToken: newAccessToken
         })
     })
   
 } catch (e) {
    console.log(e)
    return res.status(404).json({
        errcode: -1,
        errMessage: 'Erorr from sever'
    })
 }

}
let handleLogout = async (req, res) => {
    res.clearCookie("refreshtoken")
    res.status(200).json({
        errCode: 0,
        errMessage:"log out success"
    })
}
module.exports = {
    registerUser,
    loginUser,
    getAllUser,
    getAllGender,
    handleDeleteUser,
    handleEditUser,
    handleCreateFilm,
    getAllFilm,
    getAllYear,
    getDetailFilm,
    handleDeleteFilm,
    handleEditFilm,
    requestRefreshtoken,
    handleLogout
}