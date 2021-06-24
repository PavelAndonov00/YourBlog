import React, { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

import './Home.css';
import Blog from '../Blog';
import { getAllCut } from '../../services/blogService';

const Home = ({ scrollTop }) => {
    let user = JSON.parse(localStorage.getItem('user'));
    let [blogs, setBlogs] = useState([]);
    let [offset, setOffset] = useState(0);
    let [count, setCount] = useState(5);

    const fetchData = async () => {
        let userId = user?.id ? user.id : null;
        try {
            let result = await getAllCut(offset, count, userId);
            setBlogs(oldBlogs => oldBlogs.concat(result));
            setOffset(oldOffset => oldOffset + 5);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const scrollToTop = () => {
        scrollTop.current.scrollIntoView();
    }

    return (
        <section className="main-blogs-section">
            <InfiniteScroll
                style={{ overflow: "unset" }}
                dataLength={blogs.length}
                next={fetchData}
                hasMore
                loader={<h4 class="main-blogs-section-greeting">Loading...</h4>}
            >
                {blogs.map(b => {
                    return <Blog key={b.id} {...b} />;
                })}
            </InfiniteScroll>
            <Link to="/home/#header" className="scroll-to-top" onClick={scrollToTop}>
                <img className="scroll-to-top-img"
                    src="/up-arrow.svg"
                    alt="Up arrow" />
            </Link>
        </section>
    );
}

export default Home;