import './Comment.css';

function Comment({
    username, comment, createdAt
}) {
    return (
        <article className="main-blog-details-comments-section-comments-comment">
            <p className="main-blog-details-comments-section-comments-comment-author">{username}</p>
            <p className="main-blog-details-comments-section-comments-comment-content">{comment}</p>
            <p className="main-blog-details-comments-section-comments-comment-date">{createdAt}</p>
        </article>
    )
}

export default Comment;