module.exports = (sequelize, DataTypes) => {
    const Membership = sequelize.define(
        'Membership',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,

                validate: {
                    notEmpty: true,
                },
            },

            discountMin: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },

            discountMax: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },

            discount: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 100,
                },
            },
        },
        {
            timestamps: true,
            underscored: true,
        }
    );

    Membership.associate = (models) => {
        Membership.hasMany(models.User, {
            foreignKey: 'membershipId',
        });
    };

    return Membership;
};