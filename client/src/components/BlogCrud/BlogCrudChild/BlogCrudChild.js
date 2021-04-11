import './BlogCrudChild.css';

const BlogCrudChild = ({
    state, onSubmitHandler, onChangeHandler, drawImage
}) => {
    return (
        <section className="main-blog-crud">
            <h2 className="main-blog-crud-heading">Write a blog</h2>
            <p className="error-message">{state.summary}</p>
            <form className="main-blog-crud-form"
                onSubmit={onSubmitHandler}>
                <label htmlFor="title">Title</label>
                <input id="title"
                    name="title"
                    type="text"
                    className="main-blog-crud-form-focus"
                    value={state.title}
                    onChange={onChangeHandler}
                />
                <span className="error-message">{state.TitleValidation}</span>

                <label htmlFor="description">Description</label>
                <input id="description"
                    name="description"
                    type="text"
                    className="main-blog-crud-form-focus"
                    value={state.description}
                    onChange={onChangeHandler}
                />
                <span className="error-message">{state.DescriptionValidation}</span>

                <article className="main-blog-crud-form-upload-image-wrapper">
                    <article className="main-blog-crud-form-upload-image-label-wrapper">
                        <label htmlFor="image" className="main-blog-crud-form-upload-image-label">
                            <img src="/image-icon.svg" />
                            <span>Upload image</span>
                        </label>
                        <input id="image"
                            name="image"
                            type="file"
                            onInput={drawImage}
                        />
                    </article>
                    <img src={state.imageSrc} alt=""
                        className="main-blog-crud-form-upload-image" />
                </article>
                <span className="error-message">{state.ImageValidation + " " + state.ImageUrlValidation}</span>

                <label htmlFor="content">Main content</label>
                <textarea id="content"
                    name="content"
                    type="file"
                    className="main-blog-crud-form-focus"
                    value={state.content}
                    onChange={onChangeHandler}
                />
                <span className="error-message">{state.ContentValidation}</span>

                <input type="submit" value="Write" />
            </form>
        </section>
    );
}

export default BlogCrudChild;