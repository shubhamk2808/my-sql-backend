var db = require('../models')
var User = db.user;
const { Sequelize, Op } = require('sequelize');

var getUsers = async (req, res) => {
    const data = await User.findAll({});
    res.status(200).json({ data });
}

var getUser = async (req, res) => {
    const data = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ data });
}

var postUser = async (req, res) => {
    var postData = req.body;
    console.log(postData)
    let data;
    if (postData.length > 1) {
        data = await User.bulkCreate(postData);
    } else {
        data = await User.create(postData);
    }
    res.status(200).json({ data });
}

var deleteUser = async (req, res) => {
    const data = await User.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ data });
}

var patchUser = async (req, res) => {
    const updatedData = req.body;
    const data = await User.update(updatedData, {
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ data });
}

var queryUser = async (req, res) => {
    const data = await User.findAll({

        // attributes: ['id',['firstName', 'first_name'], [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],

        // attributes: {
        //     exclude:['lastName'],
        //     include: [
        //         'id',
        //         [ Sequelize.fn('COUNT', Sequelize.col('firstName')), 'count']
        //     ],
        // },

        // where: {
        //     [Op.and]: [{ id: 1 }, { firstName: 'Shubham' }], //to filter the query 
        // },

        order: [
            ['firstName', 'DESC'],  // Orders by the `firstName` column in descending order.
        ],

        // group: 'firstName',

        // limit: 2 // Fetch 1 instances/rows only

    });
    res.status(200).json({ data });
}

var finderUser = async (req, res) => {
    // const data = await User.findByPk(3); //3 is primary key of naveen

    // const data = await User.findOne({ where: { firstName: 'Shubham' } }); //return the first result according to condition

    const [data, created] = await User.findOrCreate({ //if result not found then it will create a new one
        where: { firstName: 'Nitish' },
        defaults: {
            lastName: 'Pal',
        },
    });

    res.status(200).json({ data, created });
}

var getSetUser = async (req, res) => {
    const data = await User.findAll({
        where: {
            lastName: 'Pal'
        }
    });

    res.status(200).json({ data });
}

module.exports = {
    getUsers, getUser, postUser, deleteUser, patchUser, queryUser, finderUser, getSetUser
}