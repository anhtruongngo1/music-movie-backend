import db from "../models/index";
import emailService from "../services/emailService"
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (userId, token ) => {
  
  let   result = `${process.env.URL_REACT}/verify-password?token=${token}&doctorId=${userId}`
    return result
}
let getUserDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findOne({
        where: { id: id },
        attributes: {
          exclude:['password']
       },
      });
      if (data && data.image) {
        data.image = Buffer.from(data.image, "base64").toString("binary");
      }
      resolve({
        errCode: 0,
        errMessage: " success",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let addToCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.idUser || !data.idFilm) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      }
      else 
      {
        let res = await db.Cartfilm.findOne({
          where :{
            id : data.idFilm ,
            idUser : data.idUser
          }
        })
        if(res){
             resolve({
             errCode: 3,
              errMessage: "id film da ton tai",
        });
        }else{
              await db.Cartfilm.create({
          id: data.idFilm,
          idUser: data.idUser,
        });
        resolve({
          errCode: 0,
          errMessage: "Oke",
        });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteToCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
        let film = await db.Cartfilm.findOne({
             where: {
              id : data.id,
              idUser : data.idUser

            }
        })
        if (!film) {
        
                resolve({
                    errCode :2 ,
                    errMessage : 'the isnt exits'
                })
            
        } else {
            await db.Cartfilm.destroy({
                where: {
                  id : data.id,
                  idUser : data.idUser
                }
            })
            resolve({
                errCode :0 ,
                errMessage : 'the user id delete'
            })
        }
        
     } catch (e) {
         reject(e)
        
     }
 })
}
let getCartUser = (id) =>{
    return new Promise(async(resolve, reject) => {
       try {
        if(!id){
            resolve({
                errCode: 1,
                errMessage: "missing parameter",
              });
        }else {
            let data = await db.Cartfilm.findAll({
                where : {idUser : id},
                include:[
                    { model: db.Film, attributes: ['image'] }

                ],
                raw: true,
                nest : true
            })
             if (data ) {
                 data.map(item => {
                         item.Film.image =  Buffer.from(item.Film.image, 'base64').toString('binary');
                         return item
               
             })
            }
            resolve({
                errCode: 0,
                errMessage: "Oke",
                data
              });
        }
       } catch (e) {
        reject(e)
        
       }
        
    })
}
 let sendRemedy = (data) =>{
  return new Promise(async(resolve, reject) => {
    try {
      if (!data.email) {
        resolve({
            errcode: 1,
            errMessage: 'missing parameter id'
        })
      }
      else{
        let forgotPassword = await db.User.findOne({
          where:{
            email : data.email 
          }
        })
        if(forgotPassword){
          let token = uuidv4(); 
          await emailService.sendSimpleEmail({
            userName : forgotPassword.lastName + forgotPassword.firstName ,
            reciveEmail: data.email,
            redirectLink : buildUrlEmail(forgotPassword.id , token)
          })
          resolve({
            errcode: 0,
            errMessage: 'OKE'
        })
        }else{
          resolve({
            errCode : 2 ,
            errMessage: "tài khoản email không tồn tại"
          })
        }
      }

      
    } catch (e) {
      reject(e)
    }
  }
  )
 }

module.exports = {
  getUserDetail,
  addToCart,
  deleteToCart ,
  getCartUser ,
  sendRemedy
};
