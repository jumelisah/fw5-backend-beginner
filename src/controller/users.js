const usersProfile = require('../models/users');

const getUsers = (req, res)=>{
    usersProfile.getUsers(results=>{
        return res.json({
            success : true,
            message : 'Users list',
            results : results
        });
    });
};

const getUser = (req, res)=>{
    const {id} = req.params;
    usersProfile.getUser(id, result=>{
        if(result.length>0){
            return res.json({
                success: true,
                message: 'User found',
                result : result[0]
            });
        }else{
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
    });
};

const addUser = (req, res)=>{
    const data = [req.body.name, req.body.email, req.body.password, req.body.phone_number, req.body.gender, req.body.birthdate, req.body.address];
    usersProfile.addUser(data, result=>{
        if(result.affectedRows>0){
            return res.json({
                success: true,
                message: 'User added',
                result: `Rows Affected : ${result.affectedRows}`
            });
        }else{
            return res.status(500).send({
                success: false,
                result: 'Server error'
            });
        }
    });
};

const updateUser = (req, res)=>{
    const {id} = req.params;
    const data = [req.body.name, req.body.email, req.body.password, req.body.phone_number, req.body.gender, req.body.birthdate, req.body.address, id];
    usersProfile.getUser(id, results=>{
        if(results.length>0){
            usersProfile.updateUser(data, result=>{
                return res.json({
                    success: true,
                    message: 'Success update data',
                    result: `Rows affected : ${result.affectedRows}`
                });
            });
        }else{
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
    });
};

const deleteUser = (req,res)=>{
    const {id} = req.params;
    usersProfile.getUser(id, results=>{
        if(results.length>0){
            usersProfile.deleteUser(id, result=>{
                return res.json({
                    success: true,
                    message: 'User was deleted',
                    result: `Rows affected: ${result.affectedRows}`
                });
            });
        }else{
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
    });
};
module.exports = {getUsers, getUser, addUser, updateUser, deleteUser};