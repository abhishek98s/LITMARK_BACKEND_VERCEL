"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger = exports.swaggerConfig = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const Bookmark_docs = __importStar(require("./bookmark.docs"));
const auth_docs = __importStar(require("./auth.docs"));
const chip_docs = __importStar(require("./chip.docs"));
const folder_docs = __importStar(require("./folder.docs"));
const image_docs = __importStar(require("./image.docs"));
const recent_bookmark_docs = __importStar(require("./recent-bookmark.docs"));
const user = __importStar(require("./user.docs"));
exports.swaggerConfig = {
    openapi: '3.0.0',
    info: {
        title: 'My API',
        version: '1.0.0',
        description: 'This is the documentation for my API.',
    },
    servers: [
        {
            url: 'https://litmark-backend2.onrender.com/api',
            description: 'Local development server',
        },
    ],
    paths: {
        ...auth_docs.docs,
        ...Bookmark_docs.docs,
        ...chip_docs.docs,
        ...folder_docs.docs,
        ...image_docs.docs,
        ...recent_bookmark_docs.docs,
        ...user.docs,
    },
    components: {
        ...auth_docs.schema,
        schemas: {
            ...Bookmark_docs.schema,
            ...chip_docs.schema,
            ...folder_docs.schema,
            ...image_docs.schema,
            ...recent_bookmark_docs.schema,
            ...user.schema,
        },
    },
};
const swagger = function (app) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(exports.swaggerConfig));
};
exports.swagger = swagger;
