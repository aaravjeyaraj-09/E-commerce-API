module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,

                validate: {
                    notEmpty: true,
                },
            },

            lastname: {
                type: DataTypes.STRING,
                allowNull: false,

                validate: {
                    notEmpty: true,
                },
            },

            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,

                validate: {
                    notEmpty: true,
                },
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,

                validate: {
                    isEmail: true,
                    notEmpty: true,
                },
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false,

                validate: {
                    notEmpty: true,
                    len: [6, 100],
                },
            },

            address: {
                type: DataTypes.STRING,
                allowNull: false,

                validate: {
                    notEmpty: true,
                },
            },

            city: {
                type: DataTypes.STRING,
                allowNull: false,

                validate: {
                    notEmpty: true,
                },
            },
            
            telephone: {
                type: DataTypes.STRING,
                allowNull: false,

                validate: {
                    isNumeric: true,
                    notEmpty: true,
                },
            },
        },
        {
            timestamps: true,
            underscored: true,
        }
    );

    User.associate = (models) => {
        User.belongsTo(models.Role, {
            foreignKey: 'roleId',
        });

        User.belongsTo(models.Membership, {
            foreignKey: 'membershipId',
        });

        User.hasOne(models.Cart, {
            foreignKey: 'userId',
        });

        User.hasMany(models.Order, {
            foreignKey: 'userId',
        });
    };

    return User;
};