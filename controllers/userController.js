var db = require('../models')
var User = db.user;

var getUsers = async (req, res) => {
    const data = await User.findAll({});
    res.status(200).json({data});
}

var getUser = async (req, res) => {
    const data = await User.findOne({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data});
}

var postUser = async (req, res) => {
    var postData = req.body;
    console.log(postData)
    let data;
    if(postData.length > 1){
        data = await User.bulkCreate(postData);
    }else{
        data = await User.create(postData);
    }
    res.status(200).json({data});
}

var deleteUser = async (req, res) => {
    const data = await User.destroy({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data});
}

var patchUser = async (req, res) => {
    const updatedData = req.body;
    const data = await User.update(updatedData,{
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data});
}

module.exports = {
    getUsers, getUser, postUser, deleteUser, patchUser
}