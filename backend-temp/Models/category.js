module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'Category',
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

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            foreignKey: 'categoryId',
        });
    };

    return Category;
};