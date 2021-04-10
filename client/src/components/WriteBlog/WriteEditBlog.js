import React, { Component } from 'react';

import './WriteEditBlog.css';
import { createBlog } from '../../services/blogService';
import { PHOTO_GOES_HERE_URL, PROHIBIT_IMAGE_URL } from '../../global/constants';
import Context from '../../contexts/context';

class WriteEditBlog extends Component {
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
            ImageUrlValidation: "",
            TitleValidation: "",
            DescriptionValidation: "",
            ContentValidation: "",
        };

        this.errors = {
            imageValidationMessage: "File not allowed!",
            ImageUrl: "Not valid url.",
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
                ImageValidation
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

        if(this.state.image && this.state.image.constructor === File) {
            validation.ImageUrlValidation = "";
        }else{
            validation.ImageUrlValidation = this.errors.ImageUrl;
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
            <section className="main-blog-crud">
                <h2 className="main-blog-crud-heading">Write a blog</h2>
                <p className="error-message">{this.state.summary}</p>
                <form className="main-blog-crud-form"
                    onSubmit={this.onSubmit}>
                    <label htmlFor="title">Title</label>
                    <input id="title"
                        name="title"
                        type="text"
                        className="main-blog-crud-form-focus"
                        value={this.state.title}
                        onChange={this.onChangeHandler}
                    />
                    <span className="error-message">{this.state.TitleValidation}</span>

                    <label htmlFor="description">Description</label>
                    <input id="description"
                        name="description"
                        type="text"
                        className="main-blog-crud-form-focus"
                        value={this.state.description}
                        onChange={this.onChangeHandler}
                    />
                    <span className="error-message">{this.state.DescriptionValidation}</span>

                    <article className="main-blog-crud-form-upload-image-wrapper">
                        <article className="main-blog-crud-form-upload-image-label-wrapper">
                            <label htmlFor="image" className="main-blog-crud-form-upload-image-label">
                                <img src="/image-icon.svg" />
                                <span>Upload image</span>
                            </label>
                            <input id="image"
                                name="image"
                                type="file"
                                onInput={this.drawImage}
                            />
                        </article>
                        <img src={this.state.imageSrc} alt=""
                            className="main-blog-crud-form-upload-image" />
                    </article>
                    <span className="error-message">{this.state.ImageValidation + " " + this.state.ImageUrlValidation}</span>

                    <label htmlFor="content">Main content</label>
                    <textarea id="content"
                        name="content"
                        type="file"
                        className="main-blog-crud-form-focus"
                        value={this.state.content}
                        onChange={this.onChangeHandler}
                    />
                    <span className="error-message">{this.state.ContentValidation}</span>

                    <input type="submit" value="Write" />
                </form>
            </section>
        );
    }
}

export default WriteEditBlog;