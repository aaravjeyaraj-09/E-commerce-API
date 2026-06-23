require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const db = require('../models');
const unique = Date.now();

describe('Ecommerce API Tests', () => {

    let token;
    let categoryId;
    let brandId;
    let productId;

    // LOGIN ADMIN

    test('Login admin user', async () => {

        const response = await request(app)
            .post('/auth/login')
            .send({
                username: 'Admin',
                email: 'admin@noroff.no',
                password: 'P@ssword2023'
            });
        console.log(response.body);

        expect(response.statusCode).toBe(200);

        token = response.body.data.data.token;
    });

    // CREATE CATEGORY

    test('Create TEST_CATEGORY', async () => {

        const response = await request(app)
            .post('/categories')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: `TEST_CATEGORY_${unique}`
            });

        expect(response.statusCode).toBe(201);

        categoryId = response.body.data.data.id;

    });

    // CREATE BRAND

    test('Create TEST_BRAND', async () => {

        const response = await request(app)
            .post('/brands')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: `TEST_BRAND_${unique}`
            });

        expect(response.statusCode).toBe(201);

        brandId = response.body.data.data.id;

    });

    // CREATE PRODUCT

    test('Create TEST_PRODUCT', async () => {

        const response = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: `TEST_PRODUCT_${unique}`,
                price: 100,
                description: 'Test description',
                stock: 10,
                brandId,
                categoryId
            });

        expect(response.statusCode).toBe(201);

        productId = response.body.data.data.id;

    });

    // GET PRODUCT

    test('Get created product', async () => {

        const response = await request(app)
            .get(`/products/${productId}`);

        expect(response.statusCode).toBe(200);

    });

    // UPDATE CATEGORY

    test('Update category', async () => {

        const response = await request(app)
            .put(`/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: `UPDATED_CATEGORY_${unique}`
            });

        expect(response.statusCode).toBe(200);

    });

    // UPDATE BRAND

    test('Update brand', async () => {

        const response = await request(app)
            .put(`/brands/${brandId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: `UPDATED_BRAND_${unique}`
            });

        expect(response.statusCode).toBe(200);

    });

    // DELETE PRODUCT

    test('Delete product', async () => {

        const response = await request(app)
            .delete(`/products/${productId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

    });

});

    afterAll(async () => {
    await db.sequelize.close();
});