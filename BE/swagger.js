import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'study-forest API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://study-forest.onrender.com',
      },
    ],
  },
  apis: ['./swaggerjsdoc.js'],
}

const specs = swaggerJsdoc(options);

export default function swagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
