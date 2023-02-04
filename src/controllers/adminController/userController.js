import userService from "../../services/userService"

let getUserDetail = async (req, res, next) =>
{
    try {
        let info = await userService.getUserDetail(req.query.id)
        return res.status(200).json(info)
        
    } catch (e) {
        console.log(e);
        res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
        
    }
}
let addToCart = async (req ,res) =>{
    try {
        let info = await userService.addToCart(req.body)
        return res.status(200).json(info)
        
    } catch (e) {
        console.log(e);
        res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
        
    }
}
let deleteToCart = async (req ,res) =>{
    try {
        let info = await userService.deleteToCart(req.query)
        return res.status(200).json(info)
        
    } catch (e) {
        console.log(e);
        res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
        
    }
}
let getCartUser = async (req ,res) =>{
    try {
        let info = await userService.getCartUser(req.query.id)
        return res.status(200).json(info)
        
    } catch (e) {
        console.log(e);
        res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
        
    }
}
 let sendRemedy = async(req , res) =>{
    try {
        let info = await userService.sendRemedy(req.body)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
    }
 }
module.exports = {
    getUserDetail ,
    addToCart ,
    getCartUser ,
    sendRemedy ,
    deleteToCart

}