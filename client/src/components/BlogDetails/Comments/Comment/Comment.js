import './Comment.css';

function Comment({
    username, comment, createdAt
}) {
    return (
        <article className="comment">
            <p className="author">{username}</p>
            <p className="content">{comment}</p>
            <p className="date">{createdAt}</p>
        </article>
    )
}

export default Comment;