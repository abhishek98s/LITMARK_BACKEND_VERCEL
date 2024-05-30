"use strict";
/**
 * @swagger
 * /auth/login:
 *      post:
 *          tags:
 *              - Authentication
 *          summary: Login
 *          requestBody:
 *              description: Login credentials
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                          required:
 *                              - email
 *                              - password
 *          responses:
 *               200:
 *                  description: Successful operation
 *                  content:
 *                      application/json:
 *                          schema:
 *                              properties:
 *                                  email:
 *                                      type: string
 *                                  password:
 *                                      type: string
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.docs = void 0;
exports.docs = {
    '/auth/login': {
        post: {
            tags: [
                'Authentication',
            ],
            summary: 'Login',
            requestBody: {
                description: 'Login credentials',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                },
                                password: {
                                    type: 'string',
                                },
                            },
                            required: [
                                'email',
                                'password',
                            ],
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Successful operation',
                    content: {
                        'application/json': {
                            schema: {
                                properties: {
                                    data: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.schema = {
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
    },
};
