import { Op } from 'sequelize';
import db from '../models/index';

let handleCreateCategory2 = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.description) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing parameter'
                })
            } else {
                await db.Menu.create({
                    name: data.name,
                    description: data.description
                    
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Create category success'
                })
            }
            
        } catch (e) {
            reject(e);
        }
    })
    
}
let getActionFilm2 = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Film.findAll({
                where: {
                    categoryId : "F1"
                }
            })
            if (data && data.length > 0) {
                data.map(item => {
                    item.movieName = Buffer.from(item.movieName, 'base64').toString('binary');
                  item.image = Buffer.from(item.image, 'base64').toString('binary');
                  item.backgroundImg = Buffer.from(item.backgroundImg, 'base64').toString('binary');
                  return item
              })
            }
            resolve({
                errCode: 0,
                errMessage: 'success',
                data
            })
        
     } catch (e) {
        reject(e);
     }
 })
}
let getEmotionFilm2 = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Film.findAll({
                where: {
                    categoryId : "F4"
                }
            })
            if (data && data.length > 0) {
                data.map(item => {
                    item.movieName = Buffer.from(item.movieName, 'base64').toString('binary');
                  item.image = Buffer.from(item.image, 'base64').toString('binary');
                  item.backgroundImg = Buffer.from(item.backgroundImg, 'base64').toString('binary');
                  return item
              })
            }
            resolve({
                errCode: 0,
                errMessage: 'success',
                data
            })
        
     } catch (e) {
        reject(e);
     }
 })
}
let getRandomFilm2 = () => { 
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Film.findAll(
                {
                    order: db.sequelize.random(),
                    include:[
                        { model: db.Allcode, as: 'categoryData', attributes: ['value'] },
                          { model: db.Allcode, as: 'yearData', attributes: ['value'] },
                         // {model : db.film_menu },
    
                    ],
                    raw: true,
                    nest : true,
                    limit: 5
                }
            )
            if (data && data.length > 0) {
                data.map(item => {
                    item.movieName = Buffer.from(item.movieName, 'base64').toString('binary');
                  item.image = Buffer.from(item.image, 'base64').toString('binary');
                  item.backgroundImg = Buffer.from(item.backgroundImg, 'base64').toString('binary');
                  return item
              })
            }
            resolve({
                errCode: 0,
                errMessage: 'oke',
                data

            })
         } catch (e) {
            reject(e);
         }
     })
}
let getSearchFilm = (q , type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let amount = 5 
            if(type === 'less'){
                amount = 5
            }else if(type === 'more'){
                amount = 10
            }


            let data = await db.Film.findAll(
                { 
                   where: {
                  [Op.or] : [
                    {name : {[Op.like] : '%' + q + '%'}}
                  ]
                },
                 raw: true,
                 nest : true,
                 limit: amount

               }
            )
            if (data && data.length > 0) {
                data.map(item => {
                    item.movieName = Buffer.from(item.movieName, 'base64').toString('binary');
                  item.image = Buffer.from(item.image, 'base64').toString('binary');
                  item.backgroundImg = Buffer.from(item.backgroundImg, 'base64').toString('binary');
                  return item
              })
            }
            resolve({
                errCode: 0,
                errMessage: 'search success',
                data
            })
        
     } catch (e) {
        reject(e);
     }
 })
 }
 const getCategoryFilm = (data) =>{
    return new Promise( async(resolve, reject) => {
        try {
            if(!data){
                resolve({
                    errCode: 1,
                    errMessage: 'update category error',
                })
    
            } else {
                await db.Allcode.create({
                    keyMap : data.keyMap ,
                    type :'FILM' ,
                    value :data.dataFilm
                })
                resolve({
                    errCode: 0,
                    errMessage: 'update category success',
                })
                
                
            }
            
        } catch (e) {
            reject(e)
            
        }
        
    })
 }
module.exports = {
    handleCreateCategory2,
    getCategoryFilm ,
    getActionFilm2,
    getEmotionFilm2,
    getRandomFilm2,
    getSearchFilm
}