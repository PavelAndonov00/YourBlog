import React, { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

import './Home.css';
import Blog from '../Blog';
import {getAllCut} from '../../services/blogService';

const Home = ({ scrollTop }) => {
    let [blogs, setBlogs] = useState([]);
    let [offset, setOffset] = useState(0);
    let [count, setCount] = useState(5);

    const fetchData = async () => {
        let result = await getAllCut(offset, count);
        setBlogs(oldBlogs => oldBlogs.concat(result));
        setOffset(oldOffset => oldOffset + 5);
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
            style={{overflow: "unset"}}
                dataLength={blogs.length}
                next={fetchData}
                hasMore
                loader={<h4>Loading...</h4>}
            >
                {blogs.map(b => {
                    return <Blog key={b.id} {...b}/>;
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