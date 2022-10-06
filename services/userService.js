const UserModel = require('../models/userModel')

class UserService {
    createUser(user){
        return new Promise(async (resolve, reject) => {
            try{
                const user = await UserModel.create(user)
                if(!user){
                    return reject({code: 401, msg: 'User not created' })
                }
                return resolve(user)
            }
            catch(err){
                return reject(err)
            }
        })
    }

    getUser(userid){
        return new Promise(async (resolve, reject) => {
            try{
                const user = await UserModel.findById(userid)
                if(!user){
                    return reject({code: 404, msg: 'User not found' })
                }
                return resolve(user)
            }
            catch(err){
                return reject(err)
            }
        })
    }


    updateUser(userid, body){
        return new Promise(async (resolve, reject) => {
            try{
                let user = await UserModel.findById(userid)
                if(!user){
                    return reject({code: 404, msg: 'User not found' })
                }
                let newuser = await UserModel.findByIdAndUpdate(userid, body, {
                        new: true,
                        runValidators: true
                    })
                if(!newuser){
                    return reject({code: 401, msg: 'Cannot create User'})
                }
                resolve(newuser)
            }
            catch(err){
                reject(err)
            }
        })
    }

    deleteUser(userid){
        return new Promise(async (resolve, reject) => {
            try{
                let user = await UserModel.findById(userid)
                if(!user){
                    return reject({code: 404, msg: 'User not found' })
                }
                let newuser = await UserModel.findByIdAndDelete(userid)
                if(!newuser){
                    return reject({code: 401, msg: 'Cannot delete User'})
                }
                resolve()
            }
            catch(err){
                reject(err)
            }
        })
    }
}

module.exports = UserService