module.exports = (sequelize, DataTypes, Model) => {
    class User extends Model {}

    User.init(
        {
            // Model attributes are defined here
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isAlpha: true,
                },
                // get() { //getter and function to add Sr. text before firstName before getting results
                //   const rawValue = this.getDataValue('firstName');
                //   return rawValue ? 'Sr. ' + rawValue : null;
                // },
            },
            lastName: {
                type: DataTypes.STRING,
                // allowNull defaults to true
                // set(value) { //setter function to add full stop after lastName
                //   // Storing full stop (.) after lastName in the database.
                //   this.setDataValue('lastName', value + '.');
                // },
            },
            fullName: {
                //virtual function for returning a new key named fullname which is combination of firtName and lastName.
                type: DataTypes.VIRTUAL,
                get() {
                    return `${this.firstName} ${this.lastName}`;
                },
                set(value) {
                    throw new Error("Do not try to set the `fullName` value!");
                },
            },
        },
        {
            // Other model options go here
            sequelize, // We need to pass the connection instance
            modelName: "User", // We need to choose the model name
        }
    );

    // `sequelize.define` also returns the model
    console.log(User === sequelize.models.User); // true
    return User;
};
