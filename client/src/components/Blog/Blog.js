import './Blog.css';

const Blog = (
    {title, description, imageUrl, author, createdAt}
) => {
    var date = new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var day = months[date.getMonth()] + " " + date.getDate();
    var time = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');

    const onclick = () => {
        console.log("MY func");
    };

    return (
        <article className="blog-article" onClick={onclick}>
            <article className="blog-article-content">
                <h3 className="blog-article-heading truncate">{title}</h3>
                <p className="blog-article-description truncate">{description}</p>
                <article className="blog-article-author-info">
                    <p className="blog-article-createdat">{createdAt}</p>
                    <p className="blog-article-author truncate">{author}</p>
                </article>
            </article>
            <article className="blog-article-image-wrapper">
                <img className="blog-article-image"
                    src={imageUrl}
                    alt="" />
            </article>
        </article>
    );
}

export default Blog;