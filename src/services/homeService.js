import db from '../models/index';
import bcrypt from 'bcryptjs';
var jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
require('dotenv').config();

let checkEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
            
        } catch (e) {
            reject(e)
            
        }
    })
    
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
            
        } catch (e) {
            reject(e)
            
        }
    })
}

let registerUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let check = await checkEmail(data.email)
            if (check) {
                resolve({
                    errCode : 1,
                    errMessage : 'email is already in use'
                })
            }
            else {
                 let hashPasswordFromBcrypt = await hashUserPassword(data.password)

                await db.User.create({
                    email: data.email, 
                    password: hashPasswordFromBcrypt ,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    roleId: data.role,
                    gender: data.gender,
                    image : data.image
                    
                    
                })
                resolve({
                    errCode : 0,
                    errMessage : 'ok'
                })
                
            }

            
        } catch (e) {
            reject(e)
        }
    })
}
let loginUser = (email , password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(email);
            if (isExist) {
                // user all ready exist 
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName', 'id' ,'image'],
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    user.image = Buffer.from(user.image, 'base64').toString('binary');
                    if (check) {
                        userData.errCode = 0,
                            userData.errMessage = 'đăng nhập thành công',
                            delete user.password;
                        userData.user = user;
                        userData.accessToken = jwt.sign({
                             id: user.id,
                             roleId : user.roleId
                        }, process.env.JWT_ACCESS_KEY, { expiresIn: "30d" });
                        userData.refreshToken = jwt.sign({
                            id: user.id,
                            roleId : user.roleId
                        }, process.env.JWT_REFRESH_KEY, { expiresIn: "365d" });
                        
                        
                        
        
                        
                        
                    } else {
                        userData.errCode = 3 ;
                        userData.errMessage = 'Sai mật khẩu rồi'
                    }
                } else {
                    userData.errCode = 2 ;
                    userData.errMessage = `không tìm thấy người dùng`
                }
            } else {
                userData.errCode = 1;
                userData.errMessage =  `không tìm thấy email , please nhập lại`
            }
            resolve(userData);
            
         } catch (e) {
            reject(e)
         }
   })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
             try {
                 let data = await db.User.findAll({
                    attributes: {
                        exclude:['password']
                     },
                     include:[
                         { model: db.Allcode, as: 'genderData', attributes: ['value'] },
                         {model : db.Allcode, as:'roleData', attributes:['value' ] },

                     ],
                     raw: true,
                     nest : true
                 })
                 if (data && data.length > 0) {
                    data.map(item => {
                        item.image = Buffer.from(item.image , 'base64').toString('binary');  
                        return item
                    })
                    
                }
                
                resolve({
                    errCode : 0,
                    errMessage: 'lấy tất cả User thành công',
                    data : data ,
                    
                })
                 
             } catch (e) {
                 reject(e)
                
             }
         })
}
    
