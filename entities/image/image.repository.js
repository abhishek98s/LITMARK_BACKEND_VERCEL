"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.fetchById = void 0;
const knex_config_1 = __importDefault(require("../../config/knex.config"));
/**
 * The function fetches an image record from a database table based on the provided image ID while
 * ensuring it is not marked as deleted.
 * @param {number} imageId - The `imageId` parameter is a number that represents the unique identifier
 * of an image in the database. The `fetchById` function is an asynchronous function that retrieves
 * image data from the database based on the provided `imageId`. It uses the `knex` library to
 * interact with the database and
 * @returns The `fetchById` function is returning a Promise that resolves to an object containing the
 * properties 'id', 'name', 'url', and 'type' of the image with the specified `imageId` from the
 * 'images' table where 'isdeleted' is false.
 */
const fetchById = async (imageId) => {
    return await (0, knex_config_1.default)('images').select('id', 'name', 'url', 'type').where('id', imageId).andWhere('isdeleted', false).first();
};
exports.fetchById = fetchById;
/**
 * The function creates a new image record in the database and returns the ID of the newly created
 * image.
 * @param {ImageModel} imageData - The `imageData` parameter is an object of type `ImageModel` that
 * contains the data needed to create a new image entry in the database. This data likely includes
 * information such as the image file, title, description, and any other relevant details for the
 * image.
 * @returns { image_id: id }
 */
const create = async (imageData) => {
    const image = await (0, knex_config_1.default)('images').insert(imageData).returning('id');
    const id = image[0].id;
    return { image_id: id };
};
exports.create = create;
/**
 * The function `update` updates an image record in the database with the provided image data based on
 * the image ID.
 * @param {ImageModel} imageData - The `imageData` parameter is of type `ImageModel`, which likely
 * contains the data representing an image such as its URL, dimensions, and other relevant information.
 * @param {number} imageId - The `imageId` parameter is the unique identifier of the image in the
 * database that you want to update.
 * @returns The `update` function is returning a promise that resolves to the result of updating the
 * `images` table in the database where the `id` matches the `imageId` with the provided `imageData`.
 */
const update = async (imageData, imageId) => {
    return await (0, knex_config_1.default)('images').where('id', imageId).update(imageData);
};
exports.update = update;
/**
 * The function `remove` updates the `isdeleted` field to true for a specific image in the database
 * using the imageId.
 * @param {number} imageId - The `imageId` parameter is a number that represents the unique identifier
 * of the image that you want to mark as deleted in the database.
 * @returns The `remove` function is returning a promise that updates the `isdeleted` column in the
 * `images` table to `true` for the image with the specified `imageId`.
 */
const remove = async (imageId) => {
    return await (0, knex_config_1.default)('images').update('isdeleted', true).where('id', imageId);
};
exports.remove = remove;
