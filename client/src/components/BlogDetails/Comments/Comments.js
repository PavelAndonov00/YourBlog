import './Comments.css';

import { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { addComment, getComments } from '../../../services/blogService';

import CommentsPresent from './CommentsPresent';

const Comments = ({
    blogId, setCommentsCount
}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [connection, setConnection] = useState(null);
    const [isWriting, setIsWriting] = useState(false);

    useEffect(() => {
        async function initConnection() {
            var con = new HubConnectionBuilder()
                .withUrl("https://localhost:5001/hubs/comments")
                .withAutomaticReconnect()
                .build();
            setConnection(con);
        }

        async function getBlogComments() {
            try {
                let result = await getComments(blogId);
                setComments(result);
            } catch (e) {
                console.log(e);
            }
        }

        initConnection();
        getBlogComments();
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log("Connected");

                    connection.on("ReceiveComment", function (comment) {
                        setCommentsCount(oldCount => oldCount + 1);
                        setComments(oldComments => [comment].concat(oldComments));
                    });

                    connection.on("SomeoneWriting", function (boolean) {
                        setIsWriting(boolean);
                    });
                })
                .catch(console.log);
        }
    }, [connection]);

    const onChange = (ev) => {
        ev.stopPropagation();
        setComment(ev.target.value);
    }

    const onSend = async (ev) => {
        ev.stopPropagation();
        
        try {
            var result = await addComment(blogId, user.id, comment);
            if (!result.status && !result.error) {
                setComment("");
                connection.invoke("SendComment", result);
                connection.invoke("NotifySomeoneWriting", false);
            }
        } catch (e) {

        }
    }

    const notifyWriting = (ev) => {
        ev.stopPropagation();

        if (ev.target.value === "") {
            connection.invoke("NotifySomeoneWriting", false);
        } else {
            connection.invoke("NotifySomeoneWriting", true);
        }
    }

    return (
        <section className="main-blog-details-comments-section">
            <CommentsPresent comments={comments} isWriting={isWriting} />
            <article className="main-blog-details-comments-section-write-comment">
                <textarea type="text"
                    value={comment}
                    onChange={onChange}
                    onKeyUp={notifyWriting} />
                <img src="/send.svg"
                    alt="Send"
                    onClick={onSend} />
            </article>
        </section>
    );
}

export default Comments;