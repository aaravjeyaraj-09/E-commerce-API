module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'Order',
        {
            orderName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            totalAmount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,

                validate: {
                    min: 0,
                },
            },

            membershipName: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            membershipDiscount: {
                type: DataTypes.FLOAT,
                allowNull: false,

                validate: {
                    min: 0,
                    max: 100,
                },
            },

            status: {
                type: DataTypes.ENUM(
                    'In Progress',
                    'Ordered',
                    'Completed'
                ),
                allowNull: false,
                defaultValue: 'In Progress',
            },
        },
        {
            timestamps: true,
            underscored: true,
        }
    );

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: 'userId',
        });

        Order.hasMany(models.OrderItem, {
            foreignKey: 'orderId',
        });
    };

    return Order;
};