import React, { Component } from 'react';

import './BlogCrud.css';
import { createBlog, getBlog, editBlog, deleteBlog } from '../../services/blogService';
import { PHOTO_GOES_HERE_URL, PROHIBIT_IMAGE_URL } from '../../global/constants';
import Context from '../../contexts/context';
import BlogCrudChild from './BlogCrudChild';

class BlogCrud extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            heading: "Write a blog",
            buttonValue: "Write",
            summary: "",
            title: "",
            description: "",
            image: {},
            imageUrl: PHOTO_GOES_HERE_URL,
            content: "",
            ImageValidation: "",
            ImageUrlValidation: "",
            TitleValidation: "",
            DescriptionValidation: "",
            ContentValidation: "",
        };

        this.errors = {
            imageValidationMessage: "File not allowed!",
            imageRequired: "Image is required",
            // Require capital letters, for errors returned from server 
            ImageUrl: "Not valid url.",
            Title: "Title length must be between 10 and 100",
            Description: "Description length must be between 10 and 200",
            Content: "Content length must be between 50 and 2000",
        };

        this.allowedExtensions = ['jpg', 'jpeg', 'gif', 'tiff', 'psd', 'pdf', 'eps', 'ai', 'png', 'svg'];
    }

    async componentDidMount() {
        let user = JSON.parse(localStorage.getItem("user"));
        let path = this.props.match.path;
        let blogId = this.props.match.params.id;
        try {
            if (path === "/blogs/:id/edit") {
                let blog = await getBlog(blogId);
                this.setStateCustom({ heading: "Edit blog", image: { fake: "To not display error" }, buttonValue: "Edit", ...blog });
            } else if (path === "/blogs/:id/delete") {
                let result = await deleteBlog(blogId);
                if (result.success) {
                    debugger
                    if(user.role == "Admin"){
                        this.props.history.push("/");
                    } else {
                        this.props.history.goBack();
                    }
                    this.context.setMessage(result.message);
                }
                return;
            }
        } catch (e) {
            console.log(e);
        }
    }

    drawImage = (ev) => {
        if (ev.target.files.length === 0) return;

        let ImageValidation = "";
        let image = ev.target.files[0];
        let extension = image.name.split('.').pop();
        if (this.allowedExtensions.includes(extension)) {
            let imageUrl = URL.createObjectURL(image);
            this.setStateCustom({
                imageUrl,
                image,
                ImageValidation,
                ImageUrlValidation: ""
            });
        } else {
            ImageValidation = this.errors.imageValidationMessage;
            this.setStateCustom({
                imageUrl: PROHIBIT_IMAGE_URL,
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

        if (this.state.image.__proto__.__proto__ != null || this.state.image.fake) {
            validation.ImageUrlValidation = "";
        } else {
            validation.ImageUrlValidation = this.errors.imageRequired;
        }

        if (Object.values(validation).filter(v => v != "").length === 0) {
            try {
                let result = {};
                let user = JSON.parse(localStorage.getItem("user"));
                var operation = "create";
                if (this.props.match.path === "/blogs/:id/edit") {
                    operation = "edit";
                    result = await editBlog(
                        this.state.title,
                        this.state.description,
                        this.state.image,
                        this.state.imageUrl,
                        this.state.content,
                        this.props.match.params.id
                    );
                } else {
                    result = await createBlog(
                        this.state.title,
                        this.state.description,
                        this.state.image,
                        this.state.content,
                        user?.id
                    );
                }

                if (result.errors) {
                    Object.keys(result.errors)
                        .forEach(k => validation[k + "Validation"] = this.errors[k]);
                } else if (result.error) {
                    validation.summary = result.error;
                } else if (result.success) {
                    if (operation == "edit") {
                        this.props.history.goBack();
                    }else{
                        this.props.history.push(`/${user.userName}/blogs`);
                    }
                    this.context.setMessage(result.message);
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