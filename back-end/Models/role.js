module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        'Role',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            timestamps: true,
            underscored: true,
        }
    );

    Role.associate = (models) => {
        Role.hasMany(models.User, {
            foreignKey: 'roleId'
        });
    };

    return Role;
};