import {post} from '../data/requester';
import { CLOUDINARY_ASSET, CLOUDINARY_URL } from '../global/constants';

const _BLOG = "https://localhost:5001/Blog/";

const createBlog = async (title, description, image, content) => {
    let imageUrl = "";
    if (image && image.constructor === File) {
        let response = await _uploadImageAsync(image);
        imageUrl = response.secure_url;
    }

    let authorId = JSON.parse(localStorage.getItem('user')).id;
    return post(_BLOG + "Create", {title, description, imageUrl, content, authorId});
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

export { createBlog }