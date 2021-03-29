import './Blog.css';

const Blog = () => {
    var date = new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var day = months[date.getMonth()] + " " + date.getDate();
    var time = date.getHours() + ":" + date.getMinutes();

    const onclick = () => {
        console.log("MY func");
    };

    return (
        <article className="main-blog-article" onClick={onclick}>
            <article className="main-blog-article-content">
                <h3 className="main-blog-article-heading truncate">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sint, labore dignissimos quo eos eum natus esse ullam error numquam veritatis culpa nihil nulla, fugit minus placeat non sequi recusandae!</h3>
                <p className="main-blog-article-description truncate">Description Description Description 123 Description Description Description 123 Description Description Description 123</p>
                <article className="main-blog-article-author-info">
                    <p className="main-blog-article-createdat">{day + " " + time}</p>
                    <p className="main-blog-article-author truncate">by Author Author Author Author Author Author</p>
                </article>
            </article>
            <article className="main-blog-article-image-wrapper">
                <img className="main-blog-article-image"
                    src="logo192.png"
                    alt="" />
            </article>
        </article>
    );
}

export default Blog;