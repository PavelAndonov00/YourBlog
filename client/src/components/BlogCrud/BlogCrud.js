import React, { Component } from 'react';

import './BlogCrud.css';
import { createBlog } from '../../services/blogService';
import { PHOTO_GOES_HERE_URL, PROHIBIT_IMAGE_URL } from '../../global/constants';
import Context from '../../contexts/context';
import BlogCrudChild from './BlogCrudChild';

class BlogCrud extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);

        this.state = {
            summary: "",
            title: "",
            description: "",
            image: {},
            imageSrc: PHOTO_GOES_HERE_URL,
            content: "",
            ImageValidation: "",
            ImageSrcValidation: "",
            TitleValidation: "",
            DescriptionValidation: "",
            ContentValidation: "",
        };

        this.errors = {
            imageValidationMessage: "File not allowed!",
            imageRequired: "Image is required",
            // Require capital letters, for errors returned from server 
            ImageSrc: "Not valid url.",
            Title: "Title length must be between 10 and 100",
            Description: "Description length must be between 10 and 200",
            Content: "Title length must be between 50 and 2000",
        };

        this.allowedExtensions = ['jpg', 'jpeg', 'gif', 'tiff', 'psd', 'pdf', 'eps', 'ai'];
    }

    drawImage = (ev) => {
        if (ev.target.files.length === 0) return;

        let ImageValidation = "";
        let image = ev.target.files[0];
        let extension = image.name.split('.').pop();
        if (this.allowedExtensions.includes(extension)) {
            let imageSrc = URL.createObjectURL(image);
            this.setStateCustom({
                imageSrc,
                image,
                ImageValidation,
                ImageSrcValidation: ""
            });
        } else {
            ImageValidation = this.errors.imageValidationMessage;
            this.setStateCustom({
                imageSrc: PROHIBIT_IMAGE_URL,
                ImageValidation
            });
        }
    }

    onSubmit = async (ev) => {
        ev.preventDefault();

        let validation = {};

        if (this.state.title.length < 10) {
            validation.TitleValidation = this.errors.Title;
        } else {
            validation.TitleValidation = "";
        }

        if (this.state.description.length < 10) {
            validation.DescriptionValidation = this.errors.Description;
        } else {
            validation.DescriptionValidation = "";
        }

        if (this.state.content.length < 50) {
            validation.ContentValidation = this.errors.Content;
        } else {
            validation.ContentValidation = "";
        }

        if (this.state.image && this.state.image.constructor === File) {
            validation.ImageSrcValidation = "";
        } else {
            validation.ImageSrcValidation = this.errors.imageRequired;
        }

        if (!Object.values(validation).find(v => v != false)) {
            try {
                let result = await createBlog(
                    this.state.title,
                    this.state.description,
                    this.state.image,
                    this.state.content
                );

                if (result.errors) {
                    Object.keys(result.errors)
                        .forEach(k => validation[k + "Validation"] = this.errors[k]);
                } else if (result.error) {
                    validation.summary = result.error;
                } else if (result.success) {
                    this.UNSAFE_componentWillReceivePropscontext.setMessage(result.message);
                    // this.props.history.push("/profile/settings")
                }
            } catch (error) {
                console.log(error);
            }
        }

        this.setStateCustom(validation);
    }

    onChangeHandler = (ev) => {
        let { name, value } = ev.target;
        this.setStateCustom(
            { [name]: value }
        );
    }

    setStateCustom(data) {
        this.setState(oldState => {
            return {
                ...oldState,
                ...data
            }
        });
    }

    render() {
        return (
            <BlogCrudChild
                state={this.state}
                onSubmitHandler={this.onSubmit}
                onChangeHandler={this.onChangeHandler}
                drawImage={this.drawImage}
            />
        );
    }
}

export default BlogCrud;