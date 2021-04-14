import './BlogDetails.css';
import { getBlog } from '../../services/blogService';
import { useEffect, useState } from 'react';

const BlogDetails = ({
    match
}) => {
    let user = JSON.parse(localStorage.getItem('user'));
    let [blog, setBlog] = useState({
        title: "",
        description: "",
        content: "",
        imageUrl: "",
        authorName: "",
        createdAt: "",
        authorId: ""
    });

    let [likeButtonSelected, setLikeButtonSelected] = useState(false);
    let [commentsButtonSelected, setCommentsButtonSelected] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let blog = await getBlog(match.params.id);
            setBlog(oldState => { return { ...oldState, ...blog } });
        }

        fetchData();
    }, []);

    const onSelectLikeButton = (ev) => {
        setLikeButtonSelected(oldState => !oldState);
    }

    const onSelectCommentsButton = (ev) => {
        setCommentsButtonSelected(oldState => !oldState);
    }

    const likeButton = (
        <button className={
            likeButtonSelected
                ? "main-blog-details-button-selected"
                : "main-blog-details-button"}
            onClick={onSelectLikeButton}>
            <img src="/like.svg"
                alt="LikeButton"
                className="main-blog-details-button-image" />
            Like
        </button>);

    const isAuthor = () => {
        return user.id === blog.authorId;
    }

    return (
        <>
            <section className="main-blog-details">
                <h1 className="main-blog-details-heading">{blog.title}</h1>
                <img className="main-blog-details-image" src={blog.imageUrl} alt="" style={{ width: "100%", height: "300px" }} />
                <p className="main-blog-details-description">{blog.description}</p>
                <article className="main-blog-details-content-wrapper">
                    <p className="main-blog-details-content">{blog.content}</p>
                </article>
                <article className="main-blog-details-author-info">
                    <p className="main-blog-details-author">
                        Author: {blog.authorName}
                    </p>
                    <p className="main-blog-details-createdat">
                        {blog.createdAt}
                    </p>
                </article>
                <article className="main-blog-details-buttons">
                    {isAuthor ? "" : likeButton}
                    <button className={
                        commentsButtonSelected
                            ? "main-blog-details-button-selected"
                            : "main-blog-details-button"}
                        onClick={onSelectCommentsButton}>
                        <img src="/comments-bubble.svg"
                            alt="CommentsButton"
                            className="main-blog-details-button-image" />
                        Comments
                    </button>
                </article>
            </section>
        </>
    );
}

export default BlogDetails;