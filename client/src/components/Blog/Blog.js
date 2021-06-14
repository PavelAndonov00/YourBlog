import { useContext } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import EditDeleteButtons from '../Shared/EditDeleteButtons';
import './Blog.css';

const Blog = (
    { id, title, description, imageUrl, authorName, createdAt, authorId, likes, commentsCount }
) => {
    let history = useHistory();
    let match = useRouteMatch();

    const isOwner = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        return user?.id === authorId;
    }

    const openDetails = () => {
        history.push(`/blogs/${id}/details`);
    }

    return (
        <article className="blog-article" onClick={openDetails}>
            <article className="blog-article-image-wrapper">
                <img className="blog-article-image"
                    src={imageUrl}
                    alt="" />
            </article>
            <article className="blog-article-content">
                <article className="blog-article-info">
                    <h3 className="blog-article-heading truncate">{title}</h3>
                    <p className="blog-article-description truncate">{description}</p>
                    <article className="blog-article-author-info">
                        <p className="blog-article-createdat">{createdAt}</p>
                        <p className="blog-article-author truncate">{authorName}</p>
                    </article>
                </article>
                <article className="blog-article-buttons-likes-comments">
                    <article className={isOwner() ? "blog-article-buttons" : "blog-article-buttons-hidden"}>
                        <EditDeleteButtons
                            id={id} />
                    </article>
                    <article className="blog-article-likes-comments">
                        <p className="blog-article-likes-comments-label">Likes: {likes}</p>
                        <p className="blog-article-likes-comments-label">Comments: {commentsCount}</p>
                    </article>
                </article>
            </article>
        </article>
    );
}

export default Blog;