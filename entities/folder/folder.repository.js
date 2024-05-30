"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortBy = exports.remove = exports.update = exports.create = exports.fetchAllByFolderId = exports.fetchById = exports.fetchAllNested = exports.fetchAllParent = void 0;
const knex_config_1 = __importDefault(require("../../config/knex.config"));
/**
 * This function fetches all parent folders belonging to a specific user that are not deleted.
 * @param {number} user_id - The `user_id` parameter is used to specify the user for whom we want to
 * fetch all parent folders.
 * @returns The `fetchAllParent` function is returning a Promise that resolves to an array of objects
 * representing folders that belong to a specific user and have no parent folder. Each object in the
 * array contains the properties 'id', 'name', 'image_id', 'user_id', and 'folder_id' of the folder.
 */
const fetchAllParent = async (user_id) => {
    return (0, knex_config_1.default)('folders').select('id', 'name', 'image_id', 'user_id', 'folder_id').where('user_id', user_id).andWhere('folder_id', null).andWhere('isdeleted', false);
};
exports.fetchAllParent = fetchAllParent;
/**
 * The function fetches all nested folders belonging to a specific user within a parent folder.
 * @param {number} user_id - The `user_id` parameter is a number that represents the unique identifier
 * of the user for whom we want to fetch nested folders.
 * @param {number} parentFolderId - The `parentFolderId` parameter represents the ID of the parent
 * folder for which you want to fetch all nested folders. This function will retrieve all folders that
 * are nested within the specified parent folder ID for a given user ID.
 * @returns The function `fetchAllNested` returns a Promise that resolves to an array of `FolderModel`
 * objects. Each `FolderModel` object contains the properties `id`, `name`, `image_id`, `user_id`, and
 * `folder_id`. The folders are filtered based on the `user_id`, `parentFolderId`, and `isdeleted`
 * conditions specified in the `knex` query.
 */
const fetchAllNested = async (user_id, parentFolderId) => {
    return await (0, knex_config_1.default)('folders').select('id', 'name', 'image_id', 'user_id', 'folder_id').where('user_id', user_id).andWhere('folder_id', parentFolderId).andWhere('isdeleted', false);
};
exports.fetchAllNested = fetchAllNested;
/**
 * This TypeScript function fetches a folder by its ID from a database table called 'folders' while
 * ensuring it is not marked as deleted.
 * @param {number} folderId - The `folderId` parameter is a number that represents the unique
 * identifier of a folder in the database. The function `fetchById` is an asynchronous function that
 * retrieves folder information based on the provided `folderId`. It uses the `knex` library to
 * interact with the database and fetches the
 * @returns The `fetchById` function is returning a Promise that resolves to a `FolderModel` object.
 * The function queries the database table 'folders' to select specific columns ('id', 'name',
 * 'image_id', 'user_id', 'folder_id') based on the provided `folderId`. It also includes a condition
 * to only select rows where the 'isdeleted' column is false. The `
 */
const fetchById = async (folderId) => {
    return await (0, knex_config_1.default)('folders').select('id', 'name', 'image_id', 'user_id', 'folder_id').where('id', folderId).andWhere('isdeleted', false).first();
};
exports.fetchById = fetchById;
/**
 * This function fetches all folder models by folder ID asynchronously.
 * @param {number} folderId - The `folderId` parameter is a number that represents the unique
 * identifier of a folder.
 * @returns An array of `FolderModel` objects that match the provided `folderId` from the `folders`
 * table in the database.
 */
const fetchAllByFolderId = async (folderId) => {
    return await (0, knex_config_1.default)('folders').where('folder_id ', folderId);
};
exports.fetchAllByFolderId = fetchAllByFolderId;
/**
 * The function creates a new folder record in a database table and returns the ID of the newly created
 * folder.
 * @param {FolderModel} folderData - `folderData` is an object of type `FolderModel` containing data
 * for creating a new folder.
 * @returns The function `create` is returning an object with a property `folder_Id` that contains the
 * id of the newly inserted folder in the database.
 */
const create = async (folderData) => {
    const folder = await (0, knex_config_1.default)('folders').insert(folderData).returning('id');
    return { folder_Id: folder[0].id };
};
exports.create = create;
/**
 * The function `update` updates a folder name in the database with the provided folder data based on
 * the folder ID.
 * @param {FolderModel} folderData - FolderModel - an object containing data to update a folder in the
 * database
 * @param {number} folderId - The `folderId` parameter is the unique identifier of the folder that you
 * want to update in the database. It is used to locate the specific folder record in the `folders`
 * table for the update operation.
 * @returns The `update` function is returning a Promise that resolves to an object with the `id`
 * property of type number.
 */
const update = async (folderData, folderId) => {
    return await (0, knex_config_1.default)('folders').where('id', folderId).update(folderData);
};
exports.update = update;
/**
 * The function `remove` updates the `isdeleted` field of a folder with the specified `folderId` to
 * true in a database table called `folders`.
 * @param {number} folderId - The `folderId` parameter is a number that represents the unique
 * identifier of the folder that you want to mark as deleted in the database.
 * @returns The `remove` function is returning a promise that resolves to the result of updating the
 * `isdeleted` field to `true` in the `folders` table where the `id` matches the `folderId` provided as
 * an argument.
 */
const remove = async (folderId) => {
    return await (0, knex_config_1.default)('folders').where('id', folderId).update('isdeleted', true);
};
exports.remove = remove;
/**
 * The function sorts folders by a specified criteria for a given user and folder.
 * @param {string} sortBy - The `sortBy` parameter is a string that specifies the column by which the
 * results should be sorted.
 * @param {number} userId - The `userId` parameter represents the unique identifier of the user for
 * whom the folders are being sorted.
 * @param {number} folderId - The `folderId` parameter represents the unique identifier of the folder
 * that you want to sort.
 * @param {string} sortOrder - The `sortOrder` parameter in the `sortBy` function determines the order
 * in which the results should be sorted. It can have two possible values: "asc" for ascending order or
 * "desc" for descending order. This parameter specifies whether the results should be sorted in
 * ascending or descending order based on
 * @returns The function `sortBy` is returning a promise that resolves to the result of a database
 * query using Knex. The query is sorting records from the 'folders' table based on the `sortBy`
 * parameter in the specified `sortOrder`. It filters the results based on the `userId`, `folderId`,
 * and `isdeleted` conditions.
 */
const sortBy = async (sortBy, userId, folderId, sortOrder) => {
    return await (0, knex_config_1.default)('folders').orderBy(sortBy, sortOrder).where('user_id', userId).andWhere('isdeleted', false).andWhere('folder_id', folderId);
};
exports.sortBy = sortBy;
