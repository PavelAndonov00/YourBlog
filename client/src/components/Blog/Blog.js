import { useContext } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Context from '../../contexts/context';
import EditDeleteButtons from '../Shared/EditDeleteButtons';
import './Blog.css';

const Blog = (
    { id, title, description, imageUrl, authorName, createdAt, authorId }
) => {
    let context = useContext(Context);
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
            <article className="blog-article-content">
                <article className="blog-article-info">
                    <h3 className="blog-article-heading truncate">{title}</h3>
                    <p className="blog-article-description truncate">{description}</p>
                    <article className="blog-article-author-info">
                        <p className="blog-article-createdat">{createdAt}</p>
                        <p className="blog-article-author truncate">{authorName}</p>
                    </article>
                </article>
                <article style={{ display: "flex", justifyContent: "space-between" }}>

                    <article className={isOwner() ? "blog-article-buttons" : "blog-article-buttons-hidden"}>
                        <EditDeleteButtons
                            id={id}
                            stopPropagationHandler={context.stopPropagationHandler}
                            onclickDelete={context.onclickDelete}
                        />
                    </article>
                    <article className="blog-article-info">
                        <span className="blog-article-info-label">Likes: 8</span>
                        <span className="blog-article-info-label">Comments: 8</span>
                    </article>
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