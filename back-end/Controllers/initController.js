const axios = require("axios");
const bcrypt = require("bcrypt");
const db = require("../Models");

exports.initializeDatabase = async (req, res) => {
    try {

        console.log("Init endpoint hit");

        const roleCount = await db.Role.count();
        const membershipCount = await db.Membership.count();
        const productCount = await db.Product.count();

        if (
            roleCount > 0 ||
            membershipCount > 0 ||
            productCount > 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Database already initialized"
            });
        }

        // Roles
        await db.Role.bulkCreate([
            {
                id: 1,
                name: "Admin"
            },
            {
                id: 2,
                name: "User"
            }
        ]);
        console.log("Roles initialized");

        // Memberships
        await db.Membership.bulkCreate([
            {
                name: "Bronze",
                discount: 0,
                discountMin: 0,
                discountMax: 14
            },
            {
                name: "Silver",
                discount: 15,
                discountMin: 15,
                discountMax: 30
            },
            {
                name: "Gold",
                discount: 30,
                discountMin: 30,
                discountMax: null
            }
        ]);
        console.log("Memberships initialized");

        // Fetch Products from Noroff API
        const response = await axios.get(
            "http://backend.restapi.co.za/items/products"
        );

        const products = response.data.data;

        // Create Brands
        const uniqueBrands = [
            ...new Set(products.map(product => product.brand))
        ];

        const brandData = uniqueBrands.map(name => ({
            name
        }));

        await db.Brand.bulkCreate(brandData);

        console.log("Brands initialized");

        // Create Categories
        const uniqueCategories = [
            ...new Set(products.map(product => product.category))
        ];

        const categoryData = uniqueCategories.map(name => ({
            name
        }));

        await db.Category.bulkCreate(categoryData);

        console.log("Categories initialized");

        // Fetch Brands & Categories
        const brands = await db.Brand.findAll();
        const categories = await db.Category.findAll();

        // Prepare Product Data
        const productData = products.map((item) => {

            const brand = brands.find(
                b => b.name === item.brand
            );

            const category = categories.find(
                c => c.name === item.category
            );

            return {
                name: item.name,
                price: item.price,
                description: item.description,
                stock: item.quantity,
                image: item.imgurl,
                brandId: brand ? brand.id : null,
                categoryId: category ? category.id : null
            };

        });

        // Products
        await db.Product.bulkCreate(productData);

        console.log("Products initialized");

        // Hash admin password
        const hashedPassword = await bcrypt.hash(
            "P@ssword2023",
            10
        );
        // admin user
        await db.User.create({
            firstname: "Admin",
            lastname: "Support",
            username: "Admin",
            email: "admin@noroff.no",
            password: hashedPassword,
            address: "Online",
            telephone: "911",
            city: "Oslo",
            roleId: 1,
            membershipId: 1
        });

        console.log("Admin user initialized");

        return res.status(200).json({
            success: true,
            message: "Database initialized successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Database initialization failed",
            error: error.message
        });
    }
};