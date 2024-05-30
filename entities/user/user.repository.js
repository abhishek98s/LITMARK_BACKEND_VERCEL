"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.fetchById = void 0;
const knex_config_1 = __importDefault(require("../../config/knex.config"));
/**
 * This function fetches user data by their ID from a database table called 'users' while ensuring the
 * user is not deleted.
 * @param {number} userId - The `userId` parameter is the unique identifier of the user whose
 * information you want to fetch from the database.
 * @returns The `fetchById` function is returning a Promise that resolves to an object containing the
 * user's `id`, `username`, `email`, and `image_id` from the database table `users` where the `id`
 * matches the `userId` parameter and the `isdeleted` column is `false`.
 */
const fetchById = async (userId) => {
    return await (0, knex_config_1.default)('users').select('id', 'username', 'email', 'image_id').where('id', userId).andWhere('isdeleted', false).first();
};
exports.fetchById = fetchById;
/**
 * The function creates a new user record in a database table and returns the user's ID.
 * @param {UserModel} userData - The `userData` parameter is an object of type `UserModel` containing
 * the data needed to create a new user in the database. This data typically includes properties such
 * as username, email, password, and any other relevant information for a user profile.
 * @returns { userID: user[0].id }
 */
const create = async (userData) => {
    const user = await (0, knex_config_1.default)('users').insert(userData).returning('id');
    return { userID: user[0].id };
};
exports.create = create;
/**
 * The function `update` updates a user username or password record in the database with the provided data for a specific
 * user ID.
 * @param {UserModel} userData - The `userData` parameter in the `update` function is of type
 * `UserModel`, which likely represents an object containing data to update for a user in a database.
 * This object may include fields such as `name`, `email`, `password`, etc., depending on the schema of
 * the `users
 * @param {number} userId - The `userId` parameter is the unique identifier of the user whose data you
 * want to update in the database.
 * @returns The `update` function is returning a promise that resolves to the result of updating the
 * user data in the database table `users` where the `id` matches the provided `userId`.
 */
const update = async (userData, userId) => {
    return await (0, knex_config_1.default)('users').select('*').where('id', userId).update(userData);
};
exports.update = update;
/**
 * This TypeScript function removes a user by updating the 'isdeleted' field to true in the 'users'
 * table based on the provided userId.
 * @param {number} userId - The `userId` parameter is the unique identifier of the user that you want
 * to mark as deleted in the database.
 * @returns The `remove` function is returning a promise that resolves to the result of updating the
 * `isdeleted` field to `true` for the user with the specified `userId` in the `users` table.
 */
const remove = async (userId) => {
    return await (0, knex_config_1.default)('users').where('id', userId).update('isdeleted', true);
};
exports.remove = remove;