let getAllGender = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataGender = await db.Allcode.findAll({
                 where: {type: 'GENDER'}
            })
            let dataRole = await db.Allcode.findAll({
                where: {type: 'ROLE'}
           })
            resolve({
                errCode : 0,
                errMessage: 'lấy tất cả gender thành công',
                dataGender,
                dataRole
                
            })
            
         } catch (e) {
            reject(e)
         }
     })
}
let handleDeleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                  where : {id :id}
            })
            if (!user) {
                resolve({
                    errCode :2 ,
                    errMessage : 'the isnt exits'
                })
            } else {
                await db.User.destroy(
                    { 
                        where : {id : id}
                    }
                )
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
let handleEditUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage : " missing parameter id"


                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                    user.image = data.image,
                    user.email = data.email,
                    user.roleId = data.role,
                    user.gender = data.gender
                    
                    await user.save();
                    resolve({
                        errCode: 0 ,
                        errMessage : 'update is success'
                    })
            } else {
                resolve({
                    errCode: 1 ,
                    errMessage : 'do not is found'
                })
            }
              
            
          } catch (e) {
            reject(e)
          }
      })
}
let handleCreateFilm = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.movieName || !data.categoryId || !data.description
                || !data.Year || !data.quality || !data.image || !data.name
                || !data.backgroundImg || !data.time || !data.actor || !data.director
                || !data.trailerMovie || !data.linkMovie
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing parameter'
                })
            }
            else {
                await db.Film.create({
                    name: data.name,
                    movieName: data.movieName, 
                    trailerMovie: data.trailerMovie,
                    linkMovie : data.linkMovie,
                    actor: data.actor,
                    time: data.time,
                    director: data.director,
                    description: data.description ,
                    categoryId:data.categoryId,
                    Year:data.Year,
                    image: data.image,
                    quality: data.quality,
                    backgroundImg : data.backgroundImg
                    
                    
                })
                resolve({
                    errCode: 0,
                    errMessage : 'Oke'
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
      
}
let getAllFilm = () => {
    return new Promise(async (resolve, reject) => {
          try {
              let data = await db.Film.findAll({
                include:[
                    { model: db.Allcode, as: 'categoryData', attributes: ['value'] },
                      { model: db.Allcode, as: 'yearData', attributes: ['value'] },
                     // {model : db.film_menu },

                ],
                raw: true,
                nest : true
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
                  errMessage: 'oke',
                  data
              })

          } catch (e) {
            reject(e)
          }
      })
}
let getAllYear = () => {
    return new Promise(async (resolve, reject) => {
         try {
            let dataYear = await db.Allcode.findAll({
                where: {type: 'YEAR'}
           })
           let dataFilm = await db.Allcode.findAll({
               where: {type: 'FILM'}
          })
           resolve({
               errCode : 0,
               errMessage: 'lấy tất cả gender thành công',
               dataYear,
               dataFilm
               
           })
         } catch (e) {
            reject(e)
         }
     })
}
let getDetailFilm = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: -1,
                    errMessage : 'missing parameter'
                 })
            } else {
                let data = await db.Film.findOne({
                    where: { id: id },
                    include:[
                        { model: db.Allcode, as: 'categoryData', attributes: ['value'] },
                        {model : db.Allcode, as:'yearData', attributes:['value' ] },
    
                    ],
                    raw: true,
                    nest : true
                })
                if (data) {
                        data.movieName = Buffer.from(data.movieName, 'base64').toString('binary');
                        data.image = Buffer.from(data.image, 'base64').toString('binary');
                    data.backgroundImg = Buffer.from(data.backgroundImg, 'base64').toString('binary'); 
                   
                    resolve({
                        errCode: 0,
                        errMessage: 'success',
                        data
                    })
                }
             }
            
         } catch (e) {
            reject(e)
         }
     })
}
let handleDeleteFilm = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let film = await db.Film.findOne({
                 where: {id : id}
            })
            if (!film) {
            
                    resolve({
                        errCode :2 ,
                        errMessage : 'the isnt exits'
                    })
                
            } else {
                await db.Film.destroy({
                    where: {id : id}
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
let handleEditFilm = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage : " missing parameter id"


                })
            }
            let user = await db.Film.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {
                user.name = data.name,
                user.movieName = data.movieName,
                    user.trailerMovie = data.trailerMovie,
                    user.linkMovie = data.linkMovie,
                    user.time = data.time,
                    user.actor = data.actor,
                    user.director = data.director,
                    user.description = data.description,
                    user.categoryId = data.categoryId,
                    user.Year = data.Year,
                    user.image = data.image,
                    user.backgroundImg = data.backgroundImg,
                    user.quality = data.quality
                    
                    await user.save();
                    resolve({
                        errCode: 0 ,
                        errMessage : 'update is success'
                    })
            } else {
                resolve({
                    errCode: 1 ,
                    errMessage : 'do not is found'
                })
            }
              
            
          } catch (e) {
            reject(e)
          }
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
    handleEditFilm
}