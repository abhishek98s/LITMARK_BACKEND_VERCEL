"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedFolders = exports.deleteFolders = exports.patchFolders = exports.postFolders = exports.getAllnestedFolders = exports.getAllTopFolders = void 0;
const folder_service_1 = require("./folder.service");
const image_controller_1 = require("../image/image.controller");
const image_service_1 = require("../image/image.service");
const folderExceptionMessages_1 = require("./constant/folderExceptionMessages");
const crypto_1 = __importDefault(require("crypto"));
const isImage = async (username) => {
    try {
        await (0, image_service_1.findImage)(1);
        return 1;
    }
    catch (error) {
        const imageName = crypto_1.default.randomUUID();
        const image = await (0, image_service_1.saveImage)({ type: 'folder', url: 'https://res.cloudinary.com/dxsqdqnoe/image/upload/v1709878273/litmark/xo5sncdhybhemuvacf4u.png', name: imageName, isdeleted: false }, username);
        return image.id;
    }
};
/**
 * The function `getAllFolders` is an asynchronous function that retrieves all folders and sends the
 * result as a JSON response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It contains methods and properties that allow you to set the response
 * status, headers, and body. In this code snippet, it is used to send a JSON response with the status
 * code 200
 */
const getAllTopFolders = async (req, res) => {
    try {
        const result = await (0, folder_service_1.findAllFolders)(req.body.user.id);
        res.status(200).json({ status: true, data: result });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
exports.getAllTopFolders = getAllTopFolders;
/**
 * The function `getAllnestedFolders` retrieves all nested folders for a given parent folder ID and
 * returns the result in a JSON response.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `getAllnestedFolders` function is an object
 * representing the HTTP response that the function will send back to the client. It is of type
 * `Response`, which is typically provided by web frameworks like Express in Node.js. The `res` object
 * has methods like `status
 */
const getAllnestedFolders = async (req, res) => {
    try {
        const parentFolderId = parseInt(req.params.id);
        const result = await (0, folder_service_1.findAllNestedFolders)(req.body.user.id, parentFolderId);
        res.status(200).json({ status: true, data: result });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
exports.getAllnestedFolders = getAllnestedFolders;
/**
 * The `postFolders` function is an asynchronous function that handles the creation of folders,
 * including uploading an image if provided, and returns the result as a JSON response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */
const postFolders = async (req, res) => {
    try {
        const { name, folder_id, user } = req.body;
        if (!name) {
            throw new Error(folderExceptionMessages_1.folderExceptionMessages.NAME_REQUIRED);
        }
        if (req.file) {
            const imagePath = req.file.path;
            const imageUrl = await (0, image_controller_1.uploadImage)(imagePath);
            const image = await (0, image_service_1.saveImage)({ url: imageUrl, type: 'folder', name: req.file.filename, isdeleted: false }, user.username);
            req.body.image_id = image.id;
        }
        const folderData = {
            name,
            user_id: user.id,
            image_id: await isImage(user.username),
            folder_id: folder_id || null,
            isdeleted: false,
            created_by: user.username,
            updated_by: user.username,
        };
        const result = await (0, folder_service_1.addFolders)(folderData);
        res.status(200).json({ status: true, data: result });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
exports.postFolders = postFolders;
/**
 * The function `patchFolders` is an asynchronous function that handles the patch request for updating
 * a folder's name and image.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant details.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */
const patchFolders = async (req, res) => {
    try {
        const folderId = parseInt(req.params.id);
        if (!folderId)
            throw new Error(folderExceptionMessages_1.folderExceptionMessages.INVALID_ID);
        const { name, user } = req.body;
        if (!name) {
            throw new Error(folderExceptionMessages_1.folderExceptionMessages.NAME_REQUIRED);
        }
        if (req.file) {
            const imagePath = req.file.path;
            const imageUrl = await (0, image_controller_1.uploadImage)(imagePath);
            const image = await (0, image_service_1.saveImage)({ url: imageUrl, type: 'user', name: req.file.filename, isdeleted: false }, user.username);
            req.body.image_id = image.id;
        }
        const currentFolder = await (0, folder_service_1.findFolderById)(folderId);
        const { image_id: curretImage } = currentFolder;
        const folderData = {
            ...currentFolder,
            name,
            image_id: req.body.image_id || curretImage,
            updated_by: user.username,
        };
        const result = await (0, folder_service_1.updateFolder)(folderData, folderId);
        res.status(200).json({ status: true, data: result });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
exports.patchFolders = patchFolders;
/**
 * The function `deleteFolders` is an asynchronous function that handles the deletion of folders by
 * taking a request and response object as parameters.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 */
const deleteFolders = async (req, res) => {
    try {
        const folderId = parseInt(req.params.id);
        if (!folderId)
            throw new Error(folderExceptionMessages_1.folderExceptionMessages.INVALID_ID);
        await (0, folder_service_1.removeFolder)(folderId);
        res.status(200).json({ status: true, data: 'Folder deleted sucessfully' });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
exports.deleteFolders = deleteFolders;
/**
 * The function `getSortedFolders` sorts folders based on a specified criteria and returns the sorted
 * data in ascending or descending order.
 * @param {Request} req - The `req` parameter in the `getSortedFolders` function represents the
 * incoming request to the server. It contains information such as the request method, request headers,
 * request body, request parameters, query parameters, and more. In this specific function, `req` is of
 * type `Request`, which
 * @param {Response} res - The `res` parameter in the `getSortedFolders` function is the response
 * object that will be used to send a response back to the client making the request. It is an instance
 * of the `Response` class from the Express.js framework. This object allows you to send HTTP responses
 * with data back
 */
const getSortedFolders = async (req, res) => {
    try {
        const sortBy = req.query.sort;
        const folder_id = req.query.folder_id;
        const sortOrder = req.query.order || 'asc';
        const { user } = req.body;
        let result;
        switch (sortBy) {
            case 'date':
                result = await (0, folder_service_1.sortByDate)(user.id, folder_id, sortOrder);
                break;
            case 'alphabet':
                result = await (0, folder_service_1.sortByAlphabet)(user.id, folder_id, sortOrder);
                break;
            default:
                new Error(folderExceptionMessages_1.folderExceptionMessages.INVALID_DATA);
                break;
        }
        res.status(200).json({ status: true, data: result });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
exports.getSortedFolders = getSortedFolders;
