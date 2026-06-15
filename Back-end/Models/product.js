module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'Product',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,

                validate: {
                    notEmpty: true,
                },
            },

            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,

                validate: {
                    min: 0,
                },
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,

                validate: {
                    min: 0,
                },
            },

            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            timestamps: true,
            underscored: true,
        }
    );

    Product.associate = (models) => {
        Product.belongsTo(models.Brand, {
            foreignKey: 'brandId',
        });

        Product.belongsTo(models.Category, {
            foreignKey: 'categoryId',
        });

        Product.hasMany(models.CartItem, {
            foreignKey: 'productId',
        });

        Product.hasMany(models.OrderItem, {
            foreignKey: 'productId',
        });
    };

    return Product;
};