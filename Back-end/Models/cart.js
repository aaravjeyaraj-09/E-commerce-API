module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define(
        'Cart',
        {
            isCheckedOut: {
                type:DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            timestamps: true,
            underscored: true,
        }
    );

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {
            foreignKey: 'userId',
        });

        Cart.hasMany(models.CartItem, {
            foreignKey: 'cartId',
        });
    };

    return Cart;
};