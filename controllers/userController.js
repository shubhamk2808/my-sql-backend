var db = require("../models");
var User = db.user;
const { Sequelize, Op } = require("sequelize");

var getUsers = async (req, res) => {
    const data = await User.findAll({});
    res.status(200).json({ data });
};

var getUser = async (req, res) => {
    const data = await User.findOne({
        where: {
            id: req.params.id,
        },
    });
    res.status(200).json({ data });
};

var postUser = async (req, res) => {
    var postData = req.body;
    console.log(postData);
    let data;
    if (postData.length > 1) {
        data = await User.bulkCreate(postData);
    } else {
        data = await User.create(postData);
    }
    res.status(200).json({ data });
};

var deleteUser = async (req, res) => {
    const data = await User.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.status(200).json({ data });
};

var patchUser = async (req, res) => {
    const updatedData = req.body;
    const data = await User.update(updatedData, {
        where: {
            id: req.params.id,
        },
    });
    res.status(200).json({ data });
};

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
            ["firstName", "DESC"], // Orders by the `firstName` column in descending order.
        ],

        // group: 'firstName',

        // limit: 2 // Fetch 1 instances/rows only
    });
    res.status(200).json({ data });
};

var finderUser = async (req, res) => {
    // const data = await User.findByPk(3); //3 is primary key of naveen

    // const data = await User.findOne({ where: { firstName: 'Shubham' } }); //return the first result according to condition

    const [data, created] = await User.findOrCreate({
        //if result not found then it will create a new one
        where: { firstName: "Nitish" },
        defaults: {
            lastName: "Pal",
        },
    });

    res.status(200).json({ data, created });
};

var getSetVirtualUser = async (req, res) => {
    //for using getter and virtual function to add Sr. text before firstName before getting results
    const data = await User.findAll({
        where: {
            lastName: "Pal",
        },
    });

    //for using setter function to add full stop after lastName, function is written in user model
    // const data = await User.create({
    //     firstName: "Salman",
    //     lastName:'Saifi'
    // });

    res.status(200).json({ data });
};

var getValidateUser = async (req, res) => {
    let data = {};
    let messages = {};
    try {
        data = await User.create({
            firstName: "Anshu",
            lastName: "Bhai",
        });
        messages = "Success";
    } catch (e) {
        console.log({ e: e.errors });
        let message;
        e.errors.forEach((error) => {
            switch (error.validatorKey) {
                case "isAlpha":
                    message = "Only alphabets are allowed";
                    break;
                case "not_unique":
                    message = "Duplicate name for firstName";
                    break;
            }
            console.log({ message });
            messages[error.path] = message;
        });
        console.log({ messages });
    }
    res.status(200).json({ data, messages });
};

module.exports = {
    getUsers,
    getUser,
    postUser,
    deleteUser,
    patchUser,
    queryUser,
    finderUser,
    getSetVirtualUser,
    getValidateUser,
};
