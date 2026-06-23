const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger.yaml');

module.exports = (app) => {

    app.use(
        '/doc',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument)
    );

};
