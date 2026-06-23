module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define(
        'OrderItem',
        {
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            productName: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,

                validate: {
                    min: 1,
                },
            },

            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,

                validate: {
                    min: 0,
                },
            },

            subtotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,

                validate: {
                    min: 0,
                },
            },
        },
        {
            timestamps: true,
            underscored: true,
        }
    );

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order, {
            foreignKey: 'orderId',
        });

        OrderItem.belongsTo(models.Product, {
            foreignKey: 'productId',
        });
    };

    return OrderItem;
};