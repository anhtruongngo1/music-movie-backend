import adminService from "../../services/adminService"

let handleCreateCategory = async (req, res) => {
    try {
        let info = await adminService.handleCreateCategory2(req.body)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
    }
}
let getActionFilm = async (req, res) => {
    try {
        let info = await adminService.getActionFilm2()
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
    }
}
let getEmotionFilm = async (req, res) => {
    try {
        let info = await adminService.getEmotionFilm2()
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
    }
}
let getRandomFilm = async (req, res) => {
    try {
        let info = await adminService.getRandomFilm2()
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
    }
}
let getSearchFilm = async (req, res) => {
    try {
        let info = await adminService.getSearchFilm(req.query.q , req.query.type)
        return res.status(200).json(info)
        
    } catch (e) {
        console.log(e);
        res.status(404).json({
            errcode: -1,
            errMessage: 'Erorr from sever'
        })
    }
}
let getCategoryFilm = async (req, res) => {
    try {
        let info = await adminService.getCategoryFilm(req.body)
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
    handleCreateCategory,
    getActionFilm,
    getEmotionFilm,
    getRandomFilm,
    getSearchFilm ,
    getCategoryFilm
}