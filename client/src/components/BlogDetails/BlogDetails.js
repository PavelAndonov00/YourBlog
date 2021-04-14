import './BlogDetails.css';
import { getBlog } from '../../services/blogService';
import { useContext, useEffect, useState } from 'react';
import Context from '../../contexts/context';
import EditDeleteButtons from '../Shared/EditDeleteButtons';

const BlogDetails = ({
    match, history
}) => {
    let context = useContext(Context);
    let user = JSON.parse(localStorage.getItem('user'));
    let [blog, setBlog] = useState({
        id: "",
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
            try {
                let blog = await getBlog(match.params.id);
                setBlog(oldState => { return { ...oldState, ...blog } });
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, []);

    const isAuthenticated = () => {
        if (user?.id) {
            return true;
        } else {
            history.push("/login");
        }
    }

    const onSelectLikeButton = (ev) => {
        let result = isAuthenticated();
        if (result) {
            setLikeButtonSelected(oldState => !oldState);
        }
    }

    const onSelectCommentsButton = (ev) => {
        let result = isAuthenticated();
        if (result) {
            setCommentsButtonSelected(oldState => !oldState);
        }
    }

    const likeButton = (
        <button className={
            likeButtonSelected
                ? "main-blog-details-button selected"
                : "main-blog-details-button"}
            onClick={onSelectLikeButton}>
            <img src="/like.svg"
                alt="LikeButton"
                className="main-blog-details-button-image" />
            Like
        </button>);

    const isAuthor = () => {
        return user?.id === blog.authorId;
    }

    const isAdmin = () => {
        return user?.role === "Admin";
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
                <article className="main-blog-details-buttons-holder">
                    <article className="main-blog-details-buttons">
                        <article className="main-blog-details-button-wrapper">
                            <p style={{ fontWeight: "bold" }}>Likes: 8</p>
                            {isAuthor() ? "" : likeButton}
                        </article>
                        <article className="main-blog-details-button-wrapper">
                            <p style={{ fontWeight: "bold" }}>Comments: 8</p>
                            <button className={
                                commentsButtonSelected
                                    ? "main-blog-details-button selected"
                                    : "main-blog-details-button"}
                                onClick={onSelectCommentsButton}>
                                <img src="/comments-bubble.svg"
                                    alt="CommentsButton"
                                    className="main-blog-details-button-image" />
                            Comments
                            </button>
                        </article>
                    </article>
                    <article className={isAdmin() ? "main-blog-details-admin-buttons" : "main-blog-details-admin-buttons-hidden"}>
                        <EditDeleteButtons
                            id={blog.id}
                            stopPropagationHandler={context.stopPropagationHandler}
                            onclickDelete={context.onclickDelete}
                        />
                    </article>
                </article>
            </section>
        </>
    );
}

export default BlogDetails;