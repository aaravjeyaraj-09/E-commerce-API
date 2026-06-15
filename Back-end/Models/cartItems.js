module.exports = (sequelize, DataTypes) => {

    const CartItem = sequelize.define(
        'CartItem',
        {
            cartId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            productId: {
                type: DataTypes.INTEGER,
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
        },
        {
            timestamps: true,
            underscored: true,

            indexes: [
                {
                    unique: true,
                    fields: ['cart_id', 'product_id'],
                },
            ],
        }
    );

    CartItem.associate = (models) => {

        CartItem.belongsTo(models.Cart, {
            foreignKey: 'cartId',
        });

        CartItem.belongsTo(models.Product, {
            foreignKey: 'productId',
        });

    };

    return CartItem;
};