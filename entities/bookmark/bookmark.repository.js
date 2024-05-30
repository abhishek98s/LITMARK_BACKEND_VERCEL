"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRecentlyClickedBookmarksByTittle = exports.filterRecentlyClickedBookmarksByChip = exports.sortRecentlyClickedBookmarkBy = exports.removeRecentlyClickedBookmark = exports.updateClickedDate = exports.sortBy = exports.fetchByTitle = exports.removeByFolderid = exports.remove = exports.updateTitle = exports.create = exports.fetchByFolderId = exports.fetchAll = exports.fetchById = void 0;
const knex_config_1 = __importDefault(require("../../config/knex.config"));
/**
 * This TypeScript function fetches a bookmark by its ID from a database table, ensuring it is not
 * marked as deleted, and returns the bookmark model.
 * @param {number} bookmarkId - The `bookmarkId` parameter is the unique identifier of the bookmark
 * that you want to fetch from the database. It is used to query the database for a specific bookmark
 * based on its ID.
 * @returns The `fetchById` function is returning a Promise that resolves to a `BookmarkModel` object.
 * The function fetches a bookmark from the database based on the `bookmarkId`, ensuring that the
 * bookmark is not deleted (`isdeleted` is false). The retrieved bookmark data includes the fields:
 * 'id', 'url', 'image_id', 'user_id', 'folder_id', 'chip_id', 'title', 'date, 'date'
 */
const fetchById = async (bookmarkId) => {
    const bookmark = await (0, knex_config_1.default)('bookmarks').where('id', bookmarkId).andWhere('isdeleted', false).select('id', 'url', 'image_id', 'user_id', 'folder_id', 'chip_id', 'title', 'date');
    return bookmark[0];
};
exports.fetchById = fetchById;
/**
 * This TypeScript function fetches all bookmarks belonging to a specific user that are not marked as
 * deleted.
 * @param {number} user_id - The `user_id` parameter is a number that is used to filter bookmarks based
 * on the user who created them.
 * @returns The `fetchAll` function is returning a Promise that resolves to an array of `BookmarkModel`
 * objects. These objects contain properties such as `id`, `url`, `image_id`, `user_id`, `folder_id`,
 * `chip_id`, 'date' and `title`. The function fetches bookmarks from the database table `bookmarks` where the
 * `user_id` matches the provided `user_id` parameter
 */
const fetchAll = async (user_id) => {
    return await (0, knex_config_1.default)('bookmarks').select('id', 'url', 'image_id', 'user_id', 'folder_id', 'chip_id', 'title', 'date').where('user_id', user_id).andWhere('isdeleted', false);
};
exports.fetchAll = fetchAll;
/**
 * This TypeScript function fetches bookmarks by user ID and folder ID while excluding deleted
 * bookmarks.
 * @param {number} user_id - The `user_id` parameter is a number that represents the unique identifier
 * of the user whose bookmarks are being fetched.
 * @param {number} folder_id - The `folder_id` parameter in the `fetchByFolderId` function represents
 * the unique identifier of the folder for which you want to retrieve bookmarks. This function fetches
 * bookmarks from the database based on the `user_id` and `folder_id` provided as parameters.
 * @returns The `fetchByFolderId` function returns a Promise that resolves to an array of
 * `BookmarkModel` objects. Each `BookmarkModel` object contains the properties `id`, `url`,
 * `image_id`, `folder_id`, 'date' and `title`. The bookmarks are filtered based on the `user_id`,
 * `folder_id`, and `isdeleted` criteria specified in the query.
 */
const fetchByFolderId = async (user_id, folder_id) => {
    return await (0, knex_config_1.default)('bookmarks').select('id', 'url', 'image_id', 'folder_id', 'title', 'date').where('user_id', user_id).andWhere('folder_id', folder_id).andWhere('isdeleted', false);
};
exports.fetchByFolderId = fetchByFolderId;
/**
 * The function creates a new bookmark record in the database and returns the ID of the newly created
 * bookmark.
 * @param {BookmarkModel} bookmarkData - BookmarkModel is a type representing the data structure of a
 * bookmark. It likely includes properties such as title, url, description, and any other relevant
 * information about a bookmark.
 * @returns The `create` function is returning an object with a property `bookmarkId` that contains the
 * id of the newly inserted bookmark in the database.
 */
const create = async (bookmarkData) => {
    const bookmark = await (0, knex_config_1.default)('bookmarks').insert(bookmarkData).returning('id');
    return { bookmarkId: bookmark[0].id };
};
exports.create = create;
/**
 * The function `updateTitle` updates a bookmark's data in the database based on the provided bookmark
 * ID.
 * @param {BookmarkModel} bookmarkData - BookmarkModel - an object containing data to update for a
 * bookmark
 * @param {number} bookmarkId - The `bookmarkId` parameter is the unique identifier of the bookmark
 * that you want to update in the database. It is used to locate the specific bookmark record that
 * needs to be updated.
 * @returns The `updateTitle` function is returning a promise that resolves to the result of updating
 * the `bookmarks` table in the database with the provided `bookmarkData` for the bookmark identified
 * by `bookmarkId`.
 */
