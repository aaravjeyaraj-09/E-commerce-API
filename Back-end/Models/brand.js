module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define(
        'Brand',
        {
            name: {
                type:DataTypes.STRING,
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

    Brand.associate = (models) => {
        Brand.hasMany(models.Product, {
            foreignKey: 'brandId',
        });
    };

    return Brand;
};