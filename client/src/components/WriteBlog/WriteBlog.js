import './WriteBlog.css';

const WriteBlog = () => {
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

                <label htmlFor="image" className="main-blog-crud-form-upload-image-label">
                    <img src="../../image-icon.svg" alt="Image" />
                    <span>Upload image</span>
                </label>
                <input id="image"
                    name="image"
                    type="file" />

                <label htmlFor="content">Main content</label>
                <textarea id="content"
                    name="content"
                    type="file"
                    className="main-blog-crud-form-focus" />

                <input type="submit" value="Create" />
            </form>
        </section>
    );
}

export default WriteBlog;