const updateTitle = async (bookmarkData, bookmarkId) => {
    return await (0, knex_config_1.default)('bookmarks').where('id', bookmarkId).update(bookmarkData);
};
exports.updateTitle = updateTitle;
/**
 * The function `remove` updates a bookmark record in the database based on the provided
 * `bookmarkData` object which is changed the isdeleted to true.
 * @param {BookmarkModel} bookmarkData - BookmarkModel
 * @returns The `remove` function is returning a promise that resolves to the result of updating the
 * `bookmarks` table in the database where the `id` matches the `id` of the `bookmarkData` object with
 * the values from the `bookmarkData` object which is to change the isdeleted to true.
 */
const remove = async (bookmarkData) => {
    return await (0, knex_config_1.default)('bookmarks').where('id', bookmarkData.id).update(bookmarkData);
};
exports.remove = remove;
/**
 * This function removes bookmarks by setting their 'isdeleted' flag to true based on the provided
 * folderId.
 * @param {number} folderId - The `folderId` parameter is a number that represents the unique
 * identifier of the folder for which you want to remove bookmarks.
 * @returns The function `removeByFolderid` is returning a Promise that resolves to the result of
 * updating the `isdeleted` field to `true` for all bookmarks in the `bookmarks` table where the
 * `folder_id` matches the provided `folderId`.
 */
const removeByFolderid = async (folderId) => {
    return await (0, knex_config_1.default)('bookmarks').where('folder_id', folderId).update('isdeleted', true);
};
exports.removeByFolderid = removeByFolderid;
/**
 * This function fetches bookmarks by title from a specific folder while ensuring they are not deleted.
 * @param {string} title - The `title` parameter is a string that represents the title of the bookmark
 * you want to search for in the database.
 * @param {number} folderId - The `folderId` parameter is the ID of the folder in which you want to
 * search for bookmarks with titles similar to the provided `title`.
 * @returns The function `fetchByTitle` is returning a Promise that resolves to an array of objects
 * containing the `title` and `url` of bookmarks that match the provided `title` (case-insensitive)
 * within a specific `folderId` where the `isdeleted` flag is set to false.
 */
const fetchByTitle = async (title, folderId) => {
    return await (0, knex_config_1.default)('bookmarks').select('title', 'url').whereRaw('LOWER(title) LIKE LOWER(?)', [`%${title}%`]).andWhere('isdeleted', false).andWhere('folder_id', folderId);
};
exports.fetchByTitle = fetchByTitle;
/**
 * This function sorts bookmarks by a specified criteria for a specific user and folder.
 * @param {string} sortBy - The `sortBy` parameter is a string that specifies the column by which the
 * bookmarks should be sorted.
 * @param {number} userId - The `userId` parameter is the unique identifier of the user for whom the
 * bookmarks are being retrieved.
 * @param {number} folder_id - The `folder_id` parameter represents the unique identifier of the folder
 * in which the bookmarks are stored. It is used to filter the bookmarks based on the specified folder.
 * @param {string} sortOrder - The `sortOrder` parameter specifies the order in which the results
 * should be sorted. It can have two possible values: "asc" for ascending order or "desc" for
 * descending order.
 * @returns The function `sortBy` is returning a promise that resolves to an array of bookmarks of objects
 * containing the 'id', 'url', 'image_id', 'folder_id', 'title', 'date'
 * selected from the database table 'bookmarks' based on the provided parameters such as `userId`,
 * `folder_id`, `sortBy`, and `sortOrder`. The bookmarks are filtered by the `user_id`, `isdeleted`,
 * and `folder_id` conditions and sorted based on the `sortBy` field in the specified `
 */
const sortBy = async (sortBy, userId, folder_id, sortOrder) => {
    return await (0, knex_config_1.default)('bookmarks').select('id', 'url', 'image_id', 'folder_id', 'title', 'date').where('user_id', userId).andWhere('isdeleted', false).andWhere('folder_id', folder_id).orderBy(sortBy, sortOrder);
};
exports.sortBy = sortBy;
/**
 * The function `updateClickedDate` updates a bookmark's data in the database based on the provided
 * `bookmarkData` object.
 * @param {BookmarkModel} bookmarkData - BookmarkModel is an object containing data related to a
 * bookmark, such as id, title, url, and any other relevant information.
 * @returns The `updateClickedDate` function is returning a Promise that resolves to the result of
 * updating the `bookmarkData` in the `bookmarks` table where the `id` matches the `bookmarkData.id`.
 */
const updateClickedDate = async (bookmarkData) => {
    return await (0, knex_config_1.default)('bookmarks').update(bookmarkData).where('id', bookmarkData.id);
};
exports.updateClickedDate = updateClickedDate;
/**
 * The function `removeRecentlyClickedBookmark` updates a bookmark attribute date to null in the database based on the user ID
 * and bookmark ID.
 * @param {BookmarkModel} bookmarkData - BookmarkModel is an object containing data about a bookmark,
 * such as id, title, url, and any other relevant information.
 * @param {number} user_id - The `user_id` parameter is the unique identifier of the user whose
 * bookmark you want to update or remove.
 * @returns a promise that updates the bookmark date attribute in the database table 'bookmarks' for a specific
 * user based on the user_id and bookmark id provided.
 */
const removeRecentlyClickedBookmark = async (bookmarkData, user_id) => {
    return await (0, knex_config_1.default)('bookmarks').update(bookmarkData).where('user_id', user_id).andWhere('id', bookmarkData.id);
};
exports.removeRecentlyClickedBookmark = removeRecentlyClickedBookmark;
/**
 * This function sorts recently clicked bookmarks by a specified criteria for a given user.
 * @param {string} sortBy - The `sortBy` parameter is the field by which you want to sort the recently
 * clicked bookmarks. It could be any field present in the `bookmarks` table, such as `id`, `url`,
 * `image_id`, `folder_id`, `title`, or `date`.
 * @param {number} userId - The `userId` parameter is the unique identifier of the user whose bookmarks
 * you want to sort.
 * @param {string} sortOrder - The `sortOrder` parameter specifies the order in which the bookmarks
 * should be sorted. It can have two possible values: "asc" for ascending order or "desc" for
 * descending order. This parameter determines whether the bookmarks will be sorted in increasing or
 * decreasing order based on the specified `sortBy` parameter
 * @returns The function `sortRecentlyClickedBookmarkBy` is returning a promise that resolves to the
 * result of a database query using Knex. The query selects specific columns ('id', 'url', 'image_id',
 * 'folder_id', 'title', 'date') from the 'bookmarks' table where the 'user_id' matches the provided
 * userId, 'isdeleted' is false, and 'click_date
 */
const sortRecentlyClickedBookmarkBy = async (sortBy, userId, sortOrder) => {
    return await (0, knex_config_1.default)('bookmarks').select('id', 'url', 'image_id', 'folder_id', 'title', 'date').where('user_id', userId).andWhere('isdeleted', false).andWhereNot('click_date', null).orderBy(sortBy, sortOrder);
};
exports.sortRecentlyClickedBookmarkBy = sortRecentlyClickedBookmarkBy;
/**
 * This function filters recently clicked bookmarks by user ID and chip ID while excluding deleted
 * bookmarks and those without a click date.
 * @param {number} userId - The `userId` parameter is the unique identifier of the user whose bookmarks
 * you want to filter.
 * @param {number} chipId - The `chipId` parameter is used to filter the bookmarks based on a specific
 * category or tag associated with them. It helps in retrieving bookmarks that are tagged with a
 * particular chip or category.
 * @returns The function `filterRecentlyClickedBookmarksByChip` is returning a Promise that resolves to
 * an array of bookmark objects that match the specified `userId`, `chipId`, and other conditions. Each
 * bookmark object in the array contains the properties: 'id', 'url', 'image_id', 'folder_id', 'title',
 * and 'date'.
 */
const filterRecentlyClickedBookmarksByChip = async (userId, chipId) => {
    return await (0, knex_config_1.default)('bookmarks').select('id', 'url', 'image_id', 'folder_id', 'title', 'date').where('user_id', userId).where('chip_id', chipId).andWhere('isdeleted', false).andWhereNot('click_date', null);
};
exports.filterRecentlyClickedBookmarksByChip = filterRecentlyClickedBookmarksByChip;
/**
 * This function fetches recently clicked bookmarks by title from a database table while filtering out
 * deleted bookmarks.
 * @param {string} title - The `fetchRecentlyClickedBookmarksByTittle` function is designed to fetch
 * recently clicked bookmarks based on a provided title. The function takes a `title` parameter of type
 * string, which is used to filter bookmarks whose titles contain the provided string. The function
 * then queries the database to select the `
 * @returns The function `fetchRecentlyClickedBookmarksByTittle` is returning a Promise that resolves
 * to an array of objects containing the `title` and `url` of bookmarks from the database table
 * `bookmarks` where the `title` matches the provided input `title` (case-insensitive search),
 * `isdeleted` is false, and `click_date` is not null.
 */
const fetchRecentlyClickedBookmarksByTittle = async (title) => {
    return await (0, knex_config_1.default)('bookmarks').select('title', 'url').whereRaw('LOWER(title) LIKE LOWER(?)', [`%${title}%`]).andWhere('isdeleted', false).andWhereNot('click_date', null);
};
exports.fetchRecentlyClickedBookmarksByTittle = fetchRecentlyClickedBookmarksByTittle;
