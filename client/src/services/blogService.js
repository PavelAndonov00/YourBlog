import {post, get, remove, put} from '../data/requester';
import { CLOUDINARY_ASSET, CLOUDINARY_URL } from '../global/constants';

const _BLOG = "https://localhost:5001/Blog/";

const createBlog = async (title, description, image, content, authorId) => {
    let imageUrl = "";
    let imagePublicId = "";
    if (image && image.constructor === File) {
        let response = await _uploadImageAsync(image);
        imageUrl = response.secure_url;
        imagePublicId = response.public_id;
    }

    return post(_BLOG + "Create", {title, description, imageUrl, imagePublicId, content, authorId});
}

const editBlog = async (title, description, image, imageUrl, content, blogId) => {
    let imagePublicId = "";
    if (image && image.constructor === File) {
        let response = await _uploadImageAsync(image);
        imageUrl = response.secure_url;
        imagePublicId = response.public_id;
    }

    return put(_BLOG + "Edit/" + blogId, {title, description, imageUrl, imagePublicId, content});
}

const deleteBlog = async (id) => {
    return remove(_BLOG + "Delete/" + id);
}

const getBlog = async (id) => {
    return get(_BLOG + "Get/" + id);
}

const getAllByAuthor = async (username) => {
    return get(_BLOG + "GetAll/" + username);
}

const getAllCut = async (offset, count, userId) => {
    let url = new URL(_BLOG + "GetAllCut/" + userId);
    url.searchParams.append('offset', offset);
    url.searchParams.append('count', count);
    return get(url);
}

const likeUnlikeBlog = async (blogId, userId) => {
    let url = new URL(_BLOG + "LikeUnlikeBlog");

    return post(url, {blogId, userId});
}

const isLikedByUser = async (blogId, userId) => {
    let url = new URL(_BLOG + "IsLikedByUser");

    return post(url, {blogId, userId});
}

const addComment = async(blogId, userId, comment) => {
    let url = new URL(_BLOG + "AddComment");

    return post(url, {blogId, userId, comment});
}

const getComments = async(blogId) => {
    let url = new URL(_BLOG + "Comments/" + blogId);

    return get(url);
}

// Private

const _uploadImageAsync = async (image) => {
    let formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', CLOUDINARY_ASSET);
    let response = await fetch(CLOUDINARY_URL, {
        method: 'post',
        body: formData
    });

    return response.json();
}

export { createBlog, getAllByAuthor, getAllCut, deleteBlog, getBlog, editBlog, likeUnlikeBlog, isLikedByUser, addComment, getComments };