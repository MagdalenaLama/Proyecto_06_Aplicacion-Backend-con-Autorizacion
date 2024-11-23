const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Proyecto_06 - API-Docs",
    version: "1.0.0",
    description: "Documentacion mediante Swagger",
  },
  server: [
    {
      url: "http://localhost:3001",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        ApiKeyAuth: "demo",
        type: "apiKey",
        in: "header",
        name: "Authorization",
      },
    },
  },
  // security: [{ bearerAuth: [] }],
  security: [{ ApiKeyAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
