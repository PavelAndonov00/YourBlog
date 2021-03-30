import React from 'react';

import './WriteBlog.css';

const WriteBlog = () => {
    var canvas = React.createRef();
    const drawImage = (ev) => {
        if (ev.target.files.length === 0) return;
        
        var ctx = canvas.current.getContext('2d');
        var image = new Image();
        image.addEventListener(
            "load",
            function () {
                ctx.drawImage(image, 0, 0, 250, 200);
            },
            false
        );
        image.src = URL.createObjectURL(ev.target.files[0]);
    }

    return (
        <section className="main-blog-crud">
            <h2 className="main-blog-crud-heading">Write a blog</h2>
            <form className="main-blog-crud-form">
                <label htmlFor="title">Title</label>
                <input id="title"
                    name="title"
                    type="text"
                    className="main-blog-crud-form-focus" />

                <label htmlFor="description">Description</label>
                <input id="description"
                    name="description"
                    type="text"
                    className="main-blog-crud-form-focus" />

                <article className="main-blog-crud-form-upload-image-wrapper">
                    <article className="main-blog-crud-form-upload-image-label-wrapper">
                        <label htmlFor="image" className="main-blog-crud-form-upload-image-label">
                            <img src="/image-icon.svg" alt="Image" />
                            <span>Upload image</span>
                        </label>
                        <input id="image"
                            name="image"
                            type="file"
                            onInput={drawImage} />
                    </article>
                    <canvas ref={canvas}
                        className="main-blog-crud-form-upload-image-canvas" />
                </article>

                <label htmlFor="content">Main content</label>
                <textarea id="content"
                    name="content"
                    type="file"
                    className="main-blog-crud-form-focus" />

                <input type="submit" value="Write" />
            </form>
        </section>
    );
}

export default WriteBlog;