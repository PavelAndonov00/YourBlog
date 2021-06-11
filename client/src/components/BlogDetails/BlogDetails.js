import './BlogDetails.css';
import { getBlog, isLikedByUser, likeUnlikeBlog } from '../../services/blogService';
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
        authorId: "",
        likes: 0,
        comments: 0
    });

    let [likeButtonSelected, setLikeButtonSelected] = useState(false);
    let [commentsButtonSelected, setCommentsButtonSelected] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                let blog = await getBlog(match.params.id);
                setBlog(oldState => { return { ...oldState, ...blog } });

                let result = await isLikedByUser(blog.id, user.id);
                setLikeButtonSelected(result.liked);
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

    const onSelectLikeButton = async (ev) => {
        let result = isAuthenticated();
        if (result) {
            setLikeButtonSelected(oldState => !oldState);
        }

        var updatedBlog = await likeUnlikeBlog(blog.id, user.id);
        setBlog(oldBlog => { return { ...oldBlog, ...updatedBlog } })
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
                <img className="main-blog-details-image" src={blog.imageUrl} alt="" />
                <p className="main-blog-details-description">{blog.description}</p>
                <article className="main-blog-details-content-wrapper">
                    <p className="main-blog-details-content">{blog.content}</p>
                </article>
                <article className="main-blog-details-author-info">
                    <p className="main-blog-details-author">
                        Author: {blog.authorName}
                    </p>
                    <p className="main-blog-details-createdat">
                        Date: {blog.createdAt}
                    </p>
                </article>
                <article className="main-blog-details-buttons-holder">
                    <article className="main-blog-details-buttons">
                        <article className="main-blog-details-button-wrapper">
                            <p style={{ fontWeight: "bold" }}>Likes: {blog.likes}</p>
                            {isAuthor() ? "" : likeButton}
                        </article>
                        <article className="main-blog-details-button-wrapper">
                            <p style={{ fontWeight: "bold" }}>Comments: {blog.comments}</p>
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
                            <section className="comments">
                                <article>
                                    <article className="comment">
                                        <p>Someone</p>
                                        <p>Date: 123</p>
                                        <p>I am the best comment writer</p>
                                    </article>
                                    <article className="comment">
                                        <p>Someone</p>
                                        <p>Date: 123</p>
                                        <p>I am the best comment writer</p>
                                    </article>
                                </article>
                                <article className="write-comment">
                                    <textarea type="text" style={{maxWidth: "200px", maxHeight: "150px"}}/>
                                    <img src="/send.svg" alt="Send" />
                                </article>
                            </section>
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