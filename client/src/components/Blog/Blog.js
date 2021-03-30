import './Blog.css';

const Blog = () => {
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
                <h3 className="blog-article-heading truncate">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sint, labore dignissimos quo eos eum natus esse ullam error numquam veritatis culpa nihil nulla, fugit minus placeat non sequi recusandae!</h3>
                <p className="blog-article-description truncate">Description Description Description 123 Description Description Description 123 Description Description Description 123</p>
                <article className="blog-article-author-info">
                    <p className="blog-article-createdat">{day + " in " + time}</p>
                    <p className="blog-article-author truncate">by Author Author Author Author Author Author</p>
                </article>
            </article>
            <article className="blog-article-image-wrapper">
                <img className="blog-article-image"
                    src="/logo192.png"
                    alt="" />
            </article>
        </article>
    );
}

export default Blog;