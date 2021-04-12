import {post, get, remove, put} from '../data/requester';
import { CLOUDINARY_ASSET, CLOUDINARY_URL } from '../global/constants';

const _BLOG = "https://localhost:5001/Blog/";

const createBlog = async (title, description, image, content, authorId) => {
    let imageUrl = "";
    if (image && image.constructor === File) {
        let response = await _uploadImageAsync(image);
        imageUrl = response.secure_url;
    }

    return post(_BLOG + "Create", {title, description, imageUrl, content, authorId});
}

const editBlog = async (title, description, image, imageUrl, content, blogId) => {
    if (image && image.constructor === File) {
        let response = await _uploadImageAsync(image);
        imageUrl = response.secure_url;
    }

    return put(_BLOG + "Edit/" + blogId, {title, description, imageUrl, content});
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

export { createBlog, getAllByAuthor, getAllCut, deleteBlog, getBlog, editBlog